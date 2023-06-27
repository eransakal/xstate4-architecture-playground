import { inactiveState } from './polls-states/inactive-state';
import {
  UserPolls2MachineStateConfig,
} from '../../../types';
import { activeState } from './polls-states/active-state';

export const pollsState: UserPolls2MachineStateConfig = {
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
