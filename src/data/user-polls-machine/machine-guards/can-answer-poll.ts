import { UserPollsMachineContext } from '../types';

export const canAnswerPoll = (context: UserPollsMachineContext) => {
  return !context.userVote && !context.intermediateUserVote;
};
