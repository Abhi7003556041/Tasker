
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TextInput,
  ImageBackground,
  Pressable,
  ScrollView,
  Alert,
} from 'react-native';
import { AppButton, AppTextInput, Container, Icon, StatusBar, useTheme } from 'react-native-basic-elements';
import { COLORS } from '../../Constants/Colors';
import { moderateScale, verticalScale } from '../../Constants/PixelRatio';
import NavigationService from '../../Services/Navigation';
import Toast from 'react-native-simple-toast'
import AuthService from '../../Services/Auth';
import { setuser } from '../../Redux/reducer/User';
import { useDispatch, useSelector } from 'react-redux';
import { FONTS } from '../../Constants/Fonts';
import useSelectLangue from '../../Components/Language/useSelectLangue';
import { setSelectLanguage } from '../../Redux/reducer/Language';
import { fcmService } from '../../Services/Notification/FCMservice';
import HomeService from '../../Services/HomeService';
// import { fcmService } from '../Services/Notification/FCMservice';
// import { fcmService } from "../../Services/Notification/NotifeeService";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import TextBox from 'react-native-password-eye';


GoogleSignin.configure({
  webClientId: '939075535503-sqclgjfkqu494mr3kueaiqn3obfjhinr.apps.googleusercontent.com',
  forceCodeForRefreshToken: true
});

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const Login = (props) => {

  const colors = useTheme()
  const dispatch = useDispatch()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [loader, setLoader] = useState(false)
  const { setLanguage } = useSelectLangue()
  const { selectLanguage } = useSelector(state => state.Language);
  const [token, setToken] = useState('')
  const [hidePass, sethidePass] = useState(true)
  const type = props.route.params.type
  const Fldvalid = txt => txt && txt.replace(/\s/g, '').length;

  // React.useEffect(() => {
  //   fcmService.register(onRegister);
  // }, []);
  React.useEffect(() => {
    fcmService.register(onRegister, () => { }, () => { });

  }, [])

  const onRegister = token => {
    console.log('Register token [App]:', token);
    setToken(token);
  };


  const logIn = () => {
    setLoader(true)
    let pattern =
      /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,20}[\.][a-z]{2,5}/g;
    let emailresult = pattern.test(email);
    if (

      Fldvalid(email) === 0 ||
      email == ''

    ) {
      // Toast.show('Please Fill all Data', Toast.SHORT);
      Toast.show(selectLanguage == 'en' ? 'Please Fill all Data' : 'Por favor complete todos los datos', Toast.SHORT, Toast.BOTTOM);
      setLoader(false);
      return;
    } else if (emailresult !== true) {
      Toast.show(selectLanguage == 'en' ? 'Invalid Email Id' : 'ID de correo electrónico no válido', Toast.SHORT, Toast.BOTTOM);
      setLoader(false);
      return;
    }

    let data = {
      email: email,
      password: password,
      deviceToken: token
    }
    let data1 = {
      deviceToken: token
    }

    AuthService.login(data)
      .then(res => {
        console.log('resLogin------>>>>>>>>-------', res.data)
        if (res && res.status) {
          setLoader(false);
          HomeService.requesterProfileUpdate(data1).then(res => {
            console.log('devicetokenUpdaste')
          });

          dispatch(setuser(res.data))
          AuthService.setAccount(res.data);
          AuthService.setToken(res.data.token);
          Toast.show(selectLanguage == 'en' ? 'Logged In Successfully' : 'Iniciado sesión con éxito', Toast.SHORT, Toast.BOTTOM);
        }

      })
      .catch(err => {
        console.log('err>>>', err)
        Toast.show(selectLanguage == 'en' ? 'Please enter proper mail and password!' : '¡Por favor, introduzca el correo y la contraseña adecuados!', Toast.SHORT, Toast.BOTTOM);
        setLoader(false);
      })

  }
  async function cheakAccessToken() {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      return true
    } catch (error) {
      return false
    }

  }
  async function onGoogleButtonPress() {

    console.log("onClick");
    // Check if your device supports Google Play
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      // Get the users ID token
      let res = await cheakAccessToken()
      console.log("res", res);
      const { idToken } = await GoogleSignin.signIn();
      // console.log("idToken", idToken);
      // Create a Google credential with the token

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      console.log(
        "googleCredential", googleCredential
      );
      let authData = await auth().signInWithCredential(googleCredential);
      // console.log("authData>----------", authData);
      // setAuthDataType(authData)
      GoogleLogin(authData?.user.uid, authData.user.email, authData)
    } catch (error) {
      console.log("error", error);
    }

  };


  const GoogleLogin = (Id, emailLogin, authDataType) => {

    let data = {
      id: Id,
      email: emailLogin
    }

    AuthService.googleAccountLogin(data)
      .then(res => {

        if (res && res.status) {
          if (res.data.userType == type) {
            dispatch(setuser(res.data))
            AuthService.setAccount(res.data);
            AuthService.setToken(res.data.token);
          } else {
            Alert.alert('User Not Found')
          }
        }

      })
      .catch(err => {
        console.log('err>>>', err)
        if (err.message == 'No User found') {
          if (type == 'Requester') {
            NavigationService.navigate('GoogleSignIn', { logintype: authDataType, type: type })
          } else {
            NavigationService.navigate('ProviderGoogleSign', { logintype: authDataType, type: type })
          }
        }
      })

  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Container>
        <StatusBar backgroundColor={'#dddcdb'} barStyle="light-content" />
        <ImageBackground
          source={require('../../Assets/images/Auth_background.jpg')}
          style={styles.background}
        // resizeMode='stretch'
        >

          <View
            style={{
              height: moderateScale(270),
            }}
          />
          <AppTextInput
            style={{
              color: colors.secondaryThemeColor,
              fontFamily: FONTS.semibold,
              fontSize: moderateScale(12),
              width: '80%'
            }}
            value={email}
            onChangeText={value => setEmail(value)}
            placeholderTextColor={colors.primaryThemeColor}
            placeholder={setLanguage('Email')}
            autoCapitalize='none'
            inputContainerStyle={{
              ...styles.inputCont,
              backgroundColor: colors.pageBackgroundColor,
            }}
          />

          <AppTextInput
            placeholder={setLanguage('Enter password')}
            placeholderTextColor={colors.primaryThemeColor}
            secureTextEntry={hidePass}
            rightAction=
            {
              <Pressable onPress={() => sethidePass(!hidePass)}>
                <Icon
                  name={hidePass ? "eye-off" : "eye"}
                  type='Feather'
                  size={15}
                  color={colors.primaryThemeColor}
                />
              </Pressable>

            }
            value={password}
            onChangeText={value => setPassword(value)}
            style={{
              color: colors.secondaryThemeColor,
              fontFamily: FONTS.semibold,
              fontSize: moderateScale(12),
              width: '80%'
            }}
            inputContainerStyle={{ ...styles.inputCont, backgroundColor: colors.pageBackgroundColor }}

          />

          <Text style={styles.forgot_password_txt}>
            {setLanguage('Forgot your password ?')}{' '}
            <Text onPress={() =>
              NavigationService.navigate('MailSend')
            } style={{
              ...styles.click_here_txt,
              color: colors.primaryThemeColor,
              fontFamily: FONTS.semibold,
              fontSize: moderateScale(10),
            }}>{setLanguage('Click here')}</Text>
          </Text>

          <View style={{ height: moderateScale(60) }} />

          <AppButton

            onPress={() => logIn()}
            title={setLanguage('LOG IN')}
            gradient={true}
            gradientColors={['#36afda', '#1d79bc']}
            gradientStart={{ x: 0, y: 1 }}
            gradientEnd={{ x: 1, y: 1 }}
            style={styles.fistapp}
            textStyle={{
              fontSize: moderateScale(13),
              fontFamily: FONTS.bold,
            }}
            loader={!loader ? null : {
              position: 'right',
              size: 'small',
              color: '#fff'
            }}
          />
          <Text style={{
            alignSelf: 'center',
            marginTop: moderateScale(20),
            fontFamily: FONTS.semibold,
            fontSize: moderateScale(12),
          }}>{setLanguage('-Or sign in with-')}</Text>


          <View style={styles.social_media_btns}>

            <Pressable onPress={() => onGoogleButtonPress()}>
              <Image

                source={require('../../Assets/images/profile_vrt_raw_bytes_1587515358_10512.png')}
                style={{
                  height: moderateScale(35),
                  width: moderateScale(35),
                  borderRadius: moderateScale(35)
                }}
              />
            </Pressable>
          </View>
          <View style={{ height: moderateScale(65) }} />
          <Text
            style={{
              ...styles.no_account_txt,
              color: colors.textgrey,
              fontFamily: FONTS.semibold,
              fontSize: moderateScale(10),
            }}
            onPress={() => {
              type == 'Requester' ? NavigationService.navigate('SignUp', { type: type })
                : NavigationService.navigate('ProviderSignup', { type: type })
            }
            }
          >
            {setLanguage("Don't have an account ?")}{' '}<Text style={{
              ...styles.signup_txt,
              color: colors.primaryThemeColor,
              padding: 10
            }}>{setLanguage('Sign up')}</Text>
          </Text>
        </ImageBackground>
      </Container>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  background: {
    // flex: 1,
    height: height,
    width: width,
    paddingHorizontal: moderateScale(30),
  },
  // social_media_btns: {
  //   flexDirection: 'row',
  //   marginTop: moderateScale(40)
  // },
  textInput_email: {
    top: verticalScale(270),
    width: '75%',
    height: verticalScale(40),
    alignSelf: 'center',
    elevation: 1,
    paddingStart: 15,
  },
  fistapp: {
    height: moderateScale(45),
    width: moderateScale(150),
    // marginTop: moderateScale(30),
    borderRadius: moderateScale(10),
    elevation: moderateScale(10),
    alignSelf: 'center',
    justifyContent: 'center',

  },

  forgot_password_txt: {
    marginTop: moderateScale(10),
    fontSize: moderateScale(11),
    textAlign: 'center',
    color: '#B6B2B0',
    fontFamily: FONTS.semibold,
    fontSize: moderateScale(10),
  },
  click_here_txt: {
    textDecorationLine: 'underline',
    fontWeight: '500',
  },

  social_media_btns: {
    flexDirection: 'row',
    marginTop: verticalScale(30),
    alignSelf: 'center',

  },
  social_media_btn: {
    backgroundColor: '#4470B4',
    // padding: 5,
    marginHorizontal: moderateScale(5),
    // borderRadius: 100,
    height: moderateScale(35),
    width: moderateScale(35),
    borderRadius: moderateScale(35),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: moderateScale(15)
  },
  social_media_icon: {
    color: COLORS.whiteShed,
  },
  no_account_txt: {
    fontSize: moderateScale(12),
    textAlign: 'center',
    color: '#B6B2B0',
    marginTop: moderateScale(30)
  },
  inputCont: {
    borderWidth: moderateScale(0),
    borderRadius: 0,
    elevation: moderateScale(2),
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: moderateScale(10),
    marginTop: moderateScale(20),


  },
  signup_txt: {
    textDecorationLine: 'underline',
    fontWeight: '500',
    fontFamily: FONTS.semibold,
    fontSize: moderateScale(10),

  },

})