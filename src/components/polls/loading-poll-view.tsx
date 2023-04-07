import {
  Badge,
  Button,
  Card,
  Center,
  CircularProgress,
  HStack,
} from '@chakra-ui/react';
import React from 'react';
import { Text } from '@chakra-ui/react';

export const LoadingPollView: React.FC<{}> = () => {
  return (
    <Center w={'100%'} h={'100%'}>
      <CircularProgress isIndeterminate color="blue.500" />
    </Center>
  );
};
