import { assign } from '@xstate/immer';
import {
  UserPollsMachineContext,
  UserPollsMachineEvents,
  UserPollsMachineEventsTypes,
} from '../../types';

import { createUserPollsMachineLogger } from '../../utils/logger';

const logger =  createUserPollsMachineLogger(
    'removeNotification'
  );

export const removeNotification = assign<
  UserPollsMachineContext,
  UserPollsMachineEvents
>((context, event) => {
  if (event.type === UserPollsMachineEventsTypes.RemoveNotification) {
    logger.log({
      message: 'Remove notification from context',
      data: {
        id: event,
      },
    });

    context.notifications =
      context.notifications?.filter(
        (notification) => notification.id !== event.id
      ) || [];
  }
});
