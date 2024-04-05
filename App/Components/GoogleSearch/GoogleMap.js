import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Modal,
  Platform,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import MapView, { Marker, Overlay } from 'react-native-maps';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Geolocation from '@react-native-community/geolocation';
import { useEffect } from 'react';
// import { } from 'react-native-paper';
import Geocoder from 'react-native-geocoding';
import GoogleSearch from './Googlesearch';



import { PermissionsAndroid } from 'react-native';

async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'Location Permission',
        'message': 'This App needs access to your location ' +
          'so we can know where you are.'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use locations ")
    } else {
      console.log("Location permission denied")
    }
  } catch (err) {
    console.warn(err)
  }
}

const GoogleMap = ({
  changeAddress = () => { },
  onClose = () => { },
  changeLongLat = () => { },
}) => {
  const [LoderStatus, setLoderStatus] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [Reigoin, setReigoin] = useState({
    // latitude: 37.78825,
    // longitude: -122.4324,
    // latitudeDelta: 0.0922,
    // longitudeDelta: 0.0421,
  });
  const [Address, setAddress] = useState('');
  async function sendLocation() {
    requestLocationPermission()
    Geolocation.getCurrentPosition(info => {
      setReigoin({
        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    });
  }
  function submitAddress() {
    // latLong(Reigoin)
    changeAddress(Address);
    onClose();
    changeLongLat(Reigoin);
  }
  useEffect(() => {

    sendLocation();
  }, []);
  async function SearchField(address) {
    setLoderStatus(true);
    console.log('address', address);
    fetch(
      `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${address}&inputtype=textquery&fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry&key=AIzaSyC-ki3ImgxYzo8K2OCH9yDthHWIWV1yfj4`,
    )
      .then(response => response.json())
      .then(res => {
        console.log(address, JSON.stringify(res));
        // setAllFilds(res.predictions)
        setLoderStatus(false);
        setReigoin({
          latitude: res.candidates[0].geometry.location.lat,
          longitude: res.candidates[0].geometry.location.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      })
      .catch(e => console.log(e));
  }

  useEffect(() => {
    // fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${Reigoin.latitude},${Reigoin.longitude}&key=AIzaSyC-ki3ImgxYzo8K2OCH9yDthHWIWV1yfj4`)
    // fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=37.78825,-122.4324&key=AIzaSyC-ki3ImgxYzo8K2OCH9yDthHWIWV1yfj4`)
    setAddress('');

    Geocoder.from({
      latitude: Reigoin.latitude,
      longitude: Reigoin.longitude,
    })
      .then(a => {
        console.log('aaa', JSON.stringify(a));
        console.log('aaa', a.results[0].formatted_address);
        setAddress(a.results[0].formatted_address);
        // fetch(`${a.url}`).then(res => console.log('address', res))
      })
      // .then((response) => response.json())
      // .then((data) => console.log('ddd', data))
      .catch(e => console.log(e));
  }, [Reigoin]);
  return (
    <>
      {Reigoin.latitude && Reigoin?.longitude ? (
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
          }}>
          <Pressable
            style={{
              width: '90%',
              height: 50,
              backgroundColor: '#fff',
              alignSelf: 'center',
              position: 'absolute',
              zIndex: 139,

              elevation: 4,
              paddingHorizontal: 15,
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: 50,
              marginTop: Platform.OS == 'ios' ? 40 : 50,
            }}>
            <Pressable
              onPress={() => onClose()}
              style={{
                height: 50,
                width: 40,
                // alignItems: 'center',
                justifyContent: 'center',
              }}>
              <AntDesign name="arrowleft" size={24} color="#333" />
            </Pressable>
            <Pressable
              onPress={() => {
                setModalVisible(true);
              }}
              style={{
                flex: 1,
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  color: '#999',
                  fontSize: 17,
                  fontWeight: '500',
                  flex: 1,
                }}>
                Search a place
              </Text>
              <AntDesign name="search1" size={24} color="#333" />
            </Pressable>
          </Pressable>

          <View
            style={{
              flex: 1,
            }}>
            <View
              style={{
                position: 'absolute',
                width: 40,
                height: 40,
                // backgroundColor: "#fff",
                zIndex: 28998,
                top: '50%',
                left: '50%',
                transform: [{ translateX: -20 }, { translateY: -20 }],
              }}>
              <Image
                resizeMode="contain"
                style={{
                  width: 40,
                  height: 40,
                }}
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/512/149/149059.png',
                }}
              />
            </View>
            {Reigoin.latitude && Reigoin?.longitude ? (
              <MapView
                onPress={e => console.log(e)}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                }}
                provider={MapView.PROVIDER_GOOGLE}
                initialRegion={Reigoin}
                region={Reigoin}
                onRegionChangeComplete={e => {
                  // console.log(e)
                  setReigoin(e);
                }}>
                {/* <Marker

                        key={2}
                        coordinate={Reigoin}
                        style={{
                            width: 40,
                            height: 40
                        }}
                   
                    >
                        <Image resizeMode='contain' style={{
                            width: 40,
                            height: 40,

                        }} source={{ uri: "https://cdn-icons-png.flaticon.com/512/149/149059.png" }} />
                    </Marker> */}
              </MapView>
            ) : (
              <ActivityIndicator />
            )}
          </View>
          <View
            style={{
              width: '100%',
              backgroundColor: '#fff',
              paddingVertical: 20,
            }}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <EvilIcons
                name="location"
                color={'#00a3e0'}
                style={{
                  marginHorizontal: 10,
                }}
                size={36}
              />
              {Address == '' ? (
                <View
                  style={{
                    flex: 1,
                  }}>
                  <ActivityIndicator
                    style={{ alignSelf: 'center' }}
                    color={'#00a3e0'}
                  />
                </View>
              ) : (
                <Text
                  style={{
                    color: '#00a3e0',
                    fontSize: 17,
                    flex: 1,
                    paddingHorizontal: 10
                  }}>
                  {Address}
                </Text>
              )}
            </View>
            <Pressable
              onPress={() => (LoderStatus ? null : submitAddress())}
              style={{
                width: '90%',
                height: 40,
                backgroundColor: '#00a3e0',
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 10,
                borderRadius: 10,
              }}>
              {LoderStatus ? (
                <ActivityIndicator color={'#fff'} />
              ) : (
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 17,
                    textAlign: 'center',
                  }}>
                  Submit
                </Text>
              )}
            </Pressable>
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            statusBarTranslucent={true}
            onRequestClose={() => {
              console.log('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <>
              <GoogleSearch
                SearchField={a => SearchField(a)}
                onClose={() => setModalVisible(false)}
              />
            </>
          </Modal>
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator color="#000" size={'large'} />
        </View>
      )}
    </>
  );
};

export default GoogleMap;

const styles = StyleSheet.create({});
