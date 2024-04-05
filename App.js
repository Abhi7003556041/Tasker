//import liraries
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, PermissionsAndroid } from 'react-native';
import { Theme } from 'react-native-basic-elements';
import AppStack from './App/Navigation/AppStack';
import AuthStack from './App/Navigation/AuthStack';
import NavigationService from './App/Services/Navigation';
import AuthService from './App/Services/Auth';
import { setuser } from './App/Redux/reducer/User';
import { useDispatch, useSelector } from 'react-redux';
import Geocoder from 'react-native-geocoding';


import {
  onNotification,
  onOpenNotification,
  onForegroundEvent,
} from './App/Services/Notification/NotifeeService';
import notifee, {EventType} from '@notifee/react-native';
import { fcmService } from './App/Services/Notification/FCMservice';
import Geolocation from '@react-native-community/geolocation';

const Stack = createStackNavigator();
Geocoder.init("AIzaSyC-ki3ImgxYzo8K2OCH9yDthHWIWV1yfj4");
// create a component
const App = () => {

  const [isDark, setIsDark] = useState(false);
  const [isSignIn, setisSignIn] = useState(false);
  const { userData, custData } = useSelector((state) => state.User)
  const dispatch = useDispatch();
  const { login_status } = useSelector(state => state.User);
  // console.log('login_status----------------', login_status);

  useEffect(() => {
    
      // notifee.getNotificationSettings();
      fcmService.registerAppWithFCM();
      fcmService.register(onRegister, onNotification, onOpenNotification);

      notifee.onForegroundEvent(onForegroundEvent);
      // notifee.onOpenNotification();
      notifee.onBackgroundEvent(async ({type, detail}) => {
        const {notification, pressAction} = detail;
        if (type == EventType.PRESS) {

          await notifee.cancelNotification(notification.id);
        }
      });
    // }
    getUserdata()
  }, [])
  const onRegister = token => {
    AuthService.setNotifactionToken(token);
  
      // 6290740740
      console.log('[App----] Token', token);
 
  };

  const getUserdata = async () => {
    let result = await AuthService.getAccount();
    // console.log('userdatatest>>>>>>>>>>>>>>>>>>>>>>>', result);
    // SplashScreen.hide();
    // RNBootSplash.hide({ fade: true })
    if (result != null && result != '') {
      dispatch(setuser(result));

      setisSignIn(true)
    } else {
      setisSignIn(true)
    }
  };
  useEffect(() => {
    const requestPermission = async () => {
      try {
        console.log('asking for permission')
        const granted = await PermissionsAndroid.requestMultiple(
          [PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE]
        )
        if (granted['android.permission.CAMERA'] && granted['android.permission.WRITE_EXTERNAL_STORAGE']) {
          console.log("You can use the camera");
        } else {
          console.log("Camera permission denied");
        }
      } catch (error) {
        console.log('permission error', error)
      }
    }
    requestPermission()
    // requestLocationPermission()
    return () => {

    }
  }, [])

  const requestLocationPermission = async () => {
    console.log('PermissionsAndroid', PermissionsAndroid);
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'Example App',
          'message': 'Example App access to your location '
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the location")
        alert("You can use the location");
      } else {
        console.log("location permission denied")
        alert("Location permission denied");
      }
    } catch (err) {
      console.warn(err)
    }
   
  
  }

  return (
    <View
      style={{
        flex: 1
      }}
    >

      <Theme.Provider
        theme={{
          light: {
            primaryThemeColor: '#398cb4',
            secondaryThemeColor: '#1474ba',
            primaryFontColor: '#1cb3e8',
            secondaryFontColor: '#ffff',
            cardColor: '#000',
            headerColor: '#fff',
            pageBackgroundColor: '#ffffff',
            tabBarColor: '#fff',
            shadowColor: '#999',
            statusBarStyle: 'dark-content',
            buttonColor: '#dcdcda',
            borderColor: '#a0a0a0',
            textgrey: '#808080'
          },
          dark: {
            primaryThemeColor: '#398cb4',
            secondaryThemeColor: '#1474ba',
            primaryFontColor: '#fff',
            secondaryFontColor: '#999',
            cardColor: '#000',
            headerColor: '#000',
            pageBackgroundColor: '#ffffff',
            tabBarColor: '#000',
            shadowColor: '#1E1E1E',
            statusBarStyle: "light-content",
            buttonColor: '#dcdcda',
            borderColor: '#a0a0a0',
            textgrey: '#808080'
          },
        }}
        mode={isDark ? 'dark' : 'light'}
      >
        <NavigationContainer
          ref={r => NavigationService.setTopLevelNavigator(r)}
        >
          <Stack.Navigator
            // initialRouteName='Authstack'
            screenOptions={{
              headerShown: false,
              // gestureEnabled: true,
              // gestureDirection: 'horizontal',
              // ...TransitionPresets.ModalTransition,
            }}
          >
            {
              console.log("login_status", login_status)
            }
            {
              login_status ?
                <Stack.Screen name="AppStack" component={AppStack} />
                :
                <Stack.Screen name="Authstack" component={AuthStack} />
            }


          </Stack.Navigator>
        </NavigationContainer>
      </Theme.Provider>


    </View>
  );
};

export default App;
