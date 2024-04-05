import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  Pressable,
  Image,
  FlatList,
  ImageBackground,
} from 'react-native';
import React, { useEffect, useState } from 'react';

import {
  AppTextInput,
  Container,
  Icon,
  useTheme,
} from 'react-native-basic-elements';
import LinearGradient from 'react-native-linear-gradient';
import { moderateScale } from '../../Constants/PixelRatio';
import NavigationService from '../../Services/Navigation';
import { FONTS } from '../../Constants/Fonts';
import AuthService from '../../Services/Auth';

// const width = Dimensions.get('screen').width;
const { height, width } = Dimensions.get('window');
export default function ServiceProviders(props) {
  const colors = useTheme();
  const [allService, setAllService] = useState([]);
  const categoryID = props.route.params.cat_id;
  const categoryData = props.route.params.cat_data;

  useEffect(() => {
    getService();
  }, []);


  const getService = () => {
    AuthService.getProvService(categoryID).then(res => {
      // console.log('subbbbbbb>>>', res);
      if (res) {
        setAllService(res.data);
      }
    });
  };
  return (
    <Container>
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
      <ImageBackground
        style={{ height: height, width: width }}
        source={require('../../Assets/images/payment_bg.jpg')}>

        <View style={{ flexDirection: 'row', marginVertical: moderateScale(10) }}>

          <Image style={styles.image} source={{ uri: categoryData?.image }} />
          
          <View style={{ marginVertical: moderateScale(18) }}>
            <Text
              style={{
                color: '#2874A6',
                fontFamily: FONTS.bold,
                fontSize: moderateScale(20),
              }}>
              {categoryData?.categoryName}
            </Text>
            <Text
              style={{
                color: colors.primaryThemeColor,
                fontFamily: FONTS.bold,
                fontSize: moderateScale(11),
              }}>
              Services
            </Text>
          </View>
        </View>
        {
          allService.length ? (
            <FlatList
              style={{ marginBottom: moderateScale(80) }}
              data={allService}
              renderItem={({ item, index }) => {
                return (
                  <View style={styles.card}>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginVertical: moderateScale(10),
                      }}>
                        {
                          item.image == null ?
                          <Image
                          source={require('../../Assets/images/Imagegdefault.png')}
                          style={styles.image2}
                        />
                        :
                          <Image style={styles.image2} source={{ uri: item.image }} />
                        }
                      
                      <View style={{ marginLeft: moderateScale(2) }}>
                        <Text style={styles.name}>{item.subCategoryName}</Text>
                        <Text style={{
                          color: colors.primaryThemeColor,
                          fontFamily: FONTS.semibold,
                          fontSize: moderateScale(10)
                        }}>
                          {categoryData?.categoryName}
                        </Text>
                      </View>
                    </View>
                    <LinearGradient
                      style={styles.getButton}
                      colors={['white', '#D0D3D4']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}>
                      <Text
                        onPress={() =>
                          NavigationService.navigate('GetHome', {
                            service_data: item,
                          })
                        }
                        style={{
                          color: colors.primaryThemeColor,
                          fontFamily: FONTS.bold,
                        }}>
                        Get
                      </Text>
                    </LinearGradient>
                  </View>

                );
              }}
            />
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
      {/* <Pressable style={styles.plus_btn}>
        <LinearGradient
          colors={['#3BB6DF', '#1972B6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.plus_gradient}>
          <Icon
            name="plus"
            type="Entypo"
            size={25}
            style={{ color: colors.pageBackgroundColor }}
          />
        </LinearGradient>
      </Pressable> */}
    </Container>
  );
}

const styles = StyleSheet.create({
  root_view: {
    // height: StatusBar.currentHeight + 55,
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

  outer_input_view: {
    height: 30,
    width: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingRight: 10,
    alignItems: 'center',
  },
  input_view: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '45%',
    height: moderateScale(30),
    paddingLeft: 2,
    borderRadius: 3,
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
    borderRadius: moderateScale(5),
  },
  image2: {
    height: moderateScale(50),
    width: moderateScale(50),
    marginHorizontal: moderateScale(10),
    borderRadius: moderateScale(10),
    resizeMode: 'cover',
  },
  name: {
    color: '#2874A6',
    fontFamily: FONTS.medium,
    // marginVertical: moderateScale(2),
    fontSize: moderateScale(12),
  },
  card: {
    elevation: moderateScale(10),
    backgroundColor: 'white',
    marginVertical: moderateScale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(10),
  },
  getButton: {
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(20),
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#D0D3D4',
    height: moderateScale(30),
    elevation: 2,
    marginVertical: moderateScale(18),
  },
  plus_btn: {
    position: 'absolute',
    // alignItems: 'center',

    bottom: 40,
    right: 10,
    elevation: 10,
    // zIndex: ,
  },
  plus_gradient: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: moderateScale(30),
    width: moderateScale(30),
    borderRadius: moderateScale(15),
  },
});
