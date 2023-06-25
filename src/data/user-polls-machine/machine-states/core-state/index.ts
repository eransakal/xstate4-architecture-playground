import { loadingState } from './loading-state';
import {
  UserPollsMachineStateConfig,
} from '../../types';
import { operationalState } from './operational-state';

export const coreState: UserPollsMachineStateConfig = {
  initial: 'loading',
  states: {
    loading: loadingState,
    operational: operationalState
  }  
};
