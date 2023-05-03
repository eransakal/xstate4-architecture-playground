import { onOwnUserChangedEvent } from '../global-events';
import { UsersMachineContext } from '../types';

export const emitOwnUserUpdated = (context: UsersMachineContext) => {
  if (context.ownUser) {
    onOwnUserChangedEvent.emitByApp(
      context.__mockServerInfo__.appInstance,
      context.ownUser
    );
  }
};
