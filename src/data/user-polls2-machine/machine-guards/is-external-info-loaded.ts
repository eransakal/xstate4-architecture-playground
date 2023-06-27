import { UserPolls2MachineContext } from '../types';

export const isExternalInfoLoaded = (context: UserPolls2MachineContext) => {
  return !!context.externalInfo.userId;
};
