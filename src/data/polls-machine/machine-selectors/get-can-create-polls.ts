import { PollsMachineState } from '../types';

export const getCanCreatePolls = (state: PollsMachineState) => {
  return (
    state.context.externalInfo.isAdmin &&
    state.matches('core.operating.inactive')
  );
};
