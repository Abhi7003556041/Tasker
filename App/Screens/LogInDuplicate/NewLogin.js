//import liraries
import { Picker } from '@react-native-picker/picker';
import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, Pressable } from 'react-native';
import { AppButton, Card } from 'react-native-basic-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// create a component
const NewLogin = () => {
    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                <ImageBackground
                    source={require('../../Assets/images/register_bg.jpg')}
                    style={styles.background}
                // resizeMode={'stretch'}

                >
                    <Pressable onPress={() => imagHandle()}
                        style={{
                            right: moderateScale(15),
                            position: 'absolute',
                            zIndex: 9999,
                            top: moderateScale(105)
                        }}
                    >

                        {/* <Image
                            source={selectImg ? { uri: selectImg } : require('../../Assets/images/useravatar.png')}
                            style={styles.profile_img}
                        /> */}

                        <Pressable style={styles.edit}>
                            <Icon name="camera" type="EvilIcons" style={styles.cam_icon} />
                        </Pressable>
                    </Pressable>

                    {/* <View/> */}
                    <View style={{ height: moderateScale(20) }} />

                    <Card style={{
                        ...styles.cardView,
                        borderColor: colors.textgrey,
                        backgroundColor: colors.pageBackgroundColor,
                        width: '90%'

                    }}>
                        <View style={styles.Regview}>
                            <Text style={{
                                color: colors.primaryThemeColor,
                                fontFamily: FONTS.medium,
                                fontSize: moderateScale(12)
                            }}>
                                {setLanguage('Register To Continue')}
                            </Text>

                        </View>


                        <View style={{
                            ...styles.PickerCont,
                            borderColor: colors.primaryThemeColor,
                        }}>
                            <Picker
                                style={{ color: colors.primaryThemeColor }}
                                selectedValue={gender}
                                onValueChange={(itemValue) =>
                                    setGender(itemValue)
                                }>
                                <Picker.Item label={"Select Gender"} />
                                <Picker.Item label={"Male"}
                                    value={"Male"} />
                                <Picker.Item label={"Female"}
                                    value={"Female"} />
                                <Picker.Item label={"Others"}
                                    value={"Others"} />


                            </Picker>
                        </View>
                        <View style={{
                            ...styles.PickerCont,
                            borderColor: colors.primaryThemeColor,
                        }}>
                            <Picker
                                style={{ color: colors.primaryThemeColor }}
                                selectedValue={city}
                                onValueChange={(itemValue) => {
                                    setCity(itemValue)
                                    setAllState(AllCity.filter(it => it.city == itemValue))
                                    setStatename(AllCity.filter(it => it.city == itemValue)[0].state)
                                }}>
                                <Picker.Item label={"Select City"} />
                                {
                                    AllCity.map((it, ind) => {
                                        // console.log('it-------', it)
                                        return (
                                            <Picker.Item key={ind} label={it.city}
                                                value={it.city} />
                                        )
                                    })
                                }


                            </Picker>
                        </View>


                        <View
                            style={{
                                ...styles.PickerCont,
                                borderColor: colors.primaryThemeColor,
                            }}>
                            <Picker
                                style={{ color: colors.primaryThemeColor }}
                                selectedValue={stateName}
                                onValueChange={(itemValue) =>
                                    setStatename(itemValue)
                                }>
                                <Picker.Item label={"Select State"} />
                                {
                                    AllState.map((it, ind) => {

                                        return (
                                            <Picker.Item key={ind} label={it.state} value={it.state} />
                                        )
                                    })
                                }


                            </Picker>
                        </View>

                        <AppButton onPress={() => userSignup()}
                            title={setLanguage('Continue')}
                            gradient={true}
                            gradientColors={['#26baed', '#1474ba']}
                            gradientStart={{ x: 0, y: 1 }}
                            gradientEnd={{ x: 1, y: 1 }}
                            style={styles.fistapp}
                            textStyle={{
                                fontSize: moderateScale(13),
                                fontFamily: FONTS.bold
                            }}

                        />

                    </Card>
                    {/* <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        statusBarTranslucent={true}
                        onRequestClose={() => {
                            // console.log('Modal has been closed.');
                            setModalVisible(!modalVisible);
                        }}>
                        <>
                            <Googlesearch
                                SearchField={a => changeAddress(a)}
                                onClose={() => setModalVisible(false)}
                            />
                        </>
                    </Modal> */}

                </ImageBackground>
            </KeyboardAwareScrollView>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default NewLogin;
