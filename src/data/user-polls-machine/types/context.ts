

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
      userVoted: boolean;
      UserVotedIntermediate: boolean | null;
      pollVotes:
        | {
            userId: number;
            userName: string;
            userAvatar: string | null;
            answerId: string;
          }[]
        | null;
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
      userVoted: false,
      UserVotedIntermediate: null,
      pollVotes: null,
})
