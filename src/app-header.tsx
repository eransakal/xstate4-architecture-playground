import { ChevronDownIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
  Button,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import { AppContext } from './app';

export const AppHeader: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure({});

  const select = (appInstance: string) => {
    try {
      localStorage.setItem('sakalim-xstate-inspect', appInstance);
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Modal
        onClose={onClose}
        size={['xs', 'sm']}
        isOpen={isOpen}
        isCentered={true}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>XState Inspection Tools</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack alignItems={'stretch'} gap={2} mb={4}>
              <Text>
                Enable the{' '}
                <Link
                  color={'blue.400'}
                  href="https://xstate.js.org/docs/packages/xstate-inspect/"
                  target="_blank"
                >
                  XState inspection tools
                </Link>{' '}
                for a specific application below.
              </Text>
              <Text as={'b'}>
                Selecting a user will reload the browser tab.
              </Text>
              <Grid templateColumns={'1fr 100px'} gap={6}>
                <GridItem>
                  <Text color="gray.500">Disable inspection tools</Text>
                </GridItem>
                <GridItem>
                  <Button size="sm" onClick={() => select('disabled')}>
                    Select
                  </Button>
                </GridItem>
                <GridItem>Stas Kogut</GridItem>
                <GridItem>
                  <Button size="sm" onClick={() => select('app-instance-1')}>
                    Select
                  </Button>
                </GridItem>
                <GridItem>Anna Yurkevych</GridItem>
                <GridItem>
                  <Button size="sm" onClick={() => select('app-instance-2')}>
                    Select
                  </Button>
                </GridItem>
                <GridItem>Tornike Menabde</GridItem>
                <GridItem>
                  <Button size="sm" onClick={() => select('app-instance-3')}>
                    Select
                  </Button>
                </GridItem>
                <GridItem>Eran Sakal</GridItem>
                <GridItem>
                  <Button size="sm" onClick={() => select('app-instance-4')}>
                    Select
                  </Button>
                </GridItem>
              </Grid>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          colorScheme="blue"
          size="xs"
        >
          Actions
        </MenuButton>
        <MenuList minWidth="240px">
          <>
            <MenuGroup title="Diagnostics">
              <MenuItem onClick={onOpen}>XState Inspection Tools</MenuItem>
            </MenuGroup>
            <MenuDivider />
          </>

          <>
            <MenuGroup title="Simulate Problems">
              <MenuItem isDisabled={true}>
                Fail loading application users
              </MenuItem>
              <MenuItem isDisabled={true}>Fail loading poll status</MenuItem>
              <MenuItem isDisabled={true}>Fail starting a poll</MenuItem>
              <MenuItem isDisabled={true}>Fail answering a poll</MenuItem>
              <MenuItem isDisabled={true}>Fail ending a poll</MenuItem>
              <MenuItem isDisabled={true}>Fail changing user status</MenuItem>
            </MenuGroup>
            <MenuDivider />
          </>

          <MenuOptionGroup
            defaultValue="online"
            title="Server Status"
            type="radio"
          >
            <MenuItemOption isDisabled={true} value="online">
              Online
            </MenuItemOption>
            <MenuItemOption isDisabled={true} value="offline">
              Offline
            </MenuItemOption>
          </MenuOptionGroup>

          <>
            <MenuDivider />
            <MenuGroup title="References">
              <MenuItem
                onClick={() => {
                  window.open('https://xstate.js.org/docs/', '_blank');
                }}
              >
                XState documentations
              </MenuItem>
              <MenuItem
                onClick={() => {
                  window.open(
                    'https://chakra-ui.com/getting-started',
                    '_blank'
                  );
                }}
              >
                Chakra UI
              </MenuItem>
            </MenuGroup>
          </>
        </MenuList>
      </Menu>
    </>
  );
};
