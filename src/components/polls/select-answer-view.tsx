import { VStack, Heading, Center, HStack, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { usePollsService } from '../../data/polls-machine/use-polls-service';
import { PollIcon } from './poll-icon';
import { pollsMetadata, PollMetadata } from './polls-metadata';
import { usePollsUpdates } from '../../data/polls-machine';
import {
  getIsAnswerPollInProgress,
  getPollType,
} from '../../data/polls-machine/machine-selectors';

export const SelectAnswerView: React.FC<{}> = () => {
  const [pollMetadata, setPollMetadata] = useState<PollMetadata | null>(null);
  const { actions } = usePollsService();
  const { pollType, isBusy } = usePollsUpdates({
    pollType: getPollType,
    isBusy: getIsAnswerPollInProgress,
  });

  useEffect(() => {
    if (pollType) {
      setPollMetadata(
        pollsMetadata.find((poll) => poll.type === pollType) ?? null
      );
    } else {
      setPollMetadata(null);
    }
  }, [pollType]);

  return (
    pollMetadata && (
      <VStack gap={2}>
        <Heading size="md">Choose as Answer</Heading>
        <Center>
          <HStack gap={4}>
            {isBusy ? (
              <Text>sending answer, please wait...</Text>
            ) : (
              pollMetadata.answers.map((answer) => (
                <VStack
                  key={answer.id}
                  cursor={'pointer'}
                  onClick={() => actions.answerPoll(answer.id)}
                >
                  <PollIcon iconName={answer.icon} />
                  <Text fontSize={'12px'}>{answer.label}</Text>
                </VStack>
              ))
            )}
          </HStack>
        </Center>
      </VStack>
    )
  );
};
