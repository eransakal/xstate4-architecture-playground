import { actions } from 'xstate';
import {
  PollsMachineContext,
  PollsMachineEvents,
  PollsMachineEventsTypes,
} from '../../types';

// const logger = createPollsMachineLogger('updateExternalInfo');

export const updateExternalInfo = actions.assign(
  (context: PollsMachineContext, event: PollsMachineEvents) => {
    if (event.type !== PollsMachineEventsTypes.ExternalInfoUpdated) {
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
