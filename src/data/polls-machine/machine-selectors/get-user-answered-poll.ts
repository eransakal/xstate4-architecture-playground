import { PollsMachineState } from '../types';

export const getUserAnsweredPoll = (state: PollsMachineState) => {
  return state.matches('core.operating.active.answerPoll.done');
};
