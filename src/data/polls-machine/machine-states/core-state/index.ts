import { PollsMachineEventsTypes, PollsMachineStateConfig } from '../../types';
import { bootUpState } from './boot-up-state';
import { operatingState } from './operating-state';

export const coreState: PollsMachineStateConfig = {
  id: 'core',
  initial: 'bootUp',
  states: {
    bootUp: bootUpState,
    operating: operatingState,
  },
};
