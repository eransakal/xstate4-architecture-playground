import { UserPollsMachineState } from '../types';

export const getIsStartingPollInProgress = (state: UserPollsMachineState) => {
  return state.matches('core.operational.polls.inactive.startPoll.inProgress');
};
