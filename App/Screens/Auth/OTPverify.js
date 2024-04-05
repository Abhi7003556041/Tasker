import React, { useEffect, useState } from 'react';
import {
    ImageBackground,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Pressable,
    TextInput,
} from 'react-native';

import OTPInputView from '@twotalltotems/react-native-otp-input';
import LinearGradient from 'react-native-linear-gradient';
import { moderateScale, verticalScale } from '../../Constants/PixelRatio';
import { FONTS } from '../../Constants/Fonts';
import { useTheme } from 'react-native-basic-elements';
import SettingsHeader from '../../Components/Header/SettingsHeader';
import { useRoute } from '@react-navigation/native';
import Toast from 'react-native-simple-toast'
import AuthService from '../../Services/Auth';
import NavigationService from '../../Services/Navigation';
import useSelectLangue from '../../Components/Language/useSelectLangue';
import { useSelector } from 'react-redux';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const OTPverify = props => {

    route = useRoute()
    const [otpVal, setOtpVal] = useState('');
    const otpNum = route.params.otpNum
    const signUp = route.params.signUp
    const colors = useTheme()
    const { setLanguage } = useSelectLangue();
    const { selectLanguage } = useSelector(state => state.Language);

    console.log('otpNum', otpNum);

    useEffect(() => {
        Toast.show(JSON.stringify(otpNum), Toast.SHORT);
    }, [])

    const otpMatch = async () => {

        if (otpVal == otpNum)
            Toast.show(selectLanguage == 'en' ? 'Otp matched successfully' : 'Otp coincidió con éxito',Toast.SHORT, Toast.BOTTOM);

        NavigationService.navigate('Register', { registerData: signUp, checkstatus: true });
    }

    return (
        <View>
            <ImageBackground

                source={require('../../Assets/images/payment_bg.jpg')}
                style={styles.bg_img}
            >
                <SettingsHeader headerText={'OTP Verification'} />

                <View
                    style={{ height: moderateScale(50) }}
                />
                <Text style={{
                    ...styles.otp_txt,
                    color: colors.primaryThemeColor
                }}>
                    {setLanguage('Enter the OTP code that we have sent to  your')}
                </Text>
                <Text style={{
                    ...styles.otp_txt,
                    color: colors.primaryThemeColor
                }}>
                    {setLanguage('registered cell phone number.')}
                </Text>


                <View style={styles.otp_view}>
                    <Text style={{
                        ...styles.otp_veri_txt,
                        color: colors.textgrey,
                        fontFamily: FONTS.bold
                    }}>
                        {setLanguage('Put Your 4 Digit Code')}
                    </Text>

                    <OTPInputView
                        style={{
                            height: moderateScale(140)
                        }}

                        pinCount={4}
                        autoFocusOnLoad
                        codeInputFieldStyle={{
                            ...styles.underlineStyleBase,
                            color: colors.primaryFontColor
                        }}
                        onCodeChanged={val => setOtpVal(val)}
                        code={otpVal}
                        codeInputHighlightStyle={{
                            borderColor: colors.primaryThemeColor
                        }}
                    />

                    <Text style={styles.code_txt}>
                        {setLanguage('Put Your 4 Digit Code if you didn’t received a code.')} {''}
                        <Text style={{
                            ...styles.resend_txt,
                            color: colors.primaryThemeColor,
                            fontFamily: FONTS.bold
                        }}>
                            {setLanguage('Resend')}
                        </Text>
                    </Text>
                    <View style={{ height: moderateScale(60) }} />

                    <Pressable onPress={() => otpMatch()}
                        style={styles.login_btn}
                    >
                        <LinearGradient
                            colors={['#3BB6DF', '#1972B6']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.gradient}>

                            <Text
                                style={{
                                    color: colors.pageBackgroundColor,
                                    fontFamily: FONTS.bold
                                }}>
                                {setLanguage('Continue')}
                            </Text>
                        </LinearGradient>
                    </Pressable>
                </View>
            </ImageBackground>
        </View>
    );
};

export default OTPverify;

const styles = StyleSheet.create({
    bg_img: {
        height: height,
        width: width,
    },
    otp_txt_view: {
        alignSelf: 'center',
    },
    underlineStyleBase: {
        width: 50,
        height: 45,
        borderWidth: 1,
        borderRadius: 10,
        fontFamily: FONTS.medium,
        fontSize: moderateScale(14),
        alignItems: 'center',
        justifyContent: 'center'
    },
    otp_txt: {
        textAlign: 'center',
    },
    otp_view: {
        // backgroundColor: COLORS.white,
        elevation: 5,
        alignSelf: 'center',
        width: '70%',
        marginTop: verticalScale(20),

    },
    otp_veri_txt: {
        textAlign: 'center',
        // color: COLORS.themecolor,
        marginTop: verticalScale(20),
        fontSize: moderateScale(16),
    },
    code_txt: {
        color: '#918F8E',
        fontSize: moderateScale(12),
        textAlign: 'center',
    },
    resend_txt: {
        textDecorationLine: 'underline',
    },
    login_btn: {
        width: '55%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        height: verticalScale(40),
        borderRadius: 10,
        elevation: 5,
        // marginTop: moderateScale()
    },
    gradient: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    otpBaseStyle: {
        height: verticalScale(30),
        width: moderateScale(25),
        // borderRadius: moderateScale(5),
        borderWidth: 1,
        backgroundColor: '#F7F8F9',
    },
    otpHighlitedStyle: {
        borderWidth: 0.5,
    },
});

