import {
  Flex,
  Input,
  ButtonGroup,
  Button,
  InputGroup,
  InputLeftElement,
  useDisclosure,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  IconButton,
} from '@chakra-ui/react';

import { ExternalLinkIcon, HamburgerIcon, AtSignIcon } from '@chakra-ui/icons';

import AppContainer from '../appContainer/AppContainer';
import ModalTemplate from '../ModalTemplate/ModalTemplate';
import ModalLoginForm from '../modalLoginForm/ModalLoginForm';
import ModalCart from '../modalCart/ModalCart';
import AppLogo from '../appLogo/AppLogo';

function AppHeader(): JSX.Element {
  const modalLogin = useDisclosure();
  const modalCart = useDisclosure();
  return (
    <AppContainer>
      <Flex
        alignItems='center'
        justify='space-between'
        w='1200px'
        h='40px'
        mt='44px'
      >
        <AppLogo />
        <InputGroup
          w={{
            base: '120px',
            sm: '120px',
            md: '250px',
            lg: '400px',
            xl: '640px',
          }}
          display={{ base: 'none', sm: 'block' }}
        >
          <InputLeftElement
            top='-2px'
            fontSize='1.7em'
            pointerEvents='none'
            color='gray.300'
            // eslint-disable-next-line react/no-children-prop
            children='⌂'
          />
          <Input
            filter=' drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));'
            borderRadius='2px'
            placeholder='Shipping address'
          />
        </InputGroup>

        <Menu>
          <MenuButton
            as={IconButton}
            aria-label='Options'
            icon={<HamburgerIcon />}
            variant='outline'
            display={{ base: 'block', md: 'none' }}
          />
          <MenuList width='full'>
            <MenuItem
              icon={<AtSignIcon />}
              command='⌘T'
              onClick={modalLogin.onOpen}
            >
              Log in{' '}
            </MenuItem>
            <MenuItem
              icon={<ExternalLinkIcon />}
              command='⌘N'
              onClick={modalCart.onOpen}
            >
              Shopping cart
            </MenuItem>
          </MenuList>
        </Menu>
        <ButtonGroup display={{ base: 'none', md: 'flex' }}>
          <Button
            onClick={modalLogin.onOpen}
            backgroundColor='brand.blue'
            color='#fff'
            borderRadius='2px'
          >
            Sign in
          </Button>
          <ModalTemplate
            isOpen={modalLogin.isOpen}
            onClose={modalLogin.onClose}
            Component={ModalLoginForm}
            dataType='modalLogin'
          />
          <Button
            onClick={modalCart.onOpen}
            borderRadius='2px'
            colorScheme='gray'
            variant='outline'
          >
            Shopping cart
          </Button>
          <ModalTemplate
            isOpen={modalCart.isOpen}
            onClose={modalCart.onClose}
            Component={ModalCart}
            dataType='modalCart'
          />
        </ButtonGroup>
      </Flex>
    </AppContainer>
  );
}
export default AppHeader;
