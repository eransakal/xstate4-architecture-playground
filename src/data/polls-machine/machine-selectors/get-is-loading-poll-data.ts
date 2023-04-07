import { PollsMachineState } from '../types';

export const getIsLoadingPollData = (state: PollsMachineState) => {
  return state.matches('core.bootUp');
};
