import { answerPollState } from "./active-states/answer-poll-state";
import {
  UserPollsMachineEventsTypes,
  UserPollsMachineStateConfig,
} from '../../../../types';

export const activeState: UserPollsMachineStateConfig = {
  type: "parallel",
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
    answerPoll: answerPollState
  }
};
