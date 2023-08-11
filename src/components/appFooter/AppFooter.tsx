import { Box, Flex, UnorderedList, ListItem, Image } from '@chakra-ui/react';
import AppLogo from '../appLogo/AppLogo';
import AppContainer from '../appContainer/AppContainer';
import instagram from '../../assets/instagram.svg';

import {
  appFooterParent,
  appFooterUl,
  appFooterWrapper,
} from '../../theme/styles';

function AppFooter(): JSX.Element {
  const listItemStyle = { _hover: { borderBottom: '1px solid' } };
  return (
    <Box as='footer' {...appFooterParent}>
      <AppContainer>
        <Flex
          {...appFooterWrapper}
          flexDirection={{ base: 'column', md: 'row' }}
        >
          <AppLogo />
          <UnorderedList {...appFooterUl} flexWrap='wrap'>
            <ListItem {...listItemStyle}>Restaurants </ListItem>
            <ListItem {...listItemStyle}>Couriers</ListItem>
            <ListItem {...listItemStyle}>Press-Centre</ListItem>
            <ListItem {...listItemStyle}>Contacts</ListItem>
          </UnorderedList>
          <Flex
            w='127px'
            mt={{ base: '20px', md: '0' }}
            justify='space-between'
          >
            <Image src={instagram} />
            <Image src={instagram} />
            <Image src={instagram} />
          </Flex>
        </Flex>
      </AppContainer>
    </Box>
  );
}

export default AppFooter;
