import { UsersMachineState } from '../types';

export const getUsers = (state: UsersMachineState) => {
  return state.context.users;
};
