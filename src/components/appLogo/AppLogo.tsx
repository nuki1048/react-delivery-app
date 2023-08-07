import React from 'react';
import { Box, Image, Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';

function AppLogo(): JSX.Element {
  return (
    <Link to='/'>
      <Box
        display='flex'
        w='100px'
        transition='0.8s all'
        _hover={{ transform: 'scale(1.02)' }}
      >
        <Image src={logo} alt='Delivery Food Logo' />
        <Heading as='h2' fontWeight='400' fontSize='15px' lineHeight='18px'>
          Delivery Food
        </Heading>
      </Box>
    </Link>
  );
}

export default AppLogo;
