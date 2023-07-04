import { loadingState } from './core-states/loading-state';
import {
  UserPollsMachineStateConfig,
} from '../types';
import { operationalState } from './core-states/operational-state';

export const coreState: UserPollsMachineStateConfig = {
  initial: 'loading',
  id: 'core',
  states: {
    loading: loadingState,
    operational: operationalState
  }  
};
