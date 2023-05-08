import { User } from './context';

export enum UsersMachineEventsTypes {
  UserRoleUpdated = 'UserRoleUpdated',
  UpdateUserRoleFailure = 'UpdateUserRoleFailure',
  UpdateUserRole = 'UpdatingUserRole',
  HideList = 'HideList',
  ShowList = 'ShowList',  
}

type invokeEvents = {
  type: 'done.invoke.users.core.bootUp:invocation[0]';
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
    };
