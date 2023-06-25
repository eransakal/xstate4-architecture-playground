import { assign } from '@xstate/immer';
import {
  UserPollsMachineContext,
  UserPollsMachineEvents,
  UserPollsMachineEventsTypes,
} from '../../types';

/*
const logger =  createUpdateExternalInfoMachineLogger(
    'UpdateExternalInfoProvider'
  );
*/
export const updateIntermediateUserAnswer = assign(
  (context: UserPollsMachineContext, event: UserPollsMachineEvents) => {
    if (event.type !== UserPollsMachineEventsTypes.UpdateUserAnswer) {
      return;
    }

    context.UserAnswerIntermediate = null;
  }
);
