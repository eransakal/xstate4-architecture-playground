import { actions } from 'xstate';
import { UsersMachineEventsTypes } from '../../../../types';
import { UpdateUserStatusMachineStateConfig } from '../../types';

export const operatingState: UpdateUserStatusMachineStateConfig = {
  initial: 'inProgress',
  states: {
    inProgress: {
      invoke: { src: 'updateUserRole' },
      after: {
        5000: {
          actions: actions.sendParent((context) => ({
            type: UsersMachineEventsTypes.UpdateUserStatusFailure,
            userId: context.userId,
          })),
        },
      },
    },
  },
};
