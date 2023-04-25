import axios from 'axios';
import { UsersMachineContext } from '../types';

export const getUsers = async (context: UsersMachineContext) => {
  const result = await axios.get('/users', {
    headers: {
      'x-appInstanceId': context.__mockServerInfo__.appInstance,
    },
  });

  if (result.data.ownUser && Array.isArray(result.data?.users)) {
    return result.data;
  }

  throw new Error('server returned unexpected payload');
};
