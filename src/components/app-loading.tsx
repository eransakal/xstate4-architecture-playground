import { Center, CircularProgress } from '@chakra-ui/react';
import React from 'react';

export const AppLoading: React.FC<{}> = () => {
  return (
    <Center w={'100%'} h={'100%'}>
      <CircularProgress isIndeterminate={true} />
    </Center>
  );
};
