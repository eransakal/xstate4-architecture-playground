import { PollsMachineState } from '../types';

export const getIsStartPollInProgress = (state: PollsMachineState) => {
  return state.matches('core.operating.inactive.startPoll.inProgress');
};
