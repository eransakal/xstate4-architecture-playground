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
      actions: 'spawnUpdateUserRole',
    },
    [UsersMachineEventsTypes.UpdateUserStatusFailure]: {
      actions: 'stopSpawnUpdateUserRole',
    },
    [UsersMachineEventsTypes.UserStatusUpdated]: [
      {
        cond: 'isWSEventOfOwnUser',
        actions: [
          'updateUserRole',
          'stopSpawnUpdateUserRole',
          'emitUserRoleUpdated',
        ],
      },
      {
        actions: ['updateUserRole', 'stopSpawnUpdateUserRole'],
      },
    ],
  },
  initial: 'idle',
  invoke: { src: 'onUserRoleChanged' },
  states: {
    idle: {},
  },
};
