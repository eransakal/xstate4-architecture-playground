import axios from 'axios';
import {
  PollsMachineContext,
  PollsMachineEvents,
  PollsMachineEventsTypes,
} from '../types';

export const startAPoll =
  (context: PollsMachineContext, event: PollsMachineEvents) => () => {
    if (event.type !== PollsMachineEventsTypes.CreateAPoll) {
      return;
    }

    return axios.put(
      '/polls/create',
      {
        pollType: event.pollType,
        isPrivate: event.isPrivate,
      },
      {
        headers: {
          'x-appInstanceId': context.__mockServerInfo__.appInstance,
        },
      }
    );
  };
