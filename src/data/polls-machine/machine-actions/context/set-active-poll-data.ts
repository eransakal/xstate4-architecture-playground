import { assign } from '@xstate/immer';
import { createPollsMachineLogger } from '../../utils/logger';
import {
  PollsMachineContext,
  PollsMachineEvents,
  PollsMachineEventsTypes,
} from '../../types';

const logger = createPollsMachineLogger('setActivePollData');

export const setActivePollData = assign(
  (context: PollsMachineContext, event: PollsMachineEvents) => {
    if (event.type === PollsMachineEventsTypes.PollStarted) {
      logger.log(`set active poll data`);
      context.pollType = event.pollType;
      context.pollCreator = event.pollCreator;
      context.isPrivate = event.isPrivate;
    } else if (event.type === `done.invoke.loadPollsData`) {
      if (event.data?.pollType) {
        logger.log(
          `has active poll in progress (poll type '${event.data.pollType}')`
        );
        context.isPrivate = event.data.isPrivate;
        context.pollType = event.data.pollType;
        context.pollCreator = event.data.pollCreator;
        context.userAnswerd =
          !!event.data.answers.find((answer) => {
            return answer.userId === context.externalInfo.userId;
          })?.answerId ?? null;
        context.pollAnswers = event.data.answers;
      } else {
        logger.log(`has no active poll in progress`);
        context.pollType = null;
        context.userAnswerd = null;
        context.pollAnswers = [];
      }
    }
  }
);
