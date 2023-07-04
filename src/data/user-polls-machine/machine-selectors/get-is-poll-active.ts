import { UserPollsMachineState } from '../types';

export const getIsPollActive = (state: UserPollsMachineState) => {
  return state.matches('core.operational.polls.active');
};
