import {
  UsersMachineEventsTypes,
  UsersMachineStateConfig,
} from '../../../types';

export const operatingState: UsersMachineStateConfig = {
  on: {
    [UsersMachineEventsTypes.UpdateUserRole]: {
      cond: (context) => {
        return !!context.ownUser?.isAdmin;
      },
      actions: 'spawnUpdateUserRole',
    },
    [UsersMachineEventsTypes.UpdateUserRoleFailure]: {
      actions: 'stopSpawnUpdateUserRole',
    },
    [UsersMachineEventsTypes.UserRoleUpdated]: [
      {
        cond: 'isWSEventOfOwnUser',
        actions: ['updateUserRole', 'stopSpawnUpdateUserRole'],
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
