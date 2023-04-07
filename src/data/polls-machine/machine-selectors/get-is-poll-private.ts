import { PollsMachineState } from '../types';

export const getIsPollPrivate = (state: PollsMachineState) => {
  return state.context.isPrivate;
};
