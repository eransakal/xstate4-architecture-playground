import { UsersMachineContext } from '../types';
import { canManageUsersList } from '../context-composers/can-manage-users-list';

export const shouldHideList = (context: UsersMachineContext) => {
  return !canManageUsersList(context);
};
