import { assign } from '@xstate/immer';
import { createPollsMachineLogger } from '../../utils/logger';
import {
  PollsMachineContext,
  PollsMachineEvents,
  PollsMachineEventsTypes,
} from '../../types';

const logger = createPollsMachineLogger('setUserAnswer');

export const setUserAnswer = assign(
  (context: PollsMachineContext, event: PollsMachineEvents) => {
    if (event.type === PollsMachineEventsTypes.PollAnswered) {
      logger.log(`store user answer`);

      if (context.externalInfo.userId === event.userId) {
        context.userAnswerd = true;
      }

      context.pollAnswers =
        context.pollAnswers?.filter((result) => result.userId !== event.userId) ??
        [];

      context.pollAnswers.push({
        userId: event.userId,
        userName: event.userName,
        userAvatar: event.userAvatar,
        answerId: event.answerId,
      });
    }
  }
);
