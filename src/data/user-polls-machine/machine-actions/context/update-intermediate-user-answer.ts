import { assign } from '@xstate/immer';
import { createUserPollsMachineLogger } from '../../utils/logger';
import {
  UserPollsMachineContext,
  UserPollsMachineEvents,
  UserPollsMachineEventsTypes,
} from '../../types';

const logger = createUserPollsMachineLogger('updateUserAnswerIntermediate');

export const updateIntermediateUserAnswer = assign(
  (context: UserPollsMachineContext, event: UserPollsMachineEvents) => {
    if (event.type === UserPollsMachineEventsTypes.UpdateUserAnswer) {
      logger.log({
        message: `update user answer intermediate value '${event.answerId}'`
      });

      context.intermediateUserAnswer = event.answerId;
      
    }
  }
);
