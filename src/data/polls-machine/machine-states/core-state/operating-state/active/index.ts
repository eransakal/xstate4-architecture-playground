import {
  PollsMachineEventsTypes,
  PollsMachineStateConfig,
} from '../../../../types';
import { answerPollState } from './answer-state';
import { stopPollState } from './stop-poll-state';

export const activeState: PollsMachineStateConfig = {
  exit: ['clearActivePollData'],
  type: 'parallel',
  on: {
    [PollsMachineEventsTypes.PollEnded]: {
      target: 'inactive',
    },
    [PollsMachineEventsTypes.PollAnswered]: {
      cond: (context, event) => context.externalInfo.userId !== event.userId,
      actions: ['setUserVote'],
    },
  },
  states: {
    answerPoll: answerPollState,
    stopPoll: stopPollState,
  },
};
