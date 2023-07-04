import {
  PollsMachineEventsTypes,
  PollsMachineStateConfig,
} from '../../../../types';

export const answerPollState: PollsMachineStateConfig = {
  initial: 'unknown',
  states: {
    unknown: {
      always: [
        {
          cond: 'shouldAllowUserToAnswer',
          target: 'idle',
        },
        {
          target: 'done',
        },
      ],
    },
    idle: {
      on: {
        [PollsMachineEventsTypes.AnswerPoll]: {
          target: 'inProgress',
        },
      },
    },
    inProgress: {
      invoke: {
        src: 'sendAnswer',
      },
      on: {
        [PollsMachineEventsTypes.PollAnswered]: [
          {
            cond: (context, event) =>
              context.externalInfo.userId === event.userId,
            actions: ['setUserAnswer'],
            target: 'done',
          },
          {
            actions: ['setUserAnswer'],
          },
        ],
      },
    },
    done: {},
  },
};
