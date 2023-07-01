import React, { useState, useMemo, PropsWithChildren, useContext } from 'react';
import {
  UserPollsMachine,
  UserPollsMachineEventsTypes
} from './types';
import { createUserPollsMachine } from './utils/create-user-polls-machine';
import { useMachine } from '@xstate/react';
import { UserPollsContext } from './utils/user-polls-context';
import { updateExternalInfo } from './machine-actions/context/update-external-info';
import { onExternalInfoUpdated } from './machine-services/on-external-info-updated';
import { MachineCalculatedValueEmitter } from './utils/machine-calculated-value-emitter';
import { isExternalInfoLoaded } from './machine-guards/is-external-info-loaded';

import { createUserPollsMachineLogger } from './utils/logger';
import { AppContext } from '../../app';
import { getPollsSnapshot } from './machine-services/get-polls-snapshot';
import { setActivePollData } from './machine-actions/context/set-active-poll-data';
import { canManagePolls } from './machine-guards/can-manage-polls';

const logger =  createUserPollsMachineLogger(
    'userPollsProvider'
  );

export const UserPollsProvider: React.FC<PropsWithChildren> = ({ children }) => {
 
  const { appInstance, inspectEnabled } = useContext(AppContext);
 
 const [machine] = useState(() => createUserPollsMachine({
  appInstance
 }));

  const [, , userPollsMachineService] = useMachine<UserPollsMachine>(machine, {
    devTools: inspectEnabled,
    actions: {
      updateExternalInfo,
      setActivePollData
    },
    services: {
      onExternalInfoUpdated,
      getPollsSnapshot
     },
    guards: { 
      isExternalInfoLoaded,
      canManagePolls
    },
  });

  const providerValue = useMemo(() => {
    return { userPollsMachineService };
  }, [userPollsMachineService]);

  return (
    <UserPollsContext.Provider value={providerValue}>
     <MachineCalculatedValueEmitter
      formula={isExternalInfoLoaded}
      event={
        (value) => {
          return {
            type: UserPollsMachineEventsTypes.ExternalInfoLoaded,
            loaded: value
          }
        }
      }
      />
      {children}
    </UserPollsContext.Provider>
  );
};
