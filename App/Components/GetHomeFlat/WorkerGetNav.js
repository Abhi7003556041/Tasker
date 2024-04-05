/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
//import liraries
import React, { Component, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ImageBackground,
  Dimensions,
  FlatList,
  Alert,
} from 'react-native';
import { moderateScale, verticalScale } from '../../Constants/PixelRatio';
import { Card, Container, Icon, useTheme } from 'react-native-basic-elements';
import { FONTS } from '../../Constants/Fonts';
import LinearGradient from 'react-native-linear-gradient';
import NavigationService from '../../Services/Navigation';
import StarRating from 'react-native-star-rating';
import HomeService from '../../Services/HomeService';
import { useSelector } from 'react-redux';
import database from '@react-native-firebase/database';
import uuid from 'react-native-uuid';

// create a component
const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const WorkerGetNav = ({ item, data }) => {
  const colors = useTheme();
  const [rating, setstarCount] = useState();
  const [status, setStatus] = useState(false);

  const { userData } = useSelector(state => state.User);

  const onStarRatingPress = async rating => {
    setstarCount(rating);
  };
  useEffect(() => {
    setstarCount(item.biderDetails.avgRating)
  }, []);

  const alertFunc = () => {
    Alert.alert('Task', 'Do you want to accept?', [
      {
        text: 'No',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'Yes', onPress: () => acceptProvider() },
    ]);

  };
  const acceptProvider = async () => {
    let roomId = uuid.v4();
    let requester = {
      name: `${userData.firstName} ${userData.lastName}`,
      userId: userData._id,
      roomId: roomId,
      image:
        'https://www.seekpng.com/png/full/114-1149972_avatar-free-png-image-avatar-png.png',
    };
    let provider = {
      name: `${item.biderDetails.firstName} ${item.biderDetails.lastName}`,
      userId: item.providerID,
      roomId: roomId,
      image:
        'https://www.seekpng.com/png/full/114-1149972_avatar-free-png-image-avatar-png.png',
    };
    database()
      .ref(`chatlist/${userData._id}/${item.providerID}`)
      .once('value')
      .then(snapshot => {
        console.log('second>>>>>', snapshot.val());
        if (snapshot.exists()) {
          console.log('Object.values(snapshot.val())', snapshot.val());

        } else {
          console.log('Not foind');
          database()
            .ref(`chatlist/${userData._id}/${item.providerID}`)
            .set(provider);
        }
      })
    database()
      .ref(`chatlist/${item.providerID}/${userData._id}`)
      .once('value')
      .then(snapshot => {
        console.log('first>>>>>>>>>', snapshot.val());
        if (snapshot.exists()) {
          console.log('Object.values())', snapshot.val());

        } else {
          console.log('Not foind');
          database()
            .ref(`chatlist/${item.providerID}/${userData._id}`)
            .set(requester);
        }
      })
    console.log('hii')
    //  Navigation.navigate('Chat', { roomId: UserData.roomId, name: `${UserData.name}`, image: UserData.image, remoteId: UserData.userId, remoteData: UserData })
    HomeService.acceptBid(item._id)
      .then(res => {
        // console.log('accepted>>', res);
        setStatus(true);
      })
      .catch(err => console.log(err));
  };

  return (
    <Card style={styles.card}>

      <View
        style={{
          flexDirection: 'row',
        }}>
        <Pressable
          onPress={() =>
            NavigationService.navigate('WorkerProfile', { Id: item.providerID })
          }
        >

          <Image
            source={item.biderDetails.image ? { uri: item.biderDetails.image } : require('../../Assets/images/useravatar.png')}
            style={styles.img}
          />
        </Pressable>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            // borderWidth:1,
            flex: 1,
          }}>
          <View
            style={{
              marginLeft: moderateScale(10),
            }}>
            <Text
              style={{
                color: colors.primaryThemeColor,
                fontSize: moderateScale(12),
                fontFamily: FONTS.medium
              }}>
              {item?.biderDetails.firstName} {item?.biderDetails.lastName}
            </Text>
            <View style={styles.ratings_view}>
              <StarRating
                disabled={false}
                maxStars={5}
                rating={rating}
                starSize={10}
                fullStarColor="#e78200"
                emptyStarColor="#4267b2"
                // selectedStar={rating => onStarRatingPress(rating)}
                containerStyle={{
                  marginLeft: moderateScale(1),
                }}
              />
            </View>
            <Text
              // numberOfLines={1}
              style={{
                color: colors.primaryThemeColor,
                fontSize: moderateScale(8),
                fontFamily: FONTS.semibold,
                maxWidth: 170,
              }}>
              {/* {item.biderDetails.email} */}
              {data.area}
            </Text>
          </View>

          <View
            style={{
              justifyContent: 'flex-start',
              width: '35%',
              marginLeft: 20,

            }}>

            <Text
              numberOfLines={1}
              style={{
                color: 'black',
                fontSize: moderateScale(12),
                maxWidth: '90%',
                color: colors.primaryThemeColor,
                fontSize: moderateScale(10),
                fontFamily: FONTS.semibold,
              }}>
              ${item.bidAmount}/Hours
            </Text>

            <Text numberOfLines={1} style={{
              ...styles.lastseen,
              color: colors.primaryThemeColor,
              fontSize: moderateScale(10),
              fontFamily: FONTS.semibold,
            }}>
              {/* Last Offer 1 min{' '} */}
              {item.requiredDays} days
            </Text>
          </View>
        </View>
      </View>
      {/* );
          }}
        /> */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginTop: 15,
          marginLeft: 10,
        }}>
        {/* <Pressable
        // onPress={() => {
        //   NavigationService.navigate('GetHomeProfile', {task: item});
        // }}
        >
        <LinearGradient
          style={styles.getButton}
          colors={['white', '#D0D3D4']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <Text
            style={{
              color: 'red',
              fontFamily: FONTS.bold,
            }}>
            Reject
          </Text>
        </LinearGradient>
      </Pressable> */}


        <Pressable
          onPress={() => {
            item.isAccepted || status ?
            null
            :
            alertFunc()
          }}>
          <LinearGradient
            style={styles.getButton}
            colors={['white', '#D0D3D4']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}>

            <Text
              style={{
                color:
                  item.isAccepted || status
                    ? 'green'
                    : colors.primaryThemeColor,
                fontFamily: FONTS.bold,
              }}>
              {item.isAccepted || status ? 'Accepted' : 'Accept'}

            </Text>
          </LinearGradient>
        </Pressable>


      </View>
    </Card>
  );
};

