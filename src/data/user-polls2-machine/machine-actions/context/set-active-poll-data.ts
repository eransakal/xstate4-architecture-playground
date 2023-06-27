import { assign } from '@xstate/immer';
import { createUserPolls2MachineLogger } from '../../utils/logger';
import {
  UserPolls2MachineContext,
  UserPolls2MachineEvents,
  UserPolls2MachineEventsTypes,
} from '../../types';

const logger = createUserPolls2MachineLogger('setActivePollData');

export const setActivePollData = assign(
  (context: UserPolls2MachineContext, event: UserPolls2MachineEvents) => {
     if (event.type === `done.invoke.loadUserPollsData`) {
      if (event.data?.pollType) {
        logger.log(
          `has active poll in progress (poll type '${event.data.pollType}')`
        );
        context.isPrivate = event.data.isPrivate;
        context.pollType = event.data.pollType;
        context.pollCreator = event.data.pollCreator;
        context.userVoted =
          !!event.data.answers.find((answer) => {
            return answer.userId === context.externalInfo.userId;
          })?.answerId ?? false;
        context.pollVotes = event.data.answers;
      } else {
        logger.log(`has no active poll in progress`);
        context.pollType = null;

        context.pollVotes = [];
      }
    }
  }
);
