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
      startAPoll: (pollType: string, isPrivate: boolean) => {
        userPollsMachineService.send({
          type: UserPollsMachineEventsTypes.StartPoll,
          pollType,
          isPrivate,
        });
      },
      endPoll: () => {
        userPollsMachineService.send({
          type: UserPollsMachineEventsTypes.EndPoll,
        });
      },
      answerPoll: (answerId: string) => {
        userPollsMachineService.send({
          type: UserPollsMachineEventsTypes.UpdateUserAnswer,
          answerId,
        });
      },
    };
  }, [userPollsMachineService]);

  return {    
    actions,
  };
};
