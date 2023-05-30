import { PollsMachineState } from '../types';

export const getIsStopPollInProgress = (state: PollsMachineState) => {
  return state.matches('core.operational.active.stopPoll.inProgress');
};
