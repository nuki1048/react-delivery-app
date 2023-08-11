import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import AppContainer from '../appContainer/AppContainer';
import appBanerBg from '../../assets/appBannerBg.png';
import {
  breackpointsBannerWidth,
  breackpointsBannerPadding,
} from '../../theme/breakpoints';
import {
  appBannerHeading,
  appBannerText,
  appBannerWrapper,
} from '../../theme/styles';

function AppBanner(): JSX.Element {
  return (
    <AppContainer>
      <Box
        {...appBannerWrapper}
        background={{
          base: '#FFF1B8',
          md: `url(${appBanerBg}) #FFF1B8 right no-repeat`,
        }}
      >
        <Heading as='h1' {...appBannerHeading} textAlign='left'>
          Online home delivery service
        </Heading>

        <Text {...appBannerText} textAlign='left'>
          Meals from your favourite restaurant will be delivered by a courier
          wearing gloves, a mask and with antiseptic
        </Text>
      </Box>
    </AppContainer>
  );
}

export default AppBanner;
