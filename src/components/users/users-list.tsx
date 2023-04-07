import {
  CircularProgress,
  Switch,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useSelector } from '@xstate/react';
import React from 'react';
import { getUsers } from '../../data/users-machine/machine-selectors';
import { useUsersService } from '../../data/users-machine/use-users-service';
import { UserAvatar } from './user-avatar';

export const UsersList: React.FC = () => {
  const {
    usersMachineService,
    actions: { updateUserStatus },
  } = useUsersService();
  const users = useSelector(usersMachineService, getUsers);

  return (
    <TableContainer>
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th></Th>
            <Th>Is Admin</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user) => (
            <Tr key={user.id}>
              <Td>
                <UserAvatar
                  size="sm"
                  avatarUrl={user.avatar || ''}
                  fullName={user.name}
                />
              </Td>
              <Td>{user.name}</Td>
              <Td>
                {user.updateStatusRef ? (
                  <CircularProgress isIndeterminate size="24px" />
                ) : (
                  <Switch
                    isChecked={user.isAdmin}
                    onChange={(e) =>
                      updateUserStatus(user.id, e.currentTarget.checked)
                    }
                  />
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>Name</Th>
            <Th></Th>
            <Th>Is Admin</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};
