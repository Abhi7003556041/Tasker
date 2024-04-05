import React, {useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ImageBackground,
  StatusBar,
} from 'react-native';
import {
  AppTextInput,
  Card,
  Container,
  Icon,
  useTheme,
} from 'react-native-basic-elements';
import {FONTS} from '../../Constants/Fonts';
import {moderateScale, verticalScale} from '../../Constants/PixelRatio';
import NavigationService from '../../Services/Navigation';
import StarRating from 'react-native-star-rating';
import SettingsHeader from '../../Components/Header/SettingsHeader';
import SelectLan from '../../Components/Language/SelectLan';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const MyProfile = () => {
  const [rating, setstarCount] = useState();

  const colors = useTheme();

  const onStarRatingPress = async rating => {
    setstarCount(rating);
  };

  return (
    <Container>
      <ImageBackground
        source={require('../../Assets/images/myProfile_bg.png')}
        style={styles.bg_img}>
        <Pressable
          style={styles.PressableView}
          onPress={() => NavigationService.back()}>
          <Icon
            name="arrowleft"
            type="AntDesign"
            style={{
              ...styles.back_icon,
              color: colors.primaryThemeColor,
            }}
          />
        </Pressable>

        <Text
          style={{
            ...styles.profile_txt,
            color: colors.pageBackgroundColor,
          }}>
          {SelectLan('Profile')}
        </Text>

        <Image
          source={{
            uri: 'https://i.pinimg.com/736x/fc/57/83/fc5783f616f18f9c439cedcc63616b2e.jpg',
          }}
          style={styles.profile_img}
        />

        <View style={styles.profile_desc}>
          <Text
            style={{
              ...styles.profile_txt,
              color: colors.pageBackgroundColor,
              marginTop: moderateScale(20),
            }}>
            {SelectLan('Painter')}
          </Text>
          <Text
            style={{
              ...styles.name_txt,
              color: colors.pageBackgroundColor,
            }}
            onPress={() => Navigation.navigate('WorkersProfile')}>
            Jeams Thomas
          </Text>
        </View>

        <Card
          style={{
            ...styles.profile_desc_view,
            backgroundColor: colors.pageBackgroundColor,
            borderColor: colors.textgrey,
          }}>
          <View style={styles.txt_view}>
            <View style={styles.top_txt_view}>
              <Text style={styles.request_txt}>
                {SelectLan('Domstic Cleaner')}
              </Text>
              <Text style={styles.price_txt}>$15/Hour</Text>
            </View>
            <Text style={styles.offer_txt}>
              {SelectLan('Last offer $15/Hour, December 8,2021')}
            </Text>
          </View>

          <View style={styles.ratings_view}>
            <Text
              style={{
                ...styles.ratings_txt,
                color: colors.primaryThemeColor,
              }}>
              {SelectLan('Ratings and Review')}
            </Text>
          </View>

          <View style={styles.ratings_view}>
            <Text
              style={{...styles.ratings_num, color: colors.primaryThemeColor}}>
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
          </View>

          <AppTextInput
            numberOfLines={6}
            textAlignVertical="top"
            multiline={true}
            placeholderTextColor={'#26baed'}
            // secureTextEntry={true}

            style={{
              color: colors.primaryThemeColor,
            }}
            inputContainerStyle={{
              ...styles.inputCont,
            }}
          />

          <View style={{height: moderateScale(90)}} />
        </Card>
      </ImageBackground>
    </Container>
  );
};

export default MyProfile;

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
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(10),
    marginHorizontal: moderateScale(15),
    marginTop: moderateScale(15),
    borderRadius: 3,
    elevation: 5,
    backgroundColor: '#F8F9F9',
    // borderColor: "#a0a0a0",
    marginTop: moderateScale(20),
  },
  ratings_num: {
    fontSize: moderateScale(12),
  },
  profile_img: {
    marginTop: verticalScale(20),
    height: moderateScale(85),
    width: moderateScale(85),
    borderRadius: moderateScale(60),
    alignSelf: 'center',
  },
  profile_desc: {
    marginTop: verticalScale(10),
  },
  profile_txt: {
    textAlign: 'center',
    fontSize: moderateScale(15),
    fontFamily: FONTS.bold,
    bottom: moderateScale(20),
  },
  name_txt: {
    textAlign: 'center',

    fontSize: moderateScale(22),
  },
  profile_desc_view: {
    borderRadius: moderateScale(2),
    alignSelf: 'center',
    width: '80%',
    elevation: 2,
    marginTop: verticalScale(20),
  },
  profile_desc_heading_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(15),
    paddingTop: verticalScale(20),
  },
  occupation_txt: {
    color: '#4872B5',
    fontSize: moderateScale(20),
  },
  price_txt: {
    color: '#4872B5',
  },
  get_btn: {
    backgroundColor: '#DAD8D5',
    borderRadius: 6,
    alignItems: 'center',
    height: moderateScale(20),
    width: moderateScale(60),
  },
  get_txt: {
    fontSize: moderateScale(12),
  },
  ratings_view: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(20),
    paddingTop: verticalScale(10),
  },
  ratings_txt: {
    fontSize: moderateScale(12),
    fontFamily: FONTS.semibold,
  },
  view_all_txt: {
    color: '#4872B5',
    textDecorationLine: 'underline',
    fontSize: moderateScale(10),
  },
  ratings: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingStart: moderateScale(19),
  },
  ratings_number: {
    fontSize: moderateScale(25),
    color: '#5D80BD',
  },
  star_icon_view: {
    flexDirection: 'row',
    paddingStart: moderateScale(5),
  },
  star_icon_view2: {
    flexDirection: 'row',
    marginLeft: moderateScale(5),
  },
  star_icon: {
    fontSize: 10,
    color: '#F8C471',
  },

  star_icon: {
    color: 'gold',
  },
  star_icon2: {
    color: '#4872B5',
  },
  review_section_view: {
    backgroundColor: '#ECECEC',
    height: verticalScale(100),
    width: '90%',
    borderRadius: 10,

    alignSelf: 'center',
    padding: 10,
  },
  name: {
    fontSize: 13,
  },
  chat: {
    fontSize: 7,
  },

  img_view: {
    flexDirection: 'row',
    paddingTop: verticalScale(10),
    alignSelf: 'center',
  },
  img: {
    height: moderateScale(50),
    width: moderateScale(50),
    marginHorizontal: moderateScale(10),
  },
  txt_view: {
    paddingTop: verticalScale(20),
  },
  top_txt_view: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(15),
  },
  offer_txt: {
    fontSize: moderateScale(6),
    paddingHorizontal: moderateScale(15),
    textAlign: 'right',
  },
  request_txt: {
    fontSize: moderateScale(16),
    color: '#4470B4',
  },
  edit_txt: {
    textAlign: 'right',
    textDecorationLine: 'underline',
    marginHorizontal: moderateScale(15),
    fontSize: moderateScale(10),
  },
  edit_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: moderateScale(20),
  },
  edit_photos_txt: {
    fontSize: moderateScale(11),
  },
  upload_icon: {
    fontSize: moderateScale(10),
  },
});
