import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import React, { useState, useEffect } from 'react';

import {
  Card,
  Container,
  Icon,
  useTheme,
  Text,
  AppTextInput,
} from 'react-native-basic-elements';
import LinearGradient from 'react-native-linear-gradient';
import { moderateScale, verticalScale } from '../../Constants/PixelRatio';
import ImagesList from '../../Components/TaskerImage/ImagesList';
import StarRating from 'react-native-star-rating';
import NavigationService from '../../Services/Navigation';
import HomeService from '../../Services/HomeService';
import { useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import database from '@react-native-firebase/database';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { FONTS } from '../../Constants/Fonts';
import { Modal } from 'react-native';
import StripPayment from '../../Components/Payment/stripPayment';
import SimpleToast from 'react-native-simple-toast';


const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const DrawerTaskComp = ({ item, func }) => {
  const [rating, setstarCount] = useState();
  const colors = useTheme();

  const [all, setAll] = useState();

  const { userData } = useSelector(state => state.User);
  const [paymentModal, setPaymentModal] = useState(false)

  const onStarRatingPress = async rating => {
    setstarCount(rating);
  };
  useEffect(() => {
    getData();
    // setstarCount(item.serviceData.avgRating)
  }, []);
  const SubscriptionPurchase = () => {
    // console.log('type>>>>>>>>>>>>>>')
    // setClose(true)
    setPaymentModal(false)
  }

  const alertFunc = () => {
    Alert.alert('Dispute', 'Do you want to Dispute Task ?', [
      {
        text: 'No',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'Yes', onPress: () => dispuitPayment() },
    ]);
  };

  const dispuitPayment = async () => {
    HomeService.paymentDispuit(item?._id)
      .then((res) => {
        console.log('dispuit>>', res)
        SimpleToast.show('Task Dispuited', SimpleToast.SHORT)
        func()
      })
  }
  const getData = async () => {
    database()
      .ref(`chatlist/${userData._id}/${item.providerID}`)
      .once('value')
      .then(snapshot => {
        console.log('first', item.providerID, snapshot.val());
        if (snapshot.exists()) {
          console.log('Object.values(snapshot.val())', snapshot.val());
          setAll(snapshot.val());
        } else {
          console.log('Not foind');
        }
      });
  };
  return (
    <Card
      style={{
        ...styles.Card,
        backgroundColor: item.taskStatus == 'Paid' ? '#c6c9cc' : colors.primaryFontColor
      }}>

      {console.log('Iditemtask', item)}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            source={item?.providerData?.image ? { uri: item?.providerData?.image } : require('../../Assets/images/useravatar.png')}
            style={styles.profile_img}
          />
          <View
            style={{
              marginLeft: moderateScale(10),
            }}>

            <Text
              style={{
                fontFamily: FONTS.medium,
                fontSize: moderateScale(14),
                color: colors.pageBackgroundColor,
              }}>
              {item?.providerData?.firstName} {item?.providerData?.lastName}
            </Text>
            <StarRating
              disabled={false}
              maxStars={5}
              rating={item?.providerData?.serviceData?.avgRating}
              starSize={10}
              fullStarColor="#e78200"
              emptyStarColor="#4267b2"
              // selectedStar={rating => onStarRatingPress(rating)}
              containerStyle={
                {
                  width: moderateScale(55)
                }
              }
            />
          </View>
        </View>
        {/* {console.log('df', item)} */}
        <Pressable
          style={{
            ...styles.send_btn,
            height: moderateScale(35),
            width: moderateScale(80),
          }}
          disabled={item?.taskStatus == 'Request Payment' ? true : false}
        // onPress={() => alertfunc(item._id)}
        >
          <LinearGradient
            colors={['#FEFDFC', '#C7C8C5']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.msg_gradient}>
            <Text
              style={{
                fontFamily: FONTS.semibold,
                fontSize: moderateScale(12),
              }}>
              {item?.taskStatus == 'assigned'
                ? 'Start'
                : item?.taskStatus == 'Start'
                  ? 'Started'
                  : item?.taskStatus == 'Complete'
                    ? 'Completed'
                    : item?.taskStatus == 'Dispute'
                      ? 'Disputed'
                      : item?.taskStatus == 'Paid'
                        ? 'Payment Successful'
                        : 'Request Payment'}
            </Text>
          </LinearGradient>
        </Pressable>

      </View>

      {item.taskStatus == 'Paid' ?
        <View
          style={{
            marginTop: moderateScale(20),
            // marginHorizontal: moderateScale(5),
            flexDirection: 'row',
            justifyContent: 'space-between'

          }}>
          <Text
            numberOfLines={2}
            style={{
              ...styles.jobtext,
              color: colors.pageBackgroundColor,
              fontFamily: FONTS.medium,
              maxWidth: '60%'
            }}>
            {item?.area}
          </Text>

          <Pressable
            onPress={() => {
              NavigationService.navigate('Review', { profileId: item?._id, requesterID: item?.requesterID, profileDataName: item })
            }}
          >
            <LinearGradient
              style={styles.getButton}
              colors={['#fff', '#94b8b8']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >

              <Text
                style={{
                  color: colors.textgrey,
                  fontFamily: FONTS.bold,
                  fontSize: moderateScale(9)
                }}>Review</Text>

            </LinearGradient>
          </Pressable>
        </View>
        : null
      }
      <View
        style={{
          marginTop: moderateScale(20),

        }}>
        <Text
          style={{
            ...styles.jobtext,
            color: colors.pageBackgroundColor,
            fontFamily: FONTS.semibold,
            fontSize: moderateScale(12)
          }}>
          Request{' '}
          {item?.providerData?.serviceData?.subcategoriesData?.subCategoryName}
        </Text>

      </View>

      <Text
        numberOfLines={1}
        style={{
          fontFamily: FONTS.medium,
          fontSize: moderateScale(12),
          color: colors.pageBackgroundColor,
        }}>
        {userData.firstName} {userData.lastName}
      </Text>
      <Text
        style={{
          fontWeight: '900',
          color: colors.cardColor,
          marginTop: 10,
          // marginBottom
        }}>
        Description
      </Text>
      <View
        style={styles.descrip}>

        <Text
          style={{
            // fontWeight:'900',
            color: colors.primaryThemeColor,
            // marginHorizontal: 10,
            fontSize: 11,
            fontFamily: FONTS.medium,
          }}>
          {item?.description}
        </Text>
      </View>
      {item?.providerCompleteImage && item?.taskStatus == 'Request Payment' || item?.taskStatus == 'Dispute' || item?.taskStatus == 'Paid' ?

        <View>
          <Text
            style={{
              fontWeight: '900',
              color: colors.cardColor,
              marginTop: 10,
              // marginBottom
            }}>
            Task Complete Image(s)
          </Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={item?.providerCompleteImage}
            contentContainerStyle={{
              flexDirection: 'row',
            }}
            renderItem={({ item, index }) => {
              return <ImagesList item={item} index={index} />;
            }}
          />
        </View>
        :
        <View>
          <Text
            style={{
              fontWeight: '900',
              color: colors.cardColor,
              marginTop: 10,
              // marginBottom
            }}>
            Task Image(s)
          </Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={item.taskImage}
            contentContainerStyle={{
              flexDirection: 'row',
            }}
            renderItem={({ item, index }) => {
              return <ImagesList item={item} index={index} />;
            }}
          />
        </View>
      }
      <>
        {item?.reason ?
          <Text
            style={{
              ...styles.price_txt,
              color: '#000',
              fontFamily: FONTS.medium,
              fontSize: moderateScale(12),
              fontWeight: '900',
              marginTop: 5

              // marginVertical:10
            }}>
            Final Charges :
          </Text>
          : null
        }
        {item?.reason?.map((res) => {
          return (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 10
                // marginBottom:reason.length>1 ? 0 : 15
              }}
            >
              <View
                style={{
                  ...styles.inputCont,
                }}
              >
                <Text>
                  {res.reason}
                </Text>
              </View>
              <View
                style={{
                  ...styles.inputCont,
                }}
              >
                <Text>
                  {res?.price}
                </Text>
              </View>
            </View>
          )
        })}

      </>
      <View
        style={{
          ...styles.price_view,
          backgroundColor: colors.secondaryThemeColor,
        }}>
        <Text
          style={{
            ...styles.price_txt,
            color: colors.pageBackgroundColor,
          }}>
          TOTAL:
        </Text>
        <Text
          style={{
            ...styles.price_txt,
            color: colors.pageBackgroundColor,
          }}>
          $ {(item?.taskAmount + (item?.taskAmount * 0.15))}
        </Text>
      </View>
      {item?.taskStatus == 'Request Payment' || item?.taskStatus == 'Dispute' ?
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 10
          }}
        >

          <Pressable
            onPress={() => setPaymentModal(true)}
            style={{
              // height: moderateScale(50),
              width: '40%',
              paddingHorizontal: 10,
              alignSelf: 'center'
            }}>

            <LinearGradient
              colors={['#FEFDFC', '#C7C8C5']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                ...styles.msg_gradient,
                // height: '60%',
                height: moderateScale(30),
              }}>
              <Text
                style={{
                  fontFamily: FONTS.semibold,
                  color: colors.primaryThemeColor,
                  fontSize: moderateScale(12),
                }}>
                Pay Now
              </Text>
            </LinearGradient>

          </Pressable>

          <Pressable
            onPress={() => alertFunc()}
            style={{
              // height: moderateScale(50),
              width: '40%',
              paddingHorizontal: 10,
              alignSelf: 'center'
            }}>

            <LinearGradient
              colors={['#FEFDFC', '#C7C8C5']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                ...styles.msg_gradient,
                // height: '60%',
                height: moderateScale(30),
              }}>
              <Text
                style={{
                  fontFamily: FONTS.semibold,
                  color: colors.primaryThemeColor,
                  fontSize: moderateScale(12),
                }}>
                Dispute
              </Text>
            </LinearGradient>

          </Pressable>
        </View>
        : null
      }
      {item.taskStatus != 'Paid' ?

        <Pressable
          style={styles.send_btn}
          onPress={() =>
            NavigationService.navigate('InnerChat', {
              roomId: all.roomId,
              name: `${all.name}`,
              image: all.image,
              remoteId: all.userId,
              remoteData: all
            })
          }>
          <LinearGradient
            colors={['#FEFDFC', '#C7C8C5']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.msg_gradient}>
            <Text style={{
              fontFamily: FONTS.medium,
              fontSize: moderateScale(10)
            }}>Send message</Text>
            <Icon name="send-o" type="FontAwesome" style={styles.send_icon} />
          </LinearGradient>
        </Pressable>
        : null
      }
      <Modal
        animationType="slide"
        transparent={true}
        visible={paymentModal}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setPaymentModal(!paymentModal);
          // setComment('')
        }}
      >
        {/* <View style={{ flex: 1, backgroundColor: '#000000aa' }}>
                    <Pressable
                        style={{ flex: 1 }}
                        onPress={() => setreviewModal(false)}
                    >
                    </Pressable>
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: '#fff',
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,

                        }}
                    > */}
        {/* <Pressable
                        style={{ flex: 1, backgroundColor: '#000000ab' }}
                        onPress={() => setPaymentModal(false)}
                    >
                    </Pressable> */}
        <StripPayment
          amount={(item?.taskAmount + (item?.taskAmount * 0.15))}
          paymentComplete={() => SubscriptionPurchase()}
          onBack={() => setPaymentModal(false)}
          room={new Date().getTime()}
          user={item?._id}
          func={() => func()}
        />
        {/* </View>.
                </View>. */}
      </Modal>
    </Card>
  );
};

