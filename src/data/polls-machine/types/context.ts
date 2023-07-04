export interface PollsMachineContext {
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
  userAnswerd: boolean | null;
  pollAnswers:
    | {
        userId: number;
        userName: string;
        userAvatar: string | null;
        answerId: string;
      }[]
    | null;
}
