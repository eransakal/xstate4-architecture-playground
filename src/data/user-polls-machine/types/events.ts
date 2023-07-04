import { UserPollsMachineContext } from "./context";
import { UserPollsNotification } from "./notifications";

export enum UserPollsMachineEventsTypes {
  ExternalInfoUpdated = 'ExternalInfoUpdated',
  ExternalInfoLoaded = 'ExternalInfoLoaded',
  AddNotification = 'AddNotification',
  RemoveNotification = 'RemoveNotification',
  UpdateUserAnswer = "UpdateUserAnswer",  
  StartPoll = "StartPoll",
  RetryLoadExampleData = "RetryLoadExampleData",
  PollEnded = "PollEnded",
  PollStarted = "PollStarted",
  PollAnswered = "PollAnswered",  
  EndPoll = "EndPoll",
  CanManagePollsChanged = "CanManagePollsChanged"
}

// TODO add reference to example
 type invokeEvents = {
  type: 'done.invoke.loadPollsData';
  data: null | {
    isPrivate: boolean;
    pollType: string;
    pollCreator: number;
    answers: {
      userId: number;
      userName: string;
      userAvatar: string | null;
      answerId: string;
    }[];
  };
};

type AddNotificationsEvent = {
  type: UserPollsMachineEventsTypes.AddNotification;  
} & Omit<UserPollsNotification, 'id'>

type RemoveNotificationsEvent = {
  type: UserPollsMachineEventsTypes.RemoveNotification;
  id: string;
};

type ExternalInfoLoadedEvent = {
  type: UserPollsMachineEventsTypes.ExternalInfoLoaded;      
  loaded: boolean
};

type ExternalInfoUpdatedEvent = {
  type: UserPollsMachineEventsTypes.ExternalInfoUpdated;
  externalInfo: Partial<UserPollsMachineContext['externalInfo']>;
};

type UpdateUserAnswerEvent = {
  type: UserPollsMachineEventsTypes.UpdateUserAnswer;
  answerId: string;
};

type PollStartedEvent = {
  type: UserPollsMachineEventsTypes.PollStarted;
  isPrivate: boolean;
  pollCreator: number;
  pollType: string;
}

type PollAnsweredEvent = {
  type: UserPollsMachineEventsTypes.PollAnswered;
  userId: number;
  answerId: string;
  userName: string;
  userAvatar: string | null;
}

type StartPollEvent = {
  type: UserPollsMachineEventsTypes.StartPoll;
  pollType: string;
  isPrivate: boolean;
}

type CanManagePollsChangedEvent = {
  type: UserPollsMachineEventsTypes.CanManagePollsChanged;
  canManagePolls: boolean;
}

export type UserPollsMachineEvents = 
  | invokeEvents
  | AddNotificationsEvent 
  | RemoveNotificationsEvent
  | ExternalInfoLoadedEvent
  | ExternalInfoUpdatedEvent
  | ExternalInfoUpdatedEvent
  | UpdateUserAnswerEvent
  | PollStartedEvent
  | PollAnsweredEvent
  | StartPollEvent  
  | CanManagePollsChangedEvent
  | {     
    type: UserPollsMachineEventsTypes.RetryLoadExampleData
    | UserPollsMachineEventsTypes.PollEnded
    | UserPollsMachineEventsTypes.EndPoll      
  }
    


