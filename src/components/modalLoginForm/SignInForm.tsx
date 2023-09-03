import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { auth } from '../../config/firebase';
import { User } from '../../global/interfaces';
import { useAppDispatch } from '../../store';
import { signIn } from '../../store/slices/authSlice';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { modalLoginFormButton } from '../../theme/styles';
import { ModalProps } from '../ModalTemplate/ModalTemplate.props';

interface userLogin {
  email: string;
  password: string;
}

const SignInForm = ({ onClose }: ModalProps): JSX.Element => {
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  const [type, setType] = useState<boolean>(true);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    } as userLogin,
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Incorrectly entered mail!')
        .required('Mandatory field'),
      password: Yup.string()
        .min(7, 'Minimum password length 7!')
        .required('Required field'),
    }),
    onSubmit: async (values: userLogin) => {
      setError(null);
      signInWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          const user = userCredential.user;

          dispatch(signIn(user));
          formik.resetForm();
          onClose();
        })
        .catch((error) => {
          const errorMessage = error.message;
          setError(errorMessage);
        });
    },
  });

  const setTypePassword = () => {
    // eslint-disable-next-line no-shadow
    setType((type) => !type);
  };

  const changeTypeInput = type ? 'password' : 'text';

  return (
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
          <Checkbox id='checbox_password' onChange={() => setTypePassword()} />
          <FormLabel m='0' htmlFor='checbox_password'>
            Show password?
          </FormLabel>
        </Flex>
        <Button {...modalLoginFormButton} type='submit'>
          Log in
        </Button>
        {error && (
          <p style={{ padding: '20px 0', color: 'red', fontSize: '14pxw' }}>
            {error}
          </p>
        )}
      </VStack>
    </form>
  );
};

export default SignInForm;
