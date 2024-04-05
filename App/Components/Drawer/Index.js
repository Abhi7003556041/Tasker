import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable, Alert } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import NavigationService from '../../Services/Navigation';
import { Icon, useTheme } from 'react-native-basic-elements';
import { moderateScale, verticalScale } from '../../Constants/PixelRatio';
import StarRating from 'react-native-star-rating';
import AuthService from '../../Services/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { logout, setuser } from '../../Redux/reducer/User';
import database from '@react-native-firebase/database';
import { FONTS } from '../../Constants/Fonts';
import useSelectLangue from '../Language/useSelectLangue';
import { setSelectLanguage } from '../../Redux/reducer/Language';
import Toast from 'react-native-simple-toast'
import HomeService from '../../Services/HomeService';
import auth from '@react-native-firebase/auth';


const DrawerContent = props => {

  const [rating, setstarCount] = useState();
  const { userData } = useSelector(state => state.User);
  // console.log("USERDAta====",userData.image)
  const colors = useTheme();
  const dispatch = useDispatch();
  const { setLanguage } = useSelectLangue()
  const onStarRatingPress = async rating => {
    setstarCount(rating);
  };

  const alertFunc = () => {
    Alert.alert('Log Out', 'Do you want to Logout ?', [
      {
        text: 'No',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'Yes', onPress: () => logout_Here() },
    ]);
  };
  const logout_Here = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
    AuthService.setAccount(null);
    deviceToken();
    dispatch(logout());
    // dispatch(setuser({}))
    // AuthService.setAccount({});
    // AuthService.setToken("");
    database().ref(`/userList/${userData._id}`).update({
      activeStatus: false,
      lastSeen: database().getServerTime().getTime()
    });
  };

  const deviceToken = async () => {
    let data = {
      deviceToken: null
    }
    console.log('tokenP', data)
    HomeService.requesterProfileUpdate(data).then(res => {
      // console.log('devicetokenUpdaste', res)
    });
  }

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} scrollEnabled={true}>
        <View>
          <Pressable
          >
            <Pressable

              style={styles.top_view}
            >
              <Image
                source={userData?.image ? { uri: userData?.image } : require('../../Assets/images/useravatar.png')}
                style={styles.img}
              />

              <Text
                style={{
                  ...styles.name_txt,
                  color: colors.primaryThemeColor,
                }}>
                {userData.firstName} {userData.lastName}
              </Text>
              {/* <Pressable
               
                style={styles.ratings_view}>
                <Text
                  style={{
                    ...styles.ratings_num,
                    color: colors.primaryThemeColor,
                  }}>
                  4.8
                </Text>

                <StarRating
                  disabled={false}
                  maxStars={5}
                  rating={rating}
                  starSize={10}
                  fullStarColor="#e78200"
                  emptyStarColor="#4267b2"
                  selectedStar={rating => onStarRatingPress(rating)}
                  containerStyle={{
                    marginLeft: moderateScale(5),
                  }}
                />
              </Pressable> */}

            </Pressable>
          </Pressable>
        </View>

        <View style={styles.LineView} />

        <View>
          <Pressable
            style={styles.drawer_btn}
            onPress={() =>
              userData.userType == 'Requester'
                ? NavigationService.navigate('RequesterProfile')
                : NavigationService.navigate('RequesterProfile')
            }>
            <Icon
              name="user-o"
              type="FontAwesome"
              style={[styles.icon, { fontSize: moderateScale(18) }]}
            />
            <Text
              style={{ ...styles.drawer_txt, color: colors.primaryThemeColor }}>
              {setLanguage('Profile')}
            </Text>
          </Pressable>


          {userData?.userType == 'Provider' ? (
            <Pressable
              style={styles.drawer_btn}
              onPress={() => NavigationService.navigate('ProvProfileUpdate')}>
              <Icon
                name="home-repair-service"
                type="MaterialIcon"
                style={[styles.icon, { fontSize: moderateScale(18) }]}
              />
              <Text style={{ ...styles.drawer_txt, color: colors.primaryThemeColor }}>
                Service Details
              </Text>
            </Pressable>
          ) : null}

          <Pressable
            style={styles.drawer_btn}
            onPress={() =>
              userData.userType == 'Requester'
                ? NavigationService.navigate('DrawerTask')
                : NavigationService.navigate('ProviderTask')
            }>
            <Icon
              name="tasks"
              type="FontAwesome5"
              style={[styles.icon, { fontSize: moderateScale(18) }]}
            />
            <Text
              style={{ ...styles.drawer_txt, color: colors.primaryThemeColor }}>
              {setLanguage('Tasks')}
            </Text>
          </Pressable>

          {userData.userType == 'ProviderHome' ? (
            <Pressable
              style={styles.drawer_btn}
              onPress={() => NavigationService.navigate('RevenueDrawer')}>
              <Icon
                name="dollar-bill"
                type="FoundationIcon"
                style={[styles.icon, { fontSize: moderateScale(20) }]}
              />
              <Text
                style={{ ...styles.drawer_txt, color: colors.primaryThemeColor }}>
                {setLanguage('Revenue')}
              </Text>
            </Pressable>
          ) : null}

          <View style={styles.LineView} />
        </View>
        <Pressable
          style={styles.drawer_btn}
          onPress={() => NavigationService.navigate('ProviderSetting')}>
          <Icon
            name="setting"
            type="AntDesign"
            style={[styles.icon, { fontSize: moderateScale(21) }]}
          />
          <Text style={{ ...styles.drawer_txt, color: colors.primaryThemeColor }}>
            {setLanguage('Settings')}
          </Text>
        </Pressable>
        <Pressable
          style={styles.drawer_btn}
          onPress={() => NavigationService.navigate('Privacy')}>
          <Icon
            name="privacy-tip"
            type="MaterialIcon"
            style={[styles.icon, { fontSize: moderateScale(18) }]}
          />
          <Text style={{ ...styles.drawer_txt, color: colors.primaryThemeColor }}>
            {setLanguage('Privacy Policy')}
          </Text>
        </Pressable>

        {userData?.userType == 'Provider' ? (
          <Pressable
            style={styles.drawer_btn}
            onPress={() => NavigationService.navigate('PersonalReq')}>
            <Icon
              name="request-page"
              type="MaterialIcon"
              style={[styles.icon, { fontSize: moderateScale(18) }]}
            />
            <Text style={{ ...styles.drawer_txt, color: colors.primaryThemeColor }}>
              {setLanguage('Personal Request')}

            </Text>
          </Pressable>
        ) : null}

        {/* <View style={styles.LineView} />
        <Pressable
          style={styles.drawer_btn}
          onPress={() => NavigationService.navigate('ContactScreen')}>
          <Icon
            name="support-agent"
            type="MaterialIcon"
            style={[styles.icon, { fontSize: moderateScale(23) }]}
          />
          <Text style={{ ...styles.drawer_txt, color: colors.primaryThemeColor }}>
            {setLanguage('Support Center')}
          </Text>
        </Pressable> */}

        <View style={styles.LineView} />
        <Pressable style={styles.drawer_btn} onPress={() => alertFunc()}>
          <Icon
            name="log-out"
            type="Entypo"
            style={[styles.icon, { fontSize: moderateScale(18) }]}
          />
          <Text style={{ ...styles.drawer_txt, color: colors.primaryThemeColor }}>
            {setLanguage('Log Out')}
          </Text>
        </Pressable>
      </DrawerContentScrollView>
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  top_view: {
    marginStart: moderateScale(20),
    marginTop: verticalScale(20),
  },
  LineView: {
    borderBottomColor: '#B5B4B4',
    borderBottomWidth: 1,
    marginTop: verticalScale(30),
  },
  img: {
    height: moderateScale(50),
    width: moderateScale(50),
    borderRadius: moderateScale(25),
    // marginStart: moderateScale(10),
  },
  star_icon_view: {
    flexDirection: 'row',
  },
  star_icon: {
    fontSize: 10,
    color: '#F8C471',
  },
  ratings_view: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star_icon_view2: {
    flexDirection: 'row',
    marginLeft: moderateScale(5),
  },

  review_section_view: {
    backgroundColor: '#ECECEC',
    height: verticalScale(100),
    width: '90%',
    borderRadius: 10,

    alignSelf: 'center',
    padding: 10,
  },
  name_txt: {
    fontFamily: FONTS.bold,
    marginTop: verticalScale(10),
  },
  ratings_num: {
    fontSize: moderateScale(12),
  },
  drawer_btn: {
    flexDirection: 'row',
    paddingStart: moderateScale(20),
    paddingTop: verticalScale(20),
    alignItems: 'center',
  },

  drawer_txt: {
    paddingStart: moderateScale(20),
    fontFamily: FONTS.medium,
    fontSize: moderateScale(12)
  },
});
