import { UsersMachineState } from '../types';

export const getShouldShowList = (state: UsersMachineState) => {
  return state.matches('list.visible');
};
