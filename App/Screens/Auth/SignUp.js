
import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    ImageBackground,
    Pressable,
    TouchableOpacity,
    Image,
    Alert,
} from 'react-native';
import { AppButton, AppTextInput, CheckBox, Container, Text, Icon, useTheme, StatusBar } from 'react-native-basic-elements';
import { COLORS } from '../../Constants/Colors';
import { moderateScale, verticalScale } from '../../Constants/PixelRatio';
import { ScrollView } from 'react-native-gesture-handler';
import NavigationService from '../../Services/Navigation';
import Toast from 'react-native-simple-toast'
import { useDispatch, useSelector } from 'react-redux';
import useSelectLangue from '../../Components/Language/useSelectLangue';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import AuthService from '../../Services/Auth';
import { setuser } from '../../Redux/reducer/User';


GoogleSignin.configure({
    webClientId: '939075535503-sqclgjfkqu494mr3kueaiqn3obfjhinr.apps.googleusercontent.com',
});

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const SignUp = (props) => {
    const colors = useTheme()
    const dispatch = useDispatch();
    const [check, setCheck] = useState(false);
    const [email, setEmail] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setconfirmPass] = useState('');
    const [loader, setLoader] = useState(false)
    const { setLanguage } = useSelectLangue();
    const { selectLanguage } = useSelector(state => state.Language);
    const [authDataType, setAuthDataType] = useState({});
    const [hidePass, sethidePass] = useState(true)
    const [hideConfPass, setConfhidePass] = useState(true);
    const [inviteCode, setinviteCode] = useState('')
    const type = props.route.params.type
    const Fldvalid = txt => txt && txt.replace(/\s/g, '').length;


    const userSignup = async () => {
        let pattern =
            /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,20}[\.][a-z]{2,5}/g;
        let emailresult = pattern.test(email);
        if (
            Fldvalid(pass) === 0 ||
            pass == '' ||
            Fldvalid(email) === 0 ||
            email == '' ||
            Fldvalid(confirmPass) === 0 ||
            confirmPass == ''
        ) {
            Toast.show(selectLanguage == 'en' ? 'Please Fill Out All The Fields' : 'Por favor complete todos los campos', Toast.SHORT, Toast.BOTTOM);
            return;
        } else if (emailresult !== true) {
            Toast.show(selectLanguage == 'en' ? 'Invalid Email Id' : 'ID de correo electrónico no válido', Toast.SHORT, Toast.BOTTOM);

            return;
        } else if (pass != confirmPass) {
            Toast.show(selectLanguage == 'en' ? 'Password does not match' : 'Las contraseñas no coinciden', Toast.SHORT, Toast.BOTTOM);

            return;
        }
        if (!check) {
            Toast.show('Please click checkbox', Toast.SHORT, Toast.BOTTOM);
            return;
        }
        setLoader(true);
        // alert()
        let data = {
            email: email,
            password: pass,
            zipCode: zipcode,
            invitationCode: inviteCode,

        };

        NavigationService.navigate('Register', { registerData: data, checkstatus: false });
        // console.log("Regii=====>>>",data)
    };
    

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
        // Check if your device supports Google Play
        try {
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            // Get the users ID token
            let res = await cheakAccessToken()

            const { idToken } = await GoogleSignin.signIn();
            // console.log("idToken", idToken);
            // Create a Google credential with the token

            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            console.log(
                "googleCredential", googleCredential
            );
            // Sign-in the user with the credential
            let authData = await auth().signInWithCredential(googleCredential);
            // console.log("authData>----------", authData);
            // setAuthDataType(authData)
            GoogleLogin(authData?.user.uid, authData.user.email, authData)
            // NavigationService.navigate('GoogleSignIn',{logintype: authData})
            // GoogleRegister(authData?.user.uid)


        } catch (error) {
            console.log("error", error);
        }

    };

    const GoogleLogin = (Id, emailLogin, authDataType) => {

        let data = {
            id: Id,
            email: emailLogin
        }
        // console.log('LoginData>>>>>>>>>', data)
        AuthService.googleAccountLogin(data)
            .then(res => {
                // console.log('resLogin======>>>>', res)
                if (res && res.status) {
                    if (res && res.status) {
                        if (res.data.userType == type) {
                            dispatch(setuser(res.data))
                            AuthService.setAccount(res.data);
                            AuthService.setToken(res.data.token);
                        } else {
                            Alert.alert('Requester not found')
                        }
                    }
                }

            })
            .catch(err => {
                console.log('err>>>', err)
                if (err.message == 'No User found') {
                    // console.log("Loggcomplete", authDataType)
                    NavigationService.navigate('GoogleSignIn', { logintype: authDataType, type: type })
                }
            })

    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <Container>
                <StatusBar backgroundColor={'#dddcdb'} barStyle="light-content" />
                <ImageBackground
                    source={require('../../Assets/images/auth_background2.jpg')}
                    style={styles.background}
                // resizeMode='stretch'
                >
                    <View
                        style={{
                            height: moderateScale(335),
                            marginTop: moderateScale(15)
                        }}
                    />

                    <AppTextInput
                        style={{
                            color: colors.secondaryThemeColor,
                        }}
                        placeholderTextColor={colors.secondaryThemeColor}
                        placeholder={setLanguage('Email')}
                        autoCapitalize='none'
                        onChangeText={value => setEmail(value)}
                        value={email}
                        inputContainerStyle={{ ...styles.inputCont, backgroundColor: colors.pageBackgroundColor }}

                    />
                    <AppTextInput
                        style={{
                            color: colors.secondaryThemeColor,
                        }}
                        keyboardType='number-pad'
                        placeholderTextColor={colors.secondaryThemeColor}
                        value={zipcode}
                        onChangeText={value => setZipcode(value)}
                        placeholder={setLanguage('Zip / Postal Code')}
                        inputContainerStyle={{ ...styles.inputCont, backgroundColor: colors.pageBackgroundColor }}

                    />

                    <AppTextInput
                        placeholder={setLanguage('Password')}
                        placeholderTextColor={colors.secondaryThemeColor}
                        secureTextEntry={hidePass}
                        value={pass}
                        onChangeText={value => setPass(value)}
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
                        style={{
                            color: colors.secondaryThemeColor,

                        }}
                        inputContainerStyle={{ ...styles.inputCont, backgroundColor: colors.pageBackgroundColor }}

                    />
                    <AppTextInput
                        placeholder={setLanguage('Confirm Password')}
                        placeholderTextColor={colors.secondaryThemeColor}
                        secureTextEntry={hideConfPass}
                        value={confirmPass}
                        onChangeText={value => setconfirmPass(value)}
                        loader={loader ?
                            {
                                position: 'right',
                                size: 'small',
                                color: '#fff'
                            }
                            : null
                        }
                        rightAction=
                        {
                            <Pressable onPress={() => setConfhidePass(!hideConfPass)}>
                                <Icon
                                    name={hideConfPass ? "eye-off" : "eye"}
                                    type='Feather'
                                    size={15}
                                    color={colors.primaryThemeColor}
                                />
                            </Pressable>

                        }
                        style={{
                            color: colors.secondaryThemeColor,
                        }}
                        inputContainerStyle={{
                            ...styles.inputCont,
                            backgroundColor: colors.pageBackgroundColor,

                        }}

                    />
                    <AppTextInput
                        placeholder={setLanguage('Invite Code')}
                        placeholderTextColor={colors.secondaryThemeColor}
                        secureTextEntry={false}
                        value={inviteCode}
                        onChangeText={value => setinviteCode(value)}
                        style={{
                            color: colors.secondaryThemeColor,
                        }}
                        inputContainerStyle={{
                            ...styles.inputCont,
                            backgroundColor: colors.pageBackgroundColor,

                        }}
                    />

                    <View style={{
                        marginTop: moderateScale(10),
                        flexDirection: "row",
                        alignItems: "center"
                    }}>
                        <CheckBox
                            checked={check}
                            onChange={(val) => setCheck(val)}
                            size={20}
                            activeColor={colors.textgrey}
                        />

                        <Text
                            style={styles.code_txt}>
                            {setLanguage('Accept')} {''}
                            {/* <Pressable onPress={() =>
                                NavigationService.navigate('TermCondition')
                            }> */}
                            <Text
                                onPress={() => NavigationService.navigate('TermCondition')}

                                style={{
                                    ...styles.resend_txt,
                                    color: colors.primaryThemeColor,
                                    // fontFamily: FONTS.bold
                                }}>
                                {setLanguage('Terms and Conditions')}
                            </Text>
                            {/* </Pressable> */}

                        </Text>
                    </View>


                    <AppButton
                        onPress={() => userSignup()}
                        // NavigationService.navigate('Register')
                        title={setLanguage('SIGN UP')}
                        gradient={true}
                        gradientColors={['#26baed', '#1474ba']}
                        gradientStart={{ x: 0, y: 1 }}
                        gradientEnd={{ x: 1, y: 1 }}
                        style={styles.fistapp}
                        textStyle={{
                            fontSize: moderateScale(13),
                        }}

                    />
                    <View style={{
                        height: moderateScale(140)
                    }}>
                        <Text style={{
                            alignSelf: 'center',
                            marginVertical: moderateScale(10),
                            color: colors.textgrey,
                        }}>{setLanguage('-Or sign in with-')}</Text>



                        <View style={styles.social_media_btns}>
                            <TouchableOpacity onPress={() => {

                                onGoogleButtonPress()

                            }
                            }>
                                <Image
                                    source={require('../../Assets/images/profile_vrt_raw_bytes_1587515358_10512.png')}
                                    style={{
                                        height: moderateScale(35),
                                        width: moderateScale(35),
                                        borderRadius: moderateScale(35)
                                    }}
                                />
                            </TouchableOpacity>

                        </View>
                    </View>
                    <View
                        style={{
                            height: moderateScale(60)
                        }}
                    />

                </ImageBackground>
            </Container>
        </ScrollView>
    );
};

