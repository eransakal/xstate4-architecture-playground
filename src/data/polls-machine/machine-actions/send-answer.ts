import axios from 'axios';
import {
  PollsMachineContext,
  PollsMachineEvents,
  PollsMachineEventsTypes,
} from '../types';

export const sendAnswer = (
  context: PollsMachineContext,
  event: PollsMachineEvents
) => {
  if (event.type !== PollsMachineEventsTypes.AnswerPoll) {
    return;
  }

  axios.put(
    '/polls/answer',
    {
      userId: context.externalInfo.userId,
      answerId: event.answerId,
    },
    {
      headers: {
        'x-appInstanceId': context.__mockServerInfo__.appInstance,
      },
    }
  );
};
