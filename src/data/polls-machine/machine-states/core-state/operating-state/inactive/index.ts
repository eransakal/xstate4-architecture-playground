import {
  PollsMachineEventsTypes,
  PollsMachineStateConfig,
} from '../../../../types';
import { startPollState } from './start-poll-state';

export const inactiveState: PollsMachineStateConfig = {
  on: {
    [PollsMachineEventsTypes.PollStarted]: {
      id: 'loadPollsData',
      actions: ['setActivePollData'],
      target: 'active',
    },
  },
  type: 'parallel',
  states: {
    startPoll: startPollState,
  },
};
