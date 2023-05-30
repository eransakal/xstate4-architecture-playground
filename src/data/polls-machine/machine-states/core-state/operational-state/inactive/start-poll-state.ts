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
          target: 'inProgress',
        },
      },
    },
    inProgress: {
      invoke: {
        src: 'startAPoll',
      },
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
