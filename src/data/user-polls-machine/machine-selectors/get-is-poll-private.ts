import { UserPollsMachineState } from '../types';

export const getIsPollPrivate = (state: UserPollsMachineState) => {
  return state.context.isPrivate;
};
