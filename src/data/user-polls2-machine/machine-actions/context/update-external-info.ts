import { actions } from 'xstate';
import {
  UserPolls2MachineContext,
  UserPolls2MachineEvents,
  UserPolls2MachineEventsTypes,
} from '../../types';

export const updateExternalInfo = actions.assign(
  (context: UserPolls2MachineContext, event: UserPolls2MachineEvents) => {
    if (event.type !== UserPolls2MachineEventsTypes.ExternalInfoUpdated) {
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
