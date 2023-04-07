import { PollsMachineState } from '../types';

export const getIsPollActive = (state: PollsMachineState) => {
  return state.matches('core.operating.active');
};
