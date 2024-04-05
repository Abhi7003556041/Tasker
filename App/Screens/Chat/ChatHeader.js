//import liraries
import React, { Component, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { Card, Icon } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import Navigation from '../../../Service/Navigation';

import { COLORS } from './COLORS';
import NavigationService from '../../Services/Navigation';
import { moderateScale, verticalScale } from '../../Constants/PixelRatio';
import database from '@react-native-firebase/database';
import { useSelector } from 'react-redux';

// create a component
const ChatHeader = props => {
  const inset = useSafeAreaInsets();
  const { name, image, provider } = props;
  const { userData } = useSelector(state => state.User);
  const [all, setAll] = useState();

  useEffect(() => {
    console.log(provider)
    database()
      .ref(`/userList/${provider}`)
      .on('value', snapshot => {
        console.log('A new node has been added', snapshot.val());
        setAll(snapshot.val())
      });
    ;
  }, [])
  const formatTime = async (isoString) => {
    var utc = (new Date(isoString)).toUTCString()
    const time = new Date(utc).getDate() + "-" + (new Date(utc).getMonth() + 1) +
      "-" +new Date(utc).getFullYear()+ ' at ' + new Date(utc).getHours() + ":" + new Date(utc).getMinutes() 
      console.log(time)
    return time
  }
  // console.log('props.data',props.data)
  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: Platform.OS == 'ios' ? inset.top : 0,
        },
      ]}>
      <View style={styles.headerMain}>
        <View style={styles.subView}>
          <Ionicons
            size={27}
            name="arrow-back"
            style={{ color: COLORS.white }}
            onPress={() => NavigationService.back()}
          />
          <Image
            source={{ uri: image }}
            style={{
              borderRadius: 40,
              height: 40,
              width: 40,
              resizeMode: 'cover',
            }}
          />
          {console.log('sdererer',formatTime(all?.lastSeen))}
          {/* <View style={styles.Img}>
                        <Image source={require('../../Assets/mConnect/circle.png')} />
                    </View> */}
          <View style={{ marginLeft: moderateScale(10) }}>
            <Text style={styles.Name}>{name}</Text>
            <Text style={styles.activeText}>{all?.activeStatus ? 'Active Now' : `last seen : ${formatTime(all?.lastSeen)._j}`}</Text>
          </View>
        </View>
        <View style={styles.subViewAnother}>
          {/* <TouchableOpacity
                        onPress = {() => Navigation.navigate('Calling', { remoteUserData: props.data, type: 'Outgoing' })}
                    >
                    <Image source={require('../Assets/Chat/call.png')}
                        style={{ borderRadius: 10, height: verticalScale(14), width: moderateScale(14), resizeMode: 'contain' }}
                    />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => Navigation.navigate('VideoCall',{ remoteUserData: props.data, type: 'Outgoing' })}
                    >
                        <Image source={require('../Assets/Chat/vidcall.png')}
                            style={{ borderRadius: 10, height: verticalScale(18), width: moderateScale(18), resizeMode: 'contain' }}
                        />
                    </TouchableOpacity> */}
          {/* <Image source={require('../../Assets/Chat/info.png')}
                        style={{ borderRadius: 10, height: verticalScale(15), width: moderateScale(15), resizeMode: 'contain' }}
                    /> */}
        </View>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: COLORS.HeaderColor,
    // height: verticalScale(60)
  },
  activeText: {
    color: COLORS.white,
    // fontFamily: Font.Regular,
    fontSize: moderateScale(10),
    opacity: 0.8,
  },
  Img: {
    position: 'absolute',
    top: moderateScale(35),
    left: moderateScale(68),
  },
  Name: {
    color: COLORS.white,
    // fontFamily: Font.Mediume
  },
  headerMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: verticalScale(60),
  },
  subView: {
    height: verticalScale(60),
    width: '50%',
    // justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: moderateScale(10),
  },
  subViewAnother: {
    height: verticalScale(60),
    width: '30%',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

//make this component available to the app
export default ChatHeader;