// define your styles
const styles = StyleSheet.create({
  background: {
    // flex: 1,
    height: height,
    width: width,
  },
  img: {
    height: moderateScale(55),
    width: moderateScale(55),
    marginHorizontal: moderateScale(10),
    borderRadius: moderateScale(10),
    alignSelf: 'center'
  },
  lastseen: {
    fontSize: moderateScale(12),
    // marginTop: moderateScale(5),
  },
  card: {
    elevation: moderateScale(5),
    backgroundColor: '#fff',
    // flexDirection: 'row',
    paddingHorizontal: moderateScale(5),
    marginTop: moderateScale(10),
    marginHorizontal: 10,
    // elevation:4
    borderRadius: 10,
    // shadowColor:'grey'
  },

  name: {
    color: '#2874A6',
    fontFamily: FONTS.medium,
    // marginVertical: moderateScale(2),
    fontSize: moderateScale(12),
  },
  getButton: {
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(20),
    alignItems: 'center',
    justifyContent: 'center',
    height: moderateScale(25),
    // width: moderateScale(100),
    elevation: 2,
  },
  scrollImages: {
    height: moderateScale(50),
    width: moderateScale(50),
    marginTop: 10,
  },
  ratings_view: {
    flexDirection: 'row',
    marginVertical: verticalScale(2),
  },
});

//make this component available to the app
export default WorkerGetNav;



