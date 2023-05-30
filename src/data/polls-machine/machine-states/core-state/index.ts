import { PollsMachineStateConfig } from '../../types';
import { bootUpState } from './boot-up-state';
import { operationalState } from './operational-state';

export const coreState: PollsMachineStateConfig = {
  id: 'core',
  initial: 'bootUp',
  states: {
    bootUp: bootUpState,
    operational: operationalState,
  },
};
