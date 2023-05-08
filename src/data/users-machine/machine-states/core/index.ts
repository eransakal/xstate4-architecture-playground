import { UsersMachineStateConfig } from '../../types';
import { bootUpState } from './boot-up-state';
import { operatingState } from './operating-state';


export const coreState: UsersMachineStateConfig = {
  initial: 'bootUp',
  states: {
    bootUp: bootUpState,
    operating: operatingState,
  },
};
