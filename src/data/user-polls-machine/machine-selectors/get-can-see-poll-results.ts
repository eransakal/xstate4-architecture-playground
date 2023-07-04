import { UserPollsMachineState } from '../types';

export const getCanSeePollAnswers = (state: UserPollsMachineState) => {
  return (
    state.matches('core.operational.polls.active') &&
    (state.context.externalInfo.isAdmin || !state.context.isPrivate)
  );
};
