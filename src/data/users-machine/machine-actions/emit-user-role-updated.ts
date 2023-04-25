import { onOwnUserChangedEvent } from '../global-events';
import { UsersMachineContext } from '../types';

export const emitUserRoleUpdated = (context: UsersMachineContext) => {
  if (context.ownUser) {
    // NOTICE: in real applications we use 'emit'. here we use 'emitToGroup' because this demo application simulate four users on the same browser tab
    onOwnUserChangedEvent.emitByApp(
      context.__mockServerInfo__.appInstance,
      context.ownUser
    );
  }
};
