import {
  MockWebsocketPayload,
  serverMocks,
} from '../../../server-mocks/server-mocks';
import {
  UsersMachineContext,
  UsersMachineEventsTypes,
  UsersMachineSender,
} from '../types';

export const onUserRoleChanged =
  (context: UsersMachineContext) => (send: UsersMachineSender) => {
    const handler = (payload: MockWebsocketPayload) => {
      if (payload.type === 'user-admin-status-changed') {
        const userId = payload.userId;
        const isAdmin = payload.isAdmin;

        send({
          type: UsersMachineEventsTypes.UserRoleUpdated,
          userId,
          isAdmin,
        });
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
