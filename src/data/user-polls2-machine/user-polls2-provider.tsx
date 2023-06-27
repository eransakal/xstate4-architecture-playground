import React, { useState, useMemo, PropsWithChildren, useContext } from 'react';
import {
  UserPolls2Machine,
  UserPolls2MachineEventsTypes
} from './types';
import { createUserPolls2Machine } from './utils/create-user-polls2-machine';
import { useMachine } from '@xstate/react';
import { UserPolls2Context } from './utils/user-polls2-context';
import { updateExternalInfo } from './machine-actions/context/update-external-info';
import { onExternalInfoUpdated } from './machine-services/on-external-info-updated';
import { MachineCalculatedValueEmitter } from './utils/machine-calculated-value-emitter';
import { isExternalInfoLoaded } from './machine-guards/is-external-info-loaded';

import { createUserPolls2MachineLogger } from './utils/logger';
import { AppContext } from '../../app';
import { getPollsSnapshot } from './machine-services/get-polls-snapshot';
import { setActivePollData } from './machine-actions/context/set-active-poll-data';

const logger =  createUserPolls2MachineLogger(
    'userPolls2Provider'
  );

export const UserPolls2Provider: React.FC<PropsWithChildren> = ({ children }) => {
 
  const { appInstance, inspectEnabled } = useContext(AppContext);
 
 const [machine] = useState(() => createUserPolls2Machine({
  appInstance
 }));

  const [, , userPolls2MachineService] = useMachine<UserPolls2Machine>(machine, {
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
      isExternalInfoLoaded
    },
  });

  const providerValue = useMemo(() => {
    return { userPolls2MachineService };
  }, [userPolls2MachineService]);

  return (
    <UserPolls2Context.Provider value={providerValue}>
     <MachineCalculatedValueEmitter
      formula={isExternalInfoLoaded}
      event={
        (value) => {
          return {
            type: UserPolls2MachineEventsTypes.ExternalInfoLoaded,
            loaded: value
          }
        }
      }
      />
      {children}
    </UserPolls2Context.Provider>
  );
};
