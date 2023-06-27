import { UserPolls2MachineContext } from "./context";

export enum UserPolls2MachineEventsTypes {
  ExternalInfoUpdated = 'ExternalInfoUpdated',
  ExternalInfoLoaded = 'ExternalInfoLoaded'
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

export type UserPolls2MachineEvents = 
  invokeEvents 
  | {
    type: UserPolls2MachineEventsTypes.ExternalInfoLoaded;      
    loaded: boolean
  }
  | {
      type: UserPolls2MachineEventsTypes.ExternalInfoUpdated;
      externalInfo: Partial<UserPolls2MachineContext['externalInfo']>;
    }
    


