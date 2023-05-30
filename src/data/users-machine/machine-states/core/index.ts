import { UsersMachineStateConfig } from '../../types';
import { bootUpState } from './boot-up-state';
import { operationalState } from './operational-state';


export const coreState: UsersMachineStateConfig = {
  initial: 'bootUp',
  states: {
    bootUp: bootUpState,
    operational: operationalState,
  },
};
