import { Center, Text } from '@chakra-ui/react';
import React, { PropsWithChildren, useMemo } from 'react';
import { AppContainer } from './components/app-container';
import { PollsProvider } from './data/polls-machine/polls-provider';
import { UsersProvider } from './data/users-machine/users-provider';
import { UserPollsProvider } from './data/user-polls-machine';

export const AppContext = React.createContext<{
  appInstance: string;
  inspectEnabled: boolean;
}>({
  appInstance: '',
  inspectEnabled: false,
});

export const DelayedContent: React.FC<PropsWithChildren> = ({ children }) => {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    setShow(true);
    // setTimeout(() => {
    //   setShow(true);
    // }, 5000);
  }, []);

  return show ? (
    <>{children}</>
  ) : (
    <Center>
      <Text textAlign={'center'} w={'70%'}>
        Simulating deferred provider mounting (5 seconds) with external
        information (e.g. user authentication)
      </Text>
    </Center>
  );
};

export const App: React.FC<{
  appInstance: string;
}> = ({ appInstance }) => {
  const providerValue = useMemo(() => {
    return {
      appInstance,
      inspectEnabled:
        appInstance ===
        (localStorage.getItem('sakalim-xstate-inspect') || 'app-instance-1'),
    };
  }, [appInstance]);

  return (
    <AppContext.Provider value={providerValue}>
      <UsersProvider>
        <DelayedContent>
          <UserPollsProvider>
            <PollsProvider>
              <AppContainer />
            </PollsProvider>
          </UserPollsProvider>
        </DelayedContent>
      </UsersProvider>
    </AppContext.Provider>
  );
};
