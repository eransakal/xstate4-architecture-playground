import { useContext, useMemo } from 'react';
import { UserPolls2Context } from './utils/user-polls2-context';

export const useUserPolls2Service = () => {
  const { userPolls2MachineService } = useContext(UserPolls2Context);

  const actions = useMemo(() => {
    return {};
  }, [userPolls2MachineService]);

  return {    
    actions,
  };
};
