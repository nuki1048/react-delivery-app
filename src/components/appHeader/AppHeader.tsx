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
import {
  appHeaderButton,
  appHeaderInput,
  appHeaderInputGroup,
  appHeaderWrapper,
} from '../../theme/styles';
import { useAppDispatch, useAppSelector } from '../../store';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { signOut as signOutRedux } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
function AppHeader(): JSX.Element {
  const modalLogin = useDisclosure();
  const modalCart = useDisclosure();
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const navigateToCabinet = () => {
    navigate('/cabinet');
  };
  return (
    <header>
      <AppContainer>
        <Flex {...appHeaderWrapper}>
          <AppLogo />
          <InputGroup {...appHeaderInputGroup}>
            <InputLeftElement
              top='-2px'
              fontSize='1.7em'
              pointerEvents='none'
              color='gray.300'
              children='⌂'
            />
            <Input {...appHeaderInput} />
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
            {!user && (
              <Button onClick={modalLogin.onOpen} {...appHeaderButton}>
                Sign in
              </Button>
            )}
            {user && (
              <Button onClick={navigateToCabinet} {...appHeaderButton}>
                Cabinet
              </Button>
            )}
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
    </header>
  );
}
export default AppHeader;
