import { assign } from '@xstate/immer';
import { createUsersMachineLogger } from '../../logger';
import {
  UsersMachineContext,
  UsersMachineEvents,
  UsersMachineEventsTypes,
} from '../../types';

const logger = createUsersMachineLogger('updateAdminStatus');

export const updateAdminStatus = assign(
  (context: UsersMachineContext, event: UsersMachineEvents) => {
    if (event.type !== UsersMachineEventsTypes.UserStatusUpdated) {
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
