import { UserPollsMachineState } from '../types';

export const getPollType = (state: UserPollsMachineState) => {
  return state.context.pollType;
};
