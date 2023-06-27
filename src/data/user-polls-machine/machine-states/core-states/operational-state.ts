import { pollsState } from "./operational-states/polls-state";
import {
  UserPollsMachineStateConfig,
} from '../../types';

export const operationalState: UserPollsMachineStateConfig = {
  on: {},
  type: 'parallel',
  states: {
    polls: pollsState
  },
};
