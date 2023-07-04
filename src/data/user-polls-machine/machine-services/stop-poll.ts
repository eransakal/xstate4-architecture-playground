import axios from 'axios';
import {
  UserPollsMachineContext,
  UserPollsMachineEvents,
  UserPollsMachineEventsTypes,
} from '../types';

export const stopPoll =
  (context: UserPollsMachineContext, event: UserPollsMachineEvents) => () => {    
    return axios.put(
      '/polls/end',
      {},
      {
        headers: {
          'x-appInstanceId': context.__mockServerInfo__.appInstance,
        },
      }
    );
  };
