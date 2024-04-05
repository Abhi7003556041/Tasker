

import React, { useState, useEffect } from 'react';
import {
    ImageBackground,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Pressable,
    ScrollView,
    TouchableWithoutFeedback,
    TouchableOpacity,
    PermissionsAndroid,
    Modal,
    Alert,
    Platform
} from 'react-native';
import { AppTextInput, Icon, useTheme } from 'react-native-basic-elements';
import LinearGradient from 'react-native-linear-gradient';
import { moderateScale, verticalScale } from '../../Constants/PixelRatio';
import AuthService from '../../Services/Auth';
import Toast from 'react-native-simple-toast'
import { Picker } from '@react-native-picker/picker';
import ImagePicker from 'react-native-image-crop-picker';
import MultiSelect from 'react-native-multiple-select';
import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setuser } from '../../Redux/reducer/User';
import Geocoder from 'react-native-geocoding';

import useSelectLangue from '../../Components/Language/useSelectLangue';
import GoogleMap from '../../Components/GoogleSearch/GoogleMap';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

import HomeService from '../../Services/HomeService';
import { fcmService } from '../../Services/Notification/FCMservice';
import Geolocation from 'react-native-geolocation-service';


sevenDay = [
    {
        dayName: 'Sunday'
    },
    {
        dayName: 'Monday'
    },
    {
        dayName: 'Tuesday'
    },
    {
        dayName: 'Wednesday'
    },
    {
        dayName: 'Thursday'
    },
    {
        dayName: 'Friday'
    },
    {
        dayName: 'Saturday'
    },
]


