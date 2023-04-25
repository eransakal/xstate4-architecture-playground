import React from 'react';
import { CreatePollsView } from './create-polls-view';
import { PollVotesView } from './poll-votes-view';
import { Box } from '@chakra-ui/react';
import { SelectAnswerView } from './select-answer-view';
import {
  getIsPollActive,
  getUserAnsweredPoll,
  getCanSeePollVotes,
  getCanCreatePolls,
  getIsLoadingPollData,
} from '../../data/polls-machine/machine-selectors';
import { InactiveView } from './inactive-view';
import { PollAnsweredView } from './poll-answered-view';
import { LoadingPollView } from './loading-poll-view';
import { usePollsUpdates } from '../../data/polls-machine';

export const PollsViews: React.FC<{}> = () => {
  const {
    userAnsweredPoll,
    isLoadingPollData,
    isPollActive,
    canCreatePolls,
    canSeePollsResults,
  } = usePollsUpdates({
    userAnsweredPoll: getUserAnsweredPoll,
    isLoadingPollData: getIsLoadingPollData,
    isPollActive: getIsPollActive,
    canCreatePolls: getCanCreatePolls,
    canSeePollsResults: getCanSeePollVotes,
  });

  const showCreatePolls = canCreatePolls;
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
