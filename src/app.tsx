import React, { useMemo } from 'react';
import { AppContainer } from './components/app-container';
import { PollsProvider } from './data/polls-machine/polls-provider';
import { UsersProvider } from './data/users-machine/users-provider';

export const AppContext = React.createContext<{
  appInstance: string;
  inspectEnabled: boolean;
}>({
  appInstance: '',
  inspectEnabled: false,
});

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
  }, []);

  return (
    <AppContext.Provider value={providerValue}>
      <UsersProvider>
        <PollsProvider>
          <AppContainer />
        </PollsProvider>
      </UsersProvider>
    </AppContext.Provider>
  );
};
