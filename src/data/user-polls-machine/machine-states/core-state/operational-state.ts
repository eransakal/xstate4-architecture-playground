import { pollsState } from "./polls-state";
import {
  UserPollsMachineStateConfig,
} from '../../types';

export const operationalState: UserPollsMachineStateConfig = {
  type: 'parallel',
  states: {
    polls: pollsState
  },
};
