import { UserPollsMachineState } from '../types';

export const getUserAnsweredPoll = (state: UserPollsMachineState) => {
  return !!(state.context.userAnswer || state.context.intermediateUserAnswer);
};
