import { PollsMachineState } from '../types';

export const getPollVotes = (state: PollsMachineState) => {
  return state.context.pollVotes;
};
