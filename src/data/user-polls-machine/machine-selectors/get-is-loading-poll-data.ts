import { UserPollsMachineState } from '../types';

export const getIsLoadingPollData = (state: UserPollsMachineState) => {
  return state.matches('core.loading');
};
