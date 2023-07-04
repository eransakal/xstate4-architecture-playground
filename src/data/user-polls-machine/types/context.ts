import { UserPollsNotification } from "./notifications"


export interface UserPollsMachineContext {
  __mockServerInfo__: {
    appInstance: string;
  };
  externalInfo: {
    isAdmin: boolean;
    userId: number | null;
  };
  isPrivate: boolean;
  pollCreator: number | null;
  pollType: null | string;
  userAnswer: string;
  intermediateUserAnswer: string | null;
  pollAnswers:
    | {
        userId: number;
        userName: string;
        userAvatar: string | null;
        answerId: string;
      }[]
    | null;
   notifications: UserPollsNotification[]
}

export const createDefaultUserPollsMachineContext = (appInstance: string): UserPollsMachineContext =>  ({    
  __mockServerInfo__: {
    appInstance,
  },
  externalInfo: {
    isAdmin: false,
    userId: null,
  },
  isPrivate: false,
  pollCreator: null,
  pollType: null,
  userAnswer: '',
  intermediateUserAnswer: null,
  pollAnswers: null,
  notifications: []
})