import { UsersMachineEventsTypes, UsersMachineStateConfig } from '../types';

export const listState: UsersMachineStateConfig = {
  initial: 'hidden',
  states: {
    visible: {
      always: [
        {
          cond: 'shouldHideList',
          target: 'hidden',
        },
      ],
      on: {
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
