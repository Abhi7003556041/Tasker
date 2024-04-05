
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Container, useTheme } from 'react-native-basic-elements';
import { FlatList } from 'react-native-gesture-handler';
import SettingsHeader from '../../Components/Header/SettingsHeader';
import ProviderNotifi from '../../Components/ProviderNotification/ProviderNotifi';
import { FONTS } from '../../Constants/Fonts';
import { moderateScale, verticalScale } from '../../Constants/PixelRatio';
import SelectLan from '../../Components/Language/SelectLan';


const Notifications = () => {

  const colors = useTheme()

  const notifications = [
    {
      image: require('../../Assets/images/Menpic.png'),
      text: "Nikolaj Coster",
      subtext: "has rated you",
      hrs: "1 hr",
    },
    {
      image: require('../../Assets/images/Imageg.png'),
      text: "Nikolaj Coster",
      subtext: "has rated you",
      hrs: "3 hr",
    },
    {
      image: require('../../Assets/images/Image.png'),
      text: "Nikolaj Coster",
      subtext: "has rated you",
      hrs: "1 hr",
    },

  ]
  const Notification2 = [
    {
      image: require('../../Assets/images/Menpic.png'),
      text: "Nikolaj Coster",
      subtext: "has rated you",
      hrs: "5 hr",
    },
    {
      image: require('../../Assets/images/Image.png'),
      text: "Nikolaj Coster",
      subtext: "has rated you",
      hrs: "1 hr",
    },
    {
      image: require('../../Assets/images/Recta3ngle40.png'),
      text: "Nikolaj Coster",
      subtext: "has rated you",
      hrs: "1 hr",
    }
  ]
  const Notification3 = [
    {
      image: require('../../Assets/images/Menpic.png'),
      text: "Nikolaj Coster",
      subtext: "has rated you",
      hrs: "2 hr",
    },
    {
      image: require('../../Assets/images/Recta3ngle40.png'),
      text: "Nikolaj Coster",
      subtext: "has rated you",
      hrs: "3 hr",
    },
    {
      image: require('../../Assets/images/Image.png'),
      text: "Nikolaj Coster",
      subtext: "has rated you",
      hrs: "1 hr",
    },

  ]

  return (
    <Container>
      <SettingsHeader headerText={SelectLan('Notifications')} />
      {/* <ScrollView showsVerticalScrollIndicator={false}>

        <Text style={{ ...styles.newsText, color: colors.primaryThemeColor }}>
          {SelectLan('New Booking')}
        </Text>
        <FlatList
          data={notifications}
          contentContainerStyle={{
            marginBottom: moderateScale(10)
          }}
          renderItem={({ item, index }) => {
            return (
              <ProviderNotifi item={item} index={index} />
            )
          }}

        />

        <View style={{
          marginTop: moderateScale(10),

        }}>

          <Text style={{ ...styles.newsText, color: colors.primaryThemeColor }}>
            {SelectLan('Rating and Reviews')}
          </Text>
          <View style={{
            // marginBottom: 20
          }}>
            <FlatList
              data={Notification2}
              contentContainerStyle={{
                marginBottom: moderateScale(10)
              }}
              renderItem={({ item, index }) => {
                return (
                  <ProviderNotifi item={item} index={index} />
                )
              }}

            />
          </View>

        </View>

        <View style={{

        }}>
          <Text style={{ ...styles.newsText, color: colors.primaryThemeColor }}>
           {SelectLan('Tareas canceladas')}
          </Text>

          <FlatList
            data={Notification3}

            renderItem={({ item, index }) => {
              return (
                <ProviderNotifi item={item} index={index} />
              )
            }}

          />
        </View>
        <View style={{ height: moderateScale(60) }} />

      </ScrollView> */}
      <View style={styles.mainView}>
        <Image source={require('../../Assets/images/no-alarm-icon-free-vector.jpg')}
          style={{ height: moderateScale(120), width: moderateScale(120) }}
        />
        <Text style={{
          ...styles.text,
          color: colors.primaryThemeColor
        }}>{SelectLan('No Notification')}</Text>
      </View>

    </Container>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  newsText: {
    marginHorizontal: moderateScale(15),
    marginTop: moderateScale(10),
    fontSize: moderateScale(14),
    fontFamily: FONTS.bold,

  },
  text: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: moderateScale(15),
    fontFamily: FONTS.medium,
    fontSize: moderateScale(12)
  },
  mainView: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center'
  }
});
