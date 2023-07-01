import { UserPollsMachineContext } from "./context";

export enum UserPollsMachineEventsTypes {
  ExternalInfoUpdated = 'ExternalInfoUpdated',
  ExternalInfoLoaded = 'ExternalInfoLoaded',
  StartPoll = 'StartPoll',
  ShowNotification = 'ShowNotification',
}

// TODO add reference to example
type invokeEvents = {
  type: 'done.invoke.loadUserPollsData',
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

export type UserPollsMachineEvents = 
  invokeEvents 
  | {
    type: UserPollsMachineEventsTypes.ExternalInfoLoaded;      
    loaded: boolean
  }
  | {
    type: UserPollsMachineEventsTypes.StartPoll;          
  }
  | {
      type: UserPollsMachineEventsTypes.ExternalInfoUpdated;
      externalInfo: Partial<UserPollsMachineContext['externalInfo']>;
    }
    


