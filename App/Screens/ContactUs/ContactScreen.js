import React, { useState } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TextInput,
    Pressable,
    ImageBackground,
} from 'react-native';
import { AppButton, AppTextInput, Card, useTheme } from 'react-native-basic-elements';
import SettingsHeader from '../../Components/Header/SettingsHeader';
import { moderateScale, verticalScale } from '../../Constants/PixelRatio';
import SelectLan from '../../Components/Language/SelectLan';


const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const ContactScreen = () => {

    const colors = useTheme()
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');


    return (
        <View style={{ flex: 1 }}>

            <ImageBackground
                source={require('../../Assets/images/payment_bg.jpg')}
                style={styles.bg_img}>

                <SettingsHeader headerText={SelectLan('Support Center')} />

                <View
                    style={{
                        height: moderateScale(80)
                    }}
                />
                <Card style={{
                    ...styles.main_view,
                    backgroundColor: colors.pageBackgroundColor
                }}>
                    <AppTextInput
                        style={{
                            height: moderateScale(50),
                            color: colors.secondaryThemeColor,
                        }}
                        placeholderTextColor={colors.secondaryThemeColor}
                        placeholder={SelectLan('Email')}
                        inputContainerStyle={{
                            ...styles.inputCont,
                            borderColor: colors.textgrey,
                            backgroundColor: colors.pageBackgroundColor
                        }}

                    />
                    <AppTextInput
                        style={{
                            height: moderateScale(50),
                            color: colors.secondaryThemeColor,
                        }}
                        placeholderTextColor={colors.secondaryThemeColor}
                        placeholder={SelectLan('Subject')}
                        inputContainerStyle={{ ...styles.inputCont, backgroundColor: colors.pageBackgroundColor }}

                    />
                    <AppTextInput
                        numberOfLines={6}
                        textAlignVertical='top'
                        multiline={true}
                        placeholderTextColor={'#26baed'}
                        // secureTextEntry={true}

                        style={{
                            color: colors.primaryThemeColor,
                        }}
                        inputContainerStyle={{
                            ...styles.inputCont,
                            backgroundColor: "#F8F9F9",
                            borderColor: "#a0a0a0",
                            marginTop: moderateScale(20),

                        }}

                    />
                    <AppButton
                        title={SelectLan('Send')}
                        gradient={true}
                        gradientColors={['#36afda', '#288cc8', '#1d79bc']}
                        gradientStart={{ x: 0, y: 1 }}
                        gradientEnd={{ x: 1, y: 1 }}
                        style={styles.fistapp}
                        textStyle={{
                            fontSize: moderateScale(14),
                        }}

                    />
                </Card>
            </ImageBackground>
        </View>
    );
};

export default ContactScreen;

const styles = StyleSheet.create({
    bg_img: {
        height: height,
        width: width,
    },
    main_view: {
        alignSelf: 'center',
        elevation: moderateScale(15),
        width: '90%',

    },
    inputCont: {
        borderWidth: 0.2,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: moderateScale(10),
        marginHorizontal: moderateScale(15),
        marginTop: moderateScale(15),
        borderRadius: 1,
        elevation: 2
    },
    fistapp: {
        height: moderateScale(45),
        width: moderateScale(150),
        borderRadius: moderateScale(10),
        elevation: moderateScale(10),
        alignSelf: 'center',
        justifyContent: 'center',
        marginBottom: moderateScale(15),
        marginTop: moderateScale(20)
    },
});
