import { Box, Image, Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { logoText, logoWrapper } from '../../theme/styles';

function AppLogo(): JSX.Element {
  return (
    <Link to='/'>
      <Box {...logoWrapper}>
        <Image src={logo} alt='Delivery Food Logo' />
        <Heading as='h2' {...logoText}>
          Delivery Food
        </Heading>
      </Box>
    </Link>
  );
}

export default AppLogo;
