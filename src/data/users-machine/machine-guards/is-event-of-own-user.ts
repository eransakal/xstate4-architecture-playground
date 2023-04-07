import { UsersMachineContext, UsersMachineEvents } from '../types';

export const isEventOfOwnUser = (
  context: UsersMachineContext,
  event: UsersMachineEvents
) => {
  return 'userId' in event && context.ownUser?.id === event.userId;
};
