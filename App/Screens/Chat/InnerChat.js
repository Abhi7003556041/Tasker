//import liraries
import {Icon} from 'native-base';
import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  SectionList,
  StatusBar,
  Pressable,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import {useSelector} from 'react-redux';
// import MsgComponent from '../../Components/Chat/MsgComponent';

// import ChatHeader from '../../Components/ChatHeader';
import database from '@react-native-firebase/database';
import uuid from 'react-native-uuid';
import moment from 'moment';
// import { COLORS } from '../../Constant/Colors';

import {COLORS} from './COLORS';
import MsgComponent from './MsgComponent';
import ChatHeader from './ChatHeader';
import {moderateScale, verticalScale} from '../../Constants/PixelRatio';
// import { moderateScale, verticalScale } from '../../PixelRatio';

const InnerChat = props => {
  // console.log('props.route.params', props.route.params);
  const {name, roomId, remoteId, remoteData, image} = props.route.params;

  const userData = useSelector(state => state.User.userData);
  // userData._id = userData._id;
  const [msg, setMsg] = useState('');
  const [allMsg, setAllMsg] = useState([]);
  const [refress, setRefress] = useState(false);
  const [loadMore, setLoadMore] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    // console.log('roomId', roomId);
    getAllMsg();

    database().ref(`/chatlist/${userData._id}/${remoteId}`).update({
      count: 0,
    });
  }, []);

  const getAllMsg = () => {
    database()
      .ref(`/Chat/${roomId}/messages`)
      .limitToLast(10)
      .once('value', snapshot => {
        // console.log("snapshot.exists()", snapshot.exists())
        if (snapshot.exists()) {
          console.log("Object.values(snapshot.val())", Object.values(snapshot.val()))
          setAllMsg(Object.values(snapshot.val()));
          getFirebaseListener(Object.values(snapshot.val()));
        } else {
          getFirebaseListener([]);
          setLoadMore(false);
          setHasMore(false);
        }
      });
  };

  const msgvalid = txt => txt && txt.replace(/\s/g, '').length;
  const sendMessage = () => {
    if (msg == '' || msgvalid(msg) === 0) {
      return false;
    }
    let utcTime = moment().utc().format().split('Z');
    let smsdata = {
      roomId: roomId,
      msgId: uuid.v4(),
      sender_id: userData._id,
      message: msg,
      send_time: `${utcTime[0]}+00:00`,
      name: `${userData.firstName}`,
    };

    const newReference = database().ref(`/Chat/${roomId}/messages/`).push();

    smsdata.nodeId = newReference.key;
    console.log('newReference',smsdata);
    newReference.set(smsdata);

    database().ref(`/chatlist/${userData._id}/${remoteId}`).update({
      lastMsgTime: smsdata.send_time,
      lastMsg: smsdata.message,
    });

    const remoteDbRef = database().ref(`/chatlist/${remoteId}/${userData._id}`);
    // database()
    // .ref(`chatlist/${userData._id}/${remoteId}`)
    // .update({lastMsg:msg,time:`${utcTime[0]}+00:00`});
    remoteDbRef.transaction(result => {
      if (result != null) {
        if (result.count == null) {
          result.count = 1;
        } else {
          result.count += 1;
        }
      } else {
        result = {count: 1};
      }

      return result;
    });

    remoteDbRef.update({
      lastMsgTime: smsdata.send_time,
      lastMsg: smsdata.message,
    });

    setMsg('');
  };

  const sorted = () => {
    let a;
    a = allMsg.sort(function (a, b) {
      return b.send_time < a.send_time ? -1 : b.send_time > a.send_time ? 1 : 0;
    });
    return a;
  };

  const getFirebaseListener = oldVal => {
    database()
      .ref(`/Chat/${roomId}/messages`)
      .limitToLast(1)
      .on('child_added', snapshot => {
        if (snapshot.exists()) {
          let fbData = snapshot.val();
          let msgIndex = oldVal.findIndex(it => it.msgId == fbData.msgId);
          if (msgIndex == -1) {
            setAllMsg(msg => [fbData, ...msg]);
          }
        }
      });
  };

  const listFooter = () => {
    return (
      <View style={{marginVertical: 20}}>
        {loadMore ? (
          <ActivityIndicator size="small" color={COLORS.iaaHeadercolor} />
        ) : null}
      </View>
    );
  };

  const getNextChat = () => {
    // return
    if (hasMore) {
      setLoadMore(true);
      let arrLength = sorted().length;
      let lastKeyRef = sorted()?.[arrLength - 1]?.nodeId ?? '';
      console.log("lastKeyRef", lastKeyRef)
      database()
        .ref(`/Chat/${roomId}/messages`)
        .orderByKey()
        .limitToLast(11)
        .endAt(lastKeyRef)
        .once('value', snapshot => {
          console.log('snapshot', snapshot.exists());
          if (snapshot.exists()) {
            let fbData = Object.values(snapshot.val());
            let finalArr = fbData.filter(it => it.nodeId != lastKeyRef);
            setAllMsg(msg => [...msg, ...finalArr]);
            setLoadMore(false);
            if (finalArr.length == 0) {
              setHasMore(false);
            }
          } else {
            setLoadMore(false);
            setHasMore(false);
          }
        });
    }
  };

  // const { UserPic, name, date} = props.route.params;
  return (
    <View style={styles.container}>
      <ChatHeader name={name} image={image} data={remoteData} provider={remoteId} />
      <StatusBar backgroundColor={'#0099ff'} barStyle="light-content" />
      <ImageBackground
        // source = {require('../../Assets/cahtBackground.jpg')}
        source={require('../../Assets/images/payment_bg.jpg')}

        style={{flex: 1}}
        imageStyle={{opacity: 0.6}}
        >
        <FlatList
          style={{flex: 1}}
          data={sorted()}
          extraData={refress}
          keyExtractor={(item, index) => index}
          inverted
          renderItem={({item}) => {
            return (
              <MsgComponent
                sender={item.sender_id == userData._id}
                massage={item.message}
                time={item.send_time}
                image={image}
                
              />
            );
          }}
          onEndReached={getNextChat}
          onEndReachedThreshold={0.01}
          ListFooterComponent={listFooter}
        />
      </ImageBackground>

      <KeyboardAvoidingView >
        <View
          style={{
            backgroundColor: 'white',
            height: verticalScale(62),
            borderTopColor: COLORS.black,
            flexDirection: 'row',
            alignItems: 'center',
            padding: 5,
          }}>
          <View style={styles.TextView}>
            <TextInput
              style={{
                paddingHorizontal: 10,
                minHeight: moderateScale(40),
              }}
              placeholder="Type a message"
              value={msg}
              onChangeText={val => setMsg(val)}
              multiline={true}
            />
          </View>
          <TouchableOpacity
            onPress={sendMessage}
            style={{
              height: '100%',
              justifyContent: 'center',
              paddingHorizontal: 10,
            }}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/786/786407.png',
              }}
              style={{
                height: verticalScale(18),
                width: moderateScale(18),
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
    // paddingTop: 35
  },
  TextView: {
    backgroundColor: '#F8F8F8',
    flexDirection: 'row',
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
  },
});

//make this component available to the app
export default InnerChat;
