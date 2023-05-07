import React, { useState, useMemo, PropsWithChildren, useContext } from 'react';
import { UsersMachine } from './types';
import { createUsersMachine } from './utils/create-users-machine';
import { useMachine } from '@xstate/react';
import { createUsersMachineLogger } from './utils/logger';
import { setUsers } from './machine-actions/context/set-users';
import { getUsers } from './machine-services/get-users';
import { useXStateDiagnostics } from '../use-xstate-diagnostics';
import { onUserRoleChanged } from './machine-services/on-user-role-changed';
import { isWSEventOfOwnUser, shouldHideList } from './machine-guards';
import { updateUserRole } from './machine-actions/context/update-user-role';
import { spawnUpdateUserRole } from './machine-actions/context/spawn-update-user-role';
import { stopSpawnUpdateUserRole } from './machine-actions/context/stop-spawn-update-user-role';
import { AppContext } from '../../app';
import { UsersContext } from './utils/users-context';
import { MachineGlobalEventEmitter } from './utils/machine-global-event-emitter';
import { getOwnUser } from './machine-selectors';
import { onOwnUserChangedEvent } from './global-events';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const logger = createUsersMachineLogger('XState Machine');

export const UsersProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { appInstance, inspectEnabled } = useContext(AppContext);
  const [machine] = useState(() => createUsersMachine({ appInstance }));

  const [, , machineService] = useMachine<UsersMachine>(machine, {
    devTools: inspectEnabled,
    actions: {      
      spawnUpdateUserRole,    
      stopSpawnUpdateUserRole,
      setUsers,
      updateUserRole,
    },
    services: {
      getUsers,
      onUserRoleChanged,
    },
    guards: {
      shouldHideList,
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
      <MachineGlobalEventEmitter
        emitWithContext={appInstance}
        name={'onOwnUserChangedEvent'}
        selector={getOwnUser}
        event={onOwnUserChangedEvent}
      />
      {children}
    </UsersContext.Provider>
  );
};
