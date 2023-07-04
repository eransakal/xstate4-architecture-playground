import { assign } from '@xstate/immer';
import { createUserPollsMachineLogger } from '../../utils/logger';
import {
  UserPollsMachineContext,
  UserPollsMachineEvents,
  UserPollsMachineEventsTypes,
} from '../../types';

const logger = createUserPollsMachineLogger('setUserVote');

export const updateUserVote = assign(
  (context: UserPollsMachineContext, event: UserPollsMachineEvents) => {
    if (event.type === UserPollsMachineEventsTypes.PollAnswered) {
      logger.log({
        message: `store user vote`
      });

      if (context.externalInfo.userId === event.userId) {
        context.userVote = event.answerId;
      }

      context.pollVotes =
        context.pollVotes?.filter((result) => result.userId !== event.userId) ??
        [];

      context.pollVotes.push({
        userId: event.userId,
        userName: event.userName,
        userAvatar: event.userAvatar,
        answerId: event.answerId,
      });
    }
  }
);
