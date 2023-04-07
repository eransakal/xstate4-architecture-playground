import {
  UsersMachineEventsTypes,
  UsersMachineStateConfig,
} from '../../../types';

export const operatingState: UsersMachineStateConfig = {
  on: {
    [UsersMachineEventsTypes.UpdateUserStatus]: {
      cond: (context) => {
        return !!context.ownUser?.isAdmin;
      },
      actions: 'startUpdateAdminStatus',
    },
    [UsersMachineEventsTypes.UpdateUserStatusFailure]: {
      actions: 'endUpdateAdminStatus',
    },
    [UsersMachineEventsTypes.UserStatusUpdated]: [
      {
        cond: 'isEventOfOwnUser',
        actions: [
          'updateUserAdminStatus',
          'endUpdateAdminStatus',
          'emitIsAdminChanged',
        ],
      },
      {
        actions: ['updateUserAdminStatus', 'endUpdateAdminStatus'],
      },
    ],
  },
  initial: 'idle',
  invoke: { src: 'onUserAdminStatusChanged' },
  states: {
    idle: {},
  },
};
