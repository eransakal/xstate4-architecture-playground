import { UserPollsMachineState } from '../types';

export const getIsAnswerPollInProgress = (state: UserPollsMachineState) => {
  return state.matches('core.opertional.polls.active.answerPoll.inProgress');
};
