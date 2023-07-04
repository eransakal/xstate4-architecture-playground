import { UserPollsMachineState } from '../types';

export const getIsStartPollInProgress = (state: UserPollsMachineState) => {
  return state.matches('core.operational.polls.inactive.startPoll.inProgress');
};