export default SignUp;

const styles = StyleSheet.create({
    background: {

        flex: 1,
        paddingHorizontal: moderateScale(30),
    },
    social_media_btns: {
        flexDirection: 'row',
        marginTop: moderateScale(40)
    },
    social_media_btn: {
        // marginHorizontal: moderateScale(5),
        height: moderateScale(30),
        width: moderateScale(80),
        borderRadius: moderateScale(30),
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5
    },
    code_txt: {
        color: '#918F8E',
        fontSize: moderateScale(12),
        textAlign: 'center',
        marginLeft: moderateScale(10)
    },
    resend_txt: {
        textDecorationLine: 'underline',
    },
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
        marginTop: moderateScale(20),
        borderRadius: moderateScale(10),
        elevation: moderateScale(10),
        alignSelf: 'center',
        justifyContent: 'center'
    },

    forgot_password_txt: {
        marginTop: moderateScale(10),
        fontSize: moderateScale(11),
        textAlign: 'center',
        color: '#B6B2B0',
    },
    click_here_txt: {
        textDecorationLine: 'underline',
        fontWeight: '500',
    },

    social_media_btns: {
        flexDirection: 'row',
        // marginTop: verticalScale(10),
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
        // marginTop: moderateScale(30)
    },
    inputCont: {
        borderWidth: moderateScale(0),
        borderRadius: 0,
        elevation: moderateScale(2),
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: moderateScale(10)
    }

})