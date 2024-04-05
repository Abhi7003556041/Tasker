//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {
  AppTextInput,
  Container,
  Icon,
  StatusBar,
  useTheme,
} from 'react-native-basic-elements';
import SettingsHeader from '../../Components/Header/SettingsHeader';
import LinearGradient from 'react-native-linear-gradient';
import {FONTS} from '../../Constants/Fonts';
import {moderateScale} from '../../Constants/PixelRatio';
import SelectLan from '../../Components/Language/SelectLan';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

// create a component
const ChatBoth = () => {
  const colors = useTheme();
  return (
    <Container>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle="light-content"
      />
      <ImageBackground
        source={require('../../Assets/images/payment_bg.jpg')}
        style={{
          ...styles.bg_img,
        }}>
        <LinearGradient
          style={styles.root_view}
          colors={['#3BB6DF', '#1972B6']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: moderateScale(30),
            }}>
            <Image
              style={styles.imageProfile}
              source={require('../../Assets/images/Image.png')}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                flex: 1,
              }}>
              <Text
                style={{
                  fontFamily: FONTS.medium,
                  fontSize: moderateScale(16),
                  color: colors.pageBackgroundColor,
                }}>
                Loren Dev
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  marginHorizontal: moderateScale(20),
                }}>
                <Icon
                  name="call"
                  type="Ionicons"
                  color={colors.pageBackgroundColor}
                  size={16}
                />
                <Icon
                  name="setting"
                  type="AntDesign"
                  color={colors.pageBackgroundColor}
                  size={16}
                  style={{
                    marginLeft: moderateScale(10),
                  }}
                />
              </View>
            </View>
          </View>
        </LinearGradient>
        <View style={styles.chatView}>
          <Text
            style={{
              fontFamily: FONTS.semibold,
              fontSize: moderateScale(12),
            }}>
            Hi I'm Loren Hi I'm Loren Hi I'm Loren
          </Text>
        </View>
        <View
          style={{
            flex: 1,
          }}
        />
        <View
          style={{
            ...styles.apptextView,
            backgroundColor: colors.secondaryThemeColor,
          }}>
          <AppTextInput
            placeholder={SelectLan('Type your message....')}
            placeholderTextColor={colors.primaryThemeColor}
            secureTextEntry={true}
            // value={password}
            // onChangeText={value => setPassword(value)}
            style={{
              color: colors.secondaryThemeColor,
              fontFamily: FONTS.semibold,
              fontSize: moderateScale(12),
              width: '100%',
            }}
            inputContainerStyle={{
              ...styles.inputCont,
              backgroundColor: colors.pageBackgroundColor,
            }}
          />
          <Icon
            name="send"
            type="FontAwesome"
            color={colors.pageBackgroundColor}
            size={16}
            style={{
              marginLeft: moderateScale(15),
            }}
          />
          <Icon
            name="camera"
            type="Feather"
            color={colors.pageBackgroundColor}
            size={16}
            style={{
              marginHorizontal: moderateScale(10),
            }}
          />
        </View>
      </ImageBackground>
    </Container>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {},
  bg_img: {
    height: height,
    width: width,
    flex: 1,
    // paddingTop: StatusBar.currentHeight,
  },
  imageProfile: {
    height: moderateScale(50),
    width: moderateScale(50),
    borderRadius: moderateScale(25),
    marginHorizontal: moderateScale(20),
    // marginTop: moderateScale(10)
  },
  root_view: {
    height: moderateScale(110),
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatView: {
    height: moderateScale(40),
    width: moderateScale(170),
    backgroundColor: '#f0f5f5',
    marginTop: moderateScale(20),
    marginHorizontal: moderateScale(20),
    borderRadius: moderateScale(5),
  },
  inputCont: {
    borderWidth: moderateScale(0),
    borderRadius: 0,
    elevation: moderateScale(2),
    paddingHorizontal: moderateScale(10),
    height: moderateScale(35),
    width: '70%',
    marginHorizontal: moderateScale(10),
  },
  apptextView: {
    height: moderateScale(60),
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

//make this component available to the app
export default ChatBoth;
