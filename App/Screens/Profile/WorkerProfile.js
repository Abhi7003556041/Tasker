/* eslint-disable no-shadow */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
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
  AppButton,
  AppTextInput,
  Card,
  Container,
  Icon,
  useTheme,
} from 'react-native-basic-elements';
import { FONTS } from '../../Constants/Fonts';
import { moderateScale, verticalScale } from '../../Constants/PixelRatio';
import NavigationService from '../../Services/Navigation';
import StarRating from 'react-native-star-rating';
import SettingsHeader from '../../Components/Header/SettingsHeader';
import SelectLan from '../../Components/Language/SelectLan';
import HomeService from '../../Services/HomeService';
import moment from 'moment';
import { useSelector } from 'react-redux';
import useSelectLangue from '../../Components/Language/useSelectLangue';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const WorkerProfile = (props) => {
  const [rating, setstarCount] = useState();
  const [ratingg, setstarCountt] = useState();
  const userData = useSelector(state => state.User.userData);
  const {setLanguage}=useSelectLangue()

  const [biderDetails, setBiderDetails] = useState()
  const [allReview,setAllReview] = useState([])
  const colors = useTheme();
  const Id = props.route.params.Id
  const onStarRatingPress = async rating => {
    setstarCount(rating);
  };
  useEffect(() => {
    if(userData.userType == 'Requester'){
      getProfile()
    }else{
      getReqProfile()
    }
    getAllReview()
  }, [])

  const getProfile = async () => {
    HomeService.getProfile(Id)
      .then((res) => {
        console.log('biderDetails', res.data)
        setBiderDetails(res.data)
      })
      .catch((err) => console.log(err))
  }
  const getReqProfile = async () => {
    HomeService.getReqProfile(Id)
      .then((res) => {
        console.log('getReqProfile', res)
        setBiderDetails(res.data[0])
      })
      .catch((err) => console.log(err))
  }
  const getAllReview = async () => {
    HomeService.getReview(Id)
      .then((res) => {
        console.log('reviewAllll', res.data)
        setAllReview(res.data)
      })
      .catch((err) => console.log(err))
  }
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
{
  console.log('uuuu',userData.userType)
}
        <Text
          style={{
            ...styles.profile_txt,
            color: colors.pageBackgroundColor,
          }}>
          {setLanguage('Profile')}
        </Text>

        <Image
          source={{
            uri: biderDetails?.image,
          }}
          style={styles.profile_img}
        />

        <View style={styles.profile_desc}>
          <Text
            style={{
              ...styles.profile_txt,
              color: colors.pageBackgroundColor,
              marginTop: moderateScale(15),
            }}>
            {setLanguage(biderDetails?.serviceData?.subCategoryName)}
          </Text>
          <Text
            style={{
              ...styles.name_txt,
              color: colors.pageBackgroundColor,
            }}
          // onPress={() => Navigation.navigate('WorkersProfile')}
          >
            {biderDetails?.firstName} {biderDetails?.lastName}
          </Text>
        </View>

        <View
          style={{
            ...styles.profile_desc_view,
            backgroundColor: colors.pageBackgroundColor,
            borderColor: colors.textgrey,
          }}>
            {userData.userType == 'Requester' ?
          <View style={styles.txt_view}>
            <View style={styles.top_txt_view}>
              <Text style={styles.request_txt}>
                {setLanguage(biderDetails?.serviceData?.subCategoryName)}
              </Text>
              <Text style={styles.price_txt}>${biderDetails?.hourlyRate}/Hour</Text>
            </View>
            <Text style={styles.offer_txt}>
              {setLanguage('Last offer 15/Hour, December 8,2021')}
            </Text>
          </View>
          :null
}

          <View style={styles.ratings_view}>
            <Text
              style={{
                ...styles.ratings_txt,
                color: colors.primaryThemeColor,
              }}>
              {setLanguage('Ratings and Review')}
            </Text>
          </View>

          <View style={styles.ratings_view}>
            <Text
              style={{ ...styles.ratings_num, color: colors.primaryThemeColor }}>
              {biderDetails?.avgRating}
            </Text>

            <StarRating
              disabled={false}
              maxStars={5}
              rating={biderDetails?.avgRating}
              starSize={10}
              fullStarColor="#e78200"
              emptyStarColor="#4267b2"
              // selectedStar={rating => onStarRatingPress(rating)}
              containerStyle={{
                marginLeft: moderateScale(5),
              }}
            />
          </View>
          
          <View
            style={{
              height: userData.userType == 'Requester' ? 100 : 75,
              width: '90%',
              backgroundColor: '#F8F9F9',
              alignSelf: 'center',
              elevation: 5,
              borderRadius: 5,
              marginTop: 30
            }}
          >
            <Text
              style={{
                fontWeight: '900',
                color: 'black',
                margin: 10
              }}
            >
              Description
            </Text>
            <Text
              style={{
                // fontWeight:'900',
                color: 'black',
                marginHorizontal: 10,
                fontSize: 11,
                lineHeight: 15
              }}
            >
              {userData.userType == 'Requester' ? biderDetails?.aboutMe : 'Requester'}
            </Text>
          </View>
          {/* <View style={styles.profile_desc}>
            <View style={styles.ratings_view}>
              <StarRating
                disabled={false}
                maxStars={5}
                rating={rating}
                starSize={25}
                fullStarColor="#ffcc33"
                emptyStarColor="#398cb4"
                value={rating}
                selectedStar={rating => onStarRatingPress(rating)}
                containerStyle={{
                  marginLeft: moderateScale(10),
                }}
                starStyle={{
                  marginRight: moderateScale(10),
                }}

              />
            </View>
          </View> */}
          <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:5}}>
          <Text
            style={{
              ...styles.writeText,
              color: colors.primaryThemeColor,
              fontSize: 15,
              fontWeight: '700',
              marginVertical:10,
            }}>
            Reviews
          </Text>
          <Pressable 
          onPress={()=>NavigationService.navigate('AllReviewData',{Id:Id})}
          >
          <Text
            style={{
              // ...styles.writeText,
              color: colors.primaryThemeColor,
              fontSize: 15,
              // fontWeight: '700',
              marginVertical:10,
              marginRight:10,
              fontSize:13,
              marginTop:12
            }}>
            View all
          </Text>
          </Pressable>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor:'#EBEBEB',
              // alignItems:'center',
              marginHorizontal:10,
              paddingRight:5,
              paddingVertical:10,
              borderRadius:5,
              marginBottom:30
            }}>
            <View
            style={{
              width:'75%'
            }}
            >
              <Text
                style={{
                  ...styles.writeText,
                  color: colors.primaryThemeColor,
                  // marginTop:0
                }}>
                {allReview?.slice(-1)[0]?.reviewerData.firstName} {allReview?.slice(-1)[0]?.reviewerData.lastName}
              </Text>
              <Text
              numberOfLines={2}
                style={{
                  ...styles.writeText,
                  color: 'grey',
                  // marginVertical:5,
                  // maxWidth:150
                }}>
                  {/* {allReview.splice(-1)[0]} */}
                  {allReview?.slice(-1)[0]?.review}
              </Text>
            </View>
            <View>
            <Text style={{fontSize:11,marginLeft:15,color:'black'}}>{moment(allReview?.slice(-1)[0]?.createdOn).format('DD/MM/YY')}</Text>
            <View style={{flexDirection:'row',alignItems:'center',marginTop:4}}>
            <Text
              style={{ ...styles.ratings_num, color: colors.primaryThemeColor }}>
              {allReview?.slice(-1)[0]?.rating}
            </Text>

            <StarRating
              disabled={false}
              maxStars={5}
              rating={allReview?.slice(-1)[0]?.rating}
              starSize={10}
              fullStarColor="#e78200"
              emptyStarColor="#4267b2"
              // selectedStar={rating => onStarRatingPress(rating)}
              containerStyle={{
                marginLeft: moderateScale(5),
              }}
            />
          </View>
            </View>
            {
              console.log(allReview?.slice(-1)[0]?.review)
            }
          </View>
          {/* <AppButton
            onPress={() => sendButton()}
            title={setLanguage('Send')}
            gradient={true}
            gradientColors={['#36afda', '#1d79bc']}
            gradientStart={{ x: 0, y: 1 }}
            gradientEnd={{ x: 1, y: 1 }}
            style={styles.fistapp}
            textStyle={{
              fontSize: moderateScale(14),
              fontFamily: FONTS.medium,
            }}
          /> */}
        </View>
      </ImageBackground>
    </Container>
  );
};

