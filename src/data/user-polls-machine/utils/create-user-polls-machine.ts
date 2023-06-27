import { coreState } from "../machine-states/core-state";
import { createMachine } from 'xstate';
import {
  UserPollsMachineContext,
  UserPollsMachineEvents,
  UserPollsMachineEventsTypes,
  UserPollsMachineId,  
  createDefaultUserPollsMachineContext
} from '../types';

export const createUserPollsMachine = ({
  appInstance,
}: {
  appInstance: string;
}) => {
  return createMachine<UserPollsMachineContext, UserPollsMachineEvents>({
    id: UserPollsMachineId,
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
      [UserPollsMachineEventsTypes.ExternalInfoUpdated]: {
        actions: 'updateExternalInfo',        
      },
    },
    states: {
      core: coreState
    },
  }).withContext(
    createDefaultUserPollsMachineContext(appInstance)
  );
};
