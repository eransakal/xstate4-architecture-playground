import { UserPollsMachineState } from '../types';

export const getIsStopPollInProgress = (state: UserPollsMachineState) => {
  return state.matches('core.operational.polls.active.stopPoll.inProgress');
};
