import { Box, Heading } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedComponent from '../../animatedComponent/AnimatedComponent';
import AppFooter from '../../appFooter/AppFooter';
import AppHeader from '../../appHeader/AppHeader';
import ErrorMessage from '../../errorMessage/ErrorMessage';

function ErrorPage(): JSX.Element {
  return (
    <AnimatedComponent>
      <AppHeader />
      <Box m='70px 0 '>
        <ErrorMessage style={{ margin: '0 auto' }} />
        <Box textAlign='center'>
          <Heading as='h3' textAlign='center' m='40px 0'>
            Error{' '}
          </Heading>
          <Link style={{ borderBottom: '2px solid' }} to='/'>
            Back to home page
          </Link>
        </Box>
      </Box>
      <AppFooter />
    </AnimatedComponent>
  );
}

export default ErrorPage;
