import { useContext, useMemo } from 'react';
import { UsersMachineEventsTypes } from './types';
import { UsersContext } from './users-provider';

export const useUsersService = () => {
  const { usersMachineService } = useContext(UsersContext);

  const actions = useMemo(() => {
    return {
      showList: () => {
        usersMachineService.send({
          type: UsersMachineEventsTypes.ShowList,
        });
      },
      hideList: () => {
        usersMachineService.send({
          type: UsersMachineEventsTypes.HideList,
        });
      },
      updateUserStatus: (userId: number, isAdmin: boolean) => {
        usersMachineService.send({
          type: UsersMachineEventsTypes.UpdateUserStatus,
          userId,
          isAdmin,
        });
      },
    };
  }, [usersMachineService]);

  return {
    usersMachineService,
    actions,
  };
};
