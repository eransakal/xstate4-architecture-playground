import { endPollState } from "./active-states/end-poll-state";
import { answerPollState } from "./active-states/answer-poll-state";
import {
  UserPollsMachineEventsTypes,
  UserPollsMachineStateConfig,
} from '../../../../types';

export const activeState: UserPollsMachineStateConfig = {
  type: "parallel",
  exit: ['clearActivePollData'],
  on: {
    [UserPollsMachineEventsTypes.PollEnded]: {      
      target: 'inactive'
  },  
    [UserPollsMachineEventsTypes.PollAnswered]: [
      {
        cond: (context, event) => context.externalInfo.userId !== event.userId,
        actions: ['updateAnswers'],        
      },
    ],
  },
  states: {
    answerPoll: answerPollState,
    endPoll: endPollState
  }
};
