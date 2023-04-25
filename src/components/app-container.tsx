import { CardHeader, CardBody, Card } from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';
import {
  getOwnUser,
  getShouldShowList,
} from '../data/users-machine/machine-selectors';
import { Header } from './header';
import { PollsViews } from './polls/polls-views';
import { AppLoading } from './app-loading';
import { UsersModal } from './users/users-modal';
import { useUsersUpdates } from '../data/users-machine';

export const AppContainer: React.FC<PropsWithChildren> = ({ children }) => {
  const { ownUser, shouldShowList } = useUsersUpdates({
    ownUser: getOwnUser,
    shouldShowList: getShouldShowList,
  });

  return !ownUser ? (
    <AppLoading />
  ) : (
    <Card
      overflow={'auto'}
      variant="filled"
      background={ownUser?.isAdmin ? 'blue.50' : 'gray.50'}
    >
      <CardHeader>
        <Header />
      </CardHeader>
      <CardBody>
        <PollsViews />
        {shouldShowList && <UsersModal />}
      </CardBody>
    </Card>
  );
};
