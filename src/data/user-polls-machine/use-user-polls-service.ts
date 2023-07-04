import { useContext, useMemo } from 'react';
import { UserPollsContext } from './utils/user-polls-context';
import { UserPollsMachineEventsTypes } from './types';

export const useUserPollsService = () => {
  const { userPollsMachineService } = useContext(UserPollsContext);

  const actions = useMemo(() => {
    return {
      removeNotification: (id: string) => {
        userPollsMachineService.send({
          type: UserPollsMachineEventsTypes.RemoveNotification,
          id,
        });
      },
    };
  }, [userPollsMachineService]);

  return {    
    actions,
  };
};
