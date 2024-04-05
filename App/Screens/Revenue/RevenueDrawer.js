import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  Pressable,
} from 'react-native';
import { Icon, useTheme } from 'react-native-basic-elements';
import SettingsHeader from '../../Components/Header/SettingsHeader';
import { FONTS } from '../../Constants/Fonts';
import { moderateScale, verticalScale } from '../../Constants/PixelRatio';
import NavigationService from '../../Services/Navigation';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const RevenueDrawer = () => {

    const colors = useTheme()
  return (
    <View>

      <ImageBackground
        source={require('../../Assets/images/revenue_bg.jpg')}
        style={styles.bg_img}>

        <SettingsHeader headerText="Revenues" />

        <Text style={{
            ...styles.card_txt,
            color: colors.pageBackgroundColor
        }}>My cards</Text>

        <View style={styles.card_view}>
          <Text style={styles.bankname_txt}>BankName</Text>


          <View style={styles.card_number_view}>
            <View style={{
                ...styles.blue_box,
                backgroundColor: colors.primaryThemeColor
            }} />
            <Text style={styles.card_number}>4322 3663 5456 2234</Text>
          </View>


          <View style={styles.ball_view}>
            <View style={[styles.ball, {backgroundColor: colors.primaryThemeColor}]} />
            <View style={[styles.ball, {backgroundColor: '#1C73B6'}]} />
          </View>
          <Text style={styles.name_txt}>Your Name</Text>
        </View>

        <Text style={{
            ...styles.edit_txt,
            color: colors.pageBackgroundColor
        }}>Edit</Text>

        <Text style={{
            ...styles.earnings_txt,
            color: colors.pageBackgroundColor
        }}>Earnings</Text>

        <Text style={{
            ...styles.price_txt,
            color: colors.pageBackgroundColor
        }}>MXN $7500.00</Text>

        <View style={styles.stats_money_view}>
          <Pressable
            style={{
                ...styles.box_view,
                backgroundColor: colors.pageBackgroundColor
            }}
            onPress={() => NavigationService.navigate('Statistics')}>
            <Icon name="graph" type="Octicons" style={styles.icon} />
            <Text style={styles.stat_rev_txt}>Statistics</Text>
          </Pressable>
          <Pressable
            style={{
                ...styles.box_view,
                backgroundColor: colors.pageBackgroundColor
            }}
            onPress={() => NavigationService.navigate('ListRevenues')}>
            <Icon
              name="money-check-alt"
              type="FontAwesome5"
              style={styles.icon}
            />
            <Text style={styles.stat_rev_txt}>Revenues</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
};

export default RevenueDrawer;

const styles = StyleSheet.create({
  bg_img: {
    width: width,
    height: height,
  },
  card_txt: {
    margin: moderateScale(20),
    marginStart: moderateScale(35),
    fontFamily: FONTS.medium,
    fontSize: moderateScale(14)
  },
  card_view: {
    backgroundColor: '#E7E2E1',
    alignSelf: 'center',
    width: '80%',
    height: '30%',
    borderRadius: moderateScale(10),
    elevation: 5,
  },
  bankname_txt: {
    textAlign: 'right',
    marginHorizontal: moderateScale(10),
    fontSize: moderateScale(10),
    marginTop: verticalScale(10),
  },
  card_number_view: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(50),
  },
  blue_box: {
    height: moderateScale(30),
    width: moderateScale(40),
    borderRadius: moderateScale(10),
  },
  card_number: {
    fontSize: moderateScale(18),
    paddingStart: moderateScale(10),
    color: '#1C73B6',
  },

  ball: {
    height: moderateScale(30),
    width: moderateScale(30),
    borderRadius: moderateScale(15),
  },
  ball_view: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginHorizontal: moderateScale(10),
    marginTop: verticalScale(20),
  },
  name_txt: {
    fontSize: moderateScale(7),
    marginTop: verticalScale(15),
    marginHorizontal: moderateScale(40),
  },
  edit_txt: {
    textAlign: 'right',
    paddingHorizontal: moderateScale(40),
    marginTop: verticalScale(5),
    fontSize: moderateScale(10),
  },
  earnings_txt: {
    paddingHorizontal: moderateScale(40),
    marginTop: verticalScale(20),
    fontFamily: FONTS.medium,
    fontSize: moderateScale(14)
  },
  price_txt: {
    textAlign: 'center',
    fontSize: moderateScale(22),
    marginTop: verticalScale(20),
  },
  stats_money_view: {
    flexDirection: 'row',
    // alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    // backgroundColor: 'red',
    width: '60%',
    marginTop: moderateScale(30),
  },
  box_view: {
    alignItems: 'center',
    padding: moderateScale(20),
    borderRadius: moderateScale(10),
    elevation: 5,
  },
  icon: {
    fontSize: moderateScale(30),
  },
  stat_rev_txt: {
    fontSize: moderateScale(12),
    paddingTop: verticalScale(10),
  },
});

