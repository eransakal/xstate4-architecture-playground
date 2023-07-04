import { UserPollsMachineState } from '../types';

export const getPollAnswers = (state: UserPollsMachineState) => {
  return state.context.pollAnswers;
};
