import { assign } from '@xstate/immer';
import { createUserPollsMachineLogger } from '../../utils/logger';
import {
  UserPollsMachineContext,
  UserPollsMachineEvents,
  UserPollsMachineEventsTypes,
} from '../../types';

const logger = createUserPollsMachineLogger('setActivePollData');

export const updateActivePollData = assign(
  (context: UserPollsMachineContext, event: UserPollsMachineEvents) => {
    if (event.type === UserPollsMachineEventsTypes.PollStarted) {
      logger.log({
        message: `update active poll data`
      });
      context.pollType = event.pollType;
      context.pollCreator = event.pollCreator;
      context.isPrivate = event.isPrivate;
    } else if (event.type === `done.invoke.loadUserPollsData`) {
      if (event.data?.pollType) {
        logger.log(
          {
            message: `has active poll in progress (poll type '${event.data.pollType}')`
          }
        );
        context.isPrivate = event.data.isPrivate;
        context.pollType = event.data.pollType;
        context.pollCreator = event.data.pollCreator;
        context.userAnswer =
          event.data.answers.find((answer) => {
            return answer.userId === context.externalInfo.userId;
          })?.answerId || '';
        context.pollAnswers = event.data.answers;
      } else {
        logger.log({
          message: `has no active poll in progress`
        });
        context.pollType = null;

        context.pollAnswers = [];
      }
    }
  }
);
