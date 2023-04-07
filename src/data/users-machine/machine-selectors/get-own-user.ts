import { UsersMachineState } from "../types";

export const getOwnUser = (state: UsersMachineState) => {
    return state.context.ownUser
  };
  