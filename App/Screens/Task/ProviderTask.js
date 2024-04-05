//import liraries
import React, {Component, useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, ImageBackground, Dimensions, ActivityIndicator} from 'react-native';
import ProvTask from '../../Components/ProviderTaskList/ProvTask';
import HomeService from '../../Services/HomeService';
import {ScrollView} from 'react-native-gesture-handler';
import SettingsHeader from '../../Components/Header/SettingsHeader';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import ProviderTask from '../../Components/ProviderTaskList/ProvTask';

// create a component
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const ProviderTask = () => {
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    getTask();
  }, []);

  const getTask = () => {
    HomeService.getTaskList()
      .then(res => {
        // console.log('GetList>>>>>>>>>>>', res);
        if (res.status) {
          setTaskList(res.data);
        }
      })
      .catch(err => console.log('error', err));
  };
  function changeType(id,type) {
    setTaskList(s=> s.map(it=>{
      if (it._id == id) {
        return {...it , taskStatus :type}
      }else{
        return it
      }
    }))
  }

  return (
    <View>
      <ImageBackground
        source={require('../../Assets/images/payment_bg.jpg')}
        style={{
          ...styles.bg_img,
        }}>
          
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}
          contentContainerStyle={{marginBottom: 150, paddingBottom: 90}}
          >
          <SettingsHeader headerText={'Tasks'} />
          {taskList.length ?
          taskList.map((item, ind) => {
            return <ProvTask item={item} index={ind} func={(id,priceType) => changeType(id,priceType)} />;
          })
          :
          <View style={{marginTop:250}}>
          <ActivityIndicator size={25}/>
          </View>
        }
        </KeyboardAwareScrollView>
      </ImageBackground>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  bg_img: {
    height: height,
    width: width,
    // paddingTop: StatusBar.currentHeight,
  },
});

//make this component available to the app
export default ProviderTask;
