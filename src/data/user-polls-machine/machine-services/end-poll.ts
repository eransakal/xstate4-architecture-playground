import axios from 'axios';
import {
  UserPollsMachineContext,
  UserPollsMachineEvents,
} from '../types';

export const endPoll =
  (context: UserPollsMachineContext, event: UserPollsMachineEvents) => () => {    
    return axios.post(
      '/polls/end',
      {},
      {
        headers: {
          'x-appInstanceId': context.__mockServerInfo__.appInstance,
        },
      }
    );
  };
