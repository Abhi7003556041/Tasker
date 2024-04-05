import React, { useEffect } from 'react';
import {Dimensions, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerContent from '../Components/Drawer/Index';
import BottomTab from './BottomTab';



const {width} = Dimensions.get('window');

const Drawer = createDrawerNavigator();

const DrawerNav = (props) => {
// const userType = props?.route.params?.userType;
  useEffect(()=>{
       
    console.log('props..usertype..')
  },[])
  console.log('props..usertype..')

  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent data = {props} />}
      // type = {userType}
      drawerStyle={{width: 280}}
      drawerPosition="left">
      <Drawer.Screen name="BottomTab" component={BottomTab} options={{headerShown: false}} />
      {/* <Drawer.Screen name="MoreDrawer" component={MoreDrawer} /> */}
    </Drawer.Navigator>
  );
};

export default DrawerNav;