export default DrawerTaskComp;
const styles = StyleSheet.create({
  bg_img: {
    width: width,
    height: height,
  },
  price_view: {
    flexDirection: 'row',
    backgroundColor: '#1C73B6',
    marginVertical: verticalScale(15),
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(15),
    height: moderateScale(30),
    marginTop: moderateScale(30),
  },
  descrip: {
    height: 100,
    width: '100%',
    backgroundColor: '#F8F9F9',
    alignSelf: 'center',
    elevation: 5,
    borderRadius: 5,
    marginTop: 10,
    padding: 10
  },
  send_icon: {
    fontSize: moderateScale(12),
  },
  getButton: {
    borderRadius: moderateScale(4),
    paddingHorizontal: moderateScale(20),
    alignItems: 'center',
    justifyContent: 'center',
    height: moderateScale(30),
    width: moderateScale(75),
    elevation: 2,
  },
  msg_gradient: {
    justifyContent: 'center',
    borderRadius: moderateScale(5),
    width: '100%',
    alignItems: 'center',
    height: '100%',
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    // alignItems: 'center',
  },
  send_btn: {
    backgroundColor: '#FEFDFC',
    // flexDirection: 'row',
    alignSelf: 'center',
    width: '45%',
    height: verticalScale(25),
    elevation: 5,
    borderRadius: moderateScale(5),
    marginBottom: verticalScale(15),
    marginTop: moderateScale(10),
  },
  price_txt: {
    paddingVertical: verticalScale(5),
    fontSize: moderateScale(10),
    fontFamily: FONTS.medium
  },
  Card: {
    marginTop: moderateScale(20),
    width: '90%',
    marginHorizontal: moderateScale(20),
  },
  profile_img: {
    height: moderateScale(50),
    width: moderateScale(50),
    borderRadius: moderateScale(25),
  },
  star_icon_view: {
    flexDirection: 'row',
  },
  star_icon: {
    fontSize: moderateScale(10),
  },
  top_view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: moderateScale(20),
    marginTop: moderateScale(20),
  },
  inner_view: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  middle_view: {
    paddingHorizontal: moderateScale(10),
    // width:'50%'
  },
  btn: {
    borderRadius: moderateScale(15),
    height: verticalScale(20),
    width: moderateScale(140),
    alignItems: 'center',
    marginLeft: moderateScale(30),
    // padding:10
  },
  status_gradient: {
    justifyContent: 'center',
    borderRadius: moderateScale(3),
    alignItems: 'center',
    elevation: 5,
    height: 40
    // padding:10
    // margin:12
  },
  status_txt: {
    fontSize: moderateScale(11),
    marginHorizontal: moderateScale(5),
  },
  jobtext: {
    fontSize: moderateScale(16),
  },
  inputCont: {
    borderWidth: 0,
    width: moderateScale(130),
    borderRadius: moderateScale(5),
    elevation: 1,
    backgroundColor: '#F8F9F9',
    marginVertical: moderateScale(10),
    // paddingLeft: moderateScale(10),
    alignItems: 'center',
    height: 40,
    justifyContent: 'center'
  },
  imageUpload: {
    height: moderateScale(45),
    width: moderateScale(50),
    borderRadius: moderateScale(10),
    marginTop: moderateScale(20),
    marginHorizontal: moderateScale(15),
  },
});