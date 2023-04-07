import { UsersMachineState } from "../types";

export const getIsAdmin = (state: UsersMachineState) => {
    return state.context.ownUser?.isAdmin
  };
  