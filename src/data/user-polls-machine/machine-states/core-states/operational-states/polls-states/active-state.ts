import { answerPollState } from "./active-states/answer-poll-state";
import {
  UserPollsMachineStateConfig,
} from '../../../../types';

export const activeState: UserPollsMachineStateConfig = {
  type: "parallel",
  on: {},

  states: {
    answerPoll: answerPollState
  }
};
