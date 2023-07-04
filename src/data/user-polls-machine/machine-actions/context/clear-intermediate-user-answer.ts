import { assign } from '@xstate/immer';
import { createUserPollsMachineLogger } from '../../utils/logger';
import {
  UserPollsMachineContext,
  UserPollsMachineEvents,
} from '../../types';

const logger = createUserPollsMachineLogger('setUserAnswer');

export const clearIntermediateUserAnswer = assign(
  (context: UserPollsMachineContext, event: UserPollsMachineEvents) => {
    
      logger.log({
        message: `clear intermediate user answer`
      });

      context.intermediateUserAnswer = '';
    
  }
);
