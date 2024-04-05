import React, { useEffect, useState } from 'react';
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
import { FONTS } from '../../Constants/Fonts';
import { moderateScale, verticalScale } from '../../Constants/PixelRatio';
import NavigationService from '../../Services/Navigation';
import StarRating from 'react-native-star-rating';
import SelectLan from '../../Components/Language/SelectLan';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import HomeService from '../../Services/HomeService';
import Toast from 'react-native-simple-toast';
import { useSelector } from 'react-redux';
import { setSelectLanguage } from '../../Redux/reducer/Language';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const ReviewReq = props => {

     const { userData } = useSelector(state => state.User);

     const [rating, setstarCount] = useState();
     const [reviewType, setReviewType] = useState();
     // const [taskList, setTaskList] = useState([]);
     const colors = useTheme();
     const providerTypeData = props.route.params.profileId;
     const receiverId = props.route.params.requesterID;
     // console.log("Datattatat",receiverType)
     const profileData = props.route.params.profileDataName;


     const onStarRatingPress = async rating => {
          setstarCount(rating);
     };

     // useEffect(() => {
     //      getTask();
     // }, []);

     const sendButton = () => {
          let data = {
               receiverID: receiverId,
               taskID: providerTypeData,
               review: reviewType,
               rating: rating,
          };
          HomeService.reviewData(data).then(res => {
               console.log('review is givern to requester',res)
               if (res && res.status) {
                    Toast.show(setSelectLanguage == 'en' ? 'Review submitted successfully' : 'Revisión enviada con éxito', Toast.SHORT, Toast.BOTTOM);
                    NavigationService.navigate('Home');
                    setReviewType()
                    setstarCount()
               }
          }).catch((err)=>{
               console.log('errr',err)
               Toast.showWithGravity('Review already given', Toast.SHORT, Toast.BOTTOM);
               setReviewType()
               setstarCount()
          })
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
                              Review
                         </Text>

                         <Image
                              source={profileData.requesterData?.image ?{ uri: profileData.requesterData?.image }:require('../../Assets/images/useravatar.png')}
                              style={styles.profile_img}
                         />
                         <Text
                              style={{
                                   color: colors.pageBackgroundColor,
                                   ...styles.profileName,
                              }}>
                              {profileData.requesterData?.firstName} {profileData.requesterData?.lastName} 
                         </Text>

                         <View style={{ height: moderateScale(50) }} />
                         <View
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
                                        Rating and Review
                                   </Text>
                                   {/* <Text
                                        style={{
                                             fontFamily: FONTS.medium,
                                             fontSize: moderateScale(12),
                                             color: colors.primaryThemeColor,
                                             marginTop: moderateScale(10),
                                        }}>
                                        Qualify
                                   </Text> */}
                              </View>

                              <View style={styles.profile_desc}>
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
                              </View>
                              <Text
                                   style={{
                                        fontFamily: FONTS.medium,
                                        fontSize: moderateScale(12),
                                        color: colors.primaryThemeColor,
                                        marginTop: moderateScale(15),
                                        marginHorizontal: moderateScale(15)
                                   }}>
                                   Write Review
                              </Text>
                              <View
                                   style={{
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                   }}>

                                   <AppTextInput
                                        numberOfLines={6}
                                        textAlignVertical="top"
                                        multiline={true}
                                        placeholderTextColor={'#26baed'}
                                        placeholder="Type....."
                                        // secureTextEntry={true}
                                        value={reviewType}
                                        onChangeText={value => setReviewType(value)}
                                        style={{
                                             color: colors.primaryThemeColor,

                                        }}
                                        inputContainerStyle={{
                                             ...styles.inputCont,
                                             // marginLeft: moderateScale(20),
                                        }}
                                   />
                              </View>

                              <AppButton
                                   onPress={() => sendButton()}
                                   title={SelectLan('Send')}
                                   gradient={true}
                                   gradientColors={['#36afda', '#1d79bc']}
                                   gradientStart={{ x: 0, y: 1 }}
                                   gradientEnd={{ x: 1, y: 1 }}
                                   style={styles.fistapp}
                                   textStyle={{
                                        fontSize: moderateScale(14),
                                        fontFamily: FONTS.medium,
                                   }}
                              />
                         </View>
                    </ImageBackground>
               </KeyboardAwareScrollView>
          </Container>
     );
};

export default ReviewReq;

const styles = StyleSheet.create({
     bg_img: {
          height: height,
          width: width,
          paddingTop: StatusBar.currentHeight,
     },
     back_icon: {
          fontSize: moderateScale(15),
     },

     inputCont: {
          borderWidth: 0,
          // width: '100%',
          width: moderateScale(270),
          borderRadius: moderateScale(5),
          elevation: 1,
          backgroundColor: '#F8F9F9',
          marginTop: moderateScale(30),
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
          marginTop: verticalScale(20),
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

          paddingHorizontal: moderateScale(15),
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
          marginTop: moderateScale(20),
     },
     detailTask: {
          fontFamily: FONTS.bold,
          alignSelf: 'center',
          fontSize: moderateScale(16),
          marginTop: moderateScale(50),
     },
});
