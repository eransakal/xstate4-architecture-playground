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
          actions: ['sendAnswer'],
          target: 'inProgress',
        },
      },
    },
    inProgress: {
      on: {
        [PollsMachineEventsTypes.PollAnswered]: [
          {
            cond: (context, event) =>
              context.externalInfo.userId === event.userId,
            actions: ['setUserVote'],
            target: 'done',
          },
          {
            actions: ['setUserVote'],
          },
        ],
      },
    },
    done: {},
  },
};
