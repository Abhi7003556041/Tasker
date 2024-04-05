import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import HomeHeader from '../../Components/Header/HomeHeader';
import { Card, Container, Icon, useTheme } from 'react-native-basic-elements';
import { moderateScale } from '../../Constants/PixelRatio';
import { FONTS } from '../../Constants/Fonts';
import NavigationService from '../../Services/Navigation';
import SelectLan from '../../Components/Language/SelectLan';
import { FlatList } from 'react-native-gesture-handler';
import AuthService from '../../Services/Auth';
import useSelectLangue from '../../Components/Language/useSelectLangue';
import { fcmService } from '../../Services/Notification/FCMservice';
import HomeService from '../../Services/HomeService';



const RequesterHome = ({ item }) => {
  // console.log('props..',props.route.params.providerHome)
  const colors = useTheme();
  const [allCategory, setallCategory] = useState([]);
  const [token, setToken] = useState('')
  const { setLanguage } = useSelectLangue()

  useEffect(() => {
    getCategory();
    // deviceToken();
  }, []);

  React.useEffect(() => {
    HomeService.profileUpdate()
    .then(res => {
      console.log("res123",res);
      if (res.data.deviceToken == null) {
      }
      else {
        fcmService.register(onRegister);
      }

    })
  }, [])

  const onRegister = token => {
    console.log('Register token [App]:requester', token);
    deviceToken(token);
    setToken(token);
  };

  const deviceToken = async (val) => {
    let data1 = {
      deviceToken: val
    }
    console.log('tokenR', data1)

    HomeService.requesterProfileUpdate(data1).then(res => {
      console.log('devicetokenUpdaste', res)
    });
  }
  const getCategory = () => {
    AuthService.getProvCategory().then(res => {
      console.log('res---->>>>', res.data)
      if (res) {
        setallCategory(res.data);
      }
    });
  };


  
  return (
    <Container>
      <HomeHeader />

      <View
        style={{
          marginHorizontal: moderateScale(20),
          marginTop: moderateScale(10),
        }}>
        <Text
          style={{
            color: '#2874A6',
            fontFamily: FONTS.bold,
            fontSize: moderateScale(25),
          }}>
          {setLanguage('Hello!')}
        </Text>
        <Text
          style={{
            color: colors.primaryThemeColor,
            fontFamily: FONTS.semibold,
            fontSize: moderateScale(11),
            // marginHorizontal: 8,
          }}>
          {setLanguage('View the list of tasks (jobs) posted by the applicants')}
        </Text>
      </View>

      <Card style={styles.card}>
        <Text style={styles.uppercase}>{setLanguage('EXPLORE ALL CATEGORIES')}</Text>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={allCategory}
          contentContainerStyle={{ flexDirection: 'row' }}
          renderItem={({ item, index }) => {
            return (
              <Pressable
                key={index}
                onPress={() =>
                  NavigationService.navigate('ServiceProviders', {
                    cat_id: item._id,
                    cat_data: item,  
                    category_namer: item
                  })
                }>
                 
                <Image style={styles.image} source={{ uri: item.image }} />
                <Text
                  style={{
                    color: colors.primaryThemeColor,
                    fontFamily: FONTS.semibold,
                    fontSize: moderateScale(11),
                    alignSelf: 'center',
                  }}>
                  {item.categoryName}
                </Text>
              </Pressable>
            );
          }}
        />
      </Card>
      <Card style={styles.plusView}>
        <Text style={styles.uppercase}>{setLanguage('TASK SUMMARY')}</Text>
        <Pressable onPress={() => NavigationService.navigate('PublishTask')}>
          <Icon
            type="AntDesign"
            name="pluscircle"
            size={35}
            color={colors.primaryThemeColor}
          />
        </Pressable>
      </Card>
      <Card style={styles.plusView}>
        <Text style={styles.uppercase}>{setLanguage('PERSONAL TASK SUMMARY')}</Text>
        <Pressable
          onPress={() => NavigationService.navigate('PublishPersonalTask')}>
          <Icon
            type="AntDesign"
            name="pluscircle"
            size={35}
            color={colors.primaryThemeColor}
          />
        </Pressable>
      </Card>
    </Container>
  );
};

export default RequesterHome;

const styles = StyleSheet.create({
  card: {
    elevation: 5,
    backgroundColor: 'white',
    marginVertical: moderateScale(20),
  },
  uppercase: {
    color: '#2874A6',
    fontFamily: FONTS.bold,
    fontSize: moderateScale(12)
    // marginLeft: moderateScale(10),
    // marginVertical: moderateScale(15)
  },
  text: {
    fontFamily: FONTS.semibold,
  },
  scrollview: {
    flexDirection: 'row',
    marginBottom: moderateScale(15),
  },
  image: {
    height: moderateScale(80),
    width: moderateScale(80),
    borderRadius: moderateScale(15),
    marginHorizontal: moderateScale(15),
    marginVertical: moderateScale(15),
    resizeMode: 'cover',
  },
  plusView: {
    elevation: 5,
    backgroundColor: 'white',
    marginHorizontal: moderateScale(15),
    borderRadius: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: 10,
  },
});
