import { canManageUsersList } from "../calculated-values/can-manage-users-list";
import { UsersMachineState } from "../types";

export const getCanManageUsersList = (state: UsersMachineState) => {
    return canManageUsersList(state.context);
  };
  