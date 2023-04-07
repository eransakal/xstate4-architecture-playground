import React, { useContext } from 'react';
import {
  MenuGroup,
  MenuItem,
  MenuOptionGroup,
  MenuList,
  MenuDivider,
  MenuItemOption,
  Menu,
  MenuButton,
  Avatar,
  Text,
  IconButton,
  Badge,
  Box,
  Flex,
  Button,
  HStack,
  Stack,
} from '@chakra-ui/react';
import { useSelector } from '@xstate/react';
import { getOwnUser } from '../data/users-machine/machine-selectors';
import { HamburgerIcon } from '@chakra-ui/icons';
import { UserAvatar } from './users/user-avatar';
import { useUsersService } from '../data/users-machine/use-users-service';
import { AppContext } from '../app';

export const Header: React.FC<{}> = () => {
  const {
    usersMachineService,
    actions: { showList },
  } = useUsersService();
  const { inspectEnabled } = useContext(AppContext);
  const ownUser = useSelector(usersMachineService, getOwnUser);

  return (
    ownUser && (
      <Flex>
        <Box mr={1} display={['none', 'block']}>
          <UserAvatar
            fullName={ownUser.name}
            isOnline={true}
            avatarUrl={ownUser.avatar ?? null}
          />
        </Box>
        <Flex
          flex="1"
          gap="1"
          alignItems="flex-start"
          flexWrap="wrap"
          flexDirection={'column'}
        >
          <Flex flexWrap={'wrap'}>
            <Text fontWeight="bold" mr={1}>
              {ownUser?.name}
            </Text>
            {ownUser?.isAdmin && (
              <Box mr={2}>
                <Badge colorScheme="blue">Admin</Badge>
              </Box>
            )}
            {inspectEnabled && (
              <Box>
                <Badge colorScheme="yellow">XState Inspectated</Badge>
              </Box>
            )}
          </Flex>
          <Text>
            {ownUser?.title && <Text fontSize="sm">{ownUser.title}</Text>}
          </Text>
        </Flex>
        <HStack gap={2}>
          <Button size="xs" color="red" isDisabled={true}>
            Disconnect
          </Button>
          <Menu>
            <MenuButton
              colorScheme="blue"
              size="xs"
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon />}
              variant="outline"
            />
            <MenuList minWidth="240px">
              {ownUser.isAdmin && (
                <>
                  <MenuGroup title="Administrator">
                    <MenuItem onClick={showList}>Manage Users</MenuItem>
                  </MenuGroup>
                  <MenuDivider />
                </>
              )}

              <MenuOptionGroup
                defaultValue="online"
                title="Network Status"
                type="radio"
              >
                <MenuItemOption isDisabled={true} value="online">
                  Online
                </MenuItemOption>
                <MenuItemOption isDisabled={true} value="offline">
                  Offline
                </MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>
    )
  );
};
