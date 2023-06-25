import { useContext, useMemo } from 'react';
import { UserPollsContext } from './utils/user-polls-context';

export const useUserPollsService = () => {
  const { userPollsMachineService } = useContext(UserPollsContext);

  const actions = useMemo(() => {
    return {};
  }, [userPollsMachineService]);

  return {    
    actions,
  };
};
