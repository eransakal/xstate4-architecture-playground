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
import { AppContext } from '../../app';
import { getPollsSnapshot } from './machine-services/get-polls-snapshot';
import { canManagePolls } from './machine-guards/can-manage-polls';
import { clearActivePollData } from './machine-actions/context/clear-active-poll-data';
import { updateActivePollData } from './machine-actions/context/update-active-poll-data';
import { updateAnswers } from './machine-actions/context/update-answers';
import { clearIntermediateUserAnswer } from './machine-actions/context/clear-intermediate-user-answer';
import { canAnswerPoll } from './machine-guards/can-answer-poll';
import { updateIntermediateUserAnswer } from './machine-actions/context/update-intermediate-user-answer';
import { startPoll } from './machine-services/start-poll';
import { sendAnswer } from './machine-services/send-answer';
import { onUserPollstatusUpdated } from './machine-services/on-poll-status-updated';
import { endPoll } from './machine-services/end-poll';

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
      clearIntermediateUserAnswer,      
      updateIntermediateUserAnswer,
      updateActivePollData,
      updateAnswers
    },
    services: {
      onExternalInfoUpdated,
      getPollsSnapshot,
      startPoll,
      endPoll,
      sendAnswer,
      onUserPollstatusUpdated
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
        <MachineCalculatedValueEmitter
      formula={canManagePolls}
      event={
        (value) => {
          return {
            type: UserPollsMachineEventsTypes.CanManagePollsChanged,
            canManagePolls: value
          }
        }
      }
      />
      {children}
    </UserPollsContext.Provider>
  );
};
