import { UserPollsMachineContext, UserPollsMachineEventsTypes , UserPollsMachineStateConfig } from '../../../../../types';
import { actions } from 'xstate';

export const startPollState: UserPollsMachineStateConfig = {
  initial: 'idle',
  states: {
    idle: {    
      on: {
        [UserPollsMachineEventsTypes.StartPoll]: [
          {
            cond: 'canManagePolls',        
            target: 'inProgress',
          },
        ],     
      },
    },
    inProgress: {
      invoke: {
        src: 'startPoll',
        onDone: {
          target: 'idle',
        },
        onError: {        
          target: 'error',
        },
      },
    },
    error: {
      on: {
        [UserPollsMachineEventsTypes.StartPoll]: [
          {
            cond: 'canManagePolls',        
            target: 'inProgress',
          },
        ],     
      },
      entry: [
        actions.send((context: UserPollsMachineContext) => ({
          type: UserPollsMachineEventsTypes.ShowNotification,
          payload: {
            variant: 'error',
            message: `pollReverted`,
            reason: `An error occurred while requesting an update for 'poll' to '${context.pollType || ''}'.`
          },
        })),            
      ],
    }
  },
};
