import { PollsMachineState } from '../types';

export const getCanSeePollVotes = (state: PollsMachineState) => {
  return (
    state.matches('core.operational.active') &&
    (state.context.externalInfo.isAdmin || !state.context.isPrivate)
  );
};
