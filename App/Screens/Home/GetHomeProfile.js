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
import WorkerGetNav from '../../Components/GetHomeFlat/WorkerGetNav';
import { COLORS } from '../../Constants/Colors';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const GetHomeProfile = props => {
  const taskData = props.route.params.task;
  const colors = useTheme();
  const [imageShow, setImageShow] = useState('');
  const [requesterName, setRequesterName] = useState([]);
  const [Description, setDescription] = useState('');
  const [hour, setHour] = useState('');
  const [Offer, setOffer] = useState('');


  useEffect(() => {
    getProvidersName();
  }, []);

  const getProvidersName = () => {
    HomeService.getBid(taskData?._id)
      .then(res => {
        if (res && res.status) {
          console.log('Taskwise Provider >>>>>>', res.data);
          setRequesterName(res.data);
        }
      })
      .catch(err => console.log('ererere', err));
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

            // secureTextEntry={true}
            />
          </View>
        </LinearGradient>
        <View style={{ flexDirection: 'row', marginVertical: moderateScale(10) }}>

          <Image
          source={taskData?.taskImage[0] ? { uri: taskData?.taskImage[0] } : require('../../Assets/images/useravatar.png')}
          style={styles.img}
        />
          <View style={{ marginVertical: moderateScale(18) }}>
            <Text
              style={{
                color: '#2874A6',
                fontFamily: FONTS.bold,
                fontSize: moderateScale(20),
              }}>
              {taskData?.subcategoriesData.subCategoryName}
            </Text>
            <Text
              style={{
                color: colors.primaryThemeColor,
                fontFamily: FONTS.medium,
                fontSize: moderateScale(11),
              }}>
              Workers
            </Text>
          </View>
        </View>

        {requesterName.length ? (
          <View
            style={{
              flex: 1,
            }}>
            <FlatList
              // horizontal
              contentContainerStyle={{
                flexGrow: 1,
              }}
              showsVerticalScrollIndicator={false}
              data={requesterName}
              renderItem={({ item, index }) => {
                return (
                  <WorkerGetNav item={item} index={index} data={taskData} />
                );
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

export default GetHomeProfile;

const styles = StyleSheet.create({
  img: {
    height: moderateScale(55),
    width: moderateScale(55),
    marginHorizontal: moderateScale(10),
    borderRadius: moderateScale(10),
    alignSelf: 'center'
  },
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
  image: {
    height: moderateScale(70),
    width: moderateScale(70),
    marginHorizontal: moderateScale(15),
    marginVertical: moderateScale(15),
    borderWidth: 0.5,
    borderColor: 'grey',
    borderRadius: 5
  },
});
