import { Pressable, Share, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Container, useTheme } from 'react-native-basic-elements'
import SettingsHeader from '../../Components/Header/SettingsHeader'
import { moderateScale, verticalScale } from '../../Constants/PixelRatio'
import { FONTS } from '../../Constants/Fonts'
import NavigationService from '../../Services/Navigation'
import SelectLan from '../../Components/Language/SelectLan'
import { Switch } from 'react-native-switch';
import HomeService from '../../Services/HomeService'
import AuthService from '../../Services/Auth'
import { setuser } from '../../Redux/reducer/User'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectLanguage } from '../../Redux/reducer/Language'


const ProviderSetting = () => {

  const [active, setActive] = useState(false);
  const colors = useTheme()
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [isEnabled, setIsEnabled] = useState(false);
  const dispatch = useDispatch();

  const { selectLanguage } = useSelector(s => s.Language)
  const NotificationType = async () => {

    setIsEnabled(previousState => !previousState);
    HomeService.notificationMood()
      .then((res) => {
        // console.log('No9tification---------', res)
        if (res) {
          Update_Requester()
        }
      })

  };

  const Update_Requester = async () => {
    setIsEnabled(previousState => !previousState);
    const deviceToken = await AuthService.getNotifactionToken()
    let data = {
      deviceToken: isEnabled ? null : deviceToken
    };
    HomeService.requesterProfileUpdate(data).then(res => {
      // console.log("res", res);

    })
      .catch(err => {
        console.log("err", err);
      })
  };

  const getProfile = async () => {
    HomeService.profileUpdate()
      .then(res => {
        // console.log("UPDatettetet", res)
        if (res.data.deviceToken == null) {
          setIsEnabled(false);
        }
        else (
          setIsEnabled(true)
        )

      })
  }
  const profileStatus = async () => {
    HomeService.statusMoodType()
      .then(res => {
        // console.log("<><><><><><><>=====>>>", res)
        if (res) {

        }
      })
  }



  useEffect(() => {
    getProfile()
    profileStatus()
  }, [])


  return (
    <Container>
      <SettingsHeader headerText={SelectLan('Settings')} />

      <View style={{
        ...styles.notification_view,
      }}>
        <Text style={{
          fontFamily: FONTS.medium,
          fontSize: moderateScale(14),
          color: colors.primaryThemeColor,

        }}>{SelectLan('Notification')}</Text>

        <Switch
          value={isEnabled}
          onValueChange={() => Update_Requester()}
          circleSize={18}
          barHeight={16}
          circleBorderWidth={0.3}
          backgroundActive={colors.primaryThemeColor}
          backgroundInactive={'#D0D3D4'}
          circleActiveColor={colors.secondaryThemeColor}
          circleInActiveColor={'#D0D3D4'}
          changeValueImmediately={true}
          innerCircleStyle={{ alignItems: "center", justifyContent: "center" }}
          outerCircleStyle={{
            borderWidth: 0,
          }}
          containerStyle={{
            marginRight: moderateScale(10)
          }}
          renderActiveText={false}
          renderInActiveText={false}
          switchLeftPx={2}
          switchRightPx={2}
          switchWidthMultiplier={2}
          switchBorderRadius={10}
        />

      </View>
      <View
        style={styles.Line}
      />

      <Text style={styles.invite_friend_txt}>{SelectLan('Invite a friend')}</Text>
      <View style={styles.invitation_view}>
        <Text style={{
          color: colors.primaryThemeColor
        }}>{SelectLan('Invitation')}</Text>

        <Text onPress={() =>
          NavigationService.navigate('InviteFriend')
        }
          style={styles.send_invitation_txt}
        >
          {SelectLan('Send invitation to a friend')}
        </Text>

      </View>
      <View style={{
        ...styles.Line,
        marginTop: moderateScale(20)
      }}>

      </View>
      {/* <Text onPress={() =>
        NavigationService.navigate('ContactScreen')
      }
        style={{
          ...styles.text,
          color: colors.primaryThemeColor,
        }}>{SelectLan('Contact Us')}</Text>
      <View style={{
        ...styles.Line,
        marginTop: moderateScale(20)
      }}>

      </View> */}
      <Text onPress={() =>
        NavigationService.navigate('AboutUs')
      }
        style={{
          ...styles.text,
          color: colors.primaryThemeColor,
        }}>{SelectLan('About Us')}</Text>
      <View style={{
        ...styles.Line,
        marginTop: moderateScale(20)
      }}>

      </View>
      <View style={{
        flexDirection: 'row',
        justifyContent: "space-between"
      }}>
        <Text

          style={{
            ...styles.text,
            color: colors.primaryThemeColor
          }}>{SelectLan('Language')}</Text>

        <View style={{
          justifyContent: 'center',
          alignItems: "center",
          // height: moderateScale(140),

        }}>
          {selectLanguage == 'en' ?
            <Pressable
              onPress={() => { dispatch(setSelectLanguage('es')) }} >
              <Text style={{
                ...styles.text,
                color: colors.cardColor,
              }}> EN / {' '}

                <Text style={{
                  color: colors.primaryThemeColor,

                }}>
                  ES
                </Text>
              </Text>
            </Pressable>
            :
            <Pressable
              onPress={() => { dispatch(setSelectLanguage('en')) }} >
              <Text style={{
                ...styles.text,
                color: colors.primaryThemeColor,
              }}> EN  /
                <Text style={{
                  color: colors.cardColor,

                }}>
                  {' '}ES
                </Text>
              </Text>
            </Pressable>}

        </View>

      </View>
      <View style={{
        ...styles.Line,
        marginTop: moderateScale(20)
      }}>

      </View>
      <Text onPress={() =>
        NavigationService.navigate('ChangePass')
      }
        style={{
          ...styles.text,
          color: colors.primaryThemeColor
        }}>{SelectLan('Change Password')}</Text>
      <View style={{
        ...styles.Line,
        marginTop: moderateScale(20)
      }}>

      </View>
    </Container>
  )
}

export default ProviderSetting

const styles = StyleSheet.create({
  notification_view: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: moderateScale(20),
    alignItems: 'center',
    paddingTop: verticalScale(15),
  },
  text: {
    fontFamily: FONTS.medium,
    fontSize: moderateScale(14),
    marginHorizontal: moderateScale(20),
    marginTop: moderateScale(10)

  },
  Switch: {
    marginTop: verticalScale(10),
    // backgroundColor: 'red',
    width: '50%',
  },
  invite_friend_txt: {
    marginHorizontal: moderateScale(20),
    marginTop: verticalScale(10),
    color: '#0038B4',
  },
  invitation_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: moderateScale(20),
    alignItems: 'center',
  },
  send_invitation_txt: {
    color: '#0038B4',
    textDecorationLine: 'underline',
    fontSize: moderateScale(10),
  },
  Line: {
    borderBottomColor: '#D7D7D7',
    width: '90%',
    alignSelf: 'center',
    marginTop: verticalScale(20),
    borderBottomWidth: 1,
  }
})