
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    ImageBackground,
    Image,
} from 'react-native';
import { Icon, useTheme } from 'react-native-basic-elements';
import SettingsHeader from '../../Components/Header/SettingsHeader';
import { moderateScale, verticalScale } from '../../Constants/PixelRatio';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const Statistics = () => {

    const colors = useTheme()
    return (
        <View>

            <ImageBackground
                source={require('../../Assets/images/revenue_bg.jpg')}
                style={styles.bg_img}>

                <SettingsHeader headerText="Statistics" />


                <View style={styles.monthly_weekly_view}>
                    <View style={[styles.month_week_view, { backgroundColor: '#1C73B6' }]}>
                        <Text style={{
                            ...styles.monthly_txt,
                            color: colors.pageBackgroundColor
                        }}>Monthly</Text>
                    </View>
                    <View style={[styles.month_week_view, { backgroundColor: '#FEFDFC' }]}>
                        <Text style={{
                            ...styles.weekly_txt,
                            color: colors.primaryThemeColor
                        }}>Weekly</Text>
                    </View>
                </View>


                <View style={styles.line_graph_view}>
                    <View
                        style={[
                            styles.month_view,
                            {
                                borderTopStartRadius: moderateScale(10),
                                borderBottomStartRadius: moderateScale(10),
                                borderRightWidth: 1,
                                borderColor: colors.cardColor,
                            },
                        ]}>
                        <Text
                            style={[
                                styles.month_txt,
                                { paddingHorizontal: moderateScale(10) },
                                {color: colors.primaryThemeColor}
                            ]}>
                            This Month
                        </Text>
                    </View>
                    <View
                        style={[
                            styles.month_view,
                            {
                                borderTopEndRadius: moderateScale(10),
                                borderBottomEndRadius: moderateScale(10),
                            },
                        ]}>
                        <Text style={[styles.month_txt, { paddingStart: moderateScale(70) },
                        {color: colors.primaryThemeColor}
                        ]}>
                            Last Month
                        </Text>
                    </View>
                </View>


                <View style={styles.bar_graph_view}>
                    <View style={styles.top_view}>
                        <Text style={{
                            ...styles.stat_txt,
                            color: colors.primaryThemeColor
                        }}>Statistics</Text>
                        <Icon name="redo" type="Fontisto" style={styles.redo_icon} />
                    </View>
                    <View
                        style={{
                            borderColor: '#B1B1B1',
                            borderWidth: 0.2,
                            width: '90%',
                            alignSelf: 'center',
                            marginTop: verticalScale(5),
                        }}
                    />
                </View>
            </ImageBackground>
        </View>
    );
};

export default Statistics;

const styles = StyleSheet.create({
    bg_img: {
        height: height,
        width: width,
    },
    monthly_weekly_view: {
        flexDirection: 'row',
        alignSelf: 'center',

        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: moderateScale(60),
        marginTop: verticalScale(50),
    },

    month_week_view: {
        height: verticalScale(30),
        width: moderateScale(100),
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
    },
    monthly_txt: {
        fontWeight: 'bold',
        fontSize: moderateScale(12),
    },
    weekly_txt: {
        fontWeight: 'bold',
        fontSize: moderateScale(12),
    },
    line_graph_view: {
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between',

        paddingHorizontal: moderateScale(50),
        marginTop: verticalScale(30),
    },
    month_view: {
        backgroundColor: '#FEFDFC',
        height: verticalScale(150),
        width: moderateScale(140),
    },
    month_txt: {
        fontSize: moderateScale(11),

        paddingTop: verticalScale(10),
    },
    bar_graph_view: {
        backgroundColor: '#FEFDFC',
        marginTop: verticalScale(50),
        width: '80%',
        alignSelf: 'center',
        height: verticalScale(180),
        borderRadius: moderateScale(10),
    },
    top_view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: moderateScale(15),
        marginTop: verticalScale(10),
    },
    stat_txt: {
        fontSize: moderateScale(12),

    },
    redo_icon: {
        fontSize: moderateScale(20),

    },
});
