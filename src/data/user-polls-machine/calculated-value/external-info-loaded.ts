import { UserPollsMachineContext } from "../types";


export const externalInfoLoaded = (context: UserPollsMachineContext) => {
    return typeof context.externalInfo.userId === 'number'
  };
  