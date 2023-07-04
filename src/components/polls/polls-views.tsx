import React from 'react';
import { CreatePollsView } from './create-polls-view';
import { PollAnswersView } from './poll-answers-view';
import { Box } from '@chakra-ui/react';
import { SelectAnswerView } from './select-answer-view';
import {
  getIsPollActive,
  getUserAnsweredPoll,
  getCanSeePollAnswers,
  getCanCreatePolls,
  getIsLoadingPollData,
} from '../../data/user-polls-machine';
import { InactiveView } from './inactive-view';
import { PollAnsweredView } from './poll-answered-view';
import { LoadingPollView } from './loading-poll-view';
import { useUserPollsUpdates } from '../../data/user-polls-machine';

export const PollsViews: React.FC<{}> = () => {
  const {
    userAnsweredPoll,
    isLoadingPollData,
    isPollActive,
    canCreatePolls,
    canSeePollsResults,
  } = useUserPollsUpdates({
    userAnsweredPoll: getUserAnsweredPoll,
    isLoadingPollData: getIsLoadingPollData,
    isPollActive: getIsPollActive,
    canCreatePolls: getCanCreatePolls,
    canSeePollsResults: getCanSeePollAnswers,
  });

  const showCreatePolls = canCreatePolls;
  const showPollInactiveView = !isPollActive && !showCreatePolls;
  const showPollAnswers = userAnsweredPoll && canSeePollsResults;
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
          {showPollAnswers && <PollAnswersView />}
          {showPollAnswered && <PollAnsweredView />}
          {showSelectAnswerView && <SelectAnswerView />}
        </>
      )}
    </Box>
  );
};
