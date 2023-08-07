import { Box, Flex, UnorderedList, ListItem, Image } from '@chakra-ui/react';
import React from 'react';
import AppLogo from '../appLogo/AppLogo';
import AppContainer from '../appContainer/AppContainer';
import instagram from '../../assets/instagram.svg';
import {
  breackpointsAppFooterFlex,
  breackpointsAppFooterList,
  breackpointsAppFooterPadding,
  breakpointsFooterFlex,
  breakpointsFooterListMargin,
} from '../../theme/breakpoints';

function AppFooter(): JSX.Element {
  return (
    <Box h={{ base: 'full', md: '150px' }} p={breackpointsAppFooterPadding}>
      <AppContainer>
        <Flex
          w='full'
          flexDirection={breackpointsAppFooterFlex}
          align='center'
          justify='space-between'
        >
          <AppLogo />
          <UnorderedList
            display='flex'
            listStyleType='none'
            w={breackpointsAppFooterList}
            flexWrap='wrap'
            justifyContent={breakpointsFooterFlex}
            mr='auto'
            m={breakpointsFooterListMargin}
          >
            <ListItem _hover={{ borderBottom: '1px solid' }}>
              Restaurants{' '}
            </ListItem>
            <ListItem _hover={{ borderBottom: '1px solid' }}>Couriers</ListItem>
            <ListItem _hover={{ borderBottom: '1px solid' }}>
              Press-Centre
            </ListItem>
            <ListItem _hover={{ borderBottom: '1px solid' }}>Contacts</ListItem>
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
