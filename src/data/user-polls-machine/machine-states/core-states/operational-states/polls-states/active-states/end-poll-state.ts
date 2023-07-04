import { actions } from 'xstate';
import { UserPollsMachineContext, UserPollsMachineEventsTypes , UserPollsMachineStateConfig } from '../../../../../types';

export const endPollState: UserPollsMachineStateConfig = {
  initial: 'idle',
  states: {
    idle: {    
      on: {
        [UserPollsMachineEventsTypes.EndPoll]: [
          {
            cond: 'canManagePolls',
            target: 'inProgress',
          },
        ],     
      },
    },
    inProgress: {
      invoke: {
        src: 'endPoll',
        onDone: {
          target: 'idle',
        },
        onError: {        
          target: 'error',
        },
      },
    },
    error: {
      entry: [    
        actions.send((context: UserPollsMachineContext, event) => ({
          type: UserPollsMachineEventsTypes.AddNotification,
          payload: {
            variant: 'error',
            message: `end-poll-failed`,
            reason: `An error occurred while sending server request 'endPoll'.`            
          },
        })),            
      ],
      on: {
        [UserPollsMachineEventsTypes.EndPoll]: [
          {
            cond: 'canManagePolls',
            target: 'inProgress',
          },
        ],     
      },
    }
  },
};
