import axios from 'axios';
import {
  UserPollsMachineContext,
  UserPollsMachineEvents,
  UserPollsMachineEventsTypes,
} from '../types';

export const startAPoll =
  (context: UserPollsMachineContext, event: UserPollsMachineEvents) => () => {
    if (event.type !== UserPollsMachineEventsTypes.StartPoll) {
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
