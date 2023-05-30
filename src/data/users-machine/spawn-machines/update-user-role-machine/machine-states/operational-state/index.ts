import { actions } from 'xstate';
import { UsersMachineEventsTypes } from '../../../../types';
import { UpdateUserRoleMachineStateConfig } from '../../types';

export const operationalState: UpdateUserRoleMachineStateConfig = {
  initial: 'inProgress',
  states: {
    inProgress: {
      invoke: { src: 'updateUserRole' },
      after: {
        5000: {
          actions: actions.sendParent((context) => ({
            type: UsersMachineEventsTypes.UpdateUserRoleFailure,
            userId: context.userId,
          })),
        },
      },
    },
  },
};
