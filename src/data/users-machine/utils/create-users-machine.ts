import { createMachine } from 'xstate';
import { coreState } from '../machine-states/core';
import { listState } from '../machine-states/list-state';
import {
  UsersMachineContext,
  UsersMachineEvents,
  UsersMachineId,
} from '../types';

export const createUsersMachine = ({
  appInstance,
}: {
  appInstance: string;
}) => {
  return createMachine<UsersMachineContext, UsersMachineEvents>({
    id: UsersMachineId,
    context: {
      __mockServerInfo__: {
        appInstance,
      },
      ownUser: null,
      users: [],
    },
    predictableActionArguments: true,
    preserveActionOrder: true,
    type: 'parallel',
    states: {
      core: coreState,
      list: listState,
    },
  });
};
