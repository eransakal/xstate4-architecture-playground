import { PollsMachineState } from '../types';

export const getIsAnswerPollInProgress = (state: PollsMachineState) => {
  return state.matches('core.opertional.active.answerPoll.inProgress');
};
