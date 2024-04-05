import React from 'react';
import {
    ImageBackground,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TextInput,
    Pressable,
} from 'react-native';
import { COLORS } from '../../Constants/Colors';
import LinearGradient from 'react-native-linear-gradient';
import { moderateScale, verticalScale } from '../../Constants/PixelRatio';
import { AppTextInput, Container, Icon, useTheme } from 'react-native-basic-elements';
import BackHeader from '../../Components/Header/BackHeader';
import SettingsHeader from '../../Components/Header/SettingsHeader';
import { FONTS } from '../../Constants/Fonts';
import useSelectLangue from '../../Components/Language/useSelectLangue';
import { useSelector } from 'react-redux';
import NavigationService from '../../Services/Navigation';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const ResetPass = () => {
    const colors = useTheme()
    const { setLanguage } = useSelectLangue();
    const { selectLanguage } = useSelector(state => state.Language);
    return (
        <Container style={{ flex: 1 }}>

            <SettingsHeader headerText="Reset Password" />

            <ImageBackground
                source={require('../../Assets/images/payment_bg.jpg')}
                style={styles.bg_img}>

                <Text
                    style={{
                        ...styles.TextStyle,
                        color: colors.primaryThemeColor,
                        marginTop: moderateScale(30)
                    }}>
                    {setLanguage('Enter the email address you need to register.')}
                </Text>
                <Text style={{
                    ...styles.TextStyle,
                    color: colors.primaryThemeColor,
                }}>
                    {setLanguage('We will send you a link to reset your password.')}
                </Text>


                <View style={{
                    ...styles.card_view,
                    backgroundColor: colors.pageBackgroundColor
                }}>
                    <AppTextInput
                        style={{
                            color: colors.secondaryThemeColor,
                        }}
                        placeholderTextColor={colors.primaryThemeColor}
                        autoCapitalize='none'
                        placeholder="Password"
                        inputContainerStyle={{ ...styles.inputCont, backgroundColor: colors.pageBackgroundColor }}

                    />

                    <Text style={{
                        ...styles.resend_txt,
                        color: colors.textgrey
                    }}>
                        {setLanguage("If you didn't receive a link!")}{' '}
                        <Text style={{
                            ...styles.resend__txt,
                            color: colors.primaryThemeColor
                        }}
                        >
                            {setLanguage("Resend")}</Text>
                    </Text>

                    <Pressable
                    
                    style={styles.login_btn}>
                        <LinearGradient
                            colors={['#3BB6DF', '#1972B6']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.gradient}>
                            <Text style={{
                                ...styles.login_txt,
                                color: colors.pageBackgroundColor,
                                fontFamily: FONTS.bold
                            }}>
                                {setLanguage("Send")}</Text>
                        </LinearGradient>
                    </Pressable>
                </View>
            </ImageBackground>
        </Container>
    );
};

export default ResetPass;

const styles = StyleSheet.create({
    TextStyle: {
        fontSize: moderateScale(14),
        textAlign: 'center',

    },
    inputCont: {
        borderWidth: moderateScale(0.5),
        borderRadius: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: moderateScale(20),
        paddingHorizontal: moderateScale(10)
    },
    bg_img: {
        height: height,
        width: width,
    },
    txt: {
        textAlign: 'center',
        color: COLORS.themecolor,
        fontSize: moderateScale(12),
    },
    card_view: {
        elevation: 5,
        alignSelf: 'center',
        width: '90%',
        padding: moderateScale(30),
        marginTop: verticalScale(20),
        borderRadius: moderateScale(2),
    },
    resend_txt: {
        color: '#939393',
        textAlign: 'center',
        fontSize: moderateScale(11),
        marginVertical: verticalScale(10),
        marginBottom: verticalScale(20),
    },
    resend__txt: {
        textDecorationLine: 'underline',
    },
    login_btn: {
        width: moderateScale(150),
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        height: verticalScale(40),
        borderRadius: 10,
        elevation: 5,
        //marginVertical: verticalScale(25),
    },
    gradient: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    login_txt: {
        fontSize: moderateScale(13)
    },
});
