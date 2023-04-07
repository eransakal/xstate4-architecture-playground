import axios from 'axios';
import { PollsMachineContext } from '../types';

export const getPollsSnapshot = async (context: PollsMachineContext) => {
  const result = await axios.get(
    '/polls/status',

    {
      headers: {
        'x-appInstanceId': context.__mockServerInfo__.appInstance,
      },
    }
  );

  // TODO validate payload

  if (true) {
    return result.data;
  }

  //throw new Error('server returned unexpected payload');
};
