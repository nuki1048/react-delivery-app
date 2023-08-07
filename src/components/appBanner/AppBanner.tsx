import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import AppContainer from '../appContainer/AppContainer';
import appBanerBg from '../../assets/appBannerBg.png';
import {
  breackpointsBannerWidth,
  breackpointsBannerPadding,
} from '../../theme/breakpoints';

function AppBanner(): JSX.Element {
  return (
    <AppContainer>
      <Box
        w={breackpointsBannerWidth}
        h={{ base: '220px', md: '300px' }}
        mt='40px'
        borderRadius='10px'
        padding={breackpointsBannerPadding}
        background={{
          base: '#FFF1B8',
          md: `url(${appBanerBg}) #FFF1B8 right no-repeat`,
        }}
      >
        <Heading
          as='h1'
          fontWeight='700'
          fontSize={{ base: '20px', sm: '25px', xl: '39px' }}
          lineHeight={{ base: '28px', xl: '46px' }}
          textAlign='left'
        >
          Online home delivery service
        </Heading>

        <Text
          fontWeight='400'
          fontSize={{ base: '17px', sm: '24px' }}
          lineHeight='28px'
          textAlign='left'
          mt='15px'
        >
          Meals from your favourite restaurant will be delivered by a courier
          wearing gloves, a mask and with antiseptic
        </Text>
      </Box>
    </AppContainer>
  );
}

export default AppBanner;
