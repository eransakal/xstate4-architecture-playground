import { UserPollsMachineContext } from '../types';

export const isExternalInfoLoaded = (context: UserPollsMachineContext) => {
  return !!context.externalInfo.userId;
};
