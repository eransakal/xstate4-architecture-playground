import {
  MockWebsocketPayload,
  serverMocks,
} from '../../../server-mocks/server-mocks';
import {
  UserPollsMachineContext,
  UserPollsMachineEventsTypes,
  UserPollsMachineSender,
} from '../types';

export const onUserPollstatusUpdated =
  (context: UserPollsMachineContext) => (send: UserPollsMachineSender) => {
    if (!context.externalInfo.userId) {
      return;
    }

    const handler = (payload: MockWebsocketPayload) => {
      switch (payload.type) {
        case 'poll-started':
          {
            // TODO validate ws payload
            const isValid = !!payload.pollType;

            if (!isValid) {
              // TODO write to log
              return;
            }
            send({
              type: UserPollsMachineEventsTypes.PollStarted,
              pollCreator: payload.pollCreator,
              isPrivate: payload.isPrivate,
              pollType: payload.pollType,
            });
          }
          break;
        case 'poll-answered':
          {
            // TODO validate ws payload
            const isValid =
              !!payload.userId && !!payload.answerId && !!payload.userName;

            if (!isValid) {
              // TODO write to log
              return;
            }
            send({
              type: UserPollsMachineEventsTypes.PollAnswered,
              userId: payload.userId,
              userName: payload.userName,
              userAvatar: payload.userAvatar,
              answerId: payload.answerId,
            });
          }
          break;
        case 'poll-ended':
          send({
            type: UserPollsMachineEventsTypes.PollEnded,
          });
          break;
        default:
          break;
      }
    };

    serverMocks.registerWS(context.__mockServerInfo__.appInstance, handler);
    return () => {
      serverMocks.unresgisterWS(
        context.__mockServerInfo__.appInstance,
        handler
      );
    };
  };
