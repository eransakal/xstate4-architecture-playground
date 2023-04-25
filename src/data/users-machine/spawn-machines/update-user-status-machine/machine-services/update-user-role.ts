import axios from 'axios';
import { UpdateUserStatusMachineContext } from '../types';

export const updateUserRole = (context: UpdateUserStatusMachineContext) => {
  return axios.post(
    '/users/setAdmin',
    {
      userId: context.userId,
      isAdmin: context.isAdmin,
    },
    {
      headers: {
        'x-appInstanceId': context.__mockServerInfo__.appInstance,
      },
    }
  );
};
