import {
  PollsMachineEventsTypes,
  PollsMachineStateConfig,
} from '../../../../types';
import { startPollState } from './start-poll-state';

export const inactiveState: PollsMachineStateConfig = {
  on: {
    [PollsMachineEventsTypes.PollStarted]: {
      actions: ['setActivePollData'],
      target: 'active',
    },
  },
  type: 'parallel',
  states: {
    startPoll: startPollState,
  },
};
