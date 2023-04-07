import React, { useContext } from 'react';
import { CreatePollsView } from './create-polls-view';
import { PollVotesView } from './poll-votes-view';
import { Box } from '@chakra-ui/react';
import { SelectAnswerView } from './select-answer-view';
import { useSelector } from '@xstate/react';
import {
  getIsPollActive,
  getUserAnsweredPoll,
  getCanSeePollVotes,
  getCanCreatePolls,
  getIsLoadingPollData,
} from '../../data/polls-machine/machine-selectors';
import { InactiveView } from './inactive-view';
import { PollAnsweredView } from './poll-answered-view';
import { usePollsService } from '../../data/polls-machine/use-polls-service';
import { LoadingPollView } from './loading-poll-view';

export const PollsViews: React.FC<{}> = () => {
  // TODO consult if should use as selector

  const { pollsMachineService } = usePollsService();
  const userAnsweredPoll = useSelector(
    pollsMachineService,
    getUserAnsweredPoll
  );
  const isLoadingPollData = useSelector(
    pollsMachineService,
    getIsLoadingPollData
  );
  const isPollActive = useSelector(pollsMachineService, getIsPollActive);
  const canCreatePoll = useSelector(pollsMachineService, getCanCreatePolls);
  const canSeePollsResults = useSelector(
    pollsMachineService,
    getCanSeePollVotes
  );

  const showCreatePolls = canCreatePoll;
  const showPollInactiveView = !isPollActive && !showCreatePolls;
  const showPollVotes = userAnsweredPoll && canSeePollsResults;
  const showSelectAnswerView = isPollActive && !userAnsweredPoll;
  const showPollAnswered = userAnsweredPoll && !canSeePollsResults;

  return (
    <Box position="relative" h={'100%'} p={2}>
      {isLoadingPollData ? (
        <LoadingPollView />
      ) : (
        <>
          {showCreatePolls && <CreatePollsView />}
          {showPollInactiveView && <InactiveView />}
          {showPollVotes && <PollVotesView />}
          {showPollAnswered && <PollAnsweredView />}
          {showSelectAnswerView && <SelectAnswerView />}
        </>
      )}
    </Box>
  );
};
