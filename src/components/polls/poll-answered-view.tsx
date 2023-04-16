import { Center } from '@chakra-ui/react';
import React from 'react';
import { Text } from '@chakra-ui/react';

export const PollAnsweredView: React.FC<{}> = () => {
  return (
    <Center w={'100%'} h={'100%'}>
      <Text>Thank you for answering!</Text>
    </Center>
  );
};
