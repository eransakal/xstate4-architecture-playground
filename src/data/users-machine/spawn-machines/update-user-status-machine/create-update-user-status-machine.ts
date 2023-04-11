import { actions, createMachine } from 'xstate';
import { updateAdminStatus } from './machine-actions';
import { operatingState } from './machine-states/operating';
import {
  UpdateUserStatusMachineEvents,
  UpdateUserStatusMachineContext,
  UpdateUserStatusMachineId,
} from './types';

export const createUpdateUserStatusMachine = ({
  appInstance,
  userId,
  isAdmin,
}: {
  userId: number;
  isAdmin: boolean;
  appInstance: string;
}) => {
  return createMachine<
    UpdateUserStatusMachineContext,
    UpdateUserStatusMachineEvents
  >(
    {
      id: UpdateUserStatusMachineId,
      context: {
        __mockServerInfo__: {
          appInstance,
        },
        userId,
        isAdmin,
      },
      predictableActionArguments: true,
      preserveActionOrder: true,
      initial: 'operating',
      states: {
        operating: operatingState,
      },
    },
    {
      actions: {
        updateAdminStatus,
      },
    }
  );
};
