import { Center } from '@chakra-ui/react';
import React from 'react';
import { Text } from '@chakra-ui/react';

export const InactiveView: React.FC<{}> = () => {
  return (
    <Center w={'100%'} h={'100%'}>
      <Text>Waiting for a poll to start</Text>
    </Center>
  );
};
