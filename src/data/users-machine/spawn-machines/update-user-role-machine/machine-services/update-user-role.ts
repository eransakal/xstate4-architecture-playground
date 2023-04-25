import axios from 'axios';
import { UpdateUserRoleMachineContext } from '../types';

export const updateUserRole = (context: UpdateUserRoleMachineContext) => {
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
