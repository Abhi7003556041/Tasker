import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Dimensions,
    Pressable,
    ScrollView,
    Image,
    TouchableOpacity,
    Modal,
    PermissionsAndroid,
    Platform,
  } from 'react-native';
  import React, { useEffect, useState } from 'react';
  import {
    AppButton,
    AppTextInput,
    Container,
    Icon,
    StatusBar,
    useTheme,
  } from 'react-native-basic-elements';
  import { moderateScale } from '../../Constants/PixelRatio';
  import { FONTS } from '../../Constants/Fonts';
  import ImagePicker from 'react-native-image-crop-picker';
  import SettingsHeader from '../../Components/Header/SettingsHeader';
  import SelectLan from '../../Components/Language/SelectLan';
  import useSelectLangue from '../../Components/Language/useSelectLangue';
  import AuthService from '../../Services/Auth';
  import { Picker } from '@react-native-picker/picker';
  import Geocoder from 'react-native-geocoding';
  import HomeService from '../../Services/HomeService';
  import { useDispatch, useSelector } from 'react-redux';
  import { setuser } from '../../Redux/reducer/User';
  import Toast from 'react-native-simple-toast';
  import NavigationService from '../../Services/Navigation';
  import GoogleMap from '../../Components/GoogleSearch/GoogleMap';
  import Geolocation from 'react-native-geolocation-service';
  
  const { height, width } = Dimensions.get('window');
  
  export default function RequesterProfile() {
  
    const { setLanguage } = useSelectLangue();
    const { selectLanguage } = useSelector(state => state.Language);
    const colors = useTheme();
    const [editMobile, setEditMobile] = useState(false);
    const [editLocation, setEditLocation] = useState(false);
    const [editCity, setEditCity] = useState(false);
    const [editState, setEditState] = useState(false);
    const [editPost, setEditPost] = useState(false);
    const [editName, setEditName] = useState(false);
    const [image, setImage] = useState('');
  
    const [mobileNumber, setMobileNumber] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [AllCity, setAllCity] = useState([]);
    const [modalVisible, setModalVisible] = useState('');
    const [lat, setlat] = useState('');
    const [latitude, setlatitude] = useState('');
    const [lag, setLng] = useState('');
    const [shortAdd, setShortAdd] = useState('');
    const [location, setLocation] = useState('');
    const [profileName, setProfileName] = useState('');
    const [lastName, setLastName] = useState('');
    const [uploading, setUploading] = useState(false);
    const { userData } = useSelector(state => state.User);
    const [selectImg, setSelectImg] = useState('');
  
    // console.log("imagess",userData)
    // console.log("Data====><><><", userData)
    const dispatch = useDispatch();
  
  
    useEffect(() => {
      getProfileDetails()
      profileUpdate();
      getStateCity();
      requestLocationPermission();
      
    }, []);
  
    const imagHandle = async index => {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      }).then(async image => {
        // console.log('image uri ....', image);
        // setImage(image.path);
        setUploading(true);
        let result = await AuthService.uploadimage(image);
        console.log('image >>>>>>>>>> ....', result);
        if (result) {
          let Responseimg = result.url;
          setSelectImg(Responseimg);
          // dispatch(setuser({ ...userData, image: Responseimg }))
          // AuthService.setAccount({ ...userData, image: Responseimg })
          setUploading(false);
  
        }
      });
    };
  
    const profileUpdate = async () => {
      let data = await AuthService.getAccount();
      // console.log('UpdateData===============', data);
      if (data) {
        setMobileNumber(data?.mobileNumber);
        setCity(data?.city);
        setState(data?.state);
        setZipCode(data?.zipCode);
        setProfileName(data?.firstName);
        setLastName(data.lastName)
        setSelectImg(data?.image);
        setLocation(data?.location);
      }
      // console.log("LastName==", data)
    };
    const getProfileDetails = async() => {
      // setLoaderr(true)
      HomeService.getProviderDetails()
      .then((res)=>{
          console.log('getProviderDetails>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',res.data.locName)
          setShortAdd(res.data.locName)
          // setLoaderr(false)
  
      })
    }
  
    const getStateCity = async () => {
      let data = {
        postalCode: Number(zipCode),
        state: state,
        city: city
      };
      // console.log('data=======', data)
      AuthService.getCity(data).then(res => {
  
        if (res.data) {
          setAllCity(res.data);
        }
      });
    };
    // console.log("userData",userData);
    const Update_Requester = async () => {
      // console.log('ddddddddddddddddddddd')
      let data = {
        userType: userData.userType == 'Requester' ? 'Requester' : 'Provider',
        mobileNumber: mobileNumber,
        city: city,
        zipCode: zipCode,
        firstName: profileName,
        // lastname: lastname
        locName: shortAdd,
        location: {
          type: "Point",
          coordinates: [
            lag,
            latitude
          ]
        },
        state: state,
        image: selectImg,
      };
      console.log('datata==============>>',JSON.stringify(data));
      HomeService.requesterProfileUpdate(data).then(res => {
        // if(res && res.success){
        dispatch(setuser(data))
        AuthService.setAccount(data);
        // AuthService.setToken(res.data.token);
        Toast.show(selectLanguage == 'en' ? 'Updated successfully' : 'Actualizado correctamente', Toast.SHORT, Toast.BOTTOM);
        NavigationService.navigate('Home');
        // }
  
      })
        .catch(err => {
          console.log("err", err);
        })
    };
  
    const changeAddress = desc => {
      // setShortAdd(desc)
      addess_Length(desc);
      // console.log('desc-----------------', desc)
      const arr = desc.split(',')
      setCity(arr[arr.length - 3])
      const state = arr[arr.length - 2].trim().split(' ')
      // setState(s=>)
      // console.log('arrrrrrrrr', state)
      setState(`${state[0] + ' ' + state[1]}`)
      setZipCode(state[state.length - 1])
      // setState()
      Geocoder.from(desc)
        .then(a => {
          console.log('descnewww-----------------', a)
          setlatitude(a.results[0].geometry.location.lat);
          setLng(a.results[0].geometry.location.lng);
        })
        .catch(e => console.log(e));
    };
    const addess_Length = async address_Data => {
      // let lenthAdd = address_Data.split('')
      // console.log('address_Data---------------', address_Data)
      if (address_Data.length > 50) {
        return setShortAdd(address_Data.substring(0, 50) + '...');
      } else {
        return setShortAdd(address_Data);
      }
    };
    async function sendLocation() {
      Geolocation.getCurrentPosition(info => {
        // console.log('info=====', info);
        setlat({
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
        });
  
  
        Geocoder.from({
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
        }).then(a => {
          console.log('new result', JSON.stringify(a.results));
          // let allNewData = a.results
          //   .map(item => displayPostcode(item.address_components))
          //   .filter(it => it);
          // console.log('allNewDataBal', );
  
          // setAddress(a.results[0].formatted_address);
          // getAllBanner(mode(allNewData));
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
            // console.log('You can use the GPS');
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
  
    return (
      <Container>
        <View
          style={styles.ProfileSave}>
  
          <Pressable
            onPress={() => NavigationService.back()}>
            <Icon
              name="ios-arrow-back"
              type="Ionicons"
              style={{ color: colors.primaryThemeColor, fontSize: moderateScale(25) }}
            />
          </Pressable>
          <TouchableOpacity
            style={{ alignItems: 'center' }}
            onPress={() => {
              Update_Requester();
            }}>
            <Text style={{ ...styles.textHead, color: colors.primaryThemeColor }}>
              {SelectLan('Save')}
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <ImageBackground
  
            source={require('../../Assets/images/user_profile_background.jpg')}
            style={{ flex: 1 }}
          >
            <View style={styles.profName}>
  
              <View>
  
                <View
                  style={{
                    ...styles.circle,
                    backgroundColor: colors.primaryThemeColor,
                  }}>
  
                  <Image
                    source={userData.image && selectImg == '' ? { uri: userData.image } : selectImg ? { uri: selectImg } : require('../../Assets/images/useravatar.png')}
                    style={styles.img}
                  />
  
  
                </View>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginVertical: 10
                }}>
                  <Pressable onPress={() => imagHandle()}>
                    <Text
                      style={{
                        color: colors.pageBackgroundColor,
                        textAlign: 'center',
                        fontSize: moderateScale(10),
                        fontFamily: FONTS.bold,
                        // marginTop: moderateScale(10)
                      }}>
                      {SelectLan('Change Image')}
                    </Text>
                  </Pressable>
                  <Pressable
  
                    onPress={() => setEditName(true)}
                    style={{
                      // marginTop: moderateScale(46),
                      // marginLeft: moderateScale(140),
                      marginHorizontal: 10
  
                    }}>
                    <Text
                      style={{
  
                        color: colors.pageBackgroundColor,
                        textDecorationLine: 'underline',
                        fontSize: moderateScale(13),
                      }}>
                      {setLanguage('Edit')}
                    </Text>
                  </Pressable>
                </View>
  
              </View>
  
              {editName ? (
                <View style={[styles.editName, { flex: 1, flexDirection: 'column' }]}>
                  <View style={[styles.editName, { flex: 1, justifyContent: 'space-between', }]}>
                    <AppTextInput
                      style={{
                        // height: moderateScale(40),
                        color: colors.secondaryThemeColor,
                      }}
                      value={profileName}
                      onChangeText={value => setProfileName(value)}
                      placeholderTextColor={colors.primaryThemeColor}
                      placeholder="Name"
                      inputContainerStyle={{
                        ...styles.inputCont,
  
                        backgroundColor: colors.pageBackgroundColor,
                      }}
                    />
                    <AppTextInput
                      style={{
                        // height: moderateScale(40),
                        color: colors.secondaryThemeColor,
                      }}
                      value={lastName}
                      onChangeText={value => setLastName(value)}
                      placeholderTextColor={colors.primaryThemeColor}
                      placeholder="Name"
                      inputContainerStyle={{
                        ...styles.inputCont,
  
                        backgroundColor: colors.pageBackgroundColor,
                      }}
                    />
                  </View>
  
                  <View style={[styles.editName, { flex: 1, justifyContent: 'space-between', }]}>
                    <Pressable
                      onPress={() => setEditName(false)}
                      style={{
                        ...styles.button,
                        backgroundColor: colors.primaryThemeColor,
                        width: '45%'
                        // marginLeft: 5,
                      }}>
                      <Text
                        style={{
                          ...styles.buttonText,
                          color: colors.pageBackgroundColor,
                          margin: 10
                        }}>
                        {setLanguage('Cancel')}
                      </Text>
                    </Pressable>
  
                    <Pressable
                      onPress={() => setEditName(false)}
                      style={{
                        ...styles.button,
                        backgroundColor: colors.primaryThemeColor,
                        marginLeft: 5,
                        width: '45%'
                      }}>
                      <Text
                        style={{
                          ...styles.buttonText,
                          color: colors.pageBackgroundColor,
                          margin: 10
                        }}>
                        {setLanguage('Update')}
                      </Text>
                    </Pressable>
                  </View>
  
  
                </View>
              ) : (
                <>
                  <Text numberOfLines={1}
                    style={{
                      ...styles.textHead,
                      color: colors.pageBackgroundColor,
                      marginLeft: moderateScale(15),
                    }}>
                    {profileName == '' ? 'name' : profileName}  {lastName == '' ? 'lastname' : lastName}
                  </Text>
  
  
                </>
  
              )}
            </View>
            {/* <View>
  
            </View> */}
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
              <View style={{
                ...styles.ProfileView,
                backgroundColor: colors.pageBackgroundColor,
                // marginTop: 30,
  
              }}>
                <View style={styles.card}>
                  <Text
                    style={{ ...styles.textItem, color: colors.secondaryThemeColor }}>
                    {setLanguage('Mobile Number')}
                  </Text>
  
                  <Pressable onPress={() => setEditMobile(true)}>
                    <Text
                      style={{
                        color: colors.primaryThemeColor,
                        textDecorationLine: 'underline',
                        fontSize: moderateScale(13),
                        marginTop: moderateScale(10),
                      }}>
                      {setLanguage('Edit')}
                    </Text>
                  </Pressable>
                </View>
  
  
                <View>
  
  
                </View>
  
                {editMobile ? (
                  <View style={styles.editSection}>
                    <AppTextInput
                      style={{
                        // height: moderateScale(40),
                        color: colors.secondaryThemeColor,
                      }}
                      keyboardType="number-pad"
                      maxLength={10}
                      value={mobileNumber}
                      onChangeText={value => setMobileNumber(value)}
                      placeholderTextColor={colors.primaryThemeColor}
                      placeholder={setLanguage('Mobile Number')}
                      inputContainerStyle={{
                        ...styles.inputCont,
                        backgroundColor: colors.pageBackgroundColor,
                      }}
                    />
                    <Pressable
                      onPress={() => setEditMobile(false)}
                      style={{
                        ...styles.button,
                        backgroundColor: colors.primaryThemeColor,
                      }}>
                      <Text
                        style={{
                          ...styles.buttonText,
                          color: colors.pageBackgroundColor,
                        }}>
                        {setLanguage('Cancel')}
                      </Text>
                    </Pressable>
                    <Pressable
                      onPress={() => setEditMobile(false)}
                      style={{
                        ...styles.button,
                        backgroundColor: colors.primaryThemeColor,
                      }}>
                      <Text
                        style={{
                          ...styles.buttonText,
                          color: colors.pageBackgroundColor,
                        }}>
                        {setLanguage('Update')}
                      </Text>
                    </Pressable>
                  </View>
                ) : null}
                <Text
                  style={{
                    color: colors.primaryThemeColor,
                    marginHorizontal: moderateScale(20),
                    fontSize: moderateScale(12),
                  }}>
                  {mobileNumber == '' ? 'number' : mobileNumber}
                </Text>
              </View>
                  {
                    console.log('shottrr6tyutyu====',typeof(shortAdd))
                  }
              {
                userData.userType == 'Provider' ?
                  <>
                    <View style={styles.card}>
                      <View>
                        <Text
                          style={{ ...styles.textItem, color: colors.secondaryThemeColor }}>
                          {setLanguage('Location')}
                        </Text>
  
                        <Text
                          style={{
                            color: colors.primaryThemeColor,
                            marginHorizontal: moderateScale(20),
                            fontSize: moderateScale(12),
                          }}>
  
                          {shortAdd}
                          {/* {
  
                            userData.locName && shortAdd == "" ? userData.locName : shortAdd
                          } */}
  
                        </Text>
                      </View>
                      <Pressable onPress={() => setEditLocation(true)}>
                        <Text
                          style={{
                            color: colors.primaryThemeColor,
                            textDecorationLine: 'underline',
                            fontSize: moderateScale(13),
                            marginTop: moderateScale(10),
                          }}>
                          {setLanguage('Edit')}
                        </Text>
                      </Pressable>
                    </View>
                    {editLocation ? (
                      <Pressable style={styles.editSection}>
                        <Pressable onPress={() => setModalVisible()}>
                          <AppTextInput
                            style={{
                              // height: moderateScale(40),
                              color: colors.secondaryThemeColor,
                              width: '90%',
                            }}
                            editable={false}
                            numberOfLines={1}
                            placeholderTextColor={colors.primaryThemeColor}
                            value={shortAdd}
                            onChangeText={value => setLocation(value)}
                            placeholder={setLanguage('Location')}
                            inputContainerStyle={{
                              ...styles.inputCont,
                              backgroundColor: colors.pageBackgroundColor,
                            }}
                            rightAction={
                              <TouchableOpacity onPress={() => setModalVisible()}>
                                <Icon
                                  name="map-marker-alt"
                                  type="FontAwesome5"
                                  size={15}
                                />
                              </TouchableOpacity>
                            }
                          />
                        </Pressable>
                        <Pressable
                          onPress={() => setEditLocation(false)}
                          style={{
                            ...styles.button,
                            backgroundColor: colors.primaryThemeColor,
                            marginHorizontal:10,
                            paddingHorizontal:10
                          }}>
                          <Text
                            style={{
                              ...styles.buttonText,
                              color: colors.pageBackgroundColor,
                            }}>
                            {setLanguage('Cancel')}
                          </Text>
                        </Pressable>
                        <Pressable
                          onPress={() => setEditLocation(false)}
                          style={{
                            ...styles.button,
                            backgroundColor: colors.primaryThemeColor,
                            marginHorizontal:10,
                            paddingHorizontal:10
                          }}>
                          <Text
                            style={{
                              ...styles.buttonText,
                              color: colors.pageBackgroundColor,
                            }}>
                            {setLanguage('Update')}
                          </Text>
                        </Pressable>
                      </Pressable>
                    ) : null}
                  </>
  
                  :
                  <View
                    style={{
                      ...styles.ProfileView,
                      backgroundColor: colors.pageBackgroundColor
                    }}>
                    <View style={styles.card}>
                      <Text
                        style={{ ...styles.textItem, color: colors.secondaryThemeColor }}>
                        {setLanguage('City')}
                      </Text>
                      <Pressable onPress={() => setEditCity(true)}>
                        <Text
                          style={{
                            color: colors.primaryThemeColor,
                            textDecorationLine: 'underline',
                            fontSize: moderateScale(13),
                            marginTop: moderateScale(10),
                          }}>
                          {setLanguage('Edit')}
                        </Text>
                      </Pressable>
                    </View>
                    <Text
                      style={{
                        color: colors.primaryThemeColor,
                        marginHorizontal: moderateScale(20),
                        fontSize: moderateScale(12),
                      }}>
                      {city == '' ? 'City' : city}
                    </Text>
                    {editCity ? (
                      <View style={[styles.editSection, {}]}>
                        <AppTextInput
                          style={{
                            // height: moderateScale(40),
                            color: colors.secondaryThemeColor,
                          }}
                          value={city}
                          // keyboardType="number-pad"
                          onChangeText={value => setCity(value)}
                          placeholderTextColor={colors.primaryThemeColor}
                          placeholder={setLanguage('City')}
                          inputContainerStyle={{
                            ...styles.inputCont,
                            backgroundColor: colors.pageBackgroundColor,
                          }}
                        />
                        <Pressable
                          onPress={() => setEditCity(false)}
                          style={{
                            ...styles.button,
                            backgroundColor: colors.primaryThemeColor,
                            marginHorizontal: 10,
                            paddingHorizontal: 10
                          }}>
                          <Text
                            style={{
                              ...styles.buttonText,
                              color: colors.pageBackgroundColor,
                            }}>
                            {setLanguage('Cancel')}
                          </Text>
                        </Pressable>
                        <Pressable
                          onPress={() => setEditCity(false)}
                          style={{
                            ...styles.button,
                            backgroundColor: colors.primaryThemeColor,
                            paddingHorizontal: 10
                          }}>
                          <Text
                            style={{
                              ...styles.buttonText,
                              color: colors.pageBackgroundColor,
                            }}>
                            {setLanguage('Update')}
                          </Text>
                        </Pressable>
                      </View>
                    ) : null}
                  </View>
  
              }
              <View
                style={{
                  ...styles.ProfileView,
                  backgroundColor: colors.pageBackgroundColor
                }}>
                <View style={styles.card}>
                  <Text
                    style={{ ...styles.textItem, color: colors.secondaryThemeColor }}>
                    {setLanguage('Zip / Postal Code')}
                  </Text>
                  <Pressable onPress={() => setEditPost(true)}>
                    <Text
                      style={{
                        color: colors.primaryThemeColor,
                        textDecorationLine: 'underline',
                        fontSize: moderateScale(13),
                        marginTop: moderateScale(10),
                      }}>
                      {setLanguage('Edit')}
                    </Text>
                  </Pressable>
                </View>
                <Text
                  style={{
                    color: colors.primaryThemeColor,
                    marginHorizontal: moderateScale(20),
                    fontSize: moderateScale(12),
                  }}>
                  {zipCode == '' ? 'ZipCode' : zipCode}
                </Text>
                {editPost ? (
                  <View style={styles.editSection}>
                    <AppTextInput
                      style={{
                        // height: moderateScale(40),
                        color: colors.secondaryThemeColor,
                      }}
                      value={zipCode}
                      keyboardType="number-pad"
                      onChangeText={value => setZipCode(value)}
                      placeholderTextColor={colors.primaryThemeColor}
                      placeholder={setLanguage('Postal code')}
                      inputContainerStyle={{
                        ...styles.inputCont,
                        backgroundColor: colors.pageBackgroundColor,
                      }}
                    />
                    <Pressable
                      onPress={() => setEditPost(false)}
                      style={{
                        ...styles.button,
                        backgroundColor: colors.primaryThemeColor,
                      }}>
                      <Text
                        style={{
                          ...styles.buttonText,
                          color: colors.pageBackgroundColor,
                        }}>
                        {setLanguage('Cancel')}
                      </Text>
                    </Pressable>
                    <Pressable
                      onPress={() => setEditPost(false)}
                      style={{
                        ...styles.button,
                        backgroundColor: colors.primaryThemeColor,
                      }}>
                      <Text
                        style={{
                          ...styles.buttonText,
                          color: colors.pageBackgroundColor,
                        }}>
                        {setLanguage('Update')}
                      </Text>
                    </Pressable>
                  </View>
                ) : null}
  
  
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
            </View>
          </ImageBackground>
        </ScrollView>
      </Container>
    );
  }
  
  const styles = StyleSheet.create({
    textHead: {
      alignSelf: 'center',
      fontFamily: FONTS.medium,
      fontSize: moderateScale(14),
    },
    ProfileView: {
      marginVertical: 30,
      paddingBottom: 10,
      elevation: 0.5,
    },
    ProfileSave: {
      height: moderateScale(35),
      justifyContent: 'space-between',
      flexDirection: 'row',
      paddingHorizontal: 10,
      alignItems: 'center',
    },
    img: {
      height: moderateScale(90),
      width: moderateScale(90),
      borderRadius: moderateScale(25),
      // alignSelf: 'center',
      // marginTop: moderateScale(20)
  
    },
    PickerCont: {
      borderWidth: 0.3,
      // borderRadius: moderateScale(0),
      borderRadius: 3,
      // marginTop: moderateScale(10)
      height: 40,
      width: 120,
    },
    profName: {
      // height: height / 2.5,
      // marginTop: moderateScale(20),
      // marginHorizontal: moderateScale(10),
      flexDirection: 'row',
      // height:'40%',
      // backgroundColor:'green'
      padding: moderateScale(10)
    },
    circle: {
      height: moderateScale(80),
      width: moderateScale(80),
      borderRadius: moderateScale(50),
      // marginTop: height / 4.3,
      // marginLeft: moderateScale(10),
      alignItems: 'center',
      justifyContent: 'center',
    },
    textItem: {
      fontFamily: FONTS.medium,
      fontSize: moderateScale(14),
      marginVertical: moderateScale(10),
      marginLeft: moderateScale(10),
    },
    card: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: moderateScale(10),
      // marginBottom:10
    },
    inputCont: {
      // borderWidth: moderateScale(0),
      // borderRadius: 0,
      // elevation: moderateScale(2),
      // flexDirection: "row",
      // justifyContent: "space-between",
      marginTop: moderateScale(0),
      // paddingHorizontal: moderateScale(20),
      width: width / 3.3,
    },
    fistapp: {
      // height: moderateScale(50),
      width: moderateScale(170),
      // marginTop: moderateScale(30),
      borderRadius: moderateScale(15),
      elevation: moderateScale(10),
      alignSelf: 'center',
      justifyContent: 'center',
    },
    button: {
      height: moderateScale(40),
      // width: moderateScale(50),
      // marginLeft: moderateScale(20),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: moderateScale(5),
  
    },
    buttonText: {
      fontSize: moderateScale(11),
    },
    editSection: {
      flexDirection: 'row',
      marginLeft: moderateScale(20),
      marginVertical: moderateScale(10),
      marginTop: moderateScale(10),
    },
    editName: {
      flexDirection: 'row',
      // marginLeft: moderateScale(10),
    },
    logoutSection: {
      position: 'absolute',
      bottom: 10,
      right: 10,
    },
    logoutText: {
      fontSize: moderateScale(14),
    },
  });
  