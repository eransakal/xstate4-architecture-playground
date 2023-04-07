import {
  Box,
  Card,
  CardBody,
  CardHeader,
  CloseButton,
  Heading,
  HStack,
} from '@chakra-ui/react';
import { useUsersService } from '../../data/users-machine/use-users-service';
import { UsersList } from './users-list';

export const UsersModal: React.FC = () => {
  const {
    actions: { hideList },
  } = useUsersService();
  return (
    <Box
      scrollBehavior={'unset'}
      position="absolute"
      top={0}
      left={0}
      w="100%"
      h="100%"
      background={'rgba(0,0,0,0.4)'}
      p={8}
      overflow="auto"
    >
      <Card overflow={'hidden'}>
        <CardHeader>
          <HStack>
            <Heading flex="1" size={'md'}>
              Users
            </Heading>
            <CloseButton onClick={hideList} />
          </HStack>
        </CardHeader>
        <CardBody>
          <UsersList />
        </CardBody>
      </Card>
    </Box>
  );
};
