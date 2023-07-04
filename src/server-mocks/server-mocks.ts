import axios, { AxiosRequestConfig } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { User } from '../data/users-machine/types';
import { GlobalEvent } from '../shared/pubsub/global-event';

const mock = new MockAdapter(axios, { delayResponse: 2000 });

const usersData = [
  {
    id: 1,
    name: 'Stas Kohut',
    title: 'KME Team Member',
    avatar: 'stas.png',
    isAdmin: true,
    isConnected: true,
  },
  {
    id: 2,
    name: 'Anna Yurkevych',
    title: 'KME Team Member',
    avatar: 'anna.png',
    isAdmin: false,
    isConnected: true,
  },
  {
    id: 3,
    name: 'Tornike Menabde',
    title: 'KME Team Member',
    avatar: 'tornik.jpeg',
    isAdmin: false,
    isConnected: true,
  },
  {
    id: 4,
    name: 'Eran Sakal',
    title: 'KME Team Lead',
    avatar: 'eran.jpg',
    isAdmin: false,
    isConnected: true,
  },
];

let activePollData: {
  pollCreator: number | null;
  pollType: null | string;
  isPrivate: boolean;
  answers: {
    userId: number;
    userName: string;
    userAvatar: string | null;
    answerId: string;
  }[];
} | null = null;

export type MockWebsocketPayload = { [key: string]: any; type: string };

const globalMockWS: Record<string, GlobalEvent<MockWebsocketPayload>> = {};

enum WSTargets {
  None = 0,
  Admins = 1 << 0, // 0001 -- the bitshift is unnecessary, but done for consistency
  Own = 1 << 1, // 0010
  All = ~(~0 << 4), // 1111
}

const getUserFromAppInstanceId = (appInstanceId: string) => {
  return appInstanceId.replace('app-instance-', '');
};

const getRequestUserFromHeader = (
  config: AxiosRequestConfig,
  verifyAdmin: boolean
): User | [number, string] => {
  const appInstanceId = config.headers?.['x-appInstanceId'] ?? null;
  const userId = appInstanceId ? getUserFromAppInstanceId(appInstanceId) : null;

  const user =
    (userId && usersData.find((user) => String(user.id) === String(userId))) ??
    null;

  if (user && user?.isConnected) {
    if (verifyAdmin && !user.isAdmin) {
      return [403, 'user cannot perform action'];
    }

    return user;
  }
  return [400, 'unknown user, please check headers'];
};

