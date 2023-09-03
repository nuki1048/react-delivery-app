import { Box, Button, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import EditProfileTab from '../editProfileTab/editProfileTab';
import { View } from '../../global/interfaces';
import { signOut as signOutRedux } from '../../store/slices/authSlice';

import { useAppDispatch, useAppSelector } from '../../store';
import { auth } from '../../config/firebase';
import { signOut } from 'firebase/auth';
const ProfileInfoTab = (): JSX.Element => {
  const [view, setView] = useState<View>('profile');
  const textBase = {
    fontWeight: '400',
    lineHeight: '150%',
  };
  const spanStyles = {
    opacity: '0.5',
    fontSize: '12px',
    ...textBase,
  };
  const textStyles = {
    fontSize: '16px',
    ...textBase,
  };

  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const userName = user?.displayName
    ? user?.displayName.split(' ')
    : 'FirstName LastName'.split(' ');
  const signOutUserDispatch = () => {
    signOut(auth);
    dispatch(signOutRedux());
  };

  return (
    <>
      {view === 'edit' && <EditProfileTab setView={setView} />}
      {view === 'profile' && (
        <Box as='section' width='870px' padding='30px 80px'>
          <Heading
            as='h2'
            fontSize='20px'
            fontWeight='medium'
            lineHeight='28px'
            color='linkedin.600'
          >
            Your Profile
          </Heading>
          <Flex justifyContent='space-between' width='600px' mt='85px'>
            <VStack spacing='8px' alignItems='flex-start'>
              <Box as='span' {...spanStyles}>
                First Name
              </Box>
              <Text textAlign='left'>{userName[0]}</Text>
            </VStack>
            <VStack spacing='8px' alignItems='flex-start'>
              <Box as='span' {...spanStyles}>
                Last Name
              </Box>
              <Text {...textStyles}>{userName[1]}</Text>
            </VStack>
            <VStack spacing='8px' alignItems='flex-start'>
              <Box as='span' {...spanStyles}>
                Gender
              </Box>
              <Text {...textStyles}>Male</Text>
            </VStack>
          </Flex>
          <Flex justifyContent='space-between' width='600px' mt='70px'>
            <VStack spacing='8px' alignItems='flex-start'>
              <Box as='span' {...spanStyles}>
                Email
              </Box>
              <Text {...textStyles}>{user?.email}</Text>
            </VStack>
            <VStack spacing='8px' alignItems='flex-start'>
              <Box as='span' {...spanStyles}>
                Phone Number
              </Box>
              <Text {...textStyles}>
                {auth.currentUser?.phoneNumber || 'Undefined'}
              </Text>
            </VStack>
            <VStack spacing='8px' alignItems='flex-start'>
              <Box as='span' {...spanStyles}>
                Country
              </Box>
              <Text {...textStyles}>Ukraine</Text>
            </VStack>
          </Flex>
          <div
            style={{
              margin: '87px 0 0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '20px',
            }}
          >
            <Button
              margin='0 0 0 auto'
              variant='ghost'
              onClick={signOutUserDispatch}
            >
              Sign out
            </Button>
            <Button
              display='flex'
              type='submit'
              variant='solid'
              colorScheme='linkedin'
              padding='16px 48px'
              borderRadius='4px'
              fontSize='16px'
              fontWeight='medium'
              lineHeight='24px'
              width='auto'
              height='auto'
              onClick={() => setView('edit')}
            >
              Edit Profile
            </Button>
          </div>
        </Box>
      )}
    </>
  );
};

export default ProfileInfoTab;
