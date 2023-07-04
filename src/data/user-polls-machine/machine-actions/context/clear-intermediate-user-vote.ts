import { assign } from '@xstate/immer';
import { createUserPollsMachineLogger } from '../../utils/logger';
import {
  UserPollsMachineContext,
  UserPollsMachineEvents,
  UserPollsMachineEventsTypes,
} from '../../types';

const logger = createUserPollsMachineLogger('setUserVote');

export const clearIntermediateUserVote = assign(
  (context: UserPollsMachineContext, event: UserPollsMachineEvents) => {
    
      logger.log({
        message: `clear intermediate user vote`
      });

      context.intermediateUserVote = '';
    
  }
);
