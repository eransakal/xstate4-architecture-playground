import { startPollState } from "./inactive-states/start-poll-state";
import {
  UserPollsMachineEventsTypes,
  UserPollsMachineStateConfig,
} from '../../../../types';

export const inactiveState: UserPollsMachineStateConfig = {
  type: 'parallel',
  states: {
    startPoll: startPollState
  },
};
