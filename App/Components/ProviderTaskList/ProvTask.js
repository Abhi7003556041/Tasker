import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Alert,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import React, { useState, useEffect } from 'react';
import {
  AppTextInput,
  Card,
  Container,
  Icon,
  useTheme,
} from 'react-native-basic-elements';
import { moderateScale, verticalScale } from '../../Constants/PixelRatio';
import LinearGradient from 'react-native-linear-gradient';
import NavigationService from '../../Services/Navigation';
import SettingsHeader from '../../Components/Header/SettingsHeader';
import StarRating from 'react-native-star-rating';
import ImagesList from '../../Components/TaskerImage/ImagesList';
import { FONTS } from '../../Constants/Fonts';
import SelectLan from '../../Components/Language/SelectLan';
import HomeService from '../../Services/HomeService';
import database from '@react-native-firebase/database';
import { Picker } from '@react-native-picker/picker';
import ImagePicker from 'react-native-image-crop-picker';
import SimpleToast from 'react-native-simple-toast'
import { useSelector } from 'react-redux';
import AuthService from '../../Services/Auth';
import Video from 'react-native-video';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const ProvTask = ({ item, func }) => {

  const [rating, setstarCount] = useState();
  const colors = useTheme();
  const { userData } = useSelector(state => state.User);
  const [all, setAll] = useState();
  const [priceType, setPriceType] = useState('');
  const [resn, setResn] = useState('');
  const [allRes, setAllRes] = useState([])
  const [amount, setAmount] = useState();
  const [allImag, setallImag] = useState([]);
  const [Uploading, setUploading] = useState('');
  const [refress, setRefress] = useState('');
  const [SelImg, setSelImg] = useState('');
  const [SelVdo, setSelVdo] = useState('');
  const [Notification, setNotification] = ('');

  const [reason, setReason] = useState([
    {
      reason: '',
      price: '',
      id: 1
    }
  ])
  const addMore = () => {
    setReason(s => [...s, {
      reason: '',
      price: '',
      id: new Date().getTime()
    }])
  }
  const removeReason = () => {

    reason.length = reason.length - 1
    setReason([...reason])
  }
  function multipleImages() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {

      setSelImg(image);
      setUploading(true);
      let AllImagess = [];
      AuthService.uploadimage(image).then(result => {
        // console.log('result---------', result);
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

  const videoHandler = () => {
    ImagePicker.openPicker({
      title: 'Select video',
      mediaType: 'video',
      path: 'video',
      quality: 1,
      width: 300,
      height: 400,
    }).then((video) => {
      console.log('asdasas', video);

      setUploading(true);
      // setFile("https://backbizod.s3.us-east-1.amazonaws.com/User/post/63a97ad81eedd8230c2a10f0/ddd2a150-85ca-11ed-8e97-ddf8dabd4e82.jpg")
      AuthService.uploadimage(video)
        .then((result) => {
          console.log('uplodsfj', result.url)
          if (result) {
            let Responsevdo = result.url
            setSelVdo(Responsevdo);
            allImag.push(Responsevdo);
            setUploading(false)
          }

        })
        .catch((err) => console.log('errrr', err))
    });
  }

  const totalprice = reason.reduce(
    (accumulator, currentValue) =>
      accumulator + Number(currentValue.price),
    0,
  );

  const onStarRatingPress = async rating => {
    setstarCount(rating);
  };

  useEffect(() => {
    getData();
    setstarCount(item.requesterData.avgRating)


  }, []);


  const getData = async () => {
    database()
      .ref(`chatlist/${userData._id}/${item.requesterID}`)
      .once('value')
      .then(snapshot => {
        console.log('first', item.providerID, snapshot.val());
        if (snapshot.exists()) {
          console.log('Object.values(snapshot.val())', snapshot.val());
          setAll(snapshot.val());
        } else {
          console.log('Not foind');
        }
      });
  };

  const alertfunc = async (Id) => {
    Alert.alert('Alert Title', `Do you want to ${priceType}?`, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'NO',
      },
      { text: 'YES', onPress: () => statusButton(Id) },
    ]);
  };
  const statusButton = async (id) => {
    let data = {
      taskStatus: priceType
    }
    // console.log('pricetype', data, id)
    // taskComplete(id, data)
    HomeService.statusShow(id, data)
      .then(res => {
        console.log('IDDDDDDDDDD>>>>>', res)
        SimpleToast.show(`${priceType}`, SimpleToast.SHORT)
        func(id, priceType);
        setPriceType('')
      })
      .catch((err) => console.log(err))
    // func()
  };
  async function taskComplete(id, data) {
    let token = await AuthService.getToken()
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("userType", "User");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(data);

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    console.log('api call');
    fetch("http://35.154.235.57:3070/api/v1/user/change-task-status/" + id, requestOptions)
      .then(response => response.json())
      .then(result => console.log('find res', result))
      .catch(error => console.log('error', error));
  }
  const reqPayment = async () => {
    let data = {
      taskStatus: 'Request Payment',
      taskAmount: totalprice,
      reason: reason,
      providerCompleteImage: allImag
    }
    console.log('daata>>>>>', data)

    HomeService.paymentReq(item._id, data)
      .then(res => {
        // console.log('IDDDDDDDDDD>>>>>', res)
        func();
        SimpleToast.show('Requested for payment', SimpleToast.SHORT)
        setReason([])
        setallImag([])
      })
      .catch((err) => console.log(err))
  }

  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
      <View>
        <View style={{ height: moderateScale(20) }} />
        <ScrollView>


          <Card
            style={{
              ...styles.Card,
              backgroundColor: item.taskStatus == 'Paid' ? '#c6c9cc' : colors.primaryFontColor
            }}>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Pressable
                  onPress={() =>
                    NavigationService.navigate('WorkerProfile', { Id: item.requesterID })
                  }
                >
                  <Image
                    source={item.requesterData.image ? { uri: item.requesterData.image } : require('../../Assets/images/useravatar.png')}
                    style={styles.profile_img}
                  />
                </Pressable>
                <View
                  style={{
                    marginLeft: moderateScale(10),
                  }}>
                  <Text
                    numberOfLines={1}
                    style={{
                      fontFamily: FONTS.medium,
                      fontSize: moderateScale(14),
                      color: colors.pageBackgroundColor,
                      maxWidth: 110,
                      marginBottom: 5,
                      marginBottom: 5
                    }}>
                    {item.requesterData.firstName} {item.requesterData.lastName}
                  </Text>

                  <StarRating
                    disabled={false}
                    maxStars={5}
                    rating={rating}
                    starSize={10}
                    fullStarColor="#e78200"
                    emptyStarColor="#4267b2"
                    containerStyle={
                      {
                        width: moderateScale(55)
                      }
                    }
                  />
                </View>
              </View>
              <Pressable
                style={{
                  ...styles.send_btn,
                  height: moderateScale(35),
                  width: moderateScale(80),
                }}
                disabled={item.taskStatus == 'Request Payment' ? true : false}
              // onPress={() => alertfunc(item._id)}
              >
                {/* {
              console.log('item.taskStatus===', item.taskStatus)
            } */}
                <LinearGradient
                  colors={['#FEFDFC', '#C7C8C5']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.msg_gradient}>
                  <Text
                    style={{
                      fontFamily: FONTS.medium,
                      fontSize: moderateScale(12),
                      color: colors.primaryThemeColor,
                    }}>
                    {item.taskStatus == 'assigned'
                      ? 'Start'
                      : item.taskStatus == 'Start'
                        ? 'Started'
                        : item.taskStatus == 'Complete'
                          ? 'Completed'
                          : item?.taskStatus == 'Dispute'
                            ? 'Disputed'
                            : item?.taskStatus == 'Paid'
                              ? 'Payment Successful'
                              : 'Request Payment'}
                    {/* {item.taskStatus} */}
                  </Text>
                </LinearGradient>
              </Pressable>

            </View>
            {item.taskStatus == 'Paid' ?

              <View
                style={{
                  marginTop: moderateScale(20),
                  // marginHorizontal: moderateScale(5),
                  flexDirection: 'row',
                  justifyContent: 'space-between'

                }}>
                <Text
                  numberOfLines={2}
                  style={{
                    ...styles.jobtext,
                    color: colors.pageBackgroundColor,
                    fontFamily: FONTS.medium,
                    maxWidth: '60%'
                  }}>
                  {item.area}
                </Text>

                <Pressable
                  onPress={() => {
                    NavigationService.navigate('ReviewReq', { profileId: item._id, requesterID: item.requesterID, profileDataName: item })
                  }}
                >
                  <LinearGradient
                    style={styles.getButton}
                    colors={['#fff', '#94b8b8']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >

                    <Text
                      style={{
                        color: colors.textgrey,
                        fontFamily: FONTS.bold,
                        fontSize: moderateScale(9)
                      }}>Review</Text>

                  </LinearGradient>
                </Pressable>
              </View>
              : null
            }
            {item?.taskStatus == 'assigned' || item?.taskStatus == 'Start' || item?.taskStatus == 'Paid' ? null :
              <View
              >
                <Text style={{
                  color: colors.pageBackgroundColor,
                  fontFamily: FONTS.bold,
                  fontSize: moderateScale(14),
                  marginTop: moderateScale(10),
                }}>
                  Image and video Upload
                </Text>
                <ScrollView horizontal>
                  <View
                    style={styles.imageMapView}>
                    {
                      allImag.length == 0 ?

                        <View style={{
                          ...styles.ScrollImage,
                          backgroundColor: '#fff',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <Text>Upload</Text>
                        </View>
                        :
                        <>
                          {allImag.map((item, index) => {
                            return (

                              <View>
                                {item.toString().endsWith("mp4") ?
                                  <View style={styles.images}>

                                    <Video
                                      source={{ uri: item }}

                                      paused={false}
                                      // controls={true}           
                                      style={
                                        styles.ScrollImage

                                      }
                                      resizeMode='cover'
                                    />
                                  </View>
                                  :
                                  <View style={styles.images}>
                                    <Image style={styles.ScrollImage}
                                      source={{ uri: item }} />
                                  </View>
                                }
                              </View>
                            );
                          })}
                        </>
                    }

                  </View>

                </ScrollView>
                <View style={{ justifyContent: 'flex-end', marginRight: 8, flexDirection: 'row' }}>
                  <TouchableOpacity
                    onPress={() => multipleImages()}
                    style={{
                      flexDirection: 'row',
                    }}>

                    <Icon
                      name="image"
                      type="Entypo"
                      size={20}
                      style={{ color: colors.pageBackgroundColor }}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => videoHandler()}
                    style={{
                      flexDirection: 'row',
                      marginLeft: 10
                    }}>

                    <Icon
                      name="video"
                      type="Entypo"
                      size={20}
                      style={{ color: colors.pageBackgroundColor }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            }
            <Text
              style={{
                ...styles.desCrip,
                color: colors.pageBackgroundColor,
              }}>
              {SelectLan('Description')}
            </Text>

            <Card
              style={{
                backgroundColor: '#F4F6F6',
                marginTop: moderateScale(10),
              }}>
              <Text
                style={{
                  fontFamily: FONTS.medium,
                  fontSize: moderateScale(12),
                  color: colors.primaryThemeColor,
                }}>
                {item.description}
              </Text>
            </Card>
            <View>
              <Text
                style={{
                  color: colors.pageBackgroundColor,
                  fontFamily: FONTS.medium,
                  fontSize: moderateScale(12),
                  marginTop: 10,
                  // marginBottom
                }}>
                Task Image(s)
              </Text>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={item.taskImage}
                contentContainerStyle={{
                  flexDirection: 'row',
                }}
                renderItem={({ item, index }) => {
                  return <ImagesList item={item} index={index} />;
                }}
              />
            </View>
            {console.log('resson', reason)}

            {item.taskStatus == 'assigned' || item.taskStatus == 'Start' ?
              <>
                <View
                  style={{
                    ...styles.price_view,
                    backgroundColor: colors.secondaryThemeColor,
                  }}>
                  <Text
                    style={{
                      ...styles.price_txt,
                      color: colors.pageBackgroundColor,
                      fontFamily: FONTS.medium,
                      fontSize: moderateScale(12),
                    }}>
                    TOTAL:
                  </Text>
                  <Text
                    style={{
                      ...styles.price_txt,
                      color: colors.pageBackgroundColor,
                      fontFamily: FONTS.medium,
                      fontSize: moderateScale(12),
                    }}>
                    $ {item.taskAmount}
                  </Text>
                </View>
                {/* {console.log('resson', reason)} */}

                <Text
                  style={{
                    ...styles.price_txt,
                    color: colors.pageBackgroundColor,
                    fontFamily: FONTS.medium,
                    fontSize: moderateScale(12),
                    // marginVertical:10
                  }}>
                  Work Status :
                </Text>
                <View
                  style={{ flexDirection: 'row', justifyContent: 'space-between' }}
                >
                  <View
                    style={{
                      ...styles.PickerCont,
                      borderColor: colors.primaryThemeColor,
                      marginLeft: moderateScale(5),
                    }}>
                    <Picker
                      style={{ color: colors.secondaryThemeColor, marginVertical: 0 }}
                      selectedValue={priceType}
                      mode='dropdown'
                      onValueChange={itemValue => {
                        if (itemValue == 'Start' && item.taskStatus == 'assigned') {
                          setPriceType(itemValue)
                        }
                        else if (itemValue == 'Complete' && item.taskStatus == 'Start') {
                          setPriceType(itemValue)
                        }
                        // else if (itemValue == 'Request Payment' && item.taskStatus == 'Complete') {
                        //   setPriceType(itemValue)
                        // }
                        else {
                          SimpleToast.show('Please Choose Valid Option', SimpleToast.SHORT)
                        }
                      }}
                    // onValueChange={itemValue => setPriceType(itemValue)}
                    >
                      <Picker.Item label={'Select Here'} />
                      <Picker.Item label={'Start'} value={'Start'} />
                      <Picker.Item label={'Complete'} value={'Complete'} />
                      {/* <Picker.Item label={'Request Payment'} value={'Request Payment'} /> */}

                    </Picker>
                  </View>
                  <Pressable
                    onPress={() => {
                      if (priceType != '') {
                        alertfunc(item._id)
                      }
                      // // else{
                      // Toast.show('Please Choose Work Status')
                      // }
                      // statusButton()
                    }}
                    style={{
                      height: moderateScale(50),
                      width: '35%',
                      paddingHorizontal: 10,
                      // alignSelf: 'center',
                      marginTop: 10
                      //    backgroundColor: 'red'
                    }}>
                    <LinearGradient
                      colors={['#FEFDFC', '#C7C8C5']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={{
                        ...styles.msg_gradient,
                        height: '75%',
                      }}>
                      <Text
                        style={{
                          fontFamily: FONTS.medium,
                          color: colors.primaryThemeColor,
                          fontSize: moderateScale(12),
                        }}>
                        Submit
                      </Text>
                      {/* <Icon name="send-o" type="FontAwesome" style={styles.send_icon} /> */}
                    </LinearGradient>
                  </Pressable>
                </View>
              </>
              :
              item.taskStatus == 'Paid' ? null :
                <>
                  <Text
                    style={{
                      ...styles.price_txt,
                      color: colors.pageBackgroundColor,
                      fontFamily: FONTS.medium,
                      fontSize: moderateScale(12),
                      // marginVertical:10
                    }}>
                    Final Charges :
                  </Text>
                
                  <View>
                  {reason.map((res) => {
                    return (
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          // marginBottom:reason.length>1 ? 0 : 15
                        }}
                      >
                        <AppTextInput
                          // numberOfLines={6}
                          textAlignVertical="top"
                          multiline={true}
                          placeholderTextColor={'#26baed'}
                          placeholder="Reason"
                          // keyboardType='number-pad'
                          value={res.reason}
                          onChangeText={value => {
                            // setResn(value)
                            setReason(s => s.map(it => it.id == res.id ? { ...it, reason: value } : it))
                          }}
                          // secureTextEntry={true}

                          style={{
                            color: colors.primaryThemeColor,
                          }}
                          inputContainerStyle={{
                            ...styles.inputCont,
                          }}
                        />
                        <AppTextInput
                          // numberOfLines={6}
                          textAlignVertical="top"
                          multiline={true}
                          placeholderTextColor={'#26baed'}
                          placeholder="Price"
                          keyboardType='number-pad'
                          value={res.price}
                          onChangeText={value => {
                            // setAmount(value)
                            setReason(s => s.map(it => it.id == res.id ? { ...it, price: value } : it))
                          }}
                          // secureTextEntry={true}

                          style={{
                            color: colors.primaryThemeColor,
                          }}
                          inputContainerStyle={{
                            ...styles.inputCont,
                          }}
                        />
                      </View>
                    )
                  })}
                  </View>
                
              
                 
                  <Pressable
                    style={{
                      position: 'absolute',
                      right: moderateScale(10),
                      bottom: moderateScale(135),
                      height: 15,
                      width: 15,
                      backgroundColor: '#fff',
                      borderRadius: 15,
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    onPress={() => {
                      addMore()
                      // allRes.push(resn)
                    }}
                  >
                    <Icon name="plus"
                      type="AntDesign"
                      color={'#000'}
                      size={14}
                    />
                  </Pressable>
                  {reason.length > 1 ?
                    <Pressable
                      onPress={() => {
                        removeReason()
                        allRes.pop(resn)
                      }}
                      style={{
                        height: moderateScale(15),
                        width: moderateScale(15),
                        backgroundColor: colors.pageBackgroundColor,
                        borderRadius: moderateScale(15),
                        position: 'absolute',
                        left: moderateScale(10),
                        bottom: moderateScale(135)
                      }}>
                      <Icon name="minus"
                        type="AntDesign"
                        color={'#000'}
                        size={14}
                      />
                    </Pressable>
                    : null
                  }

                  <View
                    style={{
                      ...styles.price_view,
                      backgroundColor: colors.secondaryThemeColor,
                      marginTop: moderateScale(20),

                    }}>
                    <Text
                      style={{
                        ...styles.price_txt,
                        color: colors.pageBackgroundColor,
                        fontFamily: FONTS.medium,
                        fontSize: moderateScale(12),
                      }}>
                      TOTAL:
                    </Text>
                    <Text
                      style={{
                        ...styles.price_txt,
                        color: colors.pageBackgroundColor,
                        fontFamily: FONTS.medium,
                        fontSize: moderateScale(12),
                      }}>
                      $ {totalprice}
                    </Text>
                  </View>
                  <Pressable
                    onPress={() => reqPayment()}
                    style={{
                      // height: moderateScale(50),
                      width: '40%',
                      paddingHorizontal: 10,
                      alignSelf: 'center'
                    }}>

                    <LinearGradient
                      colors={['#FEFDFC', '#C7C8C5']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={{
                        ...styles.msg_gradient,
                        // height: '60%',
                        height: moderateScale(30),
                      }}>
                      <Text
                        style={{
                          fontFamily: FONTS.medium,
                          color: colors.primaryThemeColor,
                          fontSize: moderateScale(12),
                        }}>
                        Submit
                      </Text>
                    </LinearGradient>

                  </Pressable>
                </>

            }


            {item.taskStatus != 'Paid' ?

              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 15,
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Pressable
                  onPress={() =>
                    NavigationService.navigate('InnerChat', {
                      roomId: all?.roomId,
                      name: `${all?.name}`,
                      image: all?.image,
                      remoteId: all?.userId,
                      remoteData: all,
                    })
                  }
                  style={{
                    // height: moderateScale(50),
                    width: '50%',
                    paddingHorizontal: 10,
                    // alignSelf:'center'

                  }}>

                  <LinearGradient
                    colors={['#FEFDFC', '#C7C8C5']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{
                      ...styles.msg_gradient,
                      // height: '60%',
                      height: moderateScale(30),
                    }}>
                    <Text
                      style={{
                        fontFamily: FONTS.semibold,
                        color: colors.primaryThemeColor,
                        fontSize: moderateScale(12),
                      }}>
                      Send message
                    </Text>
                    <Icon name="send-o" type="FontAwesome" style={styles.send_icon} />
                  </LinearGradient>

                </Pressable>
                {/* <Pressable
            style={{
              width: '50%',
              paddingHorizontal: 10,
            }}
          >
            <LinearGradient
              colors={['#FEFDFC', '#C7C8C5']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                ...styles.msg_gradient,
                height: 25,
              }}>
              <Text
                style={{
                  fontFamily: FONTS.semibold,
                  color: colors.primaryThemeColor,
                  fontSize: moderateScale(12),
                }}>
                Upload
              </Text>
              <Icon name="folder-images"
                type="Entypo"
                size={25}
                style={styles.send_icon}
              />
              <Icon name="video"
                type="Entypo"
                style={styles.send_icon}
              />
            </LinearGradient>
          </Pressable> */}
              </View>
              : null
            }


          </Card>
          {/* <View style={{ height: height/4 }} /> */}
        </ScrollView>
      </View>
    </KeyboardAwareScrollView>

  );
};

export default ProvTask;

const styles = StyleSheet.create({

  ratings_view: {
    flexDirection: 'row',
    marginTop: verticalScale(10),
    alignItems: 'center',
  },
  getButton: {
    borderRadius: moderateScale(4),
    paddingHorizontal: moderateScale(20),
    alignItems: 'center',
    justifyContent: 'center',
    height: moderateScale(30),
    width: moderateScale(75),
    elevation: 2,
  },
  desCrip: {
    fontFamily: FONTS.medium,
    fontSize: moderateScale(14),

    marginHorizontal: moderateScale(0),
    marginTop: moderateScale(10),
  },
  // publication_view: {
  //     // alignSelf: 'center',
  //     // alignItems: 'center',
  //     marginStart: moderateScale(20),
  //     // backgroundColor: 'red',
  //     marginTop: verticalScale(20),
  // },
  publication_bg: {
    width: '96%',
    height: moderateScale(120),
  },
  publication_btn: {
    backgroundColor: '#EDE9E6',
    width: '40%',
    alignItems: 'center',
    height: verticalScale(29),
    justifyContent: 'center',
    borderRadius: moderateScale(5),
    marginTop: verticalScale(60),
    marginStart: moderateScale(90),
  },
  gradient: {
    justifyContent: 'center',
    borderRadius: moderateScale(5),
    width: '100%',
    alignItems: 'center',
    height: '100%',
    elevation: 5,
  },
  publication_txt: {
    fontWeight: 'bold',
  },

  price_view: {
    flexDirection: 'row',
    backgroundColor: '#1C73B6',
    marginVertical: verticalScale(10),
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(15),
    marginTop: moderateScale(30),
  },
  send_icon: {
    fontSize: moderateScale(12),

  },
  msg_gradient: {
    justifyContent: 'center',
    borderRadius: moderateScale(5),
    width: '100%',
    alignItems: 'center',
    height: '100%',
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    // alignItems: 'center',
  },
  send_btn: {
    width: '45%',
    height: verticalScale(25),
    elevation: 5,
    borderRadius: moderateScale(3),
    marginBottom: verticalScale(15),
  },
  price_txt: {
    paddingVertical: verticalScale(5),
    fontSize: moderateScale(11),
  },
  Card: {
    marginHorizontal: moderateScale(20),
    marginBottom: moderateScale(30)
  },
  profile_img: {
    height: moderateScale(50),
    width: moderateScale(50),
    borderRadius: moderateScale(25),
  },
  star_icon_view: {
    flexDirection: 'row',
  },
  star_icon: {
    fontSize: moderateScale(10),
  },
  top_view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: moderateScale(20),
    marginTop: moderateScale(20),
  },

  btn: {
    borderRadius: moderateScale(15),
    height: verticalScale(40),
    width: moderateScale(150),
  },
  status_gradient: {
    justifyContent: 'center',
    borderRadius: moderateScale(3),
    alignItems: 'center',
    elevation: 5,
  },
  status_txt: {
    fontSize: moderateScale(11),
    marginHorizontal: moderateScale(5),
  },
  jobtext: {
    fontSize: moderateScale(14),
  },
  // inputCont: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   paddingHorizontal: moderateScale(10),
  //   marginHorizontal: moderateScale(15),
  //   marginTop: moderateScale(10),
  //   borderRadius: 3,
  //   borderWidth: 0,
  // },
  imageUpload: {
    height: moderateScale(45),
    width: moderateScale(50),
    borderRadius: moderateScale(10),
    marginTop: moderateScale(20),
    marginHorizontal: moderateScale(15),
  },
  PickerCont: {
    borderWidth: 0.3,
    borderRadius: moderateScale(0),
    borderRadius: 3,
    marginTop: moderateScale(5),
    marginHorizontal: moderateScale(0),
    width: '65%',
    backgroundColor: 'white',
    marginBottom: 15
  },
  inputCont: {
    borderWidth: 0,
    width: moderateScale(140),
    borderRadius: moderateScale(5),
    elevation: 1,
    backgroundColor: '#F8F9F9',
    marginVertical: moderateScale(10),
    paddingLeft: moderateScale(10),
    alignItems: 'center',
    height: 40
  },
  imageMapView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginHorizontal: 10,

    // height: moderateScale(50),
    // width: moderateScale(50),
    // backgroundColor: 'red'
  },
  ScrollImage: {
    resizeMode: 'cover',
    height: moderateScale(70),
    width: moderateScale(70),
    borderRadius: 15,
  },
  images: {
    height: moderateScale(70),
    width: moderateScale(70),
    borderRadius: 15,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    // resizeMode: 'cover',
    marginLeft: moderateScale(10),
  },
});