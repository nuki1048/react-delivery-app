import { Flex, Heading, Text } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { Link, useParams } from 'react-router-dom';
import AppContainer from '../../appContainer/AppContainer';
import AppHeader from '../../appHeader/AppHeader';
import AnimatedComponent from '../../animatedComponent/AnimatedComponent';

function OrderThanksPage(): JSX.Element {
  const { orderNum } = useParams();

  return (
    <AnimatedComponent>
      <AppHeader />
      <AppContainer>
        <Flex
          p={{ base: '100px 0 330px 0', md: '200px 0 330px 0' }}
          flexDirection='column'
          align='center'
          justify='space-between'
        >
          <Heading fontSize={{ base: '33px', md: '42px' }} as='h2'>
            Order No. {orderNum} has been accepted for work
          </Heading>{' '}
          <Text mt='30px' fontSize='24px' lineHeight='16px'>
            {' '}
            We'll be in touch =)
          </Text>
          <CheckIcon mt='30px' color='green' w={40} h={40} />
          <Link to='/'>
            <Text
              borderBottom='1px solid'
              mt='50px'
              fontSize={{ base: '20px', md: '32px' }}
            >
              Link to home page
            </Text>
          </Link>
        </Flex>
      </AppContainer>
    </AnimatedComponent>
  );
}

export default OrderThanksPage;
