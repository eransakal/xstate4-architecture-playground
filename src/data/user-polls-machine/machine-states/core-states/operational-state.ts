import { pollsState } from "./operational-states/polls-state";
import {
  UserPollsMachineEventsTypes,
  UserPollsMachineStateConfig,
} from '../../types';

export const operationalState: UserPollsMachineStateConfig = {
  type: "parallel",
  on: {
    [UserPollsMachineEventsTypes.CanManagePollsChanged]: [
      {               
        target: '#core.loading',
      },
      {
        actions: 'updateExternalInfo',
      },
    ],
  },

  states: {
    polls: pollsState
  }
};
