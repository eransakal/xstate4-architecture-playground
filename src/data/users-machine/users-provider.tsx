import React, { useState, useMemo, PropsWithChildren, useContext } from 'react';
import { UsersMachine, UsersMachineService } from './types';
import { createUsersMachine } from './create-users-machine';
import { useMachine } from '@xstate/react';
import { createUsersMachineLogger } from './logger';
import { updateUsersInformation } from './machine-actions/context/update-users-information';
import { getUsersInformation } from './machine-services/get-users-information';
import { useXStateDiagnostics } from '../use-xstate-diagnostics';
import { emitIsAdminChanged } from './machine-actions/emit-is-admin-changed';
import { onUserAdminStatusChanged } from './machine-services/on-user-admin-status-changed';
import { isEventOfOwnUser } from './machine-guards';
import { updateAdminStatus } from './machine-actions/context/update-admin-status';
import { startUpdateAdminStatus } from './machine-actions/context/start-update-admin-status';
import { endUpdateAdminStatus } from './machine-actions/context/end-update-admin-status';
import { AppContext } from '../../app';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const logger = createUsersMachineLogger('XState Machine');

export const UsersContext = React.createContext<{
  usersMachineService: UsersMachineService;
}>(null as any);

export const UsersProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { appInstance, inspectEnabled } = useContext(AppContext);
  const [machine] = useState(() => createUsersMachine({ appInstance }));

  const [, , machineService] = useMachine<UsersMachine>(machine, {
    devTools: inspectEnabled,
    actions: {
      startUpdateAdminStatus,
      emitIsAdminChanged,
      endUpdateAdminStatus,
      updateUsersInformation,
      updateUserAdminStatus: updateAdminStatus,
    },
    services: {
      getUsersInformation,
      onUserAdminStatusChanged,
    },
    guards: {
      isEventOfOwnUser,
    },
  });

  useXStateDiagnostics({
    logger,
    service: machineService,
  });

  const providerValue = useMemo(() => {
    return { usersMachineService: machineService };
  }, [machineService]);

  return (
    <UsersContext.Provider value={providerValue}>
      {children}
    </UsersContext.Provider>
  );
};
