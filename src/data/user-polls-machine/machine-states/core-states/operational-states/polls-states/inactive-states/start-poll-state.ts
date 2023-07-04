import { UserPollsMachineContext, UserPollsMachineEventsTypes , UserPollsMachineStateConfig } from '../../../../../types';
import { actions } from 'xstate';
import { createUserPollsMachineLogger } from '../../../../../utils/logger';


const logger =  createUserPollsMachineLogger(
  'startPollState'
);

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
          actions: (context, event) => {
            logger.error(
              {
                message: `An error occurred while sending server request 'startPoll'.`,
                data: event
              }
            );
          },
          target: 'error',
        },
      },
    },
    error: {
      entry: [
        actions.send((context: UserPollsMachineContext) => ({
          type: UserPollsMachineEventsTypes.AddNotification,
          payload: {
            variant: 'error',
            message: `start-poll-failed`,
            reason: `An error occurred while sending server request 'startPoll'.`
          },
        })),            
      ],
      on: {
        [UserPollsMachineEventsTypes.StartPoll]: [
          {
            cond: 'canManagePolls',
            target: 'inProgress',
          },
        ],     
      },
    }
  },
};
