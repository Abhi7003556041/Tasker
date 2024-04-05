import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    ImageBackground,
    Dimensions,
    Image,
    Pressable,
    View,
    Modal,
} from 'react-native';

import { AppButton, AppTextInput, Card, Container, Icon, Text, useTheme } from 'react-native-basic-elements';
import { moderateScale, verticalScale } from '../../Constants/PixelRatio';
import NavigationService from '../../Services/Navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AuthService from '../../Services/Auth';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-simple-toast'
import { useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { setuser } from '../../Redux/reducer/User';
// import Googlesearch from '../../Components/GoogleSearch/Googlesearch';
import Geocoder from 'react-native-geocoding';
import { TouchableOpacity } from 'react-native-gesture-handler';
import useSelectLangue from '../../Components/Language/useSelectLangue';
import { FONTS } from '../../Constants/Fonts';
import ImagePicker from 'react-native-image-crop-picker';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const GoogleSignIn = () => {

    const [selectedLanguage, setSelectedLanguage] = useState();
    const colors = useTheme()
    const dispatch = useDispatch();
    const [gender, setGender] = useState('');
    const [city, setCity] = useState('');
    const [AllCity, setAllCity] = useState([])
    const [stateName, setStatename] = useState('');
    const [AllState, setAllState] = useState([]);
    const [loader, setLoader] = useState(false);
    const { setLanguage } = useSelectLangue();
    const { selectLanguage } = useSelector(state => state.Language);
    const route = useRoute()
    const [selectImg, setSelectImg] = useState('');
    const [image, setImage] = useState('');
    const [uploading, setUploading] = useState(false);
    const [zipcode, setZipcode] = useState('');
    const type = route.params.type
    const logintype = route.params.logintype

    const Fldvalid = txt => txt && txt.replace(/\s/g, '').length;
    // console.log('tokeeeennnnnn>>>',token)
    // console.log("Main type",type);
    useEffect(() => {
        PlaceSearch()
       
    }, [])


    const imagHandle = async index => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
        }).then(async image => {
            // console.log('image uri ....', image);
            setImage(image.path);
            setUploading(true);
            let result = await AuthService.uploadRegFile(image);
            // console.log('image >>>>>>>>>> ....', result);
            if (result) {
                let Responseimg = result.url;
                setSelectImg(Responseimg);
                setUploading(false);
            }
        });
    };

    function geocodeResponseToCityState(geocodeJSON) { //will return and array of matching {city,state} objects
        var parsedLocalities = [];
        if (geocodeJSON.results.length) {
            for (var i = 0; i < geocodeJSON.results.length; i++) {
                var result = geocodeJSON.results[i];

                var locality = {};
                for (var j = 0; j < result.address_components.length; j++) {
                    var types = result.address_components[j].types;
                    for (var k = 0; k < types.length; k++) {
                        if (types[k] == 'locality') {
                            locality.city = result.address_components[j].long_name;
                        } else if (types[k] == 'administrative_area_level_1') {
                            locality.state = result.address_components[j].short_name;
                        }
                    }
                }
                parsedLocalities.push(locality);

                //check for additional cities within this zip code
                if (result.postcode_localities) {
                    for (var l = 0; l < result.postcode_localities.length; l++) {
                        parsedLocalities.push({ city: result.postcode_localities[l], state: locality.state });
                    }
                }
            }
        } else {
            console.log('error: no address components found');
        }
        return parsedLocalities;
    }
    async function PlaceSearch() {
        fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${zipcode}&key=AIzaSyC-ki3ImgxYzo8K2OCH9yDthHWIWV1yfj4`,
        )
            .then(response => response.json())
            .then(res => {
                console.log('geocodeResponseToCityState', geocodeResponseToCityState(res));
                setAllCity(geocodeResponseToCityState(res))
            })
            .catch(e => console.log(e));
    }
    // {
    //     console.log('type2-------',type)
    // }
    const userSignup = async () => {

        if (zipcode == '') {
            Toast.show(selectLanguage == 'en' ? 'Please Select Category' : 'Seleccione una categoría', Toast.SHORT, Toast.BOTTOM);
            return;
          }
          if (city == '') {
            Toast.show(selectLanguage == 'en' ? 'Please Select Category' : 'Seleccione una categoría', Toast.SHORT, Toast.BOTTOM);
            return;
          }

            setLoader(true);
        let notiToken = await AuthService.getNotifactionToken()
        // alert()
        let data = {
            "userType":type,
            "firstName": logintype?.additionalUserInfo?.profile?.given_name,
            "lastName": logintype?.additionalUserInfo?.profile?.family_name,
            "email": logintype.user.email,
            "id": logintype?.user?.uid,
            "mobileNumber": '',
            "city": city,
            "state": stateName,
            "deviceToken": notiToken,
            "gender": gender,
            "zipCode": zipcode,
            "image": selectImg,

        };
        // console.log("ADDDEDIMAGE",data)

        AuthService.googleAccountReg(data)
            .then(res => {
                // console.log("AuthService>>>>>>>>>>>>>>>>", res)

                if (res && res.status) {
                    setLoader(false);
                    dispatch(setuser(data))
                    AuthService.setAccount(data);
                    AuthService.setToken(res.data);
                    Toast.show(selectLanguage == 'en' ? 'Registered successfully' : 'Registrado correctamente', Toast.SHORT, Toast.BOTTOM);

                    // NavigationService.navigate('Register', { registerData: res.data });
                } else {
                    Toast.showWithGravity(
                        typeof res.error == 'string' ? res.error : res.error?.[0]?.msg ?? '',
                        Toast.SHORT,
                        Toast.BOTTOM,
                    );
                    setLoader(false);
                }
            })
            .catch(err => {
                Toast.show(selectLanguage == 'en' ? 'Email already exsists' : 'Registrado correctamente', Toast.SHORT, Toast.BOTTOM);
                console.log('err>>>', err)
            })

    };

    const getStateCity = async (zipcode) => {
    // console.log('zopppp>>',Zipcode)
        let data = {
            postalCode: Number(zipcode)
        }
        console.log('data=======', data)
        AuthService.getCity(data)
            .then((res) => {
                console.log('cityyyyyyyy>>>', res);
                if (res.data) {
                    setAllCity(res.data)
                }
            })
    };

    return (
        <Container>

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

                        <Image
                            source={selectImg ? { uri: selectImg } : require('../../Assets/images/useravatar.png')}
                            style={styles.profile_img}
                        />

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

                        <AppTextInput
                            style={{
                                color: colors.secondaryThemeColor,
                            }}
                            keyboardType='number-pad'
                            placeholderTextColor={colors.secondaryThemeColor}
                            autoFocus
                            value={zipcode}
                            onChangeText={value =>{
                                 setZipcode(value)
                                 getStateCity(value)
                                }}
                            placeholder={setLanguage('Zip / Postal Code')}
                            inputContainerStyle={{ ...styles.inputCont, backgroundColor: colors.pageBackgroundColor }}

                        />
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
                                            <Picker.Item key={ind} label={it.Postal_Code_Place_Name}
                                                value={it.city}/>
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
                                        // console.log('it=======',it)
                                        return (
                                            <Picker.Item key={ind} label={it.State} value={it.State} />
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
        </Container>
    );
};

export default GoogleSignIn;

const styles = StyleSheet.create({
    background: {
        height: height,
        width: width,
        justifyContent: 'center',
        alignItems: "center"
    },
    OtpView: {
        height: moderateScale(45),
        width: '25%',
        borderRadius: moderateScale(10),
        justifyContent: 'center',
        alignItems: "center",
    },
    otpBaseStyle: {
        height: moderateScale(35),
        width: moderateScale(35),
        // borderRadius: moderateScale(5),
        borderWidth: 1,
        backgroundColor: '#F7F8F9',
    },
    otpHighlitedStyle: {
        borderWidth: 0.5,
    },
    PickerCont: {
        borderWidth: 0.3,
        borderRadius: moderateScale(0),
        borderRadius: 3,
        marginTop: moderateScale(10)
    },
    profile_img: {
        height: moderateScale(70),
        width: moderateScale(70),
        borderRadius: moderateScale(35),
    },

    inputCont: {
        borderRadius: 3,
        borderWidth: 0.3,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: moderateScale(10)
    },
    hello_txt: {
        fontSize: moderateScale(25),

        color: 'red',
    },
    profile_txt: {
        fontSize: moderateScale(20),
        color: '#4470B4',
    },
    fistapp: {
        height: verticalScale(40),
        width: moderateScale(140),
        marginTop: moderateScale(20),
        borderRadius: moderateScale(10),
        elevation: moderateScale(10),
        alignSelf: 'center',
        justifyContent: 'center'
    },
    edit: {
        height: 15,
        width: 15,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 5,
        right: 5,
        backgroundColor: '#fff',
        elevation: 5,
    },
    cam_icon: {
        fontSize: 15,
        color: '#4470B4',
    },
    cardView: {
        elevation: 1,
        borderRadius: 1,
        marginHorizontal: moderateScale(10),
        marginTop: moderateScale(25)
    },
    Regview: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: moderateScale(2)
    }
});


