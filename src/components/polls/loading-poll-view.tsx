import { Center, CircularProgress } from '@chakra-ui/react';
import React from 'react';

export const LoadingPollView: React.FC<{}> = () => {
  return (
    <Center w={'100%'} h={'100%'}>
      <CircularProgress isIndeterminate={true} color="blue.500" />
    </Center>
  );
};
