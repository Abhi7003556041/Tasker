//import liraries
import React, { Component, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  StatusBar,
  FlatList,
  Image,
  ImageBackground,
} from 'react-native';
import {
  AppTextInput,
  Container,
  Icon,
  useTheme,
} from 'react-native-basic-elements';
import LinearGradient from 'react-native-linear-gradient';
import NavigationService from '../../Services/Navigation';
import { moderateScale } from '../../Constants/PixelRatio';
import HomeGetNav from '../../Components/GetHomeFlat/HomeGetNav';
import { FONTS } from '../../Constants/Fonts';
import HomeService from '../../Services/HomeService';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const GetHome = props => {
  const serviceTypeData = props.route.params.service_data;
  const colors = useTheme();
  const [imageShow, setImageShow] = useState('');
  const [requesterName, setRequesterName] = useState([]);
  const [Description, setDescription] = useState('');
  const [hour, setHour] = useState('');
  const [Offer, setOffer] = useState('');


  useEffect(() => {
    getRequesterName();
  }, []);

  const getRequesterName = () => {
    HomeService.getRequesterData(serviceTypeData?._id).then(res => {
      if (res && res.status) {
        console.log('servicewise Task>>>>>>', res.data);
        setRequesterName(res.data);
      }
    });
  };
  return (
    <Container style={styles.container}>
      <ImageBackground
        source={require('../../Assets/images/payment_bg.jpg')}
        style={styles.background}>
        <LinearGradient
          style={styles.root_view}
          colors={['#3BB6DF', '#1972B6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}>
          <View style={styles.inner_view}>
            <Pressable onPress={() => NavigationService.back()}>
              <Icon
                name="arrow-back"
                type="Ionicons"
                style={{
                  ...styles.icon,
                  color: colors.pageBackgroundColor,
                }}
              />
            </Pressable>
            <AppTextInput
              titleStyle={{
                color: 'blue',
              }}
              leftIcon={{
                name: 'search1',
                type: 'AntDesign',
              }}
              inputContainerStyle={{
                ...styles.inputCont,
                backgroundColor: colors.pageBackgroundColor,
              }}

            />
          </View>
        </LinearGradient>

        <View style={{ flexDirection: 'row', marginVertical: moderateScale(10) }}>

          {
            serviceTypeData.image == null ?
              <Image
                source={require('../../Assets/images/Imagegdefault.png')}
                style={styles.images}
              />
              :
              <Image style={styles.images} source={{ uri: serviceTypeData?.image }} />
          }

          <View style={{ marginVertical: moderateScale(18) }}>
            <Text
              style={{
                color: '#2874A6',
                fontFamily: FONTS.bold,
                fontSize: moderateScale(20),
              }}>
              {serviceTypeData?.subCategoryName}
            </Text>
            <Text
              style={{
                color: colors.primaryThemeColor,
                fontFamily: FONTS.bold,
                fontSize: moderateScale(11),
              }}>
              Tasks
            </Text>
          </View>
        </View>
        {
          requesterName.length ? (
            <View
              style={{
                flex: 1,
              }}>
              <FlatList
                // horizontal
                contentContainerStyle={{
                  flexGrow: 1
                }}
                showsVerticalScrollIndicator={false}
                data={requesterName}
                renderItem={({ item, index }) => {
                  return <HomeGetNav item={item} index={index} />;
                }}
              />
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon
                name="search-off"
                type="MaterialIcon"
                size={70}
              />
              <Text
                style={{
                  color: colors.primaryThemeColor,
                  fontFamily: FONTS.semibold,
                  fontSize: moderateScale(12)
                }}>
                No data found
              </Text>
            </View>
          )}
      </ImageBackground>
    </Container>
  );
};

export default GetHome;

const styles = StyleSheet.create({

  background: {
    flex: 1,
    // height: height,
    // width: width,
  },
  root_view: {
    height: StatusBar.currentHeight + 55,
    paddingTop: StatusBar.currentHeight,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inner_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: moderateScale(10),
    marginBottom: moderateScale(10),
  },
  icon: {
    fontSize: moderateScale(25),
  },
  inputCont: {
    borderRadius: 5,
    borderWidth: 0,
    flexDirection: 'row',
    height: moderateScale(30),
    width: width / 2,
  },
  images: {
    height: moderateScale(65),
    width: moderateScale(65),
    marginHorizontal: moderateScale(15),
    marginVertical: moderateScale(15),
    borderRadius: moderateScale(5),
  },
});
