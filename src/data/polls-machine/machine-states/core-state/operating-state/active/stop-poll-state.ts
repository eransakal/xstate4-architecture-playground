import {
  PollsMachineEventsTypes,
  PollsMachineStateConfig,
} from '../../../../types';

export const stopPollState: PollsMachineStateConfig = {
  initial: 'idle',

  states: {
    idle: {
      on: {
        [PollsMachineEventsTypes.EndPoll]: {
          target: 'inProgress',
          actions: 'endPoll',
        },
      },
    },
    inProgress: {
      after: {
        5000: {
          target: 'idle',
          actions: {
            type: 'reportFailure',
            reason: 'timeout while waiting for poll to end',
          },
        },
      },
    },
  },
};
