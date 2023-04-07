import { CardHeader, CardBody, Card } from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';
import { useSelector } from '@xstate/react';
import {
  getOwnUser,
  getShouldShowList,
} from '../data/users-machine/machine-selectors';
import { Header } from './header';
import { PollsViews } from './polls/polls-views';
import { AppLoading } from './app-loading';
import { useUsersService } from '../data/users-machine/use-users-service';
import { UsersModal } from './users/users-modal';

export const AppContainer: React.FC<PropsWithChildren> = ({ children }) => {
  const { usersMachineService } = useUsersService();
  const ownUser = useSelector(usersMachineService, getOwnUser);
  const shouldShowList = useSelector(usersMachineService, getShouldShowList);

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
