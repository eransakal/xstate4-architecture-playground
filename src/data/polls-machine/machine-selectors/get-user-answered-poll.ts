import { PollsMachineState } from '../types';

export const getUserAnsweredPoll = (state: PollsMachineState) => {
  return state.matches('core.operational.active.answerPoll.done');
};
