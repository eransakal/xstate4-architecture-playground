import axios from 'axios';
import { UpdateUserStatusMachineContext } from '../types';

export const updateAdminStatus = (context: UpdateUserStatusMachineContext) => {
  axios.post(
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
