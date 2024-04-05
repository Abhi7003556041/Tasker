import React, { useEffect, useState } from 'react';
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
import { AppButton, AppTextInput, Card, Icon, useTheme } from 'react-native-basic-elements';
import SettingsHeader from '../../Components/Header/SettingsHeader';
import { moderateScale, verticalScale } from '../../Constants/PixelRatio';
import SelectLan from '../../Components/Language/SelectLan';
import AuthService from '../../Services/Auth';
import NavigationService from '../../Services/Navigation';
import Toast from 'react-native-simple-toast'
import { setuser } from '../../Redux/reducer/User';
import { useDispatch } from 'react-redux';


const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const ChangePass = () => {

    const colors = useTheme()
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [hidePass, sethidePass] = useState(true)
    const [newHiden, setnewHiden] = useState(true)
    const [confHiden, setconfHiden] = useState(true)
    const Fldvalid = txt => txt && txt.replace(/\s/g, "").length;


    const updateprofile = async () => {

        let pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,20}[\.][a-z]{2,5}/g;
        if (
            Fldvalid(oldPass) === 0 ||
            oldPass == "" ||
            Fldvalid(newPass) === 0 ||
            newPass == "" ||
            Fldvalid(confirmPass) === 0 ||
            confirmPass == ""
        )
        
        {
            //   setloader(false);
            Toast.show('Please Fill Out All Field', Toast.SHORT);
            return;

        }

        else if (newPass != confirmPass) {
            //   setloader(false);
            Toast.show('Password does not match', Toast.SHORT);
            return;
        }
        
        let data = {
            // id: accountdata._id,
            oldPassword: oldPass,
            password: newPass,


        };
        console.log('data>>><<<<<', data)
        let res = await AuthService.changepass(data);
        console.log('res230', res);
        if (res && res.status) {
            Toast.show('Changed Successfully', Toast.LONG);
            NavigationService.back();
        } else {
            Toast.show(res.error, Toast.LONG);
            //   setloader(false);
        }
    };

    return (
        <View style={{ flex: 1 }}>

            <ImageBackground
                source={require('../../Assets/images/payment_bg.jpg')}
                style={styles.bg_img}>

                <SettingsHeader headerText={SelectLan('Change Password')} />

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


                        placeholderTextColor={colors.primaryThemeColor}
                        placeholder={SelectLan('Enter Old Password')}
                        inputContainerStyle={{
                            ...styles.inputCont,
                            borderColor: colors.textgrey,
                            backgroundColor: colors.pageBackgroundColor
                        }}
                        value={oldPass}
                        secureTextEntry={hidePass}
                        onChangeText={value => {
                            setOldPass(value)
                        }}
                        rightAction=
                        {
                            <Pressable onPress={() => sethidePass(!hidePass)}>
                                <Icon
                                    name={hidePass ? "eye-off" : "eye"}
                                    type='Feather'
                                    size={13}
                                    color={colors.primaryThemeColor}
                                />
                            </Pressable>

                        }

                    />
                    <AppTextInput
                        style={{
                            height: moderateScale(50),
                            color: colors.secondaryThemeColor,
                        }}
                        placeholderTextColor={colors.primaryThemeColor}
                        placeholder={SelectLan('Enter New Password')}
                        inputContainerStyle={{ ...styles.inputCont, backgroundColor: colors.pageBackgroundColor }}
                        value={newPass}
                        onChangeText={value => {
                            setNewPass(value)
                        }}
                        secureTextEntry={newHiden}
                        rightAction=
                        {
                            <Pressable onPress={() => setnewHiden(!newHiden)}>
                                <Icon
                                    name={newHiden ? "eye-off" : "eye"}
                                    type='Feather'
                                    size={13}
                                    color={colors.primaryThemeColor}
                                />
                            </Pressable>

                        }

                    />
                    <AppTextInput
                        // numberOfLines={6}
                        // textAlignVertical='top'
                        // multiline={true}
                        placeholder={SelectLan('Confirm New Password')}
                        placeholderTextColor={colors.primaryThemeColor}
                        // secureTextEntry={true}

                        style={{
                            color: colors.primaryThemeColor,
                        }}
                        inputContainerStyle={{
                            ...styles.inputCont,
                            borderColor: "#a0a0a0",
                            marginTop: moderateScale(20),

                        }}
                        value={confirmPass}
                        onChangeText={value => {
                            setConfirmPass(value)
                        }}
                        secureTextEntry={confHiden}
                        rightAction=
                        {
                            <Pressable onPress={() => setconfHiden(!confHiden)}>
                                <Icon
                                    name={confHiden ? "eye-off" : "eye"}
                                    type='Feather'
                                    size={13}
                                    color={colors.primaryThemeColor}
                                />
                            </Pressable>

                        }

                    />
                    <AppButton
                        onPress={() => updateprofile()}
                        title={SelectLan('Update')}
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

export default ChangePass;

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
        borderWidth: 0.5,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: moderateScale(10),
        marginHorizontal: moderateScale(15),
        marginTop: moderateScale(15),
        borderRadius: 2,
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
