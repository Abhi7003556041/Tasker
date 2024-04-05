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

const Register = () => {

    const [otpVal, setOtpVal] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState();
    const colors = useTheme()
    const dispatch = useDispatch();
    const [check, setCheck] = useState(false);

    const [firstName, setFirstname] = useState('');
    const [lastName, setLastname] = useState('');
    const [gender, setGender] = useState('');
    const [city, setCity] = useState('');
    const [stateName, setStatename] = useState('');
    const [AllState, setAllState] = useState([]);
    const [number, setNumber] = useState('');
    const [showOtp, setShowOtp] = useState(false)
    const [loader, setLoader] = useState(false);
    const [shortAdd, setShortAdd] = useState('');
    const [modalVisible, setModalVisible] = useState('');
    const [locationUser, setLocationUser] = useState('');
    const [lat, setLat] = useState('');
    const [lag, setLng] = useState('');
    const { setLanguage } = useSelectLangue();
    const { selectLanguage } = useSelector(state => state.Language);
    const [token, setToken] = useState('')
    const [AllCity, setAllCity] = useState([])
    const route = useRoute()
    const [selectImg, setSelectImg] = useState('');
    const [image, setImage] = useState('');
    const [uploading, setUploading] = useState(false);
    const signUp = route.params.registerData
    const checkstatus = route.params.checkstatus
    // const {userData} = useSelector(state => state.User);
    // console.log("LOLLLLLLL",userData)

    const Fldvalid = txt => txt && txt.replace(/\s/g, '').length;
    // console.log('tokeeeennnnnn>>>',token)

    useEffect(() => {
        PlaceSearch()
        getStateCity()
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
    // https://maps.googleapis.com/maps/api/geocode/json?components=country:ES&address=77379&key=AIzaSyC-ki3ImgxYzo8K2OCH9yDthHWIWV1yfj4
    // https://maps.googleapis.com/maps/api/geocode/json?address=82112&sensor=true&key=AIzaSyC-ki3ImgxYzo8K2OCH9yDthHWIWV1yfj4
    async function PlaceSearch() {
        fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${signUp.zipCode}&key=AIzaSyC-ki3ImgxYzo8K2OCH9yDthHWIWV1yfj4`,
        )
            .then(response => response.json())
            .then(res => {
                console.log('geocodeResponseToCityState', geocodeResponseToCityState(res));
                setAllCity(geocodeResponseToCityState(res))
            })
            .catch(e => console.log(e));
    }

    const userSignup = async () => {

        if (
            
            Fldvalid(firstName) === 0 ||
            firstName == '' ||
            Fldvalid(lastName) === 0 ||
            lastName == '' ||
            Fldvalid(gender) === 0 ||
            gender == '' ||
            Fldvalid(city) === 0 ||
            city == '' ||
            Fldvalid(stateName) === 0 ||
            stateName == ''

        )
            setLoader(true);
        let notiToken = await AuthService.getNotifactionToken()
        // console.log('notiToken',notiToken);
        // alert()
        let data = {
            "userType": "Requester",
            "firstName": firstName,
            "lastName": lastName,
            "email": signUp.email,
            "password": signUp.password,
            "mobileNumber": number,
            "city": city,
            "state": stateName,
            "deviceToken": notiToken,
            "gender": gender,
            "zipCode": signUp.zipCode,
            "invitationCode": signUp.invitationCode,
            "image": selectImg,
    
        };
        console.log("ADDDEDIMAGE",data)

        AuthService.requesterRegister(data)
            .then(res => {
                // console.log("AuthService====>>>", res)
                if (res && res.status) {
                    setLoader(false);
                    dispatch(setuser(res.data))
                    AuthService.setAccount(res.data);
                    AuthService.setToken(res.data.token);
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

    const otpHandler = async () => {

        if (number == '' || number == null) {
            Toast.show(selectLanguage == 'en' ? 'Please enter mobile number' : 'Por favor, introduzca el número de móvil', Toast.SHORT, Toast.BOTTOM);

            return;
        }
        // if (number.length < 3) {

        //     Toast.show('Please enter 10 digit mobile number', Toast.SHORT);
        //     return;
        // }
        AuthService.getRequesterOtp()
            .then((res) => {
                if (res.status) {

                    NavigationService.navigate('OTPverify', { otpNum: res.data, signUp: signUp })
                }
            })
    };

    const getStateCity = async () => {
        let data = {
            postalCode: Number(signUp?.zipCode)
        }
        // console.log('data=======', data)
        AuthService.getCity(data)
            .then((res) => {
                // console.log('cityyyyyyyy>>>', res);
                if (res.data) {
                    setAllState(res.data)
                }
            })
    };

    const changeAddress = (desc) => {
        // setShortAdd(desc)
        addess_Length(desc)
        // console.log('desc-----------------', desc)
        Geocoder.from(desc)
            .then(a => {
                // console.log('desc-----------------', a)
                setLat(a.results[0].geometry.location.lat)
                setLng(a.results[0].geometry.location.lng)

            })
            .catch(e => console.log(e))
    }
    const addess_Length = async (address_Data) => {
        // let lenthAdd = address_Data.split('')
        // console.log('address_Data---------------', address_Data)
        if (address_Data.length > 50) {
            return setShortAdd(address_Data.substring(0, 50) + '...')
        } else {
            return setShortAdd(address_Data)

        }

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
                            placeholder={setLanguage('First Name')}
                            placeholderTextColor={colors.primaryThemeColor}
                            // secureTextEntry={true}
                            value={firstName}
                            onChangeText={value => setFirstname(value)}
                            style={{
                                color: colors.primaryThemeColor,
                            }}
                            inputContainerStyle={{
                                ...styles.inputCont,
                                backgroundColor: colors.pageBackgroundColor,
                                borderColor: colors.primaryThemeColor,
                                borderRadius: 3,


                            }}

                        />
                        <AppTextInput
                            placeholder={setLanguage('Last Name')}
                            placeholderTextColor={colors.primaryThemeColor}
                            // secureTextEntry={true}
                            onChangeText={value => setLastname(value)}
                            value={lastName}
                            style={{
                                color: colors.secondaryThemeColor,
                            }}
                            inputContainerStyle={{
                                ...styles.inputCont,
                                backgroundColor: colors.pageBackgroundColor,
                                borderColor: colors.primaryThemeColor,
                                borderRadius: 3,
                                marginTop: moderateScale(10)

                            }}

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



                        {/* <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: 'space-between',
                            marginTop: 5
                        }}>
                            <View style={{
                                width: "70%",

                            }}>
                                
                                <AppTextInput
                                    placeholder={setLanguage('Mobile Number')}
                                    placeholderTextColor={colors.primaryThemeColor}
                                    onChangeText={value => setNumber(value)}
                                    style={{
                                        color: colors.primaryThemeColor,

                                    }}
                                    maxLength={10}
                                    value={number}
                                    inputContainerStyle={{
                                        ...styles.inputCont,
                                        backgroundColor: colors.pageBackgroundColor,
                                        borderColor: colors.primaryThemeColor,
                                    }}

                                />

                            </View>

                            <Pressable onPress={() => otpHandler()}
                                style={{
                                    ...styles.OtpView,
                                    backgroundColor: colors.primaryThemeColor,
                                }}>

                              
                                <Text style={{
                                    fontSize: moderateScale(10),
                                    color: colors.pageBackgroundColor,
                                    fontFamily: FONTS.medium
                                }}>
                                    {setLanguage('GET OTP')}

                                </Text>
              
                            </Pressable>

                        </View> */}

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

export default Register;

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
