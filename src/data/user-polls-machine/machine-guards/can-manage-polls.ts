import { UserPollsMachineContext } from '../types';

export const canManagePolls = (context: UserPollsMachineContext) => {
  return context.externalInfo.isAdmin;
};
