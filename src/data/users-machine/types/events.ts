import { User } from './context';

export enum UsersMachineEventsTypes {
  UserStatusUpdated = 'UserStatusUpdated',
  UpdateUserStatusFailure = 'UpdateUserStatusFailure',
  UpdateUserStatus = 'UpdatingUserStatus',
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

export type UpdateUserStatusFailureEvent = {
  type: UsersMachineEventsTypes.UpdateUserStatusFailure;
  userId: number;
};

export type UsersMachineEvents =
  | invokeEvents
  | {
      type: UsersMachineEventsTypes.UserStatusUpdated;
      userId: number;
      isAdmin: boolean;
    }
  | {
      type: UsersMachineEventsTypes.UpdateUserStatus;
      userId: number;
      isAdmin: boolean;
    }
  | {
      type: UsersMachineEventsTypes.HideList;
    }
  | UpdateUserStatusFailureEvent
  | {
      type: UsersMachineEventsTypes.ShowList;
    };
