/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
//import liraries
import React, { Component } from 'react';
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

// create a component
const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const HomeGetNav = ({ item }) => {
  const colors = useTheme();

  return (
    <Card style={styles.card}>

      <View
        style={{
          flexDirection: 'row',
        }}>
        {/* <Image
          style={styles.image2}
          source={{ uri: item.taskImage[0] }}
        /> */}
        <Image
          source={item.taskImage[0] ? { uri: item.taskImage[0] } : require('../../Assets/images/Imagegdefault.png')}
          style={styles.img}
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
            }}>
            <Text
              style={{
                color: colors.primaryThemeColor,
                fontSize: moderateScale(14),
                fontFamily: FONTS.medium
                // flex: 1
              }}>
              {item?.subcategoriesData?.subCategoryName}
            </Text>
            <Text
              numberOfLines={2}
              style={{
                color: colors.primaryThemeColor,
                fontSize: moderateScale(10),
                maxWidth: 150,
                // backgroundColor:'red'
                fontFamily: FONTS.semibold
              }}>
              {item.description}
              {/* dfj nvdkfjdndkfjdklfjkdlfjdklfjdfjdfkjdkfjklfdjdlfjdklfjdlfjdlfkjdlkfjdlfjdlfjk */}
            </Text>
          </View>

          <View
            style={{
              justifyContent: 'flex-start',
              // borderWidth:1,
              width: '35%',
            }}>
            <Text
              numberOfLines={1}
              style={{
                color: colors.primaryThemeColor,
                fontSize: moderateScale(10),
                maxWidth: '90%',
                fontFamily: FONTS.semibold
              }}>
              ${item.taskAmount}/Hours
            </Text>
            <Pressable
              onPress={() => {
                NavigationService.navigate('GetHomeProfile', { task: item });
              }}>
              <LinearGradient
                style={styles.getButton}
                colors={['white', '#D0D3D4']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}>
                <Text
                  style={{
                    color: colors.primaryThemeColor,
                    fontFamily: FONTS.bold,
                    fontSize: moderateScale(10)
                  }}>
                  Get
                </Text>
              </LinearGradient>
            </Pressable>

            <Text numberOfLines={1} style={styles.lastseen}>
              Last Offer 1 min{' '}
            </Text>
          </View>
        </View>
      </View>
      {/* );
          }}
        /> */}

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
    fontSize: moderateScale(8),
    marginTop: moderateScale(5),
    fontFamily: FONTS.semibold,
    fontSize: moderateScale(6)
  },
  card: {
    elevation: moderateScale(5),
    backgroundColor: '#fff',
    // flexDirection: 'row',
    paddingHorizontal: moderateScale(10),
    marginTop: moderateScale(10),
    marginHorizontal: 10,
    // elevation:4
    borderRadius: 10,
    // shadowColor:'grey'
  },
  image2: {
    height: moderateScale(55),
    width: moderateScale(55),
    marginHorizontal: moderateScale(10),
    borderRadius: moderateScale(10),
    alignSelf: 'center'
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
    height: moderateScale(23),
    width: moderateScale(63),
    elevation: 2,
  },
  scrollImages: {
    height: moderateScale(50),
    width: moderateScale(50),
    marginTop: 10,
  },
});

//make this component available to the app
export default HomeGetNav;
