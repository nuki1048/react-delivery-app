import PropsTypes from 'prop-types';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useRef, useState } from 'react';
import { ModalProps } from '../ModalTemplate/ModalTemplate.props';

function ModalLoginForm({ onClose }: ModalProps): JSX.Element {
  const toast = useToast();
  const toastIdRef = useRef();
  const [type, setType] = useState(true);
  const addToast = (values) => {
    toastIdRef.current = toast({
      description: `Hello ${values}, you have logged in successfully`,
      status: 'success',
      isClosable: true,
    });
  };
  // object Formik for validation and submiting
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Incorrectly entered mail!')
        .required('Mandatory field'),
      password: Yup.string()
        .min(7, 'Minimum password length 7!')
        .required('Required field'),
    }),
    onSubmit: (values) => {
      formik.resetForm({ name: '', email: '' });
      addToast(values.email);
      onClose();
    },
  });

  // for change type input
  const setTypePassword = () => {
    // eslint-disable-next-line no-shadow
    setType((type) => !type);
  };

  const changeTypeInput = type ? 'password' : 'text';

  return (
    <>
      <Heading as='h3' mt='20px' fontSize='23px' textAlign='center'>
        Log in to profile
      </Heading>
      <Flex mt='20px' align='center' justify='center'>
        <form onSubmit={formik.handleSubmit}>
          <VStack spacing='4' align='center'>
            <FormControl>
              <FormLabel htmlFor='email'>Email</FormLabel>
              <Input
                name='email'
                type='email'
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <Box color='#E53E3E' mt='15px'>
                  {formik.errors.email}
                </Box>
              ) : null}
            </FormControl>

            <FormControl>
              <FormLabel htmlFor='password'>Password</FormLabel>
              <Input
                id='password'
                name='password'
                type={changeTypeInput}
                variant='filled'
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password ? (
                <Box color='#E53E3E' mt='15px'>
                  {formik.errors.password}
                </Box>
              ) : null}
            </FormControl>

            <Flex w='170px' justify='space-evenly'>
              <Checkbox
                id='checbox_password'
                onChange={() => setTypePassword()}
              />
              <FormLabel m='0' htmlFor='checbox_password'>
                Show password?
              </FormLabel>
            </Flex>
            <Button
              backgroundColor='brand.blue'
              color='#fff'
              borderRadius='2px'
              type='submit'
            >
              Log in
            </Button>
          </VStack>
        </form>
      </Flex>
    </>
  );
}
ModalLoginForm.propTypes = {
  onClose: PropsTypes.func.isRequired,
};

export default ModalLoginForm;
