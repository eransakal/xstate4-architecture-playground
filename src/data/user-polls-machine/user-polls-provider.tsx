import React, { useState, useMemo, PropsWithChildren, useContext } from 'react';
import {
  UserPollsMachine,
  UserPollsMachineEventsTypes
} from './types';
import { createUserPollsMachine } from './utils/create-user-polls-machine';
import { useMachine } from '@xstate/react';
import { UserPollsContext } from './utils/user-polls-context';
import { updateExternalInfo } from './machine-actions/context/update-external-info';
import { addNotification } from './machine-actions/context/add-notification';
import { removeNotification } from './machine-actions/context/remove-notification';
import { onExternalInfoUpdated } from './machine-services/on-external-info-updated';
import { MachineCalculatedValueEmitter } from './utils/machine-calculated-value-emitter';
import { isExternalInfoLoaded } from './machine-guards/is-external-info-loaded';

import { createUserPollsMachineLogger } from './utils/logger';
import { AppContext } from '../../app';
import { getPollsSnapshot } from './machine-services/get-polls-snapshot';
import { canManagePolls } from './machine-guards/can-manage-polls';
import { clearActivePollData } from './machine-actions/context/clear-active-poll-data';
import { setActivePollData } from './machine-actions/context/set-active-poll-data';
import { updateUserVote } from './machine-actions/context/update-user-vote';
import { clearIntermediateUserVote } from './machine-actions/context/clear-intermediate-user-vote';
import { canAnswerPoll } from './machine-guards/can-answer-poll';
import { updateIntermediateUserVote } from './machine-actions/context/update-intermediate-user-vote';

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
      addNotification,
      removeNotification,
      clearActivePollData,
      clearIntermediateUserVote,
      updateIntermediateUserVote,
      setActivePollData,
      updateUserVote
    },
    services: {
      onExternalInfoUpdated,
      getPollsSnapshot
     },
    guards: {
      isExternalInfoLoaded,
      canManagePolls,
      canAnswerPoll
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
