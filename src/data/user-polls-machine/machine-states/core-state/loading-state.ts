import { UserPollsMachineEventsTypes, UserPollsMachineStateConfig } from '../../types';
export const loadingState: UserPollsMachineStateConfig = {
  type: 'parallel',
  onDone: [
    {      
      target: 'operational',
    }    
  ],   
  states: {    
    externalInfo: {
      initial: 'unknown',           
      
      states: {
        'unknown': {
          always: [
            {
              cond: 'onExternalInfoLoaded',
              target: 'done',
            },
            {
              target: 'loading',
            }
          ],
        },
        loading: {
          on: {
            [UserPollsMachineEventsTypes.ExternalInfoLoaded]: {          
              target: 'unknown',
            },
          },
        },
        done: {
          type: 'final',
        },
      },
    },
    loadPollData: {
      initial: 'loading',
      states: {
        loading: {
          invoke: [
            {
              id: 'loadPollsData',
              src: 'getPollsSnapshot',
              onDone: {
                actions: ['setActivePollData'],
                target: 'done',
              },
            },
          ],
        },
        done: {
          type: 'final',
        },
      },
    },
  }  
};

