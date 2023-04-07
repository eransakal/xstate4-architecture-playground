import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Box, ChakraProvider, Container, Flex, Grid } from '@chakra-ui/react';
import { App } from './app';
import { serverMocks } from './server-mocks/server-mocks';
import { inspect } from '@xstate/inspect';

import reportWebVitals from './reportWebVitals';
import { AppHeader } from './app-header';

if (localStorage.getItem('sakalim-xstate-inspect') !== 'disabled') {
  inspect({
    iframe: false,
  });
}

serverMocks.setup();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <Container maxW="container.xl" h="100vh">
        <Grid
          p={2}
          h="100vh"
          templateRows={[
            '50px repeat(4, minmax(400px, 1fr))',
            '50px repeat(2, minmax(0, 1fr))',
          ]}
          templateColumns={['1fr', 'repeat(2, minmax(0, 1fr))']}
          gap={[4, 2]}
        >
          <Flex
            background="blue.50"
            gridColumnEnd={[1, 3]}
            gridColumnStart={1}
            justifyContent="flex-end"
            alignItems={'center'}
            p="20px"
          >
            <AppHeader />
          </Flex>
          <App appInstance="app-instance-1" />
          <App appInstance="app-instance-2" />
          <App appInstance="app-instance-3" />
          <App appInstance="app-instance-4" />
        </Grid>
      </Container>
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
