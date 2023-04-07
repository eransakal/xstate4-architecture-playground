import { assign } from '@xstate/immer';
import { createPollsMachineLogger } from '../../logger';
import {
  PollsMachineContext,
  PollsMachineEvents,
  PollsMachineEventsTypes,
} from '../../types';

const logger = createPollsMachineLogger('clearActivePollData');

export const clearActivePollData = assign(
  (context: PollsMachineContext, event: PollsMachineEvents) => {
    if (event.type === PollsMachineEventsTypes.PollEnded) {
      logger.log(`clear active poll data`);
      context.pollType = null;
      context.pollVotes = null;
      context.userVoted = false;
    }
  }
);
