import { UserPollsMachineState } from '../types';

export const getIsAnsweringPollInProgress = (state: UserPollsMachineState) => {
  return state.matches('core.opertional.polls.active.answerPoll.inProgress');
};
