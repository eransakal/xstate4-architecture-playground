import { actions } from 'xstate';
import {
  UserPollsMachineContext,
  UserPollsMachineEvents,
  UserPollsMachineEventsTypes,
} from '../../types';

export const updateExternalInfo = actions.assign(
  (context: UserPollsMachineContext, event: UserPollsMachineEvents) => {
    if (event.type !== UserPollsMachineEventsTypes.ExternalInfoUpdated) {
      return context;
    }

    return {
      ...context,
      externalInfo: {
        ...context.externalInfo,
        ...event.externalInfo,
      },
    };
  }
);
