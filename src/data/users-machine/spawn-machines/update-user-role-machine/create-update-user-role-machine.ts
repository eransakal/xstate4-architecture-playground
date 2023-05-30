import { createMachine } from 'xstate';
import { updateUserRole } from './machine-services';
import { operationalState } from './machine-states/operational-state';
import {
  UpdateUserRoleMachineEvents,
  UpdateUserRoleMachineContext,
  UpdateUserRoleMachineId,
} from './types';

export const createUpdateUserRoleMachine = ({
  appInstance,
  userId,
  isAdmin,
}: {
  userId: number;
  isAdmin: boolean;
  appInstance: string;
}) => {
  return createMachine<
    UpdateUserRoleMachineContext,
    UpdateUserRoleMachineEvents
  >(
    {
      id: UpdateUserRoleMachineId,
      context: {
        __mockServerInfo__: {
          appInstance,
        },
        userId,
        isAdmin,
      },
      predictableActionArguments: true,
      preserveActionOrder: true,
      initial: 'operational',
      states: {
        operational: operationalState,
      },
    },
    {
      services: {
        updateUserRole,
      },
    }
  );
};
