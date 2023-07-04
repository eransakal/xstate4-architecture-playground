import { assign } from '@xstate/immer';
import {
  UserPollsMachineContext,
  UserPollsMachineEvents,
  UserPollsMachineEventsTypes,
} from '../../types';

import { createUserPollsMachineLogger } from '../../utils/logger';

const logger =  createUserPollsMachineLogger(
    'addNotification'
  );

// Note: you can replace it with the 'nano' library if you have a dependency on it
let notificationCounter = 1;

export const addNotification = assign<
  UserPollsMachineContext,
  UserPollsMachineEvents
>((context, event) => {
  if (event.type === UserPollsMachineEventsTypes.AddNotification) {
    const { type, ...rest} = event;
    const notification = {
      ...rest,
      id: `$userPolls-${notificationCounter}`,
    };
    notificationCounter++;

    logger.log({
      message: 'Add notification to context',
      data: {
        notification,
      },
    });

    context.notifications = [...context.notifications, notification];
  }
});
