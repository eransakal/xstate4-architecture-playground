import { UserPollsMachineContext } from "./context";
import { UserPollsNotification } from "./notifications";

export enum UserPollsMachineEventsTypes {
  ExternalInfoUpdated = 'ExternalInfoUpdated',
  ExternalInfoLoaded = 'ExternalInfoLoaded',
  AddNotification = 'AddNotification',
  RemoveNotification = 'RemoveNotification',
  UpdateUserVote = "UpdateUserVote",
  UserVoteUpdated = "UserVoteUpdated",
  StartPoll = "StartPoll",
  RetryLoadExampleData = "RetryLoadExampleData",
  PollEnded = "PollEnded",
  PollStarted = "PollStarted",
  PollAnswered = "PollAnswered",
}

// TODO add reference to example
 type invokeEvents = {
  type: 'done.invoke.loadUserPollsData';
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

type UpdateUserVoteEvent = {
  type: UserPollsMachineEventsTypes.UpdateUserVote;
  userVote: string;
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

export type UserPollsMachineEvents = 
  | invokeEvents
  | AddNotificationsEvent 
  | RemoveNotificationsEvent
  | ExternalInfoLoadedEvent
  | ExternalInfoUpdatedEvent
  | ExternalInfoUpdatedEvent
  | UpdateUserVoteEvent
  | PollStartedEvent
  | PollAnsweredEvent
  | StartPollEvent
  | { 
    type: UserPollsMachineEventsTypes.UserVoteUpdated  
    | UserPollsMachineEventsTypes.RetryLoadExampleData
    | UserPollsMachineEventsTypes.PollEnded
  }
    


