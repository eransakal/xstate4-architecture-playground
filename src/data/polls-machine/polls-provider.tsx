import React, {
  useState,
  useMemo,
  PropsWithChildren,
  useEffect,
  useContext,
} from 'react';
import { PollsMachine, PollsMachineService } from './types';
import { createPollsMachine } from './create-polls-machine';
import { useMachine } from '@xstate/react';
import { createPollsMachineLogger } from './logger';
import { getPollsSnapshot } from './machine-services/get-polls-snapshot';
import {
  clearActivePollData,
  endPoll,
  sendAnswer,
  setActivePollData,
  setUserVote,
  updateExternalInfo,
} from './machine-actions';
import {
  shouldAllowUserToAnswer,
  verifyExternalInformation,
} from './machine-guards';
import { onExternalInfoChanged } from './machine-services';
import { startAPoll } from './machine-actions';
import { onPollStatusUpdated } from './machine-services';
import { AppContext } from '../../app';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const logger = createPollsMachineLogger('Polls Provider');

export const PollsContext = React.createContext<{
  pollsMachineService: PollsMachineService;
}>(null as any);

export const PollsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { appInstance, inspectEnabled } = useContext(AppContext);
  const [machine] = useState(() => createPollsMachine({ appInstance }));

  const [, , machineService] = useMachine<PollsMachine>(machine, {
    devTools: inspectEnabled,
    actions: {
      endPoll,
      clearActivePollData,
      setActivePollData,
      startAPoll,
      sendAnswer,
      updateExternalInfo,
      setUserVote,
    },
    services: {
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
