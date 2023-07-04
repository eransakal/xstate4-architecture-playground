import {
  Flex,
  Text,
  Button,
  VStack,
  Box,
  HStack,
  AvatarGroup,
} from '@chakra-ui/react';
import React, { useEffect, useMemo, useState } from 'react';
import { useUserPollsService } from '../../data/user-polls-machine';
import { PollIcon } from './poll-icon';
import { pollsMetadata, PollMetadata } from './polls-metadata';
import {
  getIsPollPrivate,
  getIsStopPollInProgress,
  getPollType,
  getPollAnswers,
} from '../../data/user-polls-machine';
import { UserAvatar } from '../users/user-avatar';
import {
  getOwnUser,
  getUsers,
  getIsAdmin,
} from '../../data/users-machine/machine-selectors';
import { useUsersUpdates } from '../../data/users-machine';
import { useUserPollsUpdates } from '../../data/user-polls-machine';

export const PollAnswersView: React.FC<{}> = () => {
  const [pollMetadata, setPollMetadata] = useState<PollMetadata | null>(null);

  const { actions } = useUserPollsService();
  const { ownUser, users, isAdmin } = useUsersUpdates({
    ownUser: getOwnUser,
    users: getUsers,
    isAdmin: getIsAdmin,
  });
  const { pollType, pollIsPrivate, pollAnswers, isBusy } = useUserPollsUpdates({
    pollType: getPollType,
    pollIsPrivate: getIsPollPrivate,
    pollAnswers: getPollAnswers,
    isBusy: getIsStopPollInProgress,
  });

  const { answerdTotal, items } = useMemo(() => {
    const totalAnswers = pollAnswers?.length ?? 0;
    const answerdTotal =
      pollAnswers?.filter((answer) => {
        return (
          answer.userId === ownUser?.id ||
          users?.find((user) => answer.userId === user.id)
        );
      }).length ?? 0;

    const items =
      pollMetadata?.answers.map((answer) => {
        const answerUsers =
          pollAnswers
            ?.filter((result) => result.answerId === answer.id)
            .map((pollAnswer) => ({
              id: pollAnswer.userId,
              name: pollAnswer.userName,
              avatar: pollAnswer.userAvatar,
              isOnline: !!users.find((user) => user.id === pollAnswer.userId),
            })) ?? [];
        return {
          ...answer,
          users: answerUsers,
          percentage: answerUsers.length / totalAnswers || 0,
        };
      }) ?? [];

    return {
      items,
      answerdTotal,
    };
  }, [pollMetadata?.answers, users, pollAnswers, ownUser?.id]);

  useEffect(() => {
    setPollMetadata(
      pollsMetadata.find((poll) => poll.type === pollType) ?? null
    );
  }, [pollType]);

  return (
    pollMetadata && (
      <Flex mt={2} justifyContent={'center'}>
        <VStack gap={8} alignItems={'stretch'} flex={1}>
          <VStack gap={2} flex={'1'} alignItems="flex-start">
            {items.map((item) => (
              <HStack key={item.id} gap={1}>
                <PollIcon iconName={item.icon}></PollIcon>
                <Text>{Math.round(item.percentage * 100)} %</Text>
                <AvatarGroup spacing={1}>
                  {item.users.map((user) => (
                    <UserAvatar
                      key={user.id}
                      size={'sm'}
                      fullName={user.name}
                      avatarUrl={user.avatar}
                      isOnline={user.isOnline}
                    />
                  ))}
                </AvatarGroup>
              </HStack>
            ))}
          </VStack>
          <Flex>
            <Box flex={1}>
              {pollIsPrivate && <Text as={'b'}>Private Poll |&nbsp;</Text>}
              <Text as={'b'}>
                &nbsp;{answerdTotal}&nbsp;/&nbsp;{users.length} answered
              </Text>
            </Box>
            {isAdmin && (
              <Button
                onClick={() => actions.endPoll()}
                size="sm"
                isLoading={isBusy}
                colorScheme={'red'}
              >
                End Poll
              </Button>
            )}
          </Flex>
        </VStack>
      </Flex>
    )
  );
};
