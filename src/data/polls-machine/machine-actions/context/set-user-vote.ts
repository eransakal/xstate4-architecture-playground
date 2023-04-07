import { assign } from '@xstate/immer';
import { createPollsMachineLogger } from '../../logger';
import {
  PollsMachineContext,
  PollsMachineEvents,
  PollsMachineEventsTypes,
} from '../../types';

const logger = createPollsMachineLogger('setUserVote');

export const setUserVote = assign(
  (context: PollsMachineContext, event: PollsMachineEvents) => {
    if (event.type === PollsMachineEventsTypes.PollAnswered) {
      logger.log(`store user vote`);

      if (context.externalInfo.userId === event.userId) {
        context.userVoted = true;
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
