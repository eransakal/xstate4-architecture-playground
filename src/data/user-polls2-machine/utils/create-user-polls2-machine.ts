import { coreState } from "../machine-states/core-state";
import { createMachine } from 'xstate';
import {
  UserPolls2MachineContext,
  UserPolls2MachineEvents,
  UserPolls2MachineEventsTypes,
  UserPolls2MachineId,  
  createDefaultUserPolls2MachineContext
} from '../types';

export const createUserPolls2Machine = ({
  appInstance,
}: {
  appInstance: string;
}) => {
  return createMachine<UserPolls2MachineContext, UserPolls2MachineEvents>({
    id: UserPolls2MachineId,
    predictableActionArguments: true,
    preserveActionOrder: true,
    type: 'parallel',
    invoke: {
      src: 'onExternalInfoUpdated',
      data: {
        emitLastValue: true
      }
    },
    on: {
      [UserPolls2MachineEventsTypes.ExternalInfoUpdated]: {
        actions: 'updateExternalInfo',        
      },
    },
    states: {
      core: coreState
    },
  }).withContext(
    createDefaultUserPolls2MachineContext(appInstance)
  );
};
