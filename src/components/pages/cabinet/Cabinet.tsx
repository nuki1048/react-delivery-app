import {
  Box,
  Heading,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import CustomTab from '../../customTabs/customTabs';
import AppHeader from '../../appHeader/AppHeader';
import { useAppSelector } from '../../../store';
import AppFooter from '../../appFooter/AppFooter';
import ProfileInfoTab from '../../profileInfoTab/profileInfoTab';
import AppContainer from '../../appContainer/AppContainer';
import OrderListTab from '../../orderListTab/orderListTab';
const Cabinet = (): JSX.Element => {
  const { user } = useAppSelector((store) => store.auth);
  return (
    <>
      <AppHeader />
      <AppContainer>
        <Box
          as='div'
          display='flex'
          justifyContent='space-between'
          marginTop='40px'
          w='100%'
        >
          <Box opacity='1' display='flex' gap='12px'>
            <Box as='span' opacity='0.5'>
              Home
            </Box>
            <Box as='span' opacity='0.5'>
              /
            </Box>
            Account
          </Box>
          <Box>
            Welcome!{' '}
            <Box as='span' color='linkedin.600'>
              {user?.displayName}
            </Box>
          </Box>
        </Box>
      </AppContainer>
      <AppContainer>
        <Tabs display='flex' gap='100px' marginTop='40px' w='100%'>
          <TabList
            display='flex'
            flexDirection='column'
            width='305px'
            textAlign='left'
          >
            <Heading as='h3' fontSize='16px' fontWeight='500' lineHeight='24px'>
              Manage My Account
            </Heading>
            <CustomTab>My Profile</CustomTab>
            <CustomTab>Address Book</CustomTab>
            <CustomTab>My Payment Options</CustomTab>
            <Heading as='h3' fontSize='16px' fontWeight='500' lineHeight='24px'>
              My Orders
            </Heading>
            <CustomTab>Orders List</CustomTab>
          </TabList>
          <TabPanels
            background='#fff'
            boxShadow='0px 1px 13px 0px rgba(0, 0, 0, 0.05)'
          >
            <TabPanel>
              <ProfileInfoTab />
            </TabPanel>
            <TabPanel
              width='870px'
              height='800px'
              padding='40px 80px 35px 80px'
            >
              Address Book
            </TabPanel>
            <TabPanel
              width='870px'
              height='800px'
              padding='40px 80px 35px 80px'
            >
              My Payment Options
            </TabPanel>
            <TabPanel>
              <OrderListTab />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </AppContainer>
      <AppFooter />
    </>
  );
};
export default Cabinet;
