import axios from 'axios';
import { createPollsMachineLogger } from '../logger';
import {
  PollsMachineContext,
  PollsMachineEvents,
  PollsMachineEventsTypes,
} from '../types';

const logger = createPollsMachineLogger('endPoll');

export const endPoll = (
  context: PollsMachineContext,
  event: PollsMachineEvents
) => {
  if (event.type === PollsMachineEventsTypes.EndPoll) {
    logger.log('send request to end poll');
    axios.post(
      '/polls/end',
      {},
      {
        headers: {
          'x-appInstanceId': context.__mockServerInfo__.appInstance,
        },
      }
    );
  }
};
