import axios from 'axios';
import { createPollsMachineLogger } from '../utils/logger';
import {
  PollsMachineContext,
  PollsMachineEvents,
  PollsMachineEventsTypes,
} from '../types';

const logger = createPollsMachineLogger('requestEndPoll');

/* Developer Notice:
 * Usually we prefer to use xstate service to invoke async operations which has more control
 * on the request and let you react to errors and success and even to cancel.
 * However, if you don't care about the result of the request, you can send the request
 * from an action like we did here. Again not recommended but possible.
 *
 * We prefix the action name with `request` to make it clear that this action is not
 * updating the context or the state of the machine and that it is an async operation.
 */
export const requestEndPoll = (
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
