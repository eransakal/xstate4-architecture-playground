import { assign } from '@xstate/immer';
import { createUserPollsMachineLogger } from '../../utils/logger';
import {
  UserPollsMachineContext,
  UserPollsMachineEvents,
  UserPollsMachineEventsTypes,
} from '../../types';

const logger = createUserPollsMachineLogger('clearActivePollData');

export const clearActivePollData = assign(
  (context: UserPollsMachineContext, event: UserPollsMachineEvents) => {
    if (event.type === UserPollsMachineEventsTypes.PollEnded) {
      logger.log({
        message: `clear active poll data`
      });
      context.pollType = null;
      context.pollAnswers = null;
      context.userAnswer = '';
    }
  }
);
