//import liraries
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React, { Component, useEffect } from 'react';
import AboutUs from '../Screens/About/AboutUs';
import ChangePass from '../Screens/ChangePassword/ChangePass';
import ContactScreen from '../Screens/ContactUs/ContactScreen';
import PublishTask from '../Screens/Home/PublishTask';
import ServiceProviders from '../Screens/Home/ServiceProviders';
import InviteFriend from '../Screens/Invite/InviteFriend';
import MyProfile from '../Screens/Profile/MyProfile';
import RequesterProfile from '../Screens/Profile/RequesterProfile';
import RevenueDrawer from '../Screens/Revenue/RevenueDrawer';
import ListRevenues from '../Screens/RevenueList/ListRevenues';
import ProviderSetting from '../Screens/Settings/ProviderSetting';
import Statistics from '../Screens/Statistics/Statistics';
import DrawerTask from '../Screens/Task/DrawerTask';
import RequesterTask from '../Screens/Task/RequesterTask';
import DrawerNav from './Drawer';
import GetHome from '../Screens/Home/GetHome';
import GetHomeProfile from '../Screens/Home/GetHomeProfile';
import TaskViewProfile from '../Screens/ProviderTaskView/TaskViewProfile';
import ProviderTask from '../Screens/Task/ProviderTask';
import ChatBoth from '../Screens/ChatPageBoth/ChatBoth';
import WorkerProfile from '../Screens/Profile/WorkerProfile';

import PublishPersonalTask from '../Screens/Home/PublishPersonalTask';

import PersonalReq from '../Screens/PersonalRequest/PersonalReq';
import PersonalProfile from '../Screens/PersonalRequest/PersonalProfile';
import InnerChat from '../Screens/Chat/InnerChat';
import Review from '../Screens/ProviderReview/Review';
import { useSelector } from 'react-redux';
import database from '@react-native-firebase/database';
import ReviewReq from '../Screens/RequesterReview/ReviewReq';
import ProvProfileUpdate from '../Screens/Home/ProvProfileUpdate';
import AllReviewData from '../Screens/Profile/AllReview';
import UploadImage from '../Components/Image&Video/UploadImage';
import TermCondition from '../Screens/TermAndCondition/TermCondition';
import Privacy from '../Screens/PrivacyPoilicy/Privacy';
import ProviderProfile from '../Screens/Profile/ProviderProfile';
// import NewLogin from '../Screens/LogInDuplicate/NewLogin';
// import UploadImage from '../Screens/Image&Video/UploadImage';
// import Drawer from './ServiceDrawer'
// import BottomTab from './BottomTab';

const Stack = createStackNavigator();
// create a component
const AppStack = props => {
  const { login_status, userData } = useSelector(state => state.User)
  console.log('props..', userData._id);
  useEffect(() => {

    database().ref(`/userList/${userData._id}`).update({
      activeStatus: true
    });
    database().ref(`/userList/${userData._id}`).onDisconnect().update({
      activeStatus: false,
      lastSeen: database().getServerTime().getTime()
    });
  }, [])
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        // gestureEnabled: true,
        // gestureDirection: 'horizontal',
        // ...TransitionPresets.ModalTransition,
      }}>
      {/* //initialParams={{userType:props.route.params.userType}} */}
      <Stack.Screen name="Home" component={DrawerNav} />
      <Stack.Screen name="InviteFriend" component={InviteFriend} />
      <Stack.Screen name="ContactScreen" component={ContactScreen} />
      <Stack.Screen name="AboutUs" component={AboutUs} />
      <Stack.Screen name="TermCondition" component={TermCondition} />
      <Stack.Screen name="Privacy" component={Privacy} />
      <Stack.Screen name="ChangePass" component={ChangePass} />
      <Stack.Screen name="MyProfile" component={MyProfile} />
      <Stack.Screen name="WorkerProfile" component={WorkerProfile} />
      <Stack.Screen name="RequesterProfile" component={RequesterProfile} />
      <Stack.Screen name="RevenueDrawer" component={RevenueDrawer} />
      <Stack.Screen name="Statistics" component={Statistics} />
      <Stack.Screen name="ListRevenues" component={ListRevenues} />
      <Stack.Screen name="DrawerTask" component={DrawerTask} />
      <Stack.Screen name="RequesterTask" component={RequesterTask} />
      <Stack.Screen name="ProviderTask" component={ProviderTask} />
      <Stack.Screen name="ProviderSetting" component={ProviderSetting} />
      <Stack.Screen name="GetHome" component={GetHome} />
      <Stack.Screen name="TaskViewProfile" component={TaskViewProfile} />
      <Stack.Screen name="ChatBoth" component={ChatBoth} />
      <Stack.Screen name="PersonalReq" component={PersonalReq} />
      <Stack.Screen name="PersonalProfile" component={PersonalProfile} />
      <Stack.Screen name="Review" component={Review} />
      <Stack.Screen name="ReviewReq" component={ReviewReq} />
      <Stack.Screen name="ProvProfileUpdate" component={ProvProfileUpdate} />
      <Stack.Screen name="AllReviewData" component={AllReviewData} />
      {/* <Stack.Screen name="UploadImage" component={UploadImage} /> */}

      {/* <Stack.Screen name="NewLogin" component={NewLogin} /> */}

      <Stack.Screen name="GetHomeProfile" component={GetHomeProfile} />
      <Stack.Screen name="ProviderProfile" component={ProviderProfile} />
      <Stack.Screen name="InnerChat" component={InnerChat} />

      <Stack.Screen name="ServiceProviders" component={ServiceProviders} />
      <Stack.Screen name="PublishTask" component={PublishTask} />
      <Stack.Screen
        name="PublishPersonalTask"
        component={PublishPersonalTask}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
