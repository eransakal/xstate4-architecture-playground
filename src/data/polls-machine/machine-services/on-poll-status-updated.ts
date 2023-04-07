import {
  MockWebsocketPayload,
  serverMocks,
} from '../../../server-mocks/server-mocks';
import {
  PollsMachineContext,
  PollsMachineEventsTypes,
  PollsMachineSender,
} from '../types';

export const onPollStatusUpdated =
  (context: PollsMachineContext) => (send: PollsMachineSender) => {
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
              type: PollsMachineEventsTypes.PollStarted,
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
              type: PollsMachineEventsTypes.PollAnswered,
              userId: payload.userId,
              userName: payload.userName,
              userAvatar: payload.userAvatar,
              answerId: payload.answerId,
            });
          }
          break;
        case 'poll-ended':
          send({
            type: PollsMachineEventsTypes.PollEnded,
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
