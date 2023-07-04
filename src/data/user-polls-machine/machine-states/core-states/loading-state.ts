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
        unknown: {
          always: [
            {
              cond: 'isExternalInfoLoaded',
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
              cond: 'isExternalInfoLoaded',
              target: 'done',
            },
          },
        },
        done: {
          type: 'final',
        },
      },
    },
    loadExampleData: {
      initial: 'loading',
      states: {
        loading: {
          invoke: [
            {
              id: 'loadPollsData',
              src: 'getPollsSnapshot',
              onDone: {
                actions: ['updateActivePollData'],
                target: 'done',
              },
              onError: {
                target: 'error'
              }
            },
          ],
        },
        done: {
          type: 'final',
        },
        error: {
           on: {
            [UserPollsMachineEventsTypes.RetryLoadExampleData]: {                        
              target: 'loading',
            },
          },
        }
      },
    },
  }  
};

