import {
  Flex,
  Text,
  Button,
  VStack,
  Box,
  HStack,
  AvatarGroup,
  Tooltip,
} from '@chakra-ui/react';
import React, { useEffect, useMemo, useState } from 'react';
import { usePollsService } from '../../data/polls-machine/use-polls-service';
import { PollIcon } from './poll-icon';
import { pollsMetadata, PollMetadata } from './polls-metadata';
import { useSelector } from '@xstate/react';
import {
  getIsPollPrivate,
  getIsStopPollInProgress,
  getPollType,
  getPollVotes,
} from '../../data/polls-machine/machine-selectors';
import { UserAvatar } from '../users/user-avatar';
import { useUsersService } from '../../data/users-machine/use-users-service';
import {
  getOwnUser,
  getUsers,
} from '../../data/users-machine/machine-selectors';
import { getIsAdmin } from '../../data/users-machine/machine-selectors/get-is-admin';

export const PollVotesView: React.FC<{}> = () => {
  const [pollMetadata, setPollMetadata] = useState<PollMetadata | null>(null);

  const { actions, pollsMachineService } = usePollsService();
  const { usersMachineService } = useUsersService();
  const users = useSelector(usersMachineService, getUsers);
  const ownUser = useSelector(usersMachineService, getOwnUser);
  const isAdmin = useSelector(usersMachineService, getIsAdmin);
  const pollType = useSelector(pollsMachineService, getPollType);
  const pollIsPrivate = useSelector(pollsMachineService, getIsPollPrivate);
  const pollVotes = useSelector(pollsMachineService, getPollVotes);

  const isBusy = useSelector(pollsMachineService, getIsStopPollInProgress);

  const { votedTotal, items } = useMemo(() => {
    const totalVotes = pollVotes?.length ?? 0;
    const votedTotal = pollVotes?.filter((vote) => {
      return (
        vote.userId === ownUser?.id ||
        users?.find((user) => vote.userId === user.id)
      );
    }).length;

    const items =
      pollMetadata?.answers.map((answer) => {
        const answerUsers =
          pollVotes
            ?.filter((result) => result.answerId === answer.id)
            .map((pollVote) => ({
              id: pollVote.userId,
              name: pollVote.userName,
              avatar: pollVote.userAvatar,
              isOnline: !!users.find((user) => user.id === pollVote.userId),
            })) ?? [];
        return {
          ...answer,
          users: answerUsers,
          percentage: answerUsers.length / totalVotes || 0,
        };
      }) ?? [];

    return {
      items,
      votedTotal,
    };
  }, [pollMetadata?.answers, users, pollVotes]);

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
                &nbsp;{votedTotal}&nbsp;/&nbsp;{users.length} answered
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
