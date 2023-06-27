import { pollsState } from "./operational-states/polls-state";
import {
  UserPolls2MachineStateConfig,
} from '../../types';

export const operationalState: UserPolls2MachineStateConfig = {
  on: {},
  type: 'parallel',
  states: {
    polls: pollsState
  },
};
