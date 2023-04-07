import { assign } from '@xstate/immer';
import { actions, createMachine, spawn } from 'xstate';
import { createUpdateUserStatusMachine } from '../../../update-user-status-machine/create-update-user-status-machine';
import { createUsersMachineLogger } from '../../logger';
import {
  UsersMachineContext,
  UsersMachineEvents,
  UsersMachineEventsTypes,
} from '../../types';

const logger = createUsersMachineLogger('updateUserAdminStatus');

export const startUpdateAdminStatus = assign(
  (context: UsersMachineContext, event: UsersMachineEvents) => {
    if (event.type !== UsersMachineEventsTypes.UpdateUserStatus) {
      return;
    }

    if (context.ownUser?.id === event.userId) {
      context.ownUser.updateStatusRef = spawn(
        createUpdateUserStatusMachine({
          appInstance: context.__mockServerInfo__.appInstance,
          userId: event.userId,
          isAdmin: event.isAdmin,
        })
      );
    } else {
      const user = context.users.find((user) => user.id === event.userId);
      if (user) {
        user.updateStatusRef = spawn(
          createUpdateUserStatusMachine({
            appInstance: context.__mockServerInfo__.appInstance,
            userId: event.userId,
            isAdmin: event.isAdmin,
          })
        );
      }
    }
  }
);