const emitWS = (
  originatedUserId: number | null, // todo should not allow null
  target: WSTargets,
  payload: MockWebsocketPayload
) => {
  setTimeout(() => {
    Object.entries(globalMockWS).forEach(([userId, ws]) => {
      const userInfo = usersData.find(
        (user) => String(user.id) === String(userId)
      );
      if (!userInfo || !userInfo.isConnected) {
        return;
      }
      if (
        target === WSTargets.All ||
        ((target & WSTargets.Admins) === WSTargets.Admins &&
          userInfo.isAdmin) ||
        ((target & WSTargets.Own) === WSTargets.Own &&
          userInfo.id === originatedUserId)
      ) {
        ws.emit(payload);
      }
    });
  }, 1000);
};
export const serverMocks = {
  registerWS: (
    appInstance: string,
    callback: (data: MockWebsocketPayload) => void
  ) => {
    const userId = getUserFromAppInstanceId(appInstance);
    serverMocks.unresgisterWS(userId, callback);

    const userWS = (globalMockWS[userId] =
      globalMockWS[userId] || new GlobalEvent<MockWebsocketPayload>());
    userWS.on(callback, false);
  },
  unresgisterWS: (
    appInstance: string,
    callback: (data: MockWebsocketPayload) => void
  ) => {
    const userId = getUserFromAppInstanceId(appInstance);
    const userWS = globalMockWS[userId];
    if (userWS) {
      userWS.off(callback);
    }
  },
  setup: () => {
    mock.onGet('/users').reply((config) => {
      let ownUser = null;
      const users: any[] = [];

      const userOrFailure = getRequestUserFromHeader(config, false);

      if (Array.isArray(userOrFailure)) {
        return userOrFailure;
      }

      usersData.forEach((user) => {
        if (user.isConnected) {
          if (user.id === userOrFailure.id) {
            ownUser = user;
          } else {
            users.push(user);
          }
        }
      });

      return [
        200,
        {
          users,
          ownUser,
        },
      ];
    });

    mock.onGet('/polls/status').reply((config) => {
      console.log(`[mock] got request 'polls/status'`, config.data);

      const userOrFailure = getRequestUserFromHeader(config, false);

      if (Array.isArray(userOrFailure)) {
        return userOrFailure;
      }

      if (activePollData === null) {
        return [
          200,
          {
            status: true,
            pollCreator: null,
            pollType: null,
            isPrivate: null,
            answers: null,
          },
        ];
      } else {
        return [
          200,
          {
            status: true,
            pollCreator: activePollData.pollCreator,
            pollType: activePollData.pollType,
            isPrivate: activePollData.isPrivate,
            answers: userOrFailure.isAdmin ? activePollData.answers : activePollData.answers.filter((answer) => answer.userId === userOrFailure.id),
          },
        ];
      }
    });

    mock.onPut('/polls/answer').reply((config) => {
      console.log(`[mock] got request 'polls/answer'`, config.data);
      const payload = JSON.parse(config.data ?? '');

      const userOrFailure = getRequestUserFromHeader(config, false);

      if (Array.isArray(userOrFailure)) {
        return userOrFailure;
      }

      const answerId = payload?.answerId ?? false;

      if (activePollData === null) {
        console.log(`[mock] no active poll, return 400`);
        return [
          400,
          {
            status: false,
            error: 'no active poll found',
          },
        ];
      }

      const existingAnswer = activePollData.answers.find(
        (answer) => answer.userId === userOrFailure.id
      );

      if (existingAnswer) {
        console.log(`[mock] user already answered, return 400`);
        return [400, { status: false, error: 'user already answered' }];
      }

      const newAnswer = {
        userId: userOrFailure.id,
        userName: userOrFailure.name,
        userAvatar: userOrFailure.avatar || null,
        answerId,
      };

      activePollData.answers.push(newAnswer);

      const target = activePollData.isPrivate
        ? WSTargets.Admins | WSTargets.Own
        : WSTargets.All;

      emitWS(userOrFailure.id, target, {
        type: 'poll-answered',
        ...newAnswer,
      });

      return [200, { status: true }];
    });

    mock.onPost('/polls/end').reply((config) => {
      console.log(`[mock] got request 'polls/end'`, config.data);

      const userOrFailure = getRequestUserFromHeader(config, true);

      if (Array.isArray(userOrFailure)) {
        return userOrFailure;
      }

      if (activePollData === null) {
        console.log(`[mock] no active poll found, return 400`);
        return [
          400,
          {
            status: false,
            error: 'no active poll found',
          },
        ];
      }

      activePollData = null;

      emitWS(userOrFailure.id, WSTargets.All, {
        type: 'poll-ended',
      });
      return [200, { status: true }];
    });

    mock.onPost('/users/setAdmin').reply((config) => {
      const userOrFailure = getRequestUserFromHeader(config, true);

      if (Array.isArray(userOrFailure)) {
        return userOrFailure;
      }
      const payload = JSON.parse(config.data ?? '');
      const isAdmin = payload?.isAdmin ?? null;
      const userId = payload?.userId ?? null;

      if (isAdmin === null || userId === null) {
        return [400, { status: false, error: 'invalid arguments' }];
      }

      const user = usersData.find((user) => user.id === userId);
      if (!user) {
        return [400, { status: false, error: 'unknown user id' }];
      }
      user.isAdmin = isAdmin;

      emitWS(userOrFailure.id, WSTargets.All, {
        type: 'user-admin-status-changed',
        userId: user.id,
        isAdmin: user.isAdmin,
      });
      return [200, { status: true }];
    });

    mock.onGet('/polls/create').reply((config) => {
      console.log(`[mock] got request 'polls/create'`, config.data);

      const userOrFailure = getRequestUserFromHeader(config, true);

      if (Array.isArray(userOrFailure)) {
        return userOrFailure;
      }

      const payload = JSON.parse(config.data ?? '');
      const pollType = payload?.pollType ?? null;
      const isPrivate = payload?.isPrivate ?? false;

      if (activePollData !== null) {
        console.log(`[mock] already has active poll, return 400`);
        return [
          400,
          {
            status: false,
            error:
              'another poll already started, please end it first and try again',
          },
        ];
      }

      if (!pollType) {
        console.log(`[mock] missing poll type, return 400`);
        return [400, { status: false, error: 'missing poll type' }];
      }

      if (!['yes-no', 'emotions'].includes(pollType)) {
        console.log(`[mock] unknown poll type, return 400`);
        return [400, { status: false, error: 'unknown poll type' }];
      }

      activePollData = {
        pollType,
        pollCreator: userOrFailure.id,
        answers: [],
        isPrivate,
      };

      emitWS(userOrFailure.id, WSTargets.All, {
        type: 'poll-started',
        pollType,
        isPrivate,
        pollCreator: userOrFailure.id,
      });
      return [200, { status: true }];
    });
  },
};
