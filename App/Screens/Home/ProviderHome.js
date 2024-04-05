import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  ImageBackground,
  Dimensions,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import HomeHeader from '../../Components/Header/HomeHeader';
import {
  Card,
  Container,
  Icon,
  StatusBar,
  useTheme,
} from 'react-native-basic-elements';
import { moderateScale } from '../../Constants/PixelRatio';
import { FONTS } from '../../Constants/Fonts';
import NavigationService from '../../Services/Navigation';
import SelectLan from '../../Components/Language/SelectLan';
import { FlatList } from 'react-native-gesture-handler';
import AuthService from '../../Services/Auth';

import HomeService from '../../Services/HomeService';
import ProviderHomeList from '../../Components/GetHomeFlat/ProviderHomeList';
import { fcmService } from '../../Services/Notification/FCMservice';
import { useSelector } from 'react-redux';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const ProviderHome = ({ navigation }) => {
  // console.log('props..',props.route.params.providerHome)
  const colors = useTheme();
  const [providerTask, setproviderTask] = useState([]);
  const [token, setToken] = useState('')
  const userData = useSelector(state => state.User.userData);
  console.log("getProfile>>>>>>",userData)
 
  const [allCategory, setallCategory] = useState([]);

  useEffect(() => {

    const unsubscribe = navigation.addListener('focus', () => {
      getCategory();
      getListTask();
      // deviceToken();
    });


    return unsubscribe;
  }, [navigation]);

  React.useEffect(() => {
    HomeService.profileUpdate()
      .then(res => {
        console.log("res",res);
        if (res.data.deviceToken == null) {
        }
        else {
          fcmService.register(onRegister);
        }

      })
  }, [])

  const onRegister = token => {
    // console.log('Register token [App]provider:', token);
    deviceToken(token);
    setToken(token);
  };

  const deviceToken = async (val) => {
    let data1 = {
      deviceToken: val
    }
    console.log('tokenP', data1)
    HomeService.requesterProfileUpdate(data1).then(res => {
      console.log('devicetokenUpdaste', res)
    });
  }
  const getCategory = () => {
    console.log("List>>>>>")
    AuthService.getProvCategory().then(res => {
      console.log('rescat---', res.data);
      if (res) {
        setallCategory(res.data);
        getListTask();
      }
    });
  };

  const getListTask = () => {
    console.log("List>>>>>")
    HomeService.getProviderList().then(res => {
      console.log("Lissssssssssss", JSON.stringify(res.data));
      if (res && res.status) {
        // console.log('Lissssssssssss', res);
        setproviderTask(res.data);
      }
    });
  };
  return (
    <Container>
      <StatusBar/>
      <HomeHeader />
      <ImageBackground
        source={require('../../Assets/images/payment_bg.jpg')}
        style={styles.bg_img}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 50 }}>
         
          <View
            style={{
              marginHorizontal: moderateScale(20),
              marginTop: moderateScale(10),
            }}>
            <Text
              style={{
                color: '#2874A6',
                fontFamily: FONTS.bold,
                fontSize: moderateScale(25),
              }}>
              {SelectLan('Hello !')}
            </Text>
            <Text
              style={{
                color: colors.primaryThemeColor,
                fontFamily: FONTS.semibold,
                fontSize: moderateScale(11),
                // marginHorizontal: 8,
              }}>
              {SelectLan(
                'View the list of tasks (jobs) posted by the applicants',
              )}
            </Text>
          </View>

          <FlatList
            showsVerticalScrollIndicator={false}
            data={providerTask}
            renderItem={({ item, index }) => {
              return <ProviderHomeList item={item} index={index} />;
            }}
          />
        </ScrollView>
      </ImageBackground>
      {/* <View style={{height: moderateScale(80)}}/> */}
    </Container>
  );
};

export default ProviderHome;

const styles = StyleSheet.create({
  card: {
    elevation: moderateScale(10),
    backgroundColor: 'white',
    // marginVertical: moderateScale(20),
  },
  bg_img: {
    height: height,
    width: width,
    paddingTop: StatusBar.currentHeight,
    flex: 1
    // paddingBottom:50
  },
});
