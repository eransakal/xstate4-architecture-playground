import { UserPollsMachineState } from '../types';

export const getCanCreatePolls = (state: UserPollsMachineState) => {
  return (
    state.context.externalInfo.isAdmin &&
    state.matches('core.operational.polls.inactive')
  );
};
