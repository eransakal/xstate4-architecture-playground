import { canManageUsersList } from '../calculated-values/can-manage-users-list';
import { UsersMachineEventsTypes, UsersMachineStateConfig } from '../types';

export const listState: UsersMachineStateConfig = {
  initial: 'hidden',  
  states: {
    visible: {
      on: {
        [UsersMachineEventsTypes.ManageUsersListUpdated]: {
            cond: (context) => !canManageUsersList(context),
            target: 'hidden',
          },
        [UsersMachineEventsTypes.HideList]: {
          target: 'hidden',
        },
      },
    },
    hidden: {
      on: {
        [UsersMachineEventsTypes.ShowList]: {
          cond: (context) => canManageUsersList(context),            
          target: 'visible',
        },
      },
    },
  },
};
