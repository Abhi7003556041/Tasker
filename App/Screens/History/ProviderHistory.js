import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { Icon, useTheme } from 'react-native-basic-elements';
import SettingsHeader from '../../Components/Header/SettingsHeader';
import { moderateScale, verticalScale } from '../../Constants/PixelRatio';
import SelectLan from '../../Components/Language/SelectLan';
import { FONTS } from '../../Constants/Fonts';

const ProviderHistory = () => {
    const colors = useTheme()

    return (
        <View style={{flex:1}}>

            <SettingsHeader headerText={SelectLan('History')} />

            {/* <Text style={{
                ...styles.news,
                color: colors.primaryThemeColor
            }}>{SelectLan('New Tasks')}</Text>

            <Text style={{
                ...styles.news,
                color: colors.primaryThemeColor
            }}>{SelectLan('Tasks in Progress')}</Text> */}

            {/* <Text style={{
                ...styles.news,
                color: colors.primaryThemeColor
            }}>{SelectLan('Tasks completed')}</Text> */}
            {/* <View style={{ height: 150 }} /> */}
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <Icon
                    name="search-off"
                    type="MaterialIcon"
                    size={70}
                />
                <Text
                    style={{
                        color: colors.primaryThemeColor,
                        fontFamily: FONTS.semibold,
                        fontSize: moderateScale(12)
                    }}>
                   {SelectLan('No history found')}
                </Text>
            </View>

        </View>
    );
};

export default ProviderHistory;

const styles = StyleSheet.create({
    list: {
        paddingHorizontal: moderateScale(25),
    },
    main_view: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: verticalScale(5),
    },
    img: {
        height: moderateScale(40),
        width: moderateScale(40),
        borderRadius: moderateScale(20),
    },
    news: {
        marginHorizontal: moderateScale(25),
        marginTop: verticalScale(30),
        marginBottom: verticalScale(10),
    },
    name_txt: {
        color: '#4470B4',
        fontSize: moderateScale(11),
        paddingHorizontal: moderateScale(5),
    },
    event_txt: {
        fontSize: moderateScale(11),
    },
    dispute_txt: {
        color: '#4470B4',

        fontSize: moderateScale(5),
        textDecorationLine: 'underline',
    },
    inner_view: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
