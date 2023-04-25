import { assign } from '@xstate/immer';
import { spawn } from 'xstate';
import { createUpdateUserRoleMachine } from '../../spawn-machines/update-user-role-machine/create-update-user-role-machine';
import {
  UsersMachineContext,
  UsersMachineEvents,
  UsersMachineEventsTypes,
} from '../../types';

// const logger = createUsersMachineLogger('updateUserRole');

export const spawnUpdateUserRole = assign(
  (context: UsersMachineContext, event: UsersMachineEvents) => {
    if (event.type !== UsersMachineEventsTypes.UpdateUserRole) {
      return;
    }

    if (context.ownUser?.id === event.userId) {
      context.ownUser.updateStatusRef = spawn(
        createUpdateUserRoleMachine({
          appInstance: context.__mockServerInfo__.appInstance,
          userId: event.userId,
          isAdmin: event.isAdmin,
        })
      );
    } else {
      const user = context.users.find((user) => user.id === event.userId);
      if (user) {
        user.updateStatusRef = spawn(
          createUpdateUserRoleMachine({
            appInstance: context.__mockServerInfo__.appInstance,
            userId: event.userId,
            isAdmin: event.isAdmin,
          })
        );
      }
    }
  }
);
