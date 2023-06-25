import React, { useState, useMemo, PropsWithChildren, useContext } from 'react';
import {
  UserPollsMachine, UserPollsMachineEventsTypes
} from './types';
import { createUserPollsMachine } from './utils/create-user-polls-machine';
import { useMachine } from '@xstate/react';
import { UserPollsContext } from './utils/user-polls-context';
import { updateExternalInfo } from './machine-actions/context/update-external-info';
import { updateUserAnswer } from './machine-actions/context/update-user-answer';
import { updateIntermediateUserAnswer } from './machine-actions/context/update-intermediate-user-answer';
import { clearIntermediateUserAnswer } from './machine-actions/context/clear-intermediate-user-answer';
import { MachineCalculatedValueEmitter } from './utils/machine-calculated-value-emitter';
import { externalInfoLoaded } from './calculated-value/external-info-loaded';
import { AppContext } from '../../app';
import { onExternalInfoUpdated } from './machine-services/on-external-info-updated';
import { getPollsSnapshot } from './machine-services/get-polls-snapshot';
import { onExternalInfoLoaded } from './machine-guards/verify-external-info';


export const UserPollsProvider: React.FC<PropsWithChildren> = ({ children }) => {
 
  const { appInstance, inspectEnabled } = useContext(AppContext);
 const [machine] = useState(() => createUserPollsMachine({appInstance}));

  const [, , userPollsMachineService] = useMachine<UserPollsMachine>(machine, {
    devTools: inspectEnabled,
    actions: {
      updateExternalInfo,
      updateUserAnswer,
      updateIntermediateUserAnswer,
      clearIntermediateUserAnswer
    },
    services: {
      onExternalInfoUpdated,
      getPollsSnapshot
     },
    guards: { 
      onExternalInfoLoaded
    },
  });

  const providerValue = useMemo(() => {
    return { userPollsMachineService };
  }, [userPollsMachineService]);

  return (
    <UserPollsContext.Provider value={providerValue}>
      <MachineCalculatedValueEmitter
      formula={externalInfoLoaded}
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
