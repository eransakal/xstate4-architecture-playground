import { PollsMachineContext } from '../types';

export const shouldAllowUserToAnswer = (context: PollsMachineContext) =>
  context.externalInfo.userId !== context.pollCreator &&
  !!context.pollType &&
  !context.userVoted;
