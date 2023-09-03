import PropsTypes from 'prop-types';
import { Flex, Heading } from '@chakra-ui/react';

import { ModalProps } from '../ModalTemplate/ModalTemplate.props';

import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import { useState } from 'react';

type AuthType = 'sign-in' | 'sign-up';

function ModalLoginForm({ onClose }: ModalProps): JSX.Element {
  const [authType, setAuthType] = useState<AuthType>('sign-in');

  const text = {
    textDecoration: 'underline',
    cursor: 'pointer',
    marginTop: '10px',
  };
  const padding = {
    padding: '20px 0',
  };

  return (
    <>
      <Heading as='h3' mt='20px' fontSize='23px' textAlign='center'>
        Log in to profile
      </Heading>
      <Flex mt='20px' align='center' justify='center' flexDirection='column'>
        {authType === 'sign-in' && <SignInForm onClose={onClose} />}
        {authType === 'sign-up' && <SignUpForm onClose={onClose} />}
        {authType === 'sign-in' && (
          <p style={padding}>
            Don't have an account?
            <span
              style={{ ...text, textAlign: 'center' }}
              onClick={() => setAuthType('sign-up')}
            >
              Sign up
            </span>
          </p>
        )}
        {authType === 'sign-up' && (
          <p style={padding}>
            Already have an account?
            <br />
            <span
              style={{ ...text, textAlign: 'center', display: 'block' }}
              onClick={() => setAuthType('sign-in')}
            >
              Login to profile
            </span>
          </p>
        )}
      </Flex>
    </>
  );
}
ModalLoginForm.propTypes = {
  onClose: PropsTypes.func.isRequired,
};

export default ModalLoginForm;
