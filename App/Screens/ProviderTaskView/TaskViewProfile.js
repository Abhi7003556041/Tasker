import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ImageBackground,
  FlatList,
} from 'react-native';
import {
  AppButton,
  AppTextInput,
  Card,
  Container,
  StatusBar,
  Icon,
  useTheme,
} from 'react-native-basic-elements';
import {FONTS} from '../../Constants/Fonts';
import {moderateScale, verticalScale} from '../../Constants/PixelRatio';
import NavigationService from '../../Services/Navigation';
import StarRating from 'react-native-star-rating';
import SelectLan from '../../Components/Language/SelectLan';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import HomeService from '../../Services/HomeService';
import Toast from 'react-native-simple-toast';
import useSelectLangue from '../../Components/Language/useSelectLangue';
import { useSelector } from 'react-redux';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const TaskViewProfile = props => {

  const [rating, setstarCount] = useState();
  const [DesCrip, setDesCrip] = useState([]);
  const [amount, setAmount] = useState();
  const [day, setDay] = useState();
  const providerTypeData = props.route.params.profileId;
  const { setLanguage } = useSelectLangue();
  const { selectLanguage } = useSelector(state => state.Language);
  const colors = useTheme();

  const onStarRatingPress = async rating => {
    setstarCount(rating);
  };
  useEffect(() => {
    getDescription();
    // setstarCount(item.requesterData.avgRating)
  }, []);

  const acceptButton = () => {  
    if (amount == '') {
      Toast.show(selectLanguage == 'en' ? 'Please select price' : 'Seleccione precio', Toast.SHORT, Toast.BOTTOM);
      return;
    }
    if (day == '') {
      Toast.show(selectLanguage == 'en' ? 'Select day' : 'Seleccionar día', Toast.SHORT, Toast.BOTTOM);
      return;
    }
    let data = {
      taskID: providerTypeData,
      bidAmount: amount,
      requiredDays: day,
    };
    // console.log("buttttttton", data)
    HomeService.providerAccept(data).then(res => {
      console.log('Pubbbbbbliiiss', res  );
      if (res) {
        // Toast.showWithGravity('Publish submit successfully!', Toast.SHORT, Toast.BOTTOM);
        NavigationService.navigate('Home');
      }
    })
    .catch((err) => {
      console.log(err)
      Toast.showWithGravity('Bid already given', Toast.SHORT, Toast.BOTTOM);
    })
  };

  const getDescription = () => {
    HomeService.getDesc(providerTypeData).then(res => {
      if (res && res.status) {
        setDesCrip(res.data[0]);
      }
    });
  };

  return (
    <Container>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <StatusBar
          translucent={true}
          backgroundColor={'transparent'}
          barStyle="light-content"
        />
        <ImageBackground
          source={require('../../Assets/images/myProfile_bg.png')}
          style={styles.bg_img}>
          <Text
            style={{
              ...styles.detailTask,
              color: colors.pageBackgroundColor,
            }}>
            Details Task
          </Text>

          <Image
            source={DesCrip.requesterData?.image ? {uri: DesCrip.requesterData?.image}:require('../../Assets/images/useravatar.png')}
            style={styles.profile_img}
          />
          <Text
            style={{
              color: colors.pageBackgroundColor,
              ...styles.profileName,
            }}>
            {/* {SelectLan('Tommy Ron')} */}
            {DesCrip.requesterData?.firstName}
          </Text>

          {/* <View style={styles.profile_desc}>
            <View style={styles.ratings_view}>
              <StarRating
                disabled={false}
                maxStars={5}
                rating={rating}
                starSize={15}
                fullStarColor="#fff"
                emptyStarColor="#4267b2"
                // selectedStar={rating => onStarRatingPress(rating)}
                // containerStyle={{
                //   marginLeft: moderateScale(5),
                // }}
              />
            </View>
          </View> */}

          <Card
            style={{
              ...styles.profile_desc_view,
              backgroundColor: colors.pageBackgroundColor,
            }}>
            <View
              style={{
                ...styles.top_txt_view,
                marginTop: moderateScale(15),
              }}>
              <Text
                style={{
                  fontFamily: FONTS.medium,
                  fontSize: moderateScale(12),
                  color: colors.primaryThemeColor,
                }}>
                {/* {SelectLan('Domstic Cleaner')} */}
                {DesCrip.taskCategoryData?.categoryName}
              </Text>

              <Text
                style={{
                  fontFamily: FONTS.medium,
                  fontSize: moderateScale(12),
                  color: colors.primaryThemeColor,
                }}>
                {/* {SelectLan('$1500')} */}
                {DesCrip.taskAmount}
              </Text>
            </View>
            <View style={styles.top_txt_view}>
              <Text
                style={{
                  fontFamily: FONTS.medium,
                  fontSize: moderateScale(12),
                  color: colors.primaryThemeColor,
                }}>
                {/* {SelectLan('Domstic Cleaner')} */}
                {DesCrip.subcategoriesData?.subCategoryName}
              </Text>
              <Text
                style={{
                  fontFamily: FONTS.medium,
                  fontSize: moderateScale(12),
                  color: colors.primaryThemeColor,
                }}>
                {/* {SelectLan('A Week')} */}
                {DesCrip.time}
              </Text>
            </View>

            <View style={styles.borderView} />
            <Text
              style={{
                ...styles.desCrip,
                color: colors.primaryThemeColor,
              }}>
              {SelectLan('Description')}
              {/* {item.description} */}
            </Text>

            <Card
              style={{
                backgroundColor: '#F4F6F6',
                marginTop: moderateScale(10),
                marginHorizontal: moderateScale(15)
              }}>
              <Text
                style={{
                  fontFamily: FONTS.medium,
                  fontSize: moderateScale(12),
                  color: colors.primaryThemeColor,
                }}>
                {/* {SelectLan('I need a work in Home clin, I need a work in Home clin, I need a work in Home clin')}
                 */}
                {DesCrip.description}
              </Text>
            </Card>
            <View
              style={{
                marginTop: moderateScale(20),
              }}>
              <FlatList
                data={DesCrip.taskImage}
                contentContainerStyle={{flexDirection: 'row'}}
                renderItem={({item, index}) => {
                  return (
                    <View>
                      <Image
                        source={{uri: item}}
                        style={{
                          height: 60,
                          width: 60,
                          borderRadius: 10,
                          marginLeft: 10,
                        }}
                      />
                    </View>
                  );
                }}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <AppTextInput
                // numberOfLines={6}
                textAlignVertical="top"
                multiline={true}
                placeholderTextColor={'#26baed'}
                placeholder="Your Price"
                keyboardType='number-pad'
                value={amount}
                onChangeText={value => setAmount(value)}
                // secureTextEntry={true}

                style={{
                  color: colors.primaryThemeColor,
                }}
                inputContainerStyle={{
                  ...styles.inputCont,
                }}
              />
              <AppTextInput
                // numberOfLines={6}
                textAlignVertical="top"
                multiline={true}
                placeholderTextColor={'#26baed'}
                placeholder="Your Time"
                keyboardType='number-pad'
                // secureTextEntry={true}
                value={day}
                onChangeText={value => setDay(value)}
                style={{
                  color: colors.primaryThemeColor,
                  // fontFamily: FONTS.semibold,
                  // fontSize: moderateScale(8)
                }}
                inputContainerStyle={{
                  ...styles.inputCont,
                  marginLeft: moderateScale(20),
                }}
              />
            </View>

            <AppButton
              onPress={() => acceptButton()}
              title={SelectLan('Accept')}
              gradient={true}
              gradientColors={['#36afda', '#1d79bc']}
              gradientStart={{x: 0, y: 1}}
              gradientEnd={{x: 1, y: 1}}
              style={styles.fistapp}
              textStyle={{
                fontSize: moderateScale(14),
                fontFamily: FONTS.medium,
              }}
            />
          </Card>
        </ImageBackground>
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default TaskViewProfile;

const styles = StyleSheet.create({
  bg_img: {
    height: height,
    width: width,
    paddingTop: StatusBar.currentHeight,
  },
  back_icon: {
    fontSize: moderateScale(15),
  },
  PressableView: {
    height: moderateScale(25),
    width: moderateScale(25),
    borderRadius: moderateScale(25),
    backgroundColor: '#D8F3FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: moderateScale(15),
  },
  inputCont: {
    borderWidth: 0,
    width: moderateScale(130),
    borderRadius: moderateScale(5),
    elevation: 1,
    backgroundColor: '#F8F9F9',
    marginTop: moderateScale(20),
    paddingLeft: moderateScale(10),
  },
  profile_img: {
    marginTop: verticalScale(30),
    height: moderateScale(85),
    width: moderateScale(85),
    borderRadius: moderateScale(60),
    alignSelf: 'center',
  },
  profile_desc: {
    marginTop: verticalScale(10),
  },
  profile_desc_view: {
    borderRadius: moderateScale(10),
    alignSelf: 'center',
    width: '90%',
    elevation: moderateScale(5),
    marginTop: verticalScale(10),
  },
  ratings_view: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingTop: verticalScale(10),
    justifyContent: 'center',
  },

  top_txt_view: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(15),
  },
  borderView: {
    borderWidth: moderateScale(0.3),
    marginTop: moderateScale(10),
    width: '90%',
    justifyContent: 'center',
    alignSelf: 'center',
    borderColor: '#C0C0C0',
  },
  desCrip: {
    fontFamily: FONTS.medium,
    fontSize: moderateScale(12),

    marginHorizontal: moderateScale(15),
    marginTop: moderateScale(10),
  },
  fistapp: {
    height: moderateScale(45),
    width: moderateScale(150),
    borderRadius: moderateScale(10),
    elevation: moderateScale(10),
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: moderateScale(20),
    marginVertical: moderateScale(20),
  },
  profileName: {
    fontFamily: FONTS.medium,
    fontSize: moderateScale(18),
    alignSelf: 'center',
    marginTop: moderateScale(10),
  },
  detailTask: {
    fontFamily: FONTS.bold,
    alignSelf: 'center',
    fontSize: moderateScale(16),
    marginTop: moderateScale(40),
  },
});
