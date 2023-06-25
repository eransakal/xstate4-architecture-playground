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
export const updateUserAnswer = assign(
  (context: UserPollsMachineContext, event: UserPollsMachineEvents) => {
    if (event.type !== UserPollsMachineEventsTypes.UserAnswerUpdated) {
      return;
    }

    context.userAnswer = event.answer;
  }
);
