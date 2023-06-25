import { answerPollState } from "./answer-poll-state";
import {
  UserPollsMachineEventsTypes,
  UserPollsMachineStateConfig,
} from '../../../types';

export const activeState: UserPollsMachineStateConfig = {
  
  states: {
    answerPoll: answerPollState
  },
};
