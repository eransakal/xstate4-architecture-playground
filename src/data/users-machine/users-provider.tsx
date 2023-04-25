import React, { useState, useMemo, PropsWithChildren, useContext } from 'react';
import { UsersMachine, UsersMachineService } from './types';
import { createUsersMachine } from './create-users-machine';
import { useMachine } from '@xstate/react';
import { createUsersMachineLogger } from './logger';
import { setUsers } from './machine-actions/context/set-users';
import { getUsers } from './machine-services/get-users';
import { useXStateDiagnostics } from '../use-xstate-diagnostics';
import { emitUserRoleUpdated } from './machine-actions/emit-user-role-updated';
import { onUserRoleChanged } from './machine-services/on-user-role-changed';
import { isWSEventOfOwnUser } from './machine-guards';
import { updateUserRole } from './machine-actions/context/update-user-role';
import { spawnUpdateUserRole } from './machine-actions/context/spawn-update-user-role';
import { stopSpawnUpdateUserRole } from './machine-actions/context/stop-spawn-update-user-role';
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
      spawnUpdateUserRole,
      emitUserRoleUpdated,
      stopSpawnUpdateUserRole,
      setUsers,
      updateUserRole,
    },
    services: {
      getUsers,
      onUserRoleChanged,
    },
    guards: {
      isWSEventOfOwnUser,
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
