import { PollsMachineEventsTypes, PollsMachineStateConfig } from '../../types';
export const bootUpState: PollsMachineStateConfig = {
  type: 'parallel',
  onDone: {
    target: 'operational',
  },
  states: {
    syncExternalInformation: {
      initial: 'unknown',
      invoke: [
        {
          src: 'onExternalInfoChanged',
          data: {
            emitLastValue: true,
          },
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
              id: 'loadPollsData',
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
