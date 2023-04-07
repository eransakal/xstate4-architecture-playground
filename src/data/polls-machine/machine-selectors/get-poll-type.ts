import { PollsMachineState } from '../types';

export const getPollType = (state: PollsMachineState) => {
  return state.context.pollType;
};
