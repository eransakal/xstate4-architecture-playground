import { UserPolls2MachineEventsTypes, UserPolls2MachineStateConfig } from '../../types';

export const loadingState: UserPolls2MachineStateConfig = {
  type: 'parallel',
  onDone: [
    {      
      target: 'operational',
    }    
  ],   
  states: {    
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
    externalInfo: {
      initial: 'unknown',               
      states: {
        'unknown': {
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
            [UserPolls2MachineEventsTypes.ExternalInfoLoaded]: {          
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
    /*loadExampleData: {
      initial: 'loading',
      states: {
        loading: {
          invoke: [
            {
              id: 'loadPollsData',
              src: 'getPollsSnapshot',
              onDone: {
                actions: ['setActiveExampleData'],
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
            [UserPolls2MachineEventsTypes.RetryLoadExampleData]: {                        
              target: 'loading',
            },
          },
        }
      },
    },*/
  }  
};

