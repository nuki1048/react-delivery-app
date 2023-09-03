import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Text,
  UseToastOptions,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { Dispatch, SetStateAction, useRef, useState, useEffect } from 'react';
import * as Yup from 'yup';
import { View } from '../../global/interfaces';
import { useFormik } from 'formik';
import {
  emailSchema,
  passwordSchema,
  repeatPasswordSchema,
  stringRequiredSchema,
} from '../../lib/yup-utils';
import { auth } from '../../config/firebase';
import { useAppDispatch, useAppSelector } from '../../store';
import { RootState } from '../../store/RootState';
import { User, updateEmail, updatePassword } from 'firebase/auth';
import { changeUserInfo, fetchUserInfo } from '../../store/slices/cabinetSlice';

type Dispatcher<S> = Dispatch<SetStateAction<S>>;

const errorTextStyles = {
  color: '#E53E3E',
  fontSize: 12,
  fontWeight: 400,
  lineHeight: '150%',
};
const inputStyles = {
  background: 'gray.200',
  borderRadius: 'none',
};

const buttonStyles = {
  variant: 'solid',
  colorScheme: 'linkedin',
  padding: '16px 48px',
  borderRadius: '4px',
  fontSize: '16px',
  fontWeight: 'medium',
  lineHeight: '24px',
  width: 'auto',
  height: 'auto',
};

const formStyles = {
  marginTop: '20px',
  display: 'flex',
  gap: '50px',
};

