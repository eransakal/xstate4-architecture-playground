import { assign } from '@xstate/immer';
import {
  UsersMachineContext,
  UsersMachineEvents,
  UsersMachineEventsTypes,
} from '../../types';

// const logger = createUsersMachineLogger('updateUserRole');

export const updateUserRole = assign(
  (context: UsersMachineContext, event: UsersMachineEvents) => {
    if (event.type !== UsersMachineEventsTypes.UserRoleUpdated) {
      return;
    }

    if (context.ownUser?.id === event.userId) {
      context.ownUser.isAdmin = event.isAdmin;
    } else {
      const user = context.users.find((user) => user.id === event.userId);
      if (user) {
        user.isAdmin = event.isAdmin;
      }
    }
  }
);
