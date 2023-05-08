import React, { useState, useMemo, PropsWithChildren, useContext } from 'react';
import { PollsMachine } from './types';
import { createPollsMachine } from './utils/create-polls-machine';
import { useMachine } from '@xstate/react';
import { createPollsMachineLogger } from './utils/logger';
import { getPollsSnapshot } from './machine-services/get-polls-snapshot';
import {
  clearActivePollData,
  requestEndPoll,
  setActivePollData,
  setUserVote,
  updateExternalInfo,
} from './machine-actions';
import {
  shouldAllowUserToAnswer,
  verifyExternalInformation,
} from './machine-guards';
import {
  startAPoll,
  sendAnswer,
  onExternalInfoChanged,
} from './machine-services';
import { onPollStatusUpdated } from './machine-services';
import { AppContext } from '../../app';
import { PollsContext } from './utils/polls-context';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const logger = createPollsMachineLogger('Polls Provider');



export const PollsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { appInstance, inspectEnabled } = useContext(AppContext);
  const [machine] = useState(() => createPollsMachine({ appInstance }));

  const [, , machineService] = useMachine<PollsMachine>(machine, {
    devTools: inspectEnabled,
    actions: {
      requestEndPoll,
      clearActivePollData,
      setActivePollData,

      updateExternalInfo,
      setUserVote,
    },
    services: {
      startAPoll,
      sendAnswer,
      getPollsSnapshot,
      onExternalInfoChanged,
      onPollStatusUpdated,
    },
    guards: {
      verifyExternalInformation,
      shouldAllowUserToAnswer,
    },
  });

  const providerValue = useMemo(() => {
    return { pollsMachineService: machineService };
  }, [machineService]);

  return (
    <PollsContext.Provider value={providerValue}>
      {children}
    </PollsContext.Provider>
  );
};
