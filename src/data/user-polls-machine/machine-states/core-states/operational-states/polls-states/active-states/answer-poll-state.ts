import { actions } from 'xstate';
import { UserPollsMachineEventsTypes , UserPollsMachineStateConfig } from '../../../../../types';

export const answerPollState: UserPollsMachineStateConfig = {
  initial: 'idle',
  on: {
    [UserPollsMachineEventsTypes.PollAnswered]: [
      {
        cond: (context, event) => context.externalInfo.userId === event.userId,
        actions: ['updateAnswers', 'clearIntermediateUserAnswer'],
        target: '.idle',
      },
    ],
  },
  states: {
    idle: {
      on: {
        [UserPollsMachineEventsTypes.UpdateUserAnswer]: [
          {
            cond: 'canAnswerPoll',
            actions: ['updateIntermediateUserAnswer'],
            target: 'inProgress',
          },
        ],
      },
    },
    inProgress: {
      invoke: {
        src: 'sendAnswer',
        onDone: {
          target: 'pendingWebsocket',
        },
        onError: {
          actions: [
            'clearIntermediateUserAnswer',        
            actions.send((context) => ({
              type: UserPollsMachineEventsTypes.AddNotification,
              payload: {
                variant: 'error',
                message: `answer-poll-failed`,
                reason: `An error occurred while requesting an update for 'userAnswer' to '${context.userAnswer || ''}'. As a result, the intermediate value is being reverted.`
              },
            })),
              
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
                reason: `The server failed to respond via the web socket when updating 'userAnswer' to '${context.userAnswer || ''}'. As a result, the intermediate value is being reverted.`
              },
            })),
            'clearIntermediateUserAnswer',
          ],
          target: 'idle',
        },
      },
    },
  },
};
