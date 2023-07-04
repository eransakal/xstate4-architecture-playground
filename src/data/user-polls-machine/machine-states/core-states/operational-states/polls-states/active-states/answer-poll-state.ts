import { actions } from 'xstate';
import { UserPollsMachineEventsTypes , UserPollsMachineStateConfig } from '../../../../../types';

export const answerPollState: UserPollsMachineStateConfig = {
  initial: 'idle',
  on: {
    [UserPollsMachineEventsTypes.UserVoteUpdated]: [
      {
        actions: ['updateUserVote', 'clearIntermediateUserVote'],
        target: '.idle',
      },
    ],
  },
  states: {
    idle: {
      on: {
        [UserPollsMachineEventsTypes.UpdateUserVote]: [
          {
            cond: 'canAnswerPoll',
            actions: ['updateIntermediateUserVote'],
            target: 'inProgress',
          },
        ],
      },
    },
    inProgress: {
      invoke: {
        src: 'updateUserVote',
        onDone: {
          target: 'pendingWebsocket',
        },
        onError: {
          actions: [
            actions.send((context) => ({
              type: UserPollsMachineEventsTypes.AddNotification,
              payload: {
                variant: 'error',
                message: `answer-poll-failed`,
                reason: `An error occurred while requesting an update for 'userVote' to '${context.userVote || ''}'. As a result, the intermediate value is being reverted.`
              },
            })),
            'clearIntermediateUserVote',          
          ],
          target: 'idle',
        },
      },
    },
    pendingWebsocket: {
      after: {
        5000: {
          actions: [          
            actions.send((context) => ({
              type: UserPollsMachineEventsTypes.AddNotification,
              payload: {
                variant: 'error',
                message: `answer-poll-failed`,
                reason: `The server failed to respond via the web socket when updating 'userVote' to '${context.userVote || ''}'. As a result, the intermediate value is being reverted.`
              },
            })),
            'clearIntermediateUserVote',
          ],
          target: 'idle',
        },
      },
    },
  },
};
