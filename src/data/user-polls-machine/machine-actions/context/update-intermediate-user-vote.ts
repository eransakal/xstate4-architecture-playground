import { assign } from '@xstate/immer';
import { createUserPollsMachineLogger } from '../../utils/logger';
import {
  UserPollsMachineContext,
  UserPollsMachineEvents,
  UserPollsMachineEventsTypes,
} from '../../types';

const logger = createUserPollsMachineLogger('updateUserVoteIntermediate');

export const updateIntermediateUserVote = assign(
  (context: UserPollsMachineContext, event: UserPollsMachineEvents) => {
    if (event.type === UserPollsMachineEventsTypes.UpdateUserVote) {
      logger.log({
        message: `update user vote intermediate value '${event.userVote}'`
      });

      context.intermediateUserVote = event.userVote;
      
    }
  }
);
