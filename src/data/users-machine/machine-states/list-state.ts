import { UsersMachineEventsTypes, UsersMachineStateConfig } from '../types';

export const listState: UsersMachineStateConfig = {
  initial: 'hidden',
  states: {
    visible: {
      on: {
        [UsersMachineEventsTypes.UserRoleUpdated]: {
          cond: (context, event) =>
            context.ownUser?.id === event.userId && !event.isAdmin,
          target: 'hidden',
        },
        [UsersMachineEventsTypes.HideList]: {
          target: 'hidden',
        },
      },
    },
    hidden: {
      on: {
        [UsersMachineEventsTypes.ShowList]: {
          cond: (context) => !!context.ownUser?.isAdmin,
          target: 'visible',
        },
      },
    },
  },
};
