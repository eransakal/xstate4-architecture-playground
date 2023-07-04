import {
  Flex,
  Switch,
  FormLabel,
  Button,
  FormControl,
  HStack,
  VStack,
  Heading,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import Select, { components, ControlProps } from 'react-select';
import { useUserPollsService } from '../../data/user-polls-machine';
import { PollIcon } from './poll-icon';
import { pollsMetadata } from './polls-metadata';
import { getIsStartPollInProgress } from '../../data/user-polls-machine';
import { useUserPollsUpdates } from '../../data/user-polls-machine';

const Control = ({ children, ...props }: ControlProps<any, false>) => {
  return (
    <components.Control {...props}>
      <HStack gap={2} p={2}>
        {props.getValue()?.[0]?.answers.map((answer: any) => (
          <PollIcon key={answer.id} iconName={answer.icon} />
        ))}
      </HStack>
      {children}
    </components.Control>
  );
};

const Option = ({
  innerProps,
  isDisabled,
  data,
}: {
  data: any;
  innerProps: any;
  isDisabled: boolean;
}) =>
  !isDisabled ? (
    <div {...innerProps}>
      <HStack gap={2} p={2}>
        {data.answers.map((answer: any) => (
          <PollIcon iconName={answer.icon} />
        ))}
      </HStack>
    </div>
  ) : null;

export const CreatePollsView: React.FC<{}> = () => {
  const { actions } = useUserPollsService();

  const isBusy = useUserPollsUpdates(getIsStartPollInProgress);
  const [pollMetadata, setPollMetadata] = useState(pollsMetadata[0]);
  const [isPrivate, setIsPrivate] = useState(true);

  return (
    <Flex>
      <VStack gap={1} flex={1}>
        <Heading size="md">Create a New Poll</Heading>
        <FormControl>
          <FormLabel>Poll Type</FormLabel>
          <Select
            options={pollsMetadata}
            value={pollMetadata}
            onChange={(item: any) => setPollMetadata(item)}
            components={{ Option, Control }}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Is Private Poll?</FormLabel>
          <Switch
            isChecked={isPrivate}
            onChange={(e) => setIsPrivate(e.currentTarget.checked)}
            colorScheme="blue"
            size="lg"
          />
        </FormControl>
        <Button
          onClick={() => actions.startAPoll(pollMetadata.type, isPrivate)}
          colorScheme="blue"
          isLoading={isBusy}
          type="submit"
        >
          Start a Poll
        </Button>
      </VStack>
    </Flex>
  );
};
