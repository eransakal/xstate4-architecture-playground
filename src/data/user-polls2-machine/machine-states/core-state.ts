import { loadingState } from './core-states/loading-state';
import {
  UserPolls2MachineStateConfig,
} from '../types';
import { operationalState } from './core-states/operational-state';

export const coreState: UserPolls2MachineStateConfig = {
  initial: 'loading',
  states: {
    loading: loadingState,
    operational: operationalState
  }  
};
