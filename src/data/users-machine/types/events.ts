import { User } from './context';

export enum UsersMachineEventsTypes {
  UserRoleUpdated = 'UserRoleUpdated',
  UpdateUserRoleFailure = 'UpdateUserRoleFailure',
  UpdateUserRole = 'UpdatingUserRole',
  HideList = 'HideList',
  ShowList = 'ShowList',  
  ManageUsersListUpdated = 'ManageUsersListUpdated'
}

type invokeEvents = {
  type: 'done.invoke.getUsers';
  data: {
    ownUser: User;
    users: User[];
  };
};

export type UpdateUserRoleFailureEvent = {
  type: UsersMachineEventsTypes.UpdateUserRoleFailure;
  userId: number;
};

export type UsersMachineEvents =
  | invokeEvents
  | {
      type: UsersMachineEventsTypes.UserRoleUpdated;
      userId: number;
      isAdmin: boolean;
    }
  | {
      type: UsersMachineEventsTypes.UpdateUserRole;
      userId: number;
      isAdmin: boolean;
    }
  | {
      type: UsersMachineEventsTypes.HideList;
    }
  | UpdateUserRoleFailureEvent
  | {
      type: UsersMachineEventsTypes.ShowList;
    }
    | {
      type: UsersMachineEventsTypes.ManageUsersListUpdated
    }
