import { assign } from '@xstate/immer';
import { createUserPollsMachineLogger } from '../../utils/logger';
import {
  UserPollsMachineContext,
  UserPollsMachineEvents,
  UserPollsMachineEventsTypes,
} from '../../types';

const logger = createUserPollsMachineLogger('updateAnswers');

export const updateAnswers = assign(
  (context: UserPollsMachineContext, event: UserPollsMachineEvents) => {
    if (event.type === UserPollsMachineEventsTypes.PollAnswered) {
      logger.log({
        message: `store user answer`
      });

      if (context.externalInfo.userId === event.userId) {
        context.userAnswer = event.answerId;
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
