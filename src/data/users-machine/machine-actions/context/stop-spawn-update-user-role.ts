import { assign } from '@xstate/immer';
import {
  UsersMachineContext,
  UsersMachineEvents,
  UsersMachineEventsTypes,
} from '../../types';

// const logger = createUsersMachineLogger('stopSpawnUpdateUserRole');

export const stopSpawnUpdateUserRole = assign(
  (context: UsersMachineContext, event: UsersMachineEvents) => {
    if (
      event.type === UsersMachineEventsTypes.UserRoleUpdated ||
      event.type === UsersMachineEventsTypes.UpdateUserRoleFailure
    ) {
      if (context.ownUser?.id === event.userId) {
        context.ownUser.updateStatusRef?.stop();
        context.ownUser.updateStatusRef = null;
      } else {
        const user = context.users.find((user) => user.id === event.userId);
        if (user) {
          user.updateStatusRef?.stop();
          user.updateStatusRef = null;
        }
      }
    }
  }
);
