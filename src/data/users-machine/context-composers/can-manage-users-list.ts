import { UsersMachineContext, UsersMachineEvents } from '../types';

export const canManageUsersList = (context: UsersMachineContext) => {
  return context.ownUser?.isAdmin ?? false;
};
