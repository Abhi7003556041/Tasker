/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  Pressable,
  ImageBackground,
  Modal,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  Platform
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  AppButton,
  AppTextInput,
  Card,
  Container,
  Icon,
  useTheme,
} from 'react-native-basic-elements';
import { moderateScale } from '../../Constants/PixelRatio';
import SettingsHeader from '../../Components/Header/SettingsHeader';
import { FONTS } from '../../Constants/Fonts';
import SelectLan from '../../Components/Language/SelectLan';
import AuthService from '../../Services/Auth';
import { Picker } from '@react-native-picker/picker';
// import Googlesearch from '../../Components/GoogleSearch/Googlesearch';
import Geocoder from 'react-native-geocoding';
import NavigationService from '../../Services/Navigation';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import ImagePicker from 'react-native-image-crop-picker';
import { ScrollView } from 'react-native-gesture-handler';
import HomeService from '../../Services/HomeService';
import Toast from 'react-native-simple-toast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector } from 'react-redux';
import GoogleMap from '../../Components/GoogleSearch/GoogleMap';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import MultiSelect from 'react-native-multiple-select';

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

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

export default function PublishPersonalTask() {
  const colors = useTheme();
  const [allCategory, setallCategory] = useState([]);
  const [allSubCategory, setallSubCategory] = useState([]);
  // const registerData = route.params.registerData

  const [category, setCategory] = useState('');
  const [service, setservice] = useState('');
  const [provId, setProvId] = useState('');

  const [descripTask, setDescripTask] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [latitude, setlatitude] = useState('');
  const [lag, setLng] = useState('');
  const [shortAdd, setShortAdd] = useState('');
  const [modalVisible, setModalVisible] = useState('');
  const [pmodalVisible, setPModalVisible] = useState(false);

  const [eTime, setEtime] = useState('Time');
  const [userTime, setUserTime] = useState('');
  const [showhide, setShowHide] = useState('');
  const [SelImg, setSelImg] = useState('');
  const [Uploading, setUploading] = useState('');
  const [allImag, setallImag] = useState([]);
  const [refress, setRefress] = useState('');
  const [priceType, setPriceType] = useState('');
  const [providers, setProviders] = useState([]);
  const [days, setDays] = useState('');
  const [selectedItems, setselectedItems] = useState([]);
  const [provName, setProvName] = useState('Select Provider');
  const { selectLanguage } = useSelector(state => state.Language);

  const createTask = () => {

    // if (provId == '') {
    //   Toast.show(selectLanguage == 'en' ? 'Please Select Provider' : 'Seleccione el proveedor', Toast.SHORT, Toast.BOTTOM);
    //   return;
    // }
    let data = {
      taskCategoryID: category,
      taskSubcategoryID: service,
      description: descripTask,
      location: {
        "type": "Point",
        "coordinates": [
          lag,
          latitude

        ]
      },
      taskImage: allImag,
      time: userTime,
      taskAmount: price,
      payType: priceType,
      area: shortAdd,
      day: selectedItems,
      providerID: provId,
    };
    // console.log('PersonalTaskResult>>>>>>>>>>>', JSON.stringify(data));
    HomeService.PublishSingleTask(data).then(res => {
      console.log('Pubbbbbbliiiss', res);
      if (res) {
        Toast.show(selectLanguage == 'en' ? 'Published Successfully' : 'Publicado con éxito', Toast.SHORT, Toast.BOTTOM);
        NavigationService.navigate('Home');
      }
    })
      .catch(err => {
        console.log('rerrr', err)
        Toast.show(selectLanguage == 'en' ? 'Fill up all the fields' : 'Rellena todos los campos', Toast.SHORT, Toast.BOTTOM);
      })
  };

  useEffect(() => {
    getCategory();
    requestLocationPermission();
  }, []);

  const getCategory = () => {
    AuthService.getProvCategory().then(res => {
      // console.log('res=========', res);
      if (res) {
        setallCategory(res.data);
      }
    });
  };
  const getService = cat_id => {
    AuthService.getProvService(cat_id).then(res => {
      if (res) {
        // console.log('services', res.data);
        setallSubCategory(res.data);
      }
    });
  };

  async function sendLocation() {
    Geolocation.getCurrentPosition(info => {
      console.log('info', info);
      setlatitude({
        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
      });

      Geocoder.from({
        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
      }).then(a => {
        console.log('new result', JSON.stringify(a.results));
        let allNewData = a.results
          // .map(item => displayPostcode(item.address_components))
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

  const onSelectedItemsChange = selectedItems => {
    setselectedItems(selectedItems)
    // console.log('selectedItems--------', selectedItems)
  };

  const getServiceWiseProviders = async id => {
    let data = {
      location: {
        "type": "Point",
        "coordinates": [
          lag,
          latitude
        ]
      }
    }
    console.log("Locationnnnnn==>",data)
    AuthService.getServiceWiseProviders(id, data)
      .then(res => {
        console.log('Providerrrrrrrr>>>>>>>>>>>>>>>', JSON.stringify(data));
        if (res.status) {
          setProviders(res.data);
        }
        // setProviders(res.data);
      })
      .catch(err => console.log(err));
  };

  const changeAddress = desc => {
    // setShortAdd(desc)
    addess_Length(desc);
    // console.log('desc-----------------', desc);
    Geocoder.from(desc)
      .then(a => {
        // console.log('desc-----------------', a)
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

  function multipleImages() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      // console.log("immmmmmmmmm>", image.path)
      setSelImg(image);
      setUploading(true);
      // let AllImagess = [];
      AuthService.uploadimage(image).then(result => {
        // console.log('result>>>Image', result);
        if (result) {
          let Responseimg = result.url;
          setSelImg(Responseimg);

          allImag.push(Responseimg);

          // console.log('allImag---------', allImag);
          setUploading(false);
          setRefress(!refress);
        }
      });
    });
  }

  return (
    <Container>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <SettingsHeader headerText={SelectLan('Publish Personal Task')} />

        <ImageBackground
          source={require('../../Assets/images/payment_bg.jpg')}
          style={styles.bg_img}>

          <View style={styles.card}>
            <View style={{ height: moderateScale(20) }} />
            <AppTextInput

              style={{
                color: colors.secondaryThemeColor,
                fontSize: moderateScale(12),
                fontFamily: FONTS.semibold,
                width: '90%',
              }}
              numberOfLines={1}
              editable={false}
              value={shortAdd}
              onChangeText={value => setLocation(value)}
              placeholderTextColor={colors.primaryThemeColor}
              placeholder={SelectLan('Location')}
              inputContainerStyle={{
                ...styles.inputCont,
                backgroundColor: colors.pageBackgroundColor,
                borderColor: colors.primaryThemeColor,
                marginTop: moderateScale(5),
              }}
              rightAction={
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                  <Icon name="map-marker-alt" type="FontAwesome5" size={20} />
                </TouchableOpacity>
              }
            />
            <View
              style={{
                ...styles.PickerCont,
                borderColor: colors.primaryThemeColor,
              }}>
              <Picker
                style={{ color: colors.primaryThemeColor }}
                selectedValue={category}

                onValueChange={itemValue => {
                  getService(itemValue);
                  setCategory(itemValue);
                }}>
                <Picker.Item label={'Category'} />
                {allCategory.map((it, ind) => {
                  return (
                    <Picker.Item
                      key={ind}
                      label={it.categoryName}
                      value={it._id}
                    />
                  );
                })}
              </Picker>
            </View>

            <View
              style={{
                ...styles.PickerCont,
                borderColor: colors.primaryThemeColor,
              }}>
              <Picker
                style={{ color: colors.primaryThemeColor }}
                selectedValue={service}
                onValueChange={itemValue => {
                  getServiceWiseProviders(itemValue);
                  setservice(itemValue);
                }}>
                <Picker.Item label={'Services'} />
                {allSubCategory.map((it, ind) => {
                  return (
                    <Picker.Item
                      key={ind}
                      label={it.subCategoryName}
                      value={it._id}
                    />
                  );
                })}
              </Picker>
            </View>
            {providers ?
              <Pressable
                style={{
                  ...styles.PickerCont,
                  borderColor: colors.primaryThemeColor,
                  height: 55,
                  // alignItems:'baseline'
                  justifyContent: 'center',
                }}
                onPress={() => setPModalVisible(true)}>
                <Text
                  style={{ color: colors.primaryThemeColor, marginHorizontal: 15 }}>
                  {provName}
                </Text>
              </Pressable>
              : null
            }
            <Text
              style={{
                color: colors.primaryThemeColor,
                marginHorizontal: moderateScale(12),
                marginVertical: moderateScale(5),
                fontFamily: FONTS.medium,
                fontSize: moderateScale(14),
              }}>
              {SelectLan('Upload photo')}
            </Text>

            <ScrollView horizontal>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: 10,


                }}>
                {allImag.map((item, index) => {
                  return (
                    <View style={styles.images}>
                      <Image style={styles.ScrollImage}
                        source={{ uri: item }}
                        resizeMode='contain'
                      />
                    </View>
                  );
                })}
              </View>
            </ScrollView>
            <View
              style={{ alignItems: 'flex-end', marginRight: 15 }}>
              <TouchableOpacity
                onPress={() => multipleImages()}
                style={{
                  flexDirection: 'row',
                }}>
                <Icon
                  name="upload"
                  type="Feather"
                  size={20}
                  style={{ color: colors.primaryThemeColor }}
                />
                {/* <Icon
                  name="camera"
                  type="EvilIcons"
                  size={20}
                  style={{
                    color: colors.primaryThemeColor,
                    marginLeft: moderateScale(5),
                  }}
                /> */}
              </TouchableOpacity>
            </View>

            <AppTextInput
              style={{
                color: colors.secondaryThemeColor,
                fontSize: moderateScale(15),

              }}
              value={descripTask}
              onChangeText={value => setDescripTask(value)}
              placeholderTextColor={colors.primaryThemeColor}
              placeholder={SelectLan('Description of the Task')}
              inputContainerStyle={{
                ...styles.inputCont,
                backgroundColor: colors.pageBackgroundColor,
                borderColor: colors.primaryThemeColor,
              }}
            />

            <AppTextInput
              placeholder={SelectLan('Preferred Work Times')}
              keyboardType="number-pad"
              placeholderTextColor={colors.primaryThemeColor}
              value={userTime}
              onChangeText={value => setUserTime(value)}
              style={{
                color: colors.primaryThemeColor,
              }}
              inputContainerStyle={{
                ...styles.inputCont,
                backgroundColor: colors.pageBackgroundColor,
                borderColor: '#4169E1',
              }}
            />

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
                selectText="Select Day"
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
              style={{
                color: colors.secondaryThemeColor,
                fontSize: moderateScale(15),
              }}
              value={price}
              keyboardType="number-pad"
              onChangeText={value => setPrice(value)}
              placeholderTextColor={colors.primaryThemeColor}
              placeholder={SelectLan('Price')}
              inputContainerStyle={{
                ...styles.inputCont,
                backgroundColor: colors.pageBackgroundColor,
                borderColor: colors.primaryThemeColor,
              }}
            />
            <View
              style={{
                ...styles.PickerCont,
                borderColor: colors.primaryThemeColor,
                marginHorizontal: moderateScale(15),
              }}>
              <Picker
                style={{ color: colors.primaryThemeColor }}
                selectedValue={priceType}
                onValueChange={itemValue => setPriceType(itemValue)}>
                <Picker.Item label={'Select Project Type'} />
                <Picker.Item label={'Hourly'} value={'Hourly'} />
                <Picker.Item label={'Fixed Fee'} value={'Fixed Fee'} />
              </Picker>
            </View>

            <AppButton
              onPress={() => createTask()}
              title={SelectLan('Publish')}
              gradient={true}
              gradientColors={['#36afda', '#288cc8', '#1d79bc']}
              gradientStart={{ x: 0, y: 1 }}
              gradientEnd={{ x: 1, y: 1 }}
              style={styles.fistapp}
              textStyle={{
                fontSize: moderateScale(14),
              }}
            />
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
        </ImageBackground>

        <Modal
          animationType="slide"
          transparent={true}
          visible={pmodalVisible}
          statusBarTranslucent={true}
          onRequestClose={() => {
            setPModalVisible(!pmodalVisible);
          }}>
          <Pressable
            style={{ flex: 1, backgroundColor: 'white' }}
          >
            <Pressable
              style={{
                flex: 1,
                backgroundColor: '#000000ab',
              }}
              onPress={() => setPModalVisible(false)}></Pressable>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Pressable
                style={{
                  flex: 2,
                  backgroundColor: 'white',
                }}>
                <Text
                  style={{
                    color: colors.primaryThemeColor,
                    fontFamily: FONTS.bold,
                    textAlign: 'center',
                    fontSize: 16,
                    marginTop: moderateScale(40)
                    // marginVertical: 10,
                  }}>
                  ----- Providers List ------
                </Text>

                {
                  providers.length ? (
                    <View>
                      {
                        providers.map((item, ind) => {
                          return (
                            <Pressable
                              style={{
                                backgroundColor: '#EBEBEB',
                                // height: 60,
                                margin: 10,
                                elevation: 5,
                                borderRadius: 5,
                                // alignItems:'center'
                                justifyContent: 'center'
                              }}

                            >

                              <Pressable
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-between'
                                }}
                                onPress={() => {
                                  setProvId(item.userID)
                                  setProvName(`${item.firstName} ${item.lastName}`)
                                  setPModalVisible(false)
                                }}
                              >
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center'
                                  }}
                                >
                                  <Image
                                    source={{ uri: item.image }}

                                    style={styles.img}
                                  />
                                  <Text style={{ color: 'black', marginTop: 10, fontFamily: FONTS.medium, fontSize: 12 }}>{item.firstName} {item.lastName}</Text></View>
                                <Text style={{ marginHorizontal: 10, marginTop: 10, fontFamily: FONTS.medium, fontSize: 12 }}>Payment: {item.hourlyRate != "" ? 'Hourly Price' : 'Fixed Price'}</Text>
                              </Pressable>
                            </Pressable>
                          );
                        })
                      }
                    </View>



                  ) : (
                    <View
                      style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Icon
                      style={{marginTop: moderateScale(40)
                      }}
                        name="search-off"
                        type="MaterialIcon"
                        size={70}
                      />
                      <Text
                        style={{
                          color: colors.primaryThemeColor,
                          fontFamily: FONTS.semibold,
                          fontSize: moderateScale(12)
                        }}>
                        No provider list
                      </Text>
                    </View>
                  )

                }

              </Pressable>
            </ScrollView>
          </Pressable>
        </Modal>


      </KeyboardAwareScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  root_view: {
    height: StatusBar.currentHeight + 55,
    paddingTop: StatusBar.currentHeight,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imagesView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginHorizontal: 10,
    // borderWidth: 1
  },
  ScrollImage: {
    // resizeMode: 'contain',
    height: moderateScale(65),
    width: moderateScale(70),
    borderRadius: moderateScale(15),
  },
  PickerCont: {
    borderWidth: 0.3,
    borderRadius: moderateScale(0),
    borderRadius: 3,
    marginTop: moderateScale(5),
    marginHorizontal: moderateScale(15),
  },
  bg_img: {
    height: height,
    width: width,
    paddingTop: StatusBar.currentHeight,
  },
  inner_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: moderateScale(10),
    marginBottom: moderateScale(10),
  },
  icon: {
    fontSize: moderateScale(25),
  },

  outer_input_view: {
    height: 30,
    width: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingRight: 10,
    alignItems: 'center',
  },
  card: {
    marginHorizontal: moderateScale(15),
    elevation: 5,
    backgroundColor: 'white',
    shadowOpacity: 10,
    // height: height / 1.2,
    bottom: 10,
  },
  images: {
    // height: moderateScale(70),
    width: moderateScale(70),
    borderRadius: 15,
    backgroundColor: '#f6f6f6',
    justifyContent: 'center',
    alignItems: 'center',
    // resizeMode: 'cover',
    marginLeft: moderateScale(10),
  },
  inputCont: {
    borderWidth: moderateScale(0.3),
    borderRadius: 3,
    // elevation: moderateScale(2),
    // flexDirection: "row",
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(10),
    marginHorizontal: moderateScale(15),
    height: moderateScale(43),
    marginTop: moderateScale(5),
  },
  fistapp: {
    height: moderateScale(40),
    width: moderateScale(150),
    marginTop: moderateScale(30),
    marginBottom: moderateScale(30),
    borderRadius: moderateScale(10),
    elevation: moderateScale(10),
    alignSelf: 'center',
    justifyContent: 'center',
  },
  img: {
    height: moderateScale(45),
    width: moderateScale(45),
    borderRadius: moderateScale(25),
    marginStart: moderateScale(10),
    // alignSelf:'center'
  },
});
