import {
  PollsMachineContext,
  PollsMachineEventsTypes,
  PollsMachineStateConfig,
} from '../../../types';
import { inactiveState } from './inactive';
import { activeState } from './active';

export const operatingState: PollsMachineStateConfig = {
  initial: 'unknown',
  invoke: [
    {
      src: 'onExternalInfoChanged',
    },
    {
      src: 'onPollStatusUpdated',
    },
  ],
  on: {
    [PollsMachineEventsTypes.ExternalInfoUpdated]: [
      {
        cond: (context, event) =>
          context.isPrivate && event.externalInfo.isAdmin === true,
        actions: ['updateExternalInfo'],
        target: '#core.bootUp',
      },
      {
        actions: 'updateExternalInfo',
      },
    ],
  },
  states: {
    unknown: {
      always: [
        {
          cond: (context: PollsMachineContext) => !context.pollType,
          target: 'inactive',
        },
        {
          target: 'active',
        },
      ],
    },
    inactive: inactiveState,
    active: activeState,
  },
};
