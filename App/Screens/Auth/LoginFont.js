// import {Icon} from 'native-base';
import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    ImageBackground,
    TouchableOpacity,
    Image,
    Pressable,
} from 'react-native';
import { AppButton, AppTextInput, Container, Icon, StatusBar, Text, useTheme } from 'react-native-basic-elements';
import { moderateScale, verticalScale } from '../../Constants/PixelRatio';
import NavigationService from '../../Services/Navigation';
import { useDispatch, useSelector } from 'react-redux';
import useSelectLangue from '../../Components/Language/useSelectLangue';
import { FONTS } from '../../Constants/Fonts';


const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;


const FontPage = (props) => {
    const type = props.route.params.type
    const colors = useTheme()
    const Provider = props.route.params.provider

    const goNext = () => {
        if (Provider == true) {
            NavigationService.navigate('ProviderSignup', { ProviderHome: Provider ,type:type})
        }
        else (
            NavigationService.navigate('SignUp',{type:type})
        )
    }
    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const dispatch = useDispatch()
    const { setLanguage } = useSelectLangue()
    const { selectLanguage } = useSelector(s => s.Language)

    // const GoogleRegister = (Id) => {

    //     let data = {
    //         id: Id,

    //     }
    //     console.log('datatalogin', data)
    //     AuthService.googleAccountReg(data)
    //         .then(res => {
    //             console.log('resLogin-------------', res)
    //             if (res && res.status) {
    //                 //   dispatch(setuser(res.data))
    //                 //   AuthService.setAccount(res.data);
    //                 //   AuthService.setToken(res.data.token);
    //                 // NavigationService.navigate('Register');
    //             }

    //         })
    //         .catch(err => {
    //             console.log('err>>>', err)
    //         })

    // }

    return (
        <Container>
            <StatusBar backgroundColor={'#19b4e9'} barStyle="light-content" />
            <ImageBackground
                source={require('../../Assets/images/Background.jpg')}
                style={styles.background}>
                <View
                    style={{
                        flex: 1
                    }} />
                <View
                    style={{
                        height: moderateScale(190)
                    }}
                />

                <AppButton onPress={() =>
                    NavigationService.navigate('Login', { userType: Provider == true ? 'ProviderHome' : 'RequsterHome',type:type })
                }
                    title={setLanguage('LOG IN')}
                    gradient={true}
                    gradientColors={['#ffffff', colors.buttonColor, '#cecfd1']}
                    gradientStart={{ x: 0, y: 1 }}
                    gradientEnd={{ x: 1, y: 1 }}
                    style={styles.fistapp}
                    textStyle={{
                        fontSize: moderateScale(12),
                        color: colors.primaryThemeColor,
                        fontFamily: FONTS.bold

                    }}
                />
                <AppButton onPress={() =>

                    goNext()
                }
                    title={setLanguage('SIGN UP')}
                    gradient={true}
                    gradientColors={['#ffffff', colors.buttonColor, '#cecfd1']}
                    gradientStart={{ x: 0, y: 1 }}
                    gradientEnd={{ x: 1, y: 1 }}
                    style={styles.secondapp}
                    textStyle={{
                        fontSize: moderateScale(13),
                        color: colors.primaryThemeColor,
                        fontFamily: FONTS.bold
                    }}
                />

                {/* <View style={styles.social_media_btns}>
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

                </View> */}

                <View
                    style={{
                        flex: 1
                    }}
                >

                    {/* <View style={{
                        justifyContent: 'center',
                        alignItems: "center",
                        height: moderateScale(140)
                    }}>
                        <Text style={{
                            fontSize: moderateScale(13),
                            color: colors.pageBackgroundColor,
                            fontFamily: FONTS.medium
                        }}>{setLanguage('Need Help ?')}</Text>
                    </View> */}

                </View>

            </ImageBackground>

        </Container>
    );
};

export default FontPage;

const styles = StyleSheet.create({
    background: {
        height: height,
        width: width,
        justifyContent: "center",
        alignItems: "center",

    },
    modal_view: {
        width: moderateScale(300),
        height: moderateScale(350),
        borderWidth: 1,
        borderRadius: moderateScale(20),
        alignSelf: 'center',
    },
    fistapp: {
        height: moderateScale(45),
        width: moderateScale(150),
        marginTop: moderateScale(15),
        borderRadius: moderateScale(10),
        elevation: moderateScale(10)
    },
    secondapp: {
        height: moderateScale(45),
        width: moderateScale(150),
        marginTop: moderateScale(20),
        borderRadius: moderateScale(10),
        elevation: moderateScale(10)

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

});
