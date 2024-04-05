// import {Icon} from 'native-base';
import React from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    ImageBackground,
    Pressable,
    TouchableOpacity,
} from 'react-native';
import { AppButton, Container, Icon, StatusBar, Text, useTheme } from 'react-native-basic-elements';
import { moderateScale, verticalScale } from '../../Constants/PixelRatio';
import NavigationService from '../../Services/Navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectLanguage } from '../../Redux/reducer/Language';
import useSelectLangue from '../../Components/Language/useSelectLangue';
import { FONTS } from '../../Constants/Fonts';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const FontPage = () => {

    const colors = useTheme()
    const dispatch = useDispatch()
    const { setLanguage } = useSelectLangue()
    const { selectLanguage } = useSelector(s => s.Language)

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
                <Text style={{
                    color: colors.pageBackgroundColor,
                    fontSize: moderateScale(12),
                    fontFamily: FONTS.semibold,
                }}>{setLanguage('What kind of user are you?')}</Text>

                <AppButton onPress={() =>
                    NavigationService.navigate('LoginFont', { provider: false, type: 'Requester' })
                }
                    title={setLanguage('REQUESTER')}
                    gradient={true}
                    gradientColors={['#ffffff', colors.buttonColor, '#cecfd1']}
                    gradientStart={{ x: 0, y: 1 }}
                    gradientEnd={{ x: 1, y: 1 }}
                    style={styles.fistapp}
                    textStyle={{
                        fontSize: moderateScale(12),
                        color: colors.primaryThemeColor,
                        fontFamily: FONTS.bold,

                    }}
                />
                <AppButton onPress={() =>
                    NavigationService.navigate
                        ('LoginFont', { provider: true, type: 'Provider' })}
                    title={setLanguage('PROVIDER')}
                    gradient={true}
                    gradientColors={['#ffffff', colors.buttonColor, '#cecfd1']}
                    gradientStart={{ x: 0, y: 1 }}
                    gradientEnd={{ x: 1, y: 1 }}
                    style={styles.secondapp}
                    textStyle={{
                        fontSize: moderateScale(13),
                        color: colors.primaryThemeColor,
                        color: colors.primaryThemeColor,
                        fontFamily: FONTS.bold,
                    }}
                />


                <View
                    style={{
                        flex: 1
                    }}
                >

                    <View style={{
                        justifyContent: 'center',
                        alignItems: "center",
                        height: moderateScale(140),

                    }}>
                        {selectLanguage == 'en' ?
                            <TouchableOpacity
                                onPress={() => { dispatch(setSelectLanguage('es')) }} >
                                <Text style={{
                                    fontSize: moderateScale(14),
                                    color: colors.cardColor,
                                    fontFamily: FONTS.bold
                                }}> EN / {' '}

                                    <Text style={{
                                        color: colors.pageBackgroundColor,

                                    }}>
                                        ES
                                    </Text>
                                </Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                                onPress={() => { dispatch(setSelectLanguage('en')) }} >
                                <Text style={{
                                    fontSize: moderateScale(14),
                                    color: colors.pageBackgroundColor,
                                    fontFamily: FONTS.bold
                                }}> EN  /
                                    <Text style={{
                                        color: colors.cardColor,

                                    }}>
                                        {' '}ES
                                    </Text>
                                </Text>
                            </TouchableOpacity>}

                        {/* <Text style={{
                            fontSize: moderateScale(13),
                            color: colors.pageBackgroundColor,
                            marginTop: moderateScale(20),
                            fontFamily: FONTS.medium,
                        }}>{setLanguage('Need Help ?')}</Text> */}

                    </View>

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
        marginHorizontal: moderateScale(5),
        height: moderateScale(40),
        width: moderateScale(40),
        borderRadius: moderateScale(40),
        alignItems: 'center',
        justifyContent: 'center',
    },

});
