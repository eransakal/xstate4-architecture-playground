import { pollsState } from "../operational-states/polls-state";
import {
  UserPollsMachineStateConfig,
} from '../../types';

export const operationalState: UserPollsMachineStateConfig = {
  type: 'parallel',
  states: {
    polls: pollsState
  },
};
