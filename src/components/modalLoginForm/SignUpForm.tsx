import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { auth, db } from '../../config/firebase';
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
import {
  emailSchema,
  passwordSchema,
  repeatPasswordSchema,
} from '../../lib/yup-utils';
import { doc, setDoc } from 'firebase/firestore';

const SignUpForm = ({ onClose }: ModalProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const [type, setType] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      displayName: '',
      email: '',
      password: '',
      repeatPassword: '',
    },
    validationSchema: Yup.object({
      displayName: Yup.string()
        .min(1, 'Minimum password length 1!')
        .required('Required field'),
      email: emailSchema,
      password: passwordSchema('password', true),
      repeatPassword: repeatPasswordSchema('password', true),
    }),
    onSubmit: async (values) => {
      setError(null);
      createUserWithEmailAndPassword(auth, values.email, values.password)
        .then(async (userCredential) => {
          await updateProfile(userCredential.user, {
            displayName: values.displayName,
          });
          const user = userCredential.user;
          const docRef = doc(db, 'USERS', user?.uid as string);

          await setDoc(docRef, { displayName: values.displayName });

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
    setType((type) => !type);
  };

  const changeTypeInput = type ? 'password' : 'text';

  return (
    <form onSubmit={formik.handleSubmit}>
      <VStack spacing='4' align='center'>
        <FormControl>
          <FormLabel htmlFor='email'>Display Name</FormLabel>
          <Input
            name='displayName'
            type='text'
            onChange={formik.handleChange}
            value={formik.values.displayName}
            onBlur={formik.handleBlur}
          />
          {formik.touched.displayName && formik.errors.displayName ? (
            <Box color='#E53E3E' mt='15px'>
              {formik.errors.displayName}
            </Box>
          ) : null}
        </FormControl>
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
        <FormControl>
          <FormLabel htmlFor='repeat-password'>Repeat Password</FormLabel>
          <Input
            id='repeat-password'
            name='repeatPassword'
            type='password'
            variant='filled'
            onChange={formik.handleChange}
            value={formik.values.repeatPassword}
            onBlur={formik.handleBlur}
          />

          {formik.touched.repeatPassword && formik.errors.repeatPassword ? (
            <Box color='#E53E3E' mt='15px'>
              {formik.errors.repeatPassword}
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

export default SignUpForm;
