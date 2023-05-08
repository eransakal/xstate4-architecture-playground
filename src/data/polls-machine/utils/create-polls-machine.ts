import { createMachine } from 'xstate';
import { coreState } from '../machine-states/core-state';
import {
  PollsMachineContext,
  PollsMachineEvents,
  PollsMachineId,
} from '../types';

export const createPollsMachine = ({
  appInstance,
}: {
  appInstance: string;
}) => {
  return createMachine<PollsMachineContext, PollsMachineEvents>({
    context: {
      __mockServerInfo__: {
        appInstance,
      },
      externalInfo: {
        isAdmin: false,
        userId: null,
      },
      isPrivate: false,
      pollCreator: null,
      userVoted: false,
      pollVotes: [],
      pollType: null,
    },
    id: PollsMachineId,
    predictableActionArguments: true,
    preserveActionOrder: true,
    type: 'parallel',
    states: {
      core: coreState,
    },
  });
};