const EditProfileTab = ({
  setView,
}: {
  setView: Dispatcher<View>;
}): JSX.Element => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { userInfo } = useAppSelector((state) => state.cabinet);
  const dispatch = useAppDispatch();

  const [firstName, lastName] = user?.displayName
    ? user.displayName.split(' ')
    : 'FirsName LastName'.split(' ');

  const toastIdRef = useRef<any>(null);
  const toast = useToast();

  const addToast = (toastInfo: UseToastOptions) => {
    toastIdRef.current = toast(toastInfo);
  };

  const onSuccessChange = () => {
    addToast({
      description: 'Your profile updated,to see changes reload page!',
      status: 'success',
      isClosable: true,
    });
    setView('profile');
  };

  const updatePasswordFirebase = async (newPassword: string) => {
    await updatePassword(auth.currentUser as User, newPassword)
      .then(() => {
        console.log('Password Updated');
      })
      .catch((error) => {
        console.log('Password Not Updated', error);
      });
  };

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, []);

  const formik = useFormik({
    initialValues: {
      email: user?.email,
      address: userInfo?.address as string,
      gender: 'male',
      firstName: firstName,
      lastName: lastName,
      newPassword: '',
      repeatNewPassword: '',
    },
    validationSchema: Yup.object({
      email: emailSchema,
      address: stringRequiredSchema,
      gender: Yup.string(),
      firstName: stringRequiredSchema,
      lastName: stringRequiredSchema,
      newPassword: passwordSchema('newPassword', false),
      repeatNewPassword: repeatPasswordSchema('newPassword', false),
    }),
    onSubmit: async (values) => {
      const userInfo = {
        address: values.address,
        gender: values.gender,
        displayName: `${values.firstName} ${values.lastName}`,
      };

      try {
        dispatch(changeUserInfo(userInfo));
        await updateEmail(auth.currentUser as User, values.email as string);

        if (values.newPassword) {
          await updatePasswordFirebase(values.newPassword);
        }
        // TODO: Потрібно яктось це змінити
      } catch (error) {
        return addToast({
          status: 'error',
          description: 'Error, please try again later.',
          isClosable: true,
        });
      }

      onSuccessChange();
    },
  });

  return (
    <Box
      as='section'
      width='870px'
      height='800px'
      padding='40px 80px 35px 80px'
    >
      <Heading
        as='h2'
        fontSize='20px'
        fontWeight='medium'
        lineHeight='28px'
        color='linkedin.600'
      >
        Edit Your Profile
      </Heading>
      <form
        style={{ ...formStyles, flexWrap: 'wrap' }}
        onSubmit={formik.handleSubmit}
      >
        <FormControl width='330px'>
          <FormLabel>First Name*</FormLabel>
          <Input
            onChange={formik.handleChange}
            value={formik.values.firstName}
            onBlur={formik.handleBlur}
            name='firstName'
            type='text'
            placeholder='Md'
            {...inputStyles}
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <Text {...errorTextStyles}>
              {formik.errors.firstName as string}
            </Text>
          ) : null}
        </FormControl>
        <FormControl width='330px'>
          <FormLabel>Last name*</FormLabel>
          <Input
            onChange={formik.handleChange}
            value={formik.values.lastName}
            onBlur={formik.handleBlur}
            name='lastName'
            type='text'
            placeholder='Rimel'
            {...inputStyles}
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <Text {...errorTextStyles}>{formik.errors.lastName as string}</Text>
          ) : null}
        </FormControl>
        <FormControl width='330px'>
          <FormLabel>Email*</FormLabel>
          <Input
            onChange={formik.handleChange}
            value={formik.values.email as string}
            onBlur={formik.handleBlur}
            name='email'
            type='email'
            placeholder='rimel1111@gmail.com'
            {...inputStyles}
          />
          {formik.touched.email && formik.errors.email ? (
            <Text {...errorTextStyles}>{formik.errors.email as string}</Text>
          ) : null}
        </FormControl>
        <FormControl width='330px'>
          <FormLabel>Address*</FormLabel>

          <Input
            onChange={formik.handleChange}
            value={formik.values.address}
            onBlur={formik.handleBlur}
            name='address'
            type='text'
            placeholder='Kingston, 5236, United State'
            {...inputStyles}
          />
          {formik.touched.address && formik.errors.address ? (
            <Text {...errorTextStyles}>{formik.errors.address}</Text>
          ) : null}
        </FormControl>
        <FormControl width='278px'>
          <FormLabel>Gender</FormLabel>
          <RadioGroup
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            defaultValue={formik.values.gender}
          >
            <HStack spacing='24px'>
              <Radio value='male'>Male</Radio>
              <Radio value='female'>Female</Radio>
            </HStack>
            {formik.touched.gender && formik.errors.gender ? (
              <Text {...errorTextStyles}>{formik.errors.gender}</Text>
            ) : null}
          </RadioGroup>
        </FormControl>
        <VStack spacing='16px' width='full'>
          <FormControl width='100%'>
            <Input
              onChange={formik.handleChange}
              value={formik.values.newPassword}
              onBlur={formik.handleBlur}
              placeholder='New Password'
              name='newPassword'
              type='password'
              {...inputStyles}
            />
            {formik.touched.newPassword && formik.errors.newPassword ? (
              <Text {...errorTextStyles}>{formik.errors.newPassword}</Text>
            ) : null}
          </FormControl>
          <FormControl width='100%'>
            <Input
              onChange={formik.handleChange}
              value={formik.values.repeatNewPassword}
              onBlur={formik.handleBlur}
              placeholder='Confirm New Password'
              name='repeatNewPassword'
              type='password'
              {...inputStyles}
            />
            {formik.touched.repeatNewPassword &&
            formik.errors.repeatNewPassword ? (
              <Text {...errorTextStyles}>
                {formik.errors.repeatNewPassword}
              </Text>
            ) : null}
          </FormControl>
        </VStack>
        <HStack marginTop='70px' marginLeft='auto' spacing='32px'>
          <Button
            type='button'
            variant='ghost'
            onClick={() => setView('profile')}
          >
            Cancel
          </Button>
          <Button type='submit' {...buttonStyles}>
            Save Changes
          </Button>
        </HStack>
      </form>
    </Box>
  );
};

export default EditProfileTab;
