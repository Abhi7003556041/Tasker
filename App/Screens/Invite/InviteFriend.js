import { Dimensions, Image, ImageBackground, Pressable, Share, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppButton, Container, useTheme } from 'react-native-basic-elements'
import SettingsHeader from '../../Components/Header/SettingsHeader'
import LinearGradient from 'react-native-linear-gradient';
import { moderateScale } from '../../Constants/PixelRatio';
import SelectLan from '../../Components/Language/SelectLan';
import { useSelector } from 'react-redux';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const InviteFriend = () => {

  const { userData, custData } = useSelector((state) => state.User)
  // console.log("getttttdataaaa",userData)

  const colors = useTheme()

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          `📲 Shear Download Alert! 🚀
Experience the ultimate task management revolution! Our mobile app empowers you to assign, track, and complete tasks effortlessly. Say goodbye to chaos and hello to productivity. Stay organized, collaborate seamlessly, and achieve goals together. Download now and unlock a world of efficiency at your fingertips! 🌟 #TaskerApp
${userData.ownCode} +'https://play.google.com/store/apps/details?id=com.fisibilitylite',`
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View>
      <ImageBackground
        source={require('../../Assets/images/payment_bg.jpg')}
        style={styles.bg_img}>

        <SettingsHeader headerText={SelectLan('Invite a Friend')} />

        <View style={styles.card_view}>

          <Image
            source={require('../../Assets/images/spanishInvite.png')}
            style={{ height: '70%', width: '100%', alignSelf: 'center', resizeMode: 'center' }}
          />
          {/* <Image
                        source={require('../../Assets/images/spanishInvite.png')}
                        style={{ height: '70%', width: '100%', alignSelf: 'center', resizeMode: 'center' }}
                    /> */}

          <AppButton
            onPress={() => onShare()}
            title={SelectLan('Share')}
            gradient={true}
            gradientColors={['#36afda', '#288cc8', '#1d79bc']}
            gradientStart={{ x: 0, y: 1 }}
            gradientEnd={{ x: 1, y: 1 }}
            style={styles.fistapp}
            textStyle={{
              fontSize: moderateScale(14),
            }}

          />

        </View>
      </ImageBackground>
    </View>
  )
}

export default InviteFriend

const styles = StyleSheet.create({
  bg_img: {
    height: height,
    width: width,

  },
  fistapp: {
    height: moderateScale(50),
    width: moderateScale(150),
    borderRadius: moderateScale(15),
    elevation: moderateScale(10),
    alignSelf: 'center',
    justifyContent: 'center'
  },
  card_view: {
    elevation: 5,
    height: '100%'
  },
})