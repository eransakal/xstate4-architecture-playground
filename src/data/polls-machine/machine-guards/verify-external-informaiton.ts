import { PollsMachineContext } from '../types';

export const verifyExternalInformation = (context: PollsMachineContext) =>
  !!context.externalInfo.userId;
