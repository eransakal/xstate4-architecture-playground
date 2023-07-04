import { UserPollsMachineState } from '../types';

export const getIsEndingPollInProgress = (state: UserPollsMachineState) => {
  return state.matches('core.operational.polls.active.endPoll.inProgress');
};