const ProviderGoogleSign = props => {
    // const providerHome = props.route.params.providerHome
    const [selectedLanguage, setSelectedLanguage] = useState();
    const colors = useTheme()
    const route = useRoute()
    const dispatch = useDispatch()
    const registerData = props.route.params.registerData


    const [allCategory, setallCategory] = useState([]);
    const [allSubCategory, setallSubCategory] = useState([]);
    const [allHourly, setAllHourly] = useState([]);
    const [allminTime, setAllminTime] = useState([]);
    const [allCountry, setAllCountry] = useState([]);
    const [allServiceLocation, setAllServiceLocation] = useState([]);
    const [allExperianceCount, setAllExperianceCount] = useState([]);

    const [category, setCategory] = useState('');
    const [service, setservice] = useState('');
    const [hourly, sethourly] = useState('');
    const [time, settime] = useState('amar dadur time');
    const [estimates, setEstimates] = useState();
    const [selectImg, setSelectImg] = useState('');
    const [backImage, setBackImage] = useState('');
    const [idCardImg, setIdCardImg] = useState('');
    const [idCardImgBack, setIdCardImgBack] = useState('');
    const [experiencetype, setExperience] = useState('');
    const [gender, setGender] = useState('');
    const [country, setCountry] = useState('');
    const [radiusLocation, setLocation] = useState('');
    const [vehicle, setVehicle] = useState();
    const [licenseNumber, setLicenseNumber] = useState('');
    const [curpID, setCurpID] = useState('');
    const [govtIDNumber, setGovtIDNumber] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [about, setAbout] = useState('');
    const [day, setDay] = useState('');
    const [userTime, setUserTime] = useState('');
    const [routingNumber, setRoutingNumber] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [rfcID, setRfcID] = useState('');
    const [selectedItems, setselectedItems] = useState([]);
    const [identificationCardFront, setIdentificationCardFront] = useState('');
    const [identificationCardBack, setIdentificationCardBack] = useState('');
    const [loader, setLoader] = useState(false)
    const [uploading, setUploading] = useState('');
    const [refress, setRefress] = useState('');
    const [shortAdd, setShortAdd] = useState('');
    const [modalVisible, setModalVisible] = useState('');
    const [locationUser, setLocationUser] = useState('');
    const [lat, setLat] = useState('');
    const [lag, setLng] = useState('');
    const { setLanguage } = useSelectLangue();
    const [image, setImage] = useState('');
    const { selectLanguage } = useSelector(state => state.Language);
    const [token, setToken] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastname] = useState('');
    const [mobile, setMobile] = useState('');
    const type = props.route.params.type
    const logintype = route.params.logintype

    console.log("Main type", type);
    // React.useEffect(() => {
    //   fcmService.register(onRegister);
    // }, []);
    React.useEffect(() => {
        fcmService.register(onRegister);

    }, [])
    const onRegister = token => {
        console.log('Register token [App]:', token);
        setToken(token);
    };

    useEffect(() => {
        getCategory();
        getHourly();
        getMinimumTime();
        getCountry();
        getServiceLoc();
        getExperCount();
        requestLocationPermission();
    }, [])

    const proregister = async () => {

        if (category == '') {
            Toast.show(selectLanguage == 'en' ? 'Please Select Category' : 'Seleccione una categoría', Toast.SHORT, Toast.BOTTOM);
            return;
        }
        // // if (service == '') {
        // //   Toast.show(selectLanguage == 'en' ? 'Please Select Service' : 'Seleccione el servicio', Toast.SHORT, Toast.BOTTOM);
        // //   return;
        // }
        // if (time == '') {
        //   Toast.show(selectLanguage == 'en' ? 'Please Select time' : 'Por favor seleccione hora', Toast.SHORT, Toast.BOTTOM);
        //   return;
        // }
        // if (estimates == null) {
        //   Toast.show(selectLanguage == 'en' ? 'Please Select Estimate' : 'Seleccione Presupuesto', Toast.SHORT, Toast.BOTTOM);
        //   return;
        // }
        // if (backImage == '') {
        //   Toast.show(selectLanguage == 'en' ? 'Please select front image' : 'Seleccione la imagen frontal', Toast.SHORT, Toast.BOTTOM);
        //   return;
        // }
        // if (selectImg == '') {
        //   Toast.show(selectLanguage == 'en' ? 'Please Select back image' : 'Seleccione la imagen trasera', Toast.SHORT, Toast.BOTTOM);
        //   return;
        // }
        // if (licenseNumber == '') {
        //   Toast.show(selectLanguage == 'en' ? 'Please license number' : 'Por favor número de licencia', Toast.SHORT, Toast.BOTTOM);
        //   return;
        // }
        // if (idCardImg == '') {
        //   Toast.show(selectLanguage == 'en' ? 'Please select card front image' : 'Seleccione la imagen frontal', Toast.SHORT, Toast.BOTTOM);
        //   return;
        // }
        // if (idCardImgBack == '') {
        //   Toast.show(selectLanguage == 'en' ? 'Please Select card back image' : 'Seleccione la imagen trasera', Toast.SHORT, Toast.BOTTOM);
        //   return;
        // }
        // if (curpID == '') {
        //   Toast.show(selectLanguage == 'en' ? 'Please enter crupID' : 'Por favor ingrese CrupID', Toast.SHORT, Toast.BOTTOM);
        //   return;
        // }
        // if (govtIDNumber == '') {
        //   Toast.show(selectLanguage == 'en' ? 'Please enter government number' : 'Ingrese el número del gobierno', Toast.SHORT, Toast.BOTTOM);
        //   return;
        // }
        // if (about == '') {
        //   Toast.show(selectLanguage == 'en' ? 'Please enter about' : 'Por favor ingrese sobre', Toast.SHORT, Toast.BOTTOM);
        //   return;
        // }
        // if (radiusLocation == '') {
        //   Toast.show(selectLanguage == 'en' ? 'Please radius location' : 'Por favor radio ubicación', Toast.SHORT, Toast.BOTTOM);
        //   return;
        // }
        // if (accountNumber == '') {
        //   Toast.show(selectLanguage == 'en' ? 'Enter your account number' : 'Ingrese su número de cuenta', Toast.SHORT, Toast.BOTTOM);
        //   return;
        // }
        // if (routingNumber == '') {
        //   Toast.show(selectLanguage == 'en' ? 'Enter your routing number' : 'Ingrese su número de ruta', Toast.SHORT, Toast.BOTTOM);
        //   return;
        // }
        // if (vehicle == null) {
        //   Toast.show(selectLanguage == 'en' ? 'Please select vehicle type' : 'Seleccione el tipo de vehículo', Toast.SHORT, Toast.BOTTOM);
        //   return;
        // }
        // if (gender == '') {
        //   Toast.show(selectLanguage == 'en' ? 'Please select Gender' : 'Por favor seleccione el género', Toast.SHORT, Toast.BOTTOM);
        //   return;
        // }
        // if (selectedItems == '') {
        //   Toast.show(selectLanguage == 'en' ? 'Please select Day' : 'Seleccione el día', Toast.SHORT, Toast.BOTTOM);
        //   return;
        // }
        // if (userTime == '') {
        //   Toast.show(selectLanguage == 'en' ? 'Please select Time' : 'Seleccione hora', Toast.SHORT, Toast.BOTTOM);
        //   return;
        // }
        // if (experiencetype == '') {
        //   Toast.show(selectLanguage == 'en' ? 'Please select experience' : 'Por favor seleccione experiencia', Toast.SHORT, Toast.BOTTOM);
        //   return;
        // }
        setLoader(true);
        // let notiToken = await AuthService.getNotifactionToken()
        // console.log('notiToken',notiToken);

        let data = {
            "userType": type,
            "firstName": logintype?.additionalUserInfo?.profile?.given_name,
            "lastName": logintype?.additionalUserInfo?.profile?.family_name,
            "email": logintype.user.email,
            "id": logintype?.user?.uid,
            "zipCode": zipcode,
            "category": category,
            "service": service,
            "hourlyRate": hourly,
            "minTime": time,
            "projectEstimateFee": estimates,
            "drivingLicenseFront": backImage,
            "drivingLicenseBack": selectImg,
            "drivingLicenseNumber": licenseNumber,
            "identificationCardFront": idCardImg,
            "identificationCardBack": idCardImgBack,
            "curpID": curpID,
            "identificationCard": govtIDNumber,
            "aboutMe": about,
            "deviceToken": token,
            "serviceLocationRadius": Number(radiusLocation),
            "bankAccountNumber": accountNumber,
            "routingNumber": routingNumber,
            "equipmentVehicleAvailable": vehicle,
            "gender": gender,
            "days": selectedItems,
            "time": userTime,
            "comapanyName": companyName,
            "experience": experiencetype,
            "image": image,
            "location": {
                "type": "Point",
                "coordinates": [
                    lat,
                    lag
                ]
            },
            "rfcID": rfcID
        };

        console.log("GooogleProvider", data)

        let dataN = {
            "userType": type,
            "firstName": logintype?.additionalUserInfo?.profile?.given_name,
            "lastName": logintype?.additionalUserInfo?.profile?.family_name,
            "email": logintype.user.email,
            "id": logintype?.user?.uid,
            "mobileNumber": mobile,
            "zipCode": zipcode,
            "category": category,
            "hourlyRate": hourly,
            "minTime": time,
            "projectEstimateFee": estimates,
            "drivingLicenseFront": backImage,
            "drivingLicenseBack": selectImg,
            "drivingLicenseNumber": licenseNumber,
            "identificationCardFront": idCardImg,
            "identificationCardBack": idCardImgBack,
            "curpID": curpID,
            "identificationCard": govtIDNumber,
            "aboutMe": about,
            "deviceToken": token,
            "serviceLocationRadius": Number(radiusLocation),
            "bankAccountNumber": accountNumber,
            "routingNumber": routingNumber,
            "equipmentVehicleAvailable": vehicle,
            "gender": gender,
            "days": selectedItems,
            "time": userTime,
            "comapanyName": companyName,
            "experience": experiencetype,
            "image": image,
            "location": {
                "type": "Point",
                "coordinates": [
                    lat,
                    lag
                ]
            },
            "rfcID": rfcID
        };
        let data1 = {
            deviceToken: token
        }
        console.log('LONG>>>>>>>>>>>>>>>', data);
        AuthService.googleAccountReg(service != "" ? data : dataN)
            .then(res => {
                console.log("Provid>>>>>>>>>>>>>>>>", res)

                if (res && res.status) {
                    setLoader(false);
                    HomeService.requesterProfileUpdate(data1).then(res => {
                        // console.log('devicetokenUpdaste')
                    });
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

    const onSelectedItemsChange = selectedItems => {
        setselectedItems(selectedItems)
        // console.log('selectedItems--------', selectedItems)
    };

    const getCategory = () => {
        AuthService.getProvCategory()
            .then((res) => {
                console.log('res', res)
                if (res) {
                    setallCategory(res.data)
                }

            })
    };

    const getService = (cat_id) => {

        AuthService.getProvService(cat_id)
            .then((res) => {
                if (res) {
                    setallSubCategory(res.data)
                }
            })
    }

    const provImage = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
        }).then(async image => {
            setSelectImg(image.path);
            setUploading(true)
            let result = await AuthService.uploadimage(image);
            if (result) {
                let Responseimg = result.url;
                setSelectImg(Responseimg);
                setUploading(false)
            }
        });
    };
    const ProBackImg = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
        }).then(async image => {
            setBackImage(image.path);
            setUploading(true)
            let result = await AuthService.uploadimage(image);
            if (result) {
                let Responseimg = result.url;
                setBackImage(Responseimg);
                setUploading(false)
            }
        });
    };
    const proCardImage = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
        }).then(async image => {
            setIdCardImg(image.path);
            setUploading(true)
            let result = await AuthService.uploadimage(image);
            if (result) {
                let Responseimg = result.url;
                setIdCardImg(Responseimg);
                setUploading(false)
            }
        });
    };
    const proCardBackImg = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
        }).then(async image => {
            setIdCardImgBack(image.path);
            setUploading(true)
            let result = await AuthService.uploadimage(image);
            if (result) {
                let Responseimg = result.url;
                setIdCardImgBack(Responseimg);
                setUploading(false)
            }
        });
    };

    const getHourly = () => {
        AuthService.getProvHourly()
            .then((res) => {
                if (res) {
                    setAllHourly(res.data)
                }

            })
    };

    const getMinimumTime = () => {
        let Arr = []
        AuthService.getProvminTime()
            .then((res) => {
                // console.log("TimmeTable>>>>", res.data)
                res.data.forEach(element => {
                    let data = {
                        label: Number(element.minTime).toString(),
                        value: Number(element.minTime).toString()
                    }
                    Arr.push(data)
                });
                setAllminTime(Arr)

            })
    };


    const getCountry = () => {
        AuthService.getProvCountry()
            .then((res) => {
                if (res) {
                    setAllCountry(res.data)
                }

            })
    };

    const getServiceLoc = () => {
        AuthService.getProvServiceLoca()
            .then((res) => {

                if (res) {
                    setAllServiceLocation(res.data)
                }

            })
    };

    const getExperCount = () => {
        AuthService.getExperinceCount()
            .then((res) => {
                if (res) {
                    setAllExperianceCount(res.data)
                }

            })
    };

    async function sendLocation() {
        Geolocation.getCurrentPosition(info => {
            console.log('info', info);
            setLat({
                latitude: info.coords.latitude,
                longitude: info.coords.longitude,
            });

            Geocoder.from({
                latitude: info.coords.latitude,
                longitude: info.coords.longitude,
            }).then(a => {
                console.log('new result', JSON.stringify(a.results));
                let allNewData = a.results
                    .map(item => displayPostcode(item.address_components))
                    .filter(it => it);
                // console.log('allNewDataBal', );

                setAddress(a.results[0].formatted_address);
                getAllBanner(mode(allNewData));
                // getAllBanner('711205')
                // searchNearReatent(info.coords.latitude, info.coords.longitude)
            });
        });
    }
    const requestLocationPermission = async () => {
        console.log('PermissionsAndroid', PermissionsAndroid);
        if (Platform.OS == 'ios') {
            request(PERMISSIONS.IOS.LOCATION_ALWAYS)
                .then(result => {
                    if (result == RESULTS.GRANTED) {
                        sendLocation();
                    }
                })
                .catch(error => {
                    console.warn(err);
                });
        } else {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Enable your GPS',
                        message: 'App Require GPS Permission',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('You can use the GPS');
                    //setBottomSheet(false)
                    // setModalVisible(false)
                    sendLocation();
                } else {
                    console.log('GPS permission denied');
                }
            } catch (err) {
                console.warn(err);
            }
        }
    };

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


    // return false
    return (
        <View style={{ flex: 1 }}>

            <ImageBackground source={require('../../Assets/images/payment_bg.jpg')}>
                <ScrollView showsVerticalScrollIndicator={false}>

                    <Icon
                        name="chevron-thin-left"
                        type="Entypo"
                        style={{ ...styles.icon, color: colors.primaryThemeColor }}
                        onPress={() => Navigation.back()}
                    />


                    <View style={styles.profile_view}>
                        <View>
                            <Text style={{
                                ...styles.hello_txt,
                                color: colors.primaryThemeColor
                            }}>{setLanguage('Hello!')}</Text>
                            <Text style={styles.profile_txt}>{setLanguage('Create Your Account!')}</Text>
                        </View>
                        <Pressable onPress={() => imagHandle()}>

                            <Image
                                source={image ? { uri: image } : require('../../Assets/images/useravatar.png')}
                                style={styles.profile_img}
                            />

                            <Pressable style={styles.edit}>
                                <Icon name="camera" type="EvilIcons" style={styles.cam_icon} />
                            </Pressable>
                        </Pressable>
                    </View>

                    <View style={{
                        ...styles.registration_view,
                        backgroundColor: colors.pageBackgroundColor
                    }}>
                        <View
                            style={styles.regView}>

                            <Text style={{
                                ...styles.register_txt,
                                color: colors.primaryThemeColor
                            }}>{setLanguage('Register To Continue')}</Text>

                        </View>

                        <View style={{
                            paddingHorizontal: moderateScale(15),
                            marginTop: moderateScale(10)
                        }}>

                            <AppTextInput

                                keyboardType='number-pad'
                                placeholderTextColor={colors.secondaryThemeColor}

                                value={zipcode}
                                onChangeText={value => {
                                    setZipcode(value)

                                }}
                                placeholder={setLanguage('Zip / Postal Code')}
                                style={{
                                    color: colors.primaryThemeColor,
                                    paddingHorizontal: moderateScale(15)
                                }}
                                inputContainerStyle={{
                                    ...styles.PickerCont,
                                    backgroundColor: colors.pageBackgroundColor,
                                    borderColor: '#4169E1',

                                }}

                            />
                            <AppTextInput

                                value={firstName}
                                onChangeText={value => setFirstname(value)}
                                placeholderTextColor={colors.secondaryThemeColor}
                                placeholder={setLanguage('First Name')}
                                style={{
                                    color: colors.primaryThemeColor,
                                    paddingHorizontal: moderateScale(15)
                                }}
                                inputContainerStyle={{
                                    ...styles.PickerCont,
                                    backgroundColor: colors.pageBackgroundColor,
                                    borderColor: '#4169E1',

                                }}
                            />
                            <AppTextInput

                                value={lastName}
                                onChangeText={value => setLastname(value)}
                                placeholderTextColor={colors.secondaryThemeColor}
                                placeholder={setLanguage('Last Name')}
                                style={{
                                    color: colors.primaryThemeColor,
                                    paddingHorizontal: moderateScale(15)
                                }}
                                inputContainerStyle={{
                                    ...styles.PickerCont,
                                    backgroundColor: colors.pageBackgroundColor,
                                    borderColor: '#4169E1',

                                }}
                            />
                            <AppTextInput

                                value={mobile}
                                onChangeText={value => setMobile(value)}
                                placeholderTextColor={colors.secondaryThemeColor}
                                maxLength={10}
                                keyboardType="number-pad"
                                placeholder={setLanguage('Mobile Number')}
                                style={{
                                    color: colors.primaryThemeColor,
                                    paddingHorizontal: moderateScale(15)
                                }}
                                inputContainerStyle={{
                                    ...styles.PickerCont,
                                    backgroundColor: colors.pageBackgroundColor,
                                    borderColor: '#4169E1',

                                }}
                            />



                            <View style={{
                                ...styles.PickerCont,
                                borderColor: colors.primaryThemeColor,
                            }}>

                                <Picker
                                    style={{ color: colors.primaryThemeColor }}
                                    selectedValue={category}
                                    onValueChange={(itemValue) => {
                                        getService(itemValue)
                                        setCategory(itemValue)
                                    }
                                    }>
                                    <Picker.Item label={"Category"} />
                                    {
                                        allCategory.map((it, ind) => {
                                            return (
                                                <Picker.Item key={ind} label={it.categoryName}
                                                    value={it._id} />
                                            )
                                        })
                                    }


                                </Picker>
                            </View>

                            <View style={{
                                ...styles.PickerCont,
                                borderColor: colors.primaryThemeColor,

                            }}>

                                <Picker
                                    style={{ color: colors.primaryThemeColor }}
                                    selectedValue={service}
                                    onValueChange={(itemValue) =>
                                        setservice(itemValue)
                                    }>
                                    <Picker.Item label={"Services"} />
                                    {
                                        allSubCategory.map((it, ind) => {
                                            return (
                                                <Picker.Item key={ind} label={it.subCategoryName}
                                                    value={it._id} />
                                            )
                                        })
                                    }


                                </Picker>
                            </View>

                            {/* <AppTextInput
                style={{
                  color: colors.primaryThemeColor,
                  fontSize: moderateScale(15),
                  width: "90%"
                }}
                numberOfLines={1}
                editable={false}
                value={shortAdd}
                onChangeText={value => setLocationUser(value)}
                placeholderTextColor={colors.primaryThemeColor}
                placeholder={setLanguage('Location')}
                inputContainerStyle={{
                  backgroundColor: colors.pageBackgroundColor,
                  borderColor: colors.primaryThemeColor,
                  borderRadius: moderateScale(3),
                  borderWidth: moderateScale(0.3),            
                  paddingHorizontal: moderateScale(10)
                }}
                rightAction={
                  <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Icon
                      name='map-marker-alt'
                      type='FontAwesome5'
                      size={20}
                    />
                  </TouchableOpacity>
                }

              /> */}

                            <View style={{
                                ...styles.PickerCont,
                                borderColor: colors.primaryThemeColor,
                            }}>

                                <Picker
                                    style={{ color: colors.primaryThemeColor }}
                                    selectedValue={estimates}
                                    onValueChange={(itemValue) =>
                                        setEstimates(itemValue)
                                    }>
                                    <Picker.Item label={"Fixed Free Project Estimates"} />
                                    <Picker.Item label={"Yes"}
                                        value={true} />
                                    <Picker.Item label={"No"}
                                        value={false} />

                                </Picker>
                            </View>

                            {
                                estimates ?
                                    null :
                                    <View style={{
                                        ...styles.PickerCont,
                                        borderColor: colors.primaryThemeColor,
                                    }}>

                                        <Picker
                                            style={{ color: colors.primaryThemeColor }}
                                            selectedValue={hourly}
                                            onValueChange={(itemValue) =>
                                                sethourly(itemValue)
                                            }>
                                            <Picker.Item label={"Hourly Rate"} />
                                            {
                                                allHourly.map((it, ind) => {

                                                    return (
                                                        <Picker.Item key={ind} label={it.hourlyRate}
                                                            value={it.hourlyRate} />
                                                    )
                                                })
                                            }


                                        </Picker>
                                    </View>
                            }


                            <View style={{
                                ...styles.PickerCont,
                                borderColor: colors.primaryThemeColor,
                            }}>

                                <Picker
                                    style={{ color: colors.primaryThemeColor }}
                                    selectedValue={time}
                                    onValueChange={(itemValue) =>
                                        settime(itemValue)
                                    }
                                >
                                    <Picker.Item label={"Min Time"} />

                                    {
                                        allminTime?.length > 0 && allminTime?.map((it, ind) => {
                                            return (
                                                <Picker.Item label={it.label}
                                                    value={it.value} key={ind} />
                                            )
                                        })
                                    }

                                    {/* )
                    })
                  } */}


                                </Picker>
                            </View>

                            <AppTextInput
                                style={{
                                    color: colors.primaryThemeColor,
                                    fontSize: moderateScale(15),
                                    width: "90%"
                                }}
                                numberOfLines={1}
                                editable={false}
                                value={shortAdd}
                                onChangeText={value => setLocationUser(value)}
                                placeholderTextColor={colors.primaryThemeColor}
                                placeholder={setLanguage('Location')}
                                inputContainerStyle={{
                                    backgroundColor: colors.pageBackgroundColor,
                                    borderColor: colors.primaryThemeColor,
                                    borderRadius: moderateScale(3),
                                    borderWidth: moderateScale(0.3),
                                    paddingHorizontal: moderateScale(10)
                                }}

                                rightAction={
                                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                                        <Icon
                                            name='map-marker-alt'
                                            type='FontAwesome5'
                                            size={20}
                                        />
                                    </TouchableOpacity>
                                }

                            />


                        </View>

                        <View style={styles.driving_licence_body}>
                            <Text style={{
                                ...styles.driving_licence_txt,
                                color: colors.primaryThemeColor
                            }}>{setLanguage('Driving License')}</Text>
                        </View>

                        <View
                            style={[styles.font_back_view, { marginTop: verticalScale(10) }]}>

                            <View style={styles.font_back}>
                                <Text style={{
                                    color: colors.primaryThemeColor
                                }}>{selectImg != '' ? "Uploaded" : "Front"}</Text>
                            </View>

                            <View style={styles.font_back}>
                                <Text style={{
                                    color: colors.primaryThemeColor
                                }}>{backImage != '' ? "Uploaded" : "Back"}</Text>
                            </View>

                        </View>

                        <View style={styles.font_back_view}>
                            <TouchableOpacity
                                onPress={() => provImage()}

                                style={styles.upload_btn}
                            >
                                <LinearGradient
                                    colors={['#3BB6DF', '#1972B6']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.upload_gradients}>
                                    <Icon
                                        name="upload"
                                        type="Feather"
                                        style={{
                                            ...styles.upload_icon,
                                            color: colors.pageBackgroundColor
                                        }}
                                    />
                                    <Text style={{
                                        ...styles.upload_txt,
                                        color: colors.pageBackgroundColor
                                    }}>{setLanguage('Upload Picture')}</Text>
                                </LinearGradient>
                            </TouchableOpacity>

                            <Pressable
                                onPress={() => ProBackImg()}
                                style={styles.upload_btn}
                            >
                                <LinearGradient
                                    colors={['#3BB6DF', '#1972B6']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.upload_gradients}>
                                    <Icon
                                        name="upload"
                                        type="Feather"
                                        style={{
                                            ...styles.upload_icon,
                                            color: colors.pageBackgroundColor
                                        }}
                                    />
                                    <Text style={{
                                        ...styles.upload_txt,
                                        color: colors.pageBackgroundColor
                                    }}>{setLanguage('Upload Picture')}</Text>
                                </LinearGradient>
                            </Pressable>
                        </View>

                        <AppTextInput
                            placeholder={setLanguage("User Type Driver's License Number")}
                            placeholderTextColor={colors.primaryThemeColor}
                            // secureTextEntry={true}
                            value={licenseNumber}
                            onChangeText={value => setLicenseNumber(value)}
                            style={{
                                color: colors.primaryThemeColor,
                            }}
                            inputContainerStyle={{
                                ...styles.inputCont,
                                backgroundColor: colors.pageBackgroundColor,
                                borderColor: '#4169E1',

                            }}

                        />

                        <View style={styles.driving_licence_body}>
                            <Text style={{
                                ...styles.driving_licence_txt,
                                color: colors.primaryThemeColor
                            }}>{setLanguage('CURP ID')}</Text>
                        </View>

                        <AppTextInput
                            placeholder=" "
                            // secureTextEntry={true}
                            value={curpID}
                            onChangeText={value => setCurpID(value)}
                            style={{
                                color: colors.primaryThemeColor,
                            }}
                            inputContainerStyle={{
                                ...styles.inputCont,
                                backgroundColor: colors.pageBackgroundColor,
                                borderColor: "#4169E1",

                            }}

                        />


                        <View style={styles.driving_licence_body}>
                            <Text style={{
                                ...styles.driving_licence_txt,
                                color: colors.primaryThemeColor
                            }}>
                                {setLanguage('Identification Card')}
                            </Text>
                        </View>

                        <View
                            style={[styles.font_back_view, { marginTop: verticalScale(10) }]}>

                            <View style={styles.font_back}>
                                <Text style={{
                                    color: colors.primaryThemeColor
                                }}>{idCardImg != '' ? "Uploaded" : "Front"}</Text>
                            </View>

                            <View style={styles.font_back}>
                                <Text style={{
                                    color: colors.primaryThemeColor
                                }}>{idCardImgBack != '' ? "Uploaded" : "Back"}</Text>
                            </View>

                        </View>

                        <View style={styles.font_back_view}>
                            <Pressable
                                onPress={() => proCardImage()}
                                style={styles.upload_btn}
                            >
                                <LinearGradient
                                    colors={['#3BB6DF', '#1972B6']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.upload_gradients}>
                                    <Icon
                                        name="upload"
                                        type="Feather"
                                        style={{
                                            ...styles.upload_icon,
                                            color: colors.pageBackgroundColor
                                        }}
                                    />
                                    <Text style={{
                                        ...styles.upload_txt,
                                        color: colors.pageBackgroundColor
                                    }}>{setLanguage('Upload Picture')}</Text>
                                </LinearGradient>
                            </Pressable>

                            <Pressable
                                style={styles.upload_btn}
                                onPress={() => proCardBackImg()}
                            >
                                <LinearGradient
                                    colors={['#3BB6DF', '#1972B6']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.upload_gradients}>
                                    <Icon
                                        name="upload"
                                        type="Feather"
                                        style={{
                                            ...styles.upload_icon,
                                            color: colors.pageBackgroundColor
                                        }}
                                    />
                                    <Text style={{
                                        ...styles.upload_txt,
                                        color: colors.pageBackgroundColor
                                    }}>{setLanguage('Upload Picture')}</Text>
                                </LinearGradient>
                            </Pressable>
                        </View>

                        <AppTextInput
                            placeholder={setLanguage('Govt. I-card Number')}
                            placeholderTextColor={colors.primaryThemeColor}
                            // secureTextEntry={true}
                            value={govtIDNumber}
                            onChangeText={value => setGovtIDNumber(value)}
                            style={{
                                color: colors.primaryThemeColor,
                            }}
                            inputContainerStyle={{
                                ...styles.inputCont,
                                backgroundColor: colors.pageBackgroundColor,
                                borderColor: "#4169E1",
                            }}

                        />

                        <View style={{
                            ...styles.PickerCont,
                            borderColor: colors.primaryThemeColor,
                            marginHorizontal: moderateScale(15)
                        }}>

                            <Picker
                                style={{ color: colors.primaryThemeColor }}
                                selectedValue={experiencetype}
                                onValueChange={(itemValue) =>
                                    setExperience(itemValue)
                                }>
                                <Picker.Item label={"Experience"} />
                                {
                                    allExperianceCount.map((it, ind) => {

                                        return (
                                            <Picker.Item key={ind} label={it.experience}
                                                value={it.experience} />
                                        )
                                    })
                                }

                            </Picker>
                        </View>

                        {/* <AppTextInput
              placeholder={setLanguage('Mobile Number')}
              placeholderTextColor={colors.primaryThemeColor}
              // secureTextEntry={true}
              maxLength={10}
              keyboardType='number-pad'
              value={mobileNumber}
              onChangeText={value => setMobileNumber(value)}
              style={{
                color: colors.primaryThemeColor,
              }}
              inputContainerStyle={{
                ...styles.inputCont,
                backgroundColor: colors.pageBackgroundColor,
                borderColor: "#4169E1",

              }}

            /> */}

                        <View style={{
                            ...styles.PickerCont,
                            borderColor: colors.primaryThemeColor,
                            marginHorizontal: moderateScale(15)
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

                        <View style={styles.driving_licence_body}>
                            <Text style={{
                                ...styles.driving_licence_txt,
                                color: colors.primaryThemeColor
                            }}>{setLanguage('About Me')}</Text>

                        </View>
                        <AppTextInput
                            textAlignVertical='top'
                            multiline={true}
                            numberOfLines={6}
                            placeholderTextColor={'#26baed'}
                            // secureTextEntry={true}
                            value={about}
                            onChangeText={value => setAbout(value)}
                            style={{
                                color: colors.primaryThemeColor,
                            }}
                            inputContainerStyle={{
                                ...styles.inputCont,
                                backgroundColor: colors.pageBackgroundColor,
                                borderColor: "#4169E1",

                            }}

                        />


                        <View style={{
                            ...styles.PickerCont,
                            borderColor: colors.primaryThemeColor,
                            marginHorizontal: moderateScale(15)
                        }}>

                            <Picker
                                style={{ color: colors.primaryThemeColor }}
                                selectedValue={country}
                                onValueChange={(itemValue) =>
                                    setCountry(itemValue)
                                }>
                                <Picker.Item label={"Country"} />
                                {
                                    allCountry.map((it, ind) => {

                                        return (
                                            <Picker.Item key={ind} label={it.en}
                                                value={it.en} />
                                        )
                                    })
                                }

                            </Picker>
                        </View>
                        {
                            console.log('allServiceLocation', allServiceLocation)
                        }
                        <View style={{
                            ...styles.PickerCont,
                            borderColor: colors.primaryThemeColor,
                            marginHorizontal: moderateScale(15)
                        }}>

                            <Picker
                                style={{ color: colors.primaryThemeColor }}
                                selectedValue={radiusLocation}
                                onValueChange={(itemValue) => {
                                    setLocation(itemValue)
                                    console.log(itemValue)
                                }
                                }>
                                <Picker.Item label={"Select Service Location Radius"} />
                                {
                                    allServiceLocation.map((it, ind) => {

                                        return (
                                            <Picker.Item key={ind} label={`${it.locationRange} km`}
                                                value={it.locationRange} />
                                        )
                                    })
                                }

                            </Picker>
                        </View>

                        <View style={{
                            ...styles.PickerCont,
                            borderColor: colors.primaryThemeColor,
                            marginHorizontal: moderateScale(15),
                            paddingHorizontal: moderateScale(1)
                        }}>
                            <MultiSelect
                                hideTags
                                items={sevenDay}
                                uniqueKey="dayName"
                                //   ref={(component) => { multiSelect = component }}
                                onSelectedItemsChange={onSelectedItemsChange}
                                selectedItems={selectedItems}
                                selectText="Day"
                                searchInputPlaceholderText="Search Items..."
                                // onChangeInput={(text) => console.log(text)}
                                // altFontFamily="ProximaNova-Light"
                                tagRemoveIconColor="#CCC"
                                tagBorderColor="#000"
                                tagTextColor="#000"
                                selectedItemTextColor="#CCC"
                                selectedItemIconColor="#000"
                                itemTextColor={colors.primaryThemeColor}
                                displayKey="dayName"
                                searchInputStyle={{ color: '#000' }}
                                submitButtonColor={colors.primaryThemeColor}
                                submitButtonText="Submit"
                                textColor={'#000'}
                                fontSize={16}
                                // fontFamily={"ProximaNova-Bold"}
                                styleDropdownMenu={{
                                    // height: 50,
                                    width: '95%',
                                    alignSelf: "center",
                                    // borderWidth: 1.6,
                                    paddingHorizontal: 5,
                                    // borderColor: "#fff",
                                    marginTop: 20,
                                    borderRadius: 6,
                                    backgroundColor: colors.pageBackgroundColor,
                                    // marginTop: 5
                                }}
                                // styleDropdownMenu={{
                                //   color: colors.primaryThemeColor
                                // }}
                                styleDropdownMenuSubsection={{
                                    backgroundColor: colors.pageBackgroundColor,

                                }}
                                styleTextDropdown={{
                                    fontSize: 16,
                                    color: colors.primaryThemeColor
                                }}
                                styleItemsContainer={{
                                    backgroundColor: colors.pageBackgroundColor,
                                }}
                            />

                        </View>

                        <AppTextInput
                            placeholder={setLanguage('Time')}
                            placeholderTextColor={colors.primaryThemeColor}
                            value={userTime}
                            keyboardType='number-pad'
                            onChangeText={value => setUserTime(value)}
                            style={{
                                color: colors.primaryThemeColor,
                            }}
                            inputContainerStyle={{
                                ...styles.inputCont,
                                backgroundColor: colors.pageBackgroundColor,
                                borderColor: "#4169E1",
                            }}

                        />

                        <AppTextInput
                            placeholder={setLanguage('Bank Account Number')}
                            placeholderTextColor={colors.primaryThemeColor}
                            keyboardType='number-pad'
                            value={accountNumber}
                            onChangeText={value => setAccountNumber(value)}
                            style={{
                                color: colors.primaryThemeColor,
                            }}
                            inputContainerStyle={{
                                ...styles.inputCont,
                                backgroundColor: colors.pageBackgroundColor,
                                borderColor: "#4169E1",

                            }}

                        />

                        <AppTextInput
                            placeholder={setLanguage('Routing Number')}
                            placeholderTextColor={colors.primaryThemeColor}
                            // secureTextEntry={true}
                            value={routingNumber}
                            onChangeText={value => setRoutingNumber(value)}
                            style={{
                                color: colors.primaryThemeColor,
                            }}
                            inputContainerStyle={{
                                ...styles.inputCont,
                                backgroundColor: colors.pageBackgroundColor,
                                borderColor: "#4169E1",

                            }}

                        />

                        <View style={{
                            ...styles.PickerCont,
                            borderColor: colors.primaryThemeColor,
                            marginHorizontal: moderateScale(15)
                        }}>
                            <Picker
                                style={{ color: colors.primaryThemeColor }}
                                selectedValue={vehicle}
                                onValueChange={(itemValue) =>
                                    setVehicle(itemValue)
                                }>
                                <Picker.Item label={"Equipment/Vehicle Available"} />
                                <Picker.Item label={"Yes"}
                                    value={true} />
                                <Picker.Item label={"No"}
                                    value={false} />

                            </Picker>
                        </View>
                        <AppTextInput
                            placeholder={setLanguage('Company Name')}
                            placeholderTextColor={colors.primaryThemeColor}
                            // secureTextEntry={true}
                            value={companyName}
                            onChangeText={value => setCompanyName(value)}
                            style={{
                                color: colors.primaryThemeColor,
                            }}
                            inputContainerStyle={{
                                ...styles.inputCont,
                                backgroundColor: colors.pageBackgroundColor,
                                borderColor: '#4169E1',
                            }}

                        />
                        <AppTextInput
                            placeholder={setLanguage('RFC ID/TAX ID')}
                            placeholderTextColor={colors.primaryThemeColor}
                            value={rfcID}
                            onChangeText={value => setRfcID(value)}
                            style={{
                                color: colors.primaryThemeColor,
                            }}
                            inputContainerStyle={{
                                ...styles.inputCont,
                                backgroundColor: colors.pageBackgroundColor,
                                borderColor: "#4169E1",
                            }}

                        />
                        <Pressable
                            // onPress={() =>
                            //   NavigationService.navigate('AppStack', { userType: 'ProviderHome' })
                            // }
                            onPress={() => proregister()}
                            style={styles.login_btn}
                        >
                            <LinearGradient
                                colors={['#3BB6DF', '#1972B6']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.gradient}>

                                <Text style={{
                                    ...styles.login_txt,
                                    color: colors.pageBackgroundColor
                                }}>
                                    {setLanguage('Continue')}
                                </Text>
                            </LinearGradient>
                        </Pressable>
                    </View>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        statusBarTranslucent={true}
                        onRequestClose={() => {
                            // console.log('Modal has been closed.');
                            setModalVisible(!modalVisible);
                        }}>
                        <>
                            <GoogleMap
                                changeAddress={(a) => changeAddress(a)}
                                onClose={() => setModalVisible(false)}
                            />
                        </>
                    </Modal>
                </ScrollView>
            </ImageBackground>
        </View >
    );
};

export default ProviderGoogleSign;

const styles = StyleSheet.create({
    icon: {
        fontSize: moderateScale(15),
        paddingStart: moderateScale(10),
        paddingTop: moderateScale(20),
    },
    profile_img: {
        height: moderateScale(70),
        width: moderateScale(70),
        borderRadius: moderateScale(35),
    },
    hello_txt: {
        fontSize: moderateScale(25),

        color: 'red',
    },
    profile_txt: {
        fontSize: moderateScale(20),
        color: '#4470B4',
    },
    profile_view: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: moderateScale(15),
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
    registration_view: {
        elevation: 15,
        marginHorizontal: moderateScale(20),
        marginTop: verticalScale(30),
        marginBottom: verticalScale(10),
    },
    dropDownView: {
        marginTop: moderateScale(10),
        borderColor: '#A5B0D7',
        // borderWidth: moderateScale(1),
        height: moderateScale(40),
        borderRadius: moderateScale(2),
        width: '90%',
        alignSelf: 'center',
        paddingHorizontal: moderateScale(5),
    },
    textInput: {
        backgroundColor: 'red',
        width: '90%',
        height: verticalScale(40),
        alignSelf: 'center',
        borderWidth: 1,
        paddingStart: 15,
        borderColor: '#A5B0D7',
        marginTop: verticalScale(10),
        fontSize: moderateScale(14),
        color: 'red',
    },
    textInput_email: {
        backgroundColor: 'red',
        width: '90%',
        height: verticalScale(40),
        alignSelf: 'center',
        borderWidth: 1,
        paddingStart: 15,
        borderColor: '#A5B0D7',
        marginTop: verticalScale(10),
        fontSize: moderateScale(12),
    },
    register_txt: {
        paddingTop: verticalScale(10),
        fontSize: moderateScale(12),
        paddingStart: moderateScale(15),
    },
    driving_licence_body: {
        marginTop: verticalScale(10),
        paddingHorizontal: moderateScale(15),
    },
    driving_licence_txt: {
        fontSize: moderateScale(15),
        paddingHorizontal: moderateScale(5)
    },
    font_back_view: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: verticalScale(5),
    },
    font_back: {
        borderWidth: 1,
        width: moderateScale(100),
        alignItems: 'center',
        borderColor: '#DBDEEF',
    },
    upload_btn: {
        width: moderateScale(100),
        height: moderateScale(20),

        elevation: 5,
    },
    upload_gradients: {
        width: '100%',
        height: '100%',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
    },
    upload_icon: {
        fontSize: moderateScale(13),
    },
    upload_txt: {
        fontSize: moderateScale(10),
    },

    textarea: {
        backgroundColor: '#ECECEC',
        marginHorizontal: moderateScale(15),
        borderRadius: moderateScale(10),
        marginTop: verticalScale(15),
        color: 'red',
    },
    login_btn: {
        // top: verticalScale(350),

        width: moderateScale(130),
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        height: verticalScale(40),
        borderRadius: 10,
        elevation: 5,
        marginVertical: verticalScale(45),
        marginBottom: verticalScale(30),
    },
    gradient: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    login_txt: {
        fontWeight: '700',
    },
    PickerCont: {
        borderWidth: 0.3,
        borderRadius: moderateScale(0),
        borderRadius: 3,
        marginTop: moderateScale(10)
    },
    inputCont: {
        borderRadius: 0,
        borderWidth: 0.3,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: moderateScale(10),
        marginHorizontal: moderateScale(15),
        marginTop: moderateScale(10),
        borderRadius: 3

    },
    // Pickercontain: {
    //   borderWidth: 0.3,
    //   borderRadius: moderateScale(0),
    //   borderColor: "#a0a0a0",
    //   borderRadius: 3
    // },
    regView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: moderateScale(16),
    }
});







