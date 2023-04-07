import { assign } from '@xstate/immer';
import {
  UsersMachineContext,
  UsersMachineEvents,
  UsersMachineEventsTypes,
} from '../../types';

// const logger = createUsersMachineLogger('endUpdateAdminStatus');

export const endUpdateAdminStatus = assign(
  (context: UsersMachineContext, event: UsersMachineEvents) => {
    if (
      event.type === UsersMachineEventsTypes.UserStatusUpdated ||
      event.type === UsersMachineEventsTypes.UpdateUserStatusFailure
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
