import { actions } from 'xstate';
import { UsersMachineEventsTypes } from '../../../users-machine/types';
import { UpdateUserStatusMachineStateConfig } from '../../types';

export const operatingState: UpdateUserStatusMachineStateConfig = {
  initial: 'inProgress',
  states: {
    inProgress: {
      entry: 'requestUpdateAdminStatus',
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
