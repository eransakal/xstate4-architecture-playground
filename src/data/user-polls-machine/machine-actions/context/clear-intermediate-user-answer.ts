import { assign } from '@xstate/immer';
import {
  UserPollsMachineContext,
  UserPollsMachineEvents,
} from '../../types';

/*
const logger =  createUpdateExternalInfoMachineLogger(
    'UpdateExternalInfoProvider'
  );
*/
export const clearIntermediateUserAnswer = assign(
  (context: UserPollsMachineContext, event: UserPollsMachineEvents) => {
    context.UserAnswerIntermediate = null;
  }
);
