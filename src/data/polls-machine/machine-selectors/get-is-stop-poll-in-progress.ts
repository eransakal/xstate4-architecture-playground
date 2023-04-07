import { PollsMachineState } from '../types';

export const getIsStopPollInProgress = (state: PollsMachineState) => {
  return state.matches('core.operating.active.stopPoll.inProgress');
};
