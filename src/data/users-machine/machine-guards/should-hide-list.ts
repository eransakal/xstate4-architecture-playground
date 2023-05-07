import { UsersMachineContext } from '../types';
import { canManageUsersList } from '../calculated-values/can-manage-users-list';

export const shouldHideList = (context: UsersMachineContext) => {
  return !canManageUsersList(context);
};
