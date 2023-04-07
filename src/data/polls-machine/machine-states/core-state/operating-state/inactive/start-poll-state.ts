import {
  PollsMachineEventsTypes,
  PollsMachineStateConfig,
} from '../../../../types';

export const startPollState: PollsMachineStateConfig = {
  initial: 'idle',
  states: {
    idle: {
      on: {
        [PollsMachineEventsTypes.CreateAPoll]: {
          actions: 'startAPoll',
          target: 'inProgress',
        },
      },
    },
    inProgress: {
      after: {
        5000: {
          target: 'idle',
          actions: {
            type: 'reportFailure',
            reason: 'timeout while waiting for poll to start',
          },
        },
      },
    },
  },
};
