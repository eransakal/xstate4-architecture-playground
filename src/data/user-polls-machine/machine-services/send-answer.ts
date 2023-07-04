import axios from 'axios';
import {
  UserPollsMachineContext,
  UserPollsMachineEvents,
  UserPollsMachineEventsTypes,
} from '../types';

export const sendAnswer =
  (context: UserPollsMachineContext, event: UserPollsMachineEvents) => () => {
    if (context.intermediateUserVote) {
      return Promise.reject();
    }

    return axios.put(
      '/polls/answer',
      {
        userId: context.externalInfo.userId,
        answerId: context.intermediateUserVote,
      },
      {
        headers: {
          'x-appInstanceId': context.__mockServerInfo__.appInstance,
        },
      }
    );
  };
