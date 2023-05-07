import { UsersMachineContext, UsersMachineStateConfig } from '../../types';
import { bootUpState } from './boot-up-state';
import { operatingState } from './operating-state';
import { actions } from 'xstate';

export const coreState: UsersMachineStateConfig = {
  initial: 'bootUp',

  states: {
    bootUp: bootUpState,
    operating: operatingState,
  },
};
