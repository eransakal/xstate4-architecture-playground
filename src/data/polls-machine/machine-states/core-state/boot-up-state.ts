import { PollsMachineEventsTypes, PollsMachineStateConfig } from '../../types';
export const bootUpState: PollsMachineStateConfig = {
  type: 'parallel',
  onDone: {
    target: 'operating',
  },
  states: {
    syncExternalInformation: {
      initial: 'unknown',
      invoke: [
        {
          src: 'onExternalInfoChanged',
        },
      ],
      on: {
        [PollsMachineEventsTypes.ExternalInfoUpdated]: {
          actions: 'updateExternalInfo',
          target: '.unknown',
        },
      },
      states: {
        unknown: {
          always: [
            {
              cond: 'verifyExternalInformation',
              target: 'done',
            },
            {
              target: 'inProgress',
            },
          ],
        },
        inProgress: {},
        done: {
          type: 'final',
        },
      },
    },
    loadPollData: {
      initial: 'inProgress',
      states: {
        inProgress: {
          invoke: [
            {
              src: 'getPollsSnapshot',
              onDone: {
                actions: ['setActivePollData'],
                target: 'done',
              },
            },
          ],
        },
        done: {
          type: 'final',
        },
      },
    },
  },
};
