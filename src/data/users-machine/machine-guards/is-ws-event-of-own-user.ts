import { UsersMachineContext, UsersMachineEvents } from '../types';

export const isWSEventOfOwnUser = (
  context: UsersMachineContext,
  event: UsersMachineEvents
) => {
  return 'userId' in event && context.ownUser?.id === event.userId;
};
