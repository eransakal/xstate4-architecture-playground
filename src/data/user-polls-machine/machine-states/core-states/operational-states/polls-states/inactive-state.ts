import { startPollState } from "./inactive-states/start-poll-state";
import {
  UserPollsMachineEventsTypes,
  UserPollsMachineStateConfig,
} from '../../../../types';

export const inactiveState: UserPollsMachineStateConfig = {
  type: "parallel",
  on: {
    [UserPollsMachineEventsTypes.PollStarted]: {
      actions: ['updateActivePollData'],
      target: 'active'
    }
  },
  states: {
    startPoll: startPollState
  }
};
