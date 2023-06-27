import { inactiveState } from './polls-states/inactive-state';
import {
  UserPollsMachineStateConfig,
} from '../../../types';
import { activeState } from './polls-states/active-state';

export const pollsState: UserPollsMachineStateConfig = {
  initial: 'unknown',
  states: {
    unknown: {
      always: [
        {
          cond: (context) => !!context.pollType,
          target: 'active',
        },
        {
          target: 'inactive',
        },
      ],
    },
    active: activeState,
    inactive: inactiveState
  }  
};