export default WorkerProfile;

const styles = StyleSheet.create({
  bg_img: {
    height: height,
    width: width,
    paddingTop: StatusBar.currentHeight,
  },
  profile_desc: {
    marginTop: verticalScale(10),
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
  back_icon: {
    fontSize: moderateScale(15),
  },
  writeText: {
    fontFamily: FONTS.medium,
    fontSize: moderateScale(12),
    // marginTop: moderateScale(10),
    marginHorizontal: moderateScale(15)
  },
  inputContText: {
    borderWidth: 0,
    // width: '100%',
    width: moderateScale(260),
    borderRadius: moderateScale(5),
    elevation: 1,
    backgroundColor: '#F8F9F9',
    marginTop: moderateScale(30),
    paddingLeft: moderateScale(10),
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

  ratings_num: {
    fontSize: moderateScale(12),
  },
  profile_img: {
    marginTop: verticalScale(10),
    height: moderateScale(110),
    width: moderateScale(110),
    borderRadius: moderateScale(60),
    alignSelf: 'center',
  },

  profile_txt: {
    textAlign: 'center',
    fontSize: moderateScale(15),
    fontFamily: FONTS.bold,
    bottom: moderateScale(20),
  },
  name_txt: {
    textAlign: 'center',
    fontFamily: FONTS.bold,
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
    fontFamily: FONTS.bold
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
