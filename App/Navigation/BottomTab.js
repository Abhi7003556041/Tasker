import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Icon, useTheme} from 'react-native-basic-elements';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {moderateScale} from '../Constants/PixelRatio';
import ProviderNotification from '../Screens/Notification/ProviderNotification';
import ProviderHistory from '../Screens/History/ProviderHistory';
import ProviderMail from '../Screens/Mail/ProviderMail';
import ProviderSetting from '../Screens/Settings/ProviderSetting';
import ProviderHome from '../Screens/Home/ProviderHome';
import RequesterHome from '../Screens/Home/RequesterHome';
import {useSelector} from 'react-redux';

const Tab = createBottomTabNavigator();

const BottomTab = props => {
  const colors = useTheme();
  const {userData, custData} = useSelector(state => state.User);
  useEffect(() => {
    // console.log('userData----------->>>>>>>>>', userData);
    // getUserdata()
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="ProviderHome"
      screenOptions={{
        headerShown: false,
        showLabel: false,
        tabBarStyle: {
          position: 'absolute',
        },
        tabBarShowLabel: false,
        keyboardHidesTabBar: true,
      }}>
      <Tab.Screen
        name="ProviderHistory"
        component={ProviderHistory}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabBar}>
              <Icon
                name="history"
                type="FontAwesome"
                resizemode="contain"
                size={25}
                style={{color: focused ? colors.primaryThemeColor : '#A29F9D'}}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ProviderMail"
        component={ProviderMail}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabBar}>
              <Icon
                name="mail"
                type="Entypo"
                resizemode="contain"
                size={25}
                style={{color: focused ? colors.primaryThemeColor : '#A29F9D'}}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="ProviderHome"
        // initialParams={props.route.params.userType == 'ProviderHome' ? ProviderHome : RequesterHome}
        component={
          userData?.userType == 'Requester' ? RequesterHome : ProviderHome
        }
        // component={ProviderHome}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabBar}>
              {!focused ? (
                <Image
                  source={require('../Assets/images/Tasker_tab.png')}
                  style={styles.tasker_logo}
                />
              ) : (
                <Image
                  source={require('../Assets/images/T1.png')}
                  style={[styles.tasker_logo]}
                />
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ProviderNotification"
        component={ProviderNotification}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabBar}>
              <Icon
                name="md-notifications"
                type="Ionicons"
                resizemode="contain"
                size={25}
                style={{color: focused ? colors.primaryThemeColor : '#A29F9D'}}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Providersettings"
        component={ProviderSetting}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabBar}>
              <Icon
                name="settings"
                type="Ionicons"
                resizemode="contain"
                size={25}
                style={{color: focused ? colors.primaryThemeColor : '#A29F9D'}}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  tabBar: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tasker_logo: {
    height: moderateScale(40),
    width: moderateScale(40),
  },
});
