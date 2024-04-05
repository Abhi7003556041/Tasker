import {
     Image,
     ScrollView,
     StyleSheet,
     Text,
     View,
     Pressable,
     ImageBackground,
     Dimensions,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import HomeHeader from '../../Components/Header/HomeHeader';
import {
     Card,
     Container,
     Icon,
     StatusBar,
     useTheme,
} from 'react-native-basic-elements';
import { moderateScale } from '../../Constants/PixelRatio';
import { FlatList } from 'react-native-gesture-handler';
import HomeService from '../../Services/HomeService';
import PersonalRequestList from '../../Components/PersonalRes/PersonalRequestList';
import SettingsHeader from '../../Components/Header/SettingsHeader';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const PersonalReq = props => {
     // console.log('props..',props.route.params.providerHome)
     const colors = useTheme();
     const [providerTask, setproviderTask] = useState([]);

     const [allCategory, setallCategory] = useState([]);

     useEffect(() => {
          getPersonal();
     }, []);

     const getPersonal = () => {
          HomeService.getPersonalList().then(res => {
               console.log("Personal>>>>>", JSON.stringify(res.data));
               if (res) {
                    setproviderTask(res.data);
               }

          })
               .catch((err) => console.log('error', err))
     };

     return (
          <Container>
               <SettingsHeader headerText={'Personal Request'} />
               <ImageBackground
                    source={require('../../Assets/images/payment_bg.jpg')}
                    style={styles.bg_img}>
                    <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>

                         <FlatList
                              showsVerticalScrollIndicator={false}
                              data={providerTask}
                              renderItem={({ item, index }) => {
                                   return <PersonalRequestList item={item} index={index} />;
                              }}
                         />
                    </ScrollView>
                    <View style={{ height: 65 }} />
               </ImageBackground>
          </Container>
     );
};

export default PersonalReq;

const styles = StyleSheet.create({
     card: {
          elevation: moderateScale(10),
          backgroundColor: 'white',
          // marginVertical: moderateScale(20),
     },
     bg_img: {
          height: height,
          width: width,
          paddingTop: StatusBar.currentHeight,
     },
});
