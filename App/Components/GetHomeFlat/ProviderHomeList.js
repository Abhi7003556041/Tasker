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
} from 'react-native';
import { moderateScale, verticalScale } from '../../Constants/PixelRatio';
import { Card, Container, Icon, useTheme } from 'react-native-basic-elements';
import { FONTS } from '../../Constants/Fonts';
import LinearGradient from 'react-native-linear-gradient';
import NavigationService from '../../Services/Navigation';
import StarRating from 'react-native-star-rating';

// create a component
const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const ProviderHomeList = ({ item }) => {
  const colors = useTheme();
  const [rating, setstarCount] = useState();

  useEffect(() => { 
    setstarCount(item?.requesterData?.avgRating)
  }, []);

  const onStarRatingPress = async rating => {
    setstarCount(rating);
  };
  
  return (

    <Card style={styles.card}>
      <View
        style={{
          flexDirection: 'row'
        }}
      >
        <Image style={styles.image2}
          source={item.requesterData?.image ? { uri: item.requesterData?.image }:require('../../Assets/images/useravatar.png')} />

        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          // borderWidth:1,
          flex: 1
        }}>
          <View style={{
            marginLeft: moderateScale(10),
            // borderWidth:1,
            width: '60%'
          }}>

            <Text style={{
              color: colors.primaryThemeColor,
              fontSize: moderateScale(14),
              fontFamily: FONTS.semibold
            }}>{item.subcategoriesData?.subCategoryName}</Text>

            <View style={styles.ratings_view}>
              <StarRating
                disabled={false}
                maxStars={5}
                rating={rating}
                starSize={10}
                fullStarColor='#e78200'
                emptyStarColor='#4267b2'
                // selectedStar={(rating) => onStarRatingPress(rating)}
              // containerStyle={{
              //      // marginLeft: moderateScale(5)
              // }}
              />
            </View>

            <Text numberOfLines={1}
              style={{
                color: colors.primaryThemeColor,
                fontSize: moderateScale(10),
                marginTop: moderateScale(5),
                fontFamily: FONTS.semibold,
                // width: '100%',
              }}>{item.description}</Text>

          </View>

          <View style={{
            // justifyContent: 'flex-start',
            // borderWidth:1,
            // width: '30%'
          }}>
            <Pressable onPress={() => {
              NavigationService.navigate('TaskViewProfile', { profileId: item._id })
            }}
            >
              <LinearGradient
                style={styles.getButton}
                colors={['#1d79bc', '#36afda']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >

                <Text
                  style={{
                    color: colors.pageBackgroundColor,
                    fontFamily: FONTS.bold,
                    fontSize: moderateScale(9)
                  }}>View</Text>

              </LinearGradient>
            </Pressable>


          </View>

        </View>
      </View>



    </Card>


  );
  return (
    <Card style={styles.card}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <Image
          style={styles.image2}
          source={require('../../Assets/images/Image.png')}
        />

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
              // borderWidth:1,
              width: '60%',
            }}>
            <Text
              style={{
                color: colors.primaryThemeColor,
                fontSize: moderateScale(14),
                fontFamily: FONTS.semibold,
              }}>
              {item?.subcategoriesData?.subCategoryName}
            </Text>

            <View style={styles.ratings_view}>
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

            <Text
              numberOfLines={1}
              style={{
                color: colors.primaryThemeColor,
                fontSize: moderateScale(10),
                marginTop: moderateScale(5),
                fontFamily: FONTS.semibold,
                // width: '100%',
              }}>
              {item.description}
            </Text>
          </View>

          <View
            style={
              {
                // justifyContent: 'flex-start',
                // borderWidth:1,
                // width: '30%'
              }
            }>
            <Pressable
              onPress={() => {
                NavigationService.navigate('TaskViewProfile', {
                  profileId: item._id,
                });
              }}>
              <LinearGradient
                style={styles.getButton}
                colors={['#1d79bc', '#36afda']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}>
                <Text
                  style={{
                    color: colors.pageBackgroundColor,
                    fontFamily: FONTS.bold,
                    fontSize: moderateScale(9),
                  }}>
                  View
                </Text>
              </LinearGradient>
            </Pressable>
          </View>
        </View>
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
  ratings_view: {
    flexDirection: 'row',
    marginTop: verticalScale(5),
  },
  lastseen: {
    fontSize: moderateScale(8),
    marginTop: moderateScale(5),
  },
  card: {
    elevation: moderateScale(10),
    marginHorizontal: moderateScale(10),
    marginBottom: moderateScale(10),
    backgroundColor: '#fff',
    // flexDirection: 'row',
    // paddingHorizontal: moderateScale(10),
    marginTop: moderateScale(10),
    // borderWidth: 1
  },
  image2: {
    height: moderateScale(50),
    width: moderateScale(50),
    marginHorizontal: moderateScale(10),
    borderRadius: moderateScale(30),
  },
  name: {
    color: '#2874A6',
    fontFamily: FONTS.medium,
    // marginVertical: moderateScale(2),
    fontSize: moderateScale(12),
  },
  getButton: {
    borderRadius: moderateScale(20),
    paddingHorizontal: moderateScale(20),
    alignItems: 'center',
    justifyContent: 'center',
    height: moderateScale(25),
    width: moderateScale(65),
    elevation: 2,
  },
  scrollImages: {
    height: moderateScale(50),
    width: moderateScale(50),
    marginTop: 10,
  },
});

//make this component available to the app
export default ProviderHomeList;
