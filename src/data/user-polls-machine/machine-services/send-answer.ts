import axios from 'axios';
import {
  UserPollsMachineContext,
  UserPollsMachineEvents,
} from '../types';

export const sendAnswer =
  (context: UserPollsMachineContext, event: UserPollsMachineEvents) => () => {
    if (!context.intermediateUserAnswer) {
      return Promise.reject();
    }

    return axios.put(
      '/polls/answer',
      {
        userId: context.externalInfo.userId,
        answerId: context.intermediateUserAnswer,
      },
      {
        headers: {
          'x-appInstanceId': context.__mockServerInfo__.appInstance,
        },
      }
    );
  };
