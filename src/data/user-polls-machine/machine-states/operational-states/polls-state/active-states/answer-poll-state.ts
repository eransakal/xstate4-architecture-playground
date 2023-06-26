import { UserPollsMachineEventsTypes , UserPollsMachineStateConfig } from '../../../../types';

export const answerPollState: UserPollsMachineStateConfig = {
  initial: 'idle',
  on: {
    [UserPollsMachineEventsTypes.UserAnswerUpdated]: [
      {
        actions: ['updateUserAnswer', 'clearIntermediateUserAnswer'],
        target: '.idle',
      },
    ],
  },
  states: {
    idle: {
      on: {
        [UserPollsMachineEventsTypes.UpdateUserAnswer]: [
          {        
            actions: ['updateIntermediateUserAnswer'],
            target: 'inProgress',
          },
        ],
      },
    },
    inProgress: {
      invoke: {
        src: 'updateUserAnswer',
        onDone: {
          target: 'pendingWebsocket',
        },
        onError: {
          actions: [
            'clearIntermediateUserAnswer',          
          ],
          target: 'idle',
        },
      },
    },
    pendingWebsocket: {
      after: {
        5000: {
          actions: [          
            'clearIntermediateUserAnswer',
          ],
          target: 'idle',
        },
      },
    },
  },
};
