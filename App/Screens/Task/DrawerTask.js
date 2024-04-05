import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import SettingsHeader from '../../Components/Header/SettingsHeader';
import {
  Card,
  Container,
  Icon,
  useTheme,
  Text,
  AppTextInput,
} from 'react-native-basic-elements';
import LinearGradient from 'react-native-linear-gradient';
import {moderateScale, verticalScale} from '../../Constants/PixelRatio';
import ImagesList from '../../Components/TaskerImage/ImagesList';
import StarRating from 'react-native-star-rating';
import NavigationService from '../../Services/Navigation';
import HomeService from '../../Services/HomeService';
import {useSelector} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
import database from '@react-native-firebase/database';
import DrawerTaskComp from './DrawerTaskComp';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const DrawerTask = () => {
  const [rating, setstarCount] = useState();
  const colors = useTheme();
  const [acceptedTask, setAcceptedTask] = useState([]);
  const [all, setAll] = useState([]);

  const {userData} = useSelector(state => state.User);

  const onStarRatingPress = async rating => {
    setstarCount(rating);
  };
  useEffect(() => {
    getAccepted();
  }, []);

  const getAccepted = async () => {
    HomeService.getAcceptedList().then(res => {
      console.log('acceptedTask', JSON.stringify(res.data));

      setAcceptedTask(res?.data);
    });
  };
 
  return (
    <Container>
      <ImageBackground
        source={require('../../Assets/images/payment_bg.jpg')}
        style={styles.bg_img}>
        <SettingsHeader headerText="Tasks" />
        {
          acceptedTask.length ?
          <ScrollView contentContainerStyle={{paddingBottom: 60}}>
          {acceptedTask.map((item, ind) => {
            return <DrawerTaskComp item={item} func={()=>getAccepted()} />;
          })}
        </ScrollView>
        :
        <View style={{marginTop:250}}>
          <ActivityIndicator size={25}/>
          </View>
        }
        
      </ImageBackground>
    </Container>
  );
};

export default DrawerTask;

const styles = StyleSheet.create({
  bg_img: {
    width: width,
    height: height,
  },
  price_view: {
    flexDirection: 'row',
    backgroundColor: '#1C73B6',
    marginVertical: verticalScale(15),
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
    alignItems: 'center',
  },
  send_btn: {
    backgroundColor: '#FEFDFC',
    // flexDirection: 'row',
    alignSelf: 'center',
    width: '45%',
    height: verticalScale(25),
    elevation: 5,
    borderRadius: moderateScale(5),
    marginBottom: verticalScale(15),
    marginTop: moderateScale(10),
  },
  price_txt: {
    paddingVertical: verticalScale(5),
    fontSize: moderateScale(11),
  },
  Card: {
    marginTop: moderateScale(20),
    width: '90%',
    marginHorizontal: moderateScale(20),
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
  inner_view: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  middle_view: {
    paddingHorizontal: moderateScale(10),
    // width:'50%'
  },
  btn: {
    borderRadius: moderateScale(15),
    height: verticalScale(20),
    width: moderateScale(140),
    alignItems: 'center',
    marginLeft: moderateScale(30),
    // padding:10
  },
  status_gradient: {
    justifyContent: 'center',
    borderRadius: moderateScale(3),
    alignItems: 'center',
    elevation: 5,
    // padding:10
    // margin:12
  },
  status_txt: {
    fontSize: moderateScale(11),
    marginHorizontal: moderateScale(5),
  },
  jobtext: {
    fontSize: moderateScale(16),
  },
  inputCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(10),
    marginHorizontal: moderateScale(15),
    marginTop: moderateScale(10),
    borderRadius: 3,
    borderWidth: 0,
  },
  imageUpload: {
    height: moderateScale(45),
    width: moderateScale(50),
    borderRadius: moderateScale(10),
    marginTop: moderateScale(20),
    marginHorizontal: moderateScale(15),
  },
});
