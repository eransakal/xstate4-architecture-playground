import { UsersMachineContext } from '../types';

export const canManageUsersList = (context: UsersMachineContext) => {
  return context.ownUser?.isAdmin ?? false;
};
