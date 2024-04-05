import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Image, Pressable } from 'react-native';
import { Card, useTheme, Text } from 'react-native-basic-elements';
import SettingsHeader from '../../Components/Header/SettingsHeader';
import { moderateScale, verticalScale } from '../../Constants/PixelRatio';
import SelectLan from '../../Components/Language/SelectLan';
import { FONTS } from '../../Constants/Fonts';
import { ScrollView } from 'react-native-gesture-handler';
import NavigationService from '../../Services/Navigation';
import moment from 'moment';

const ProviderMailComp = ({ item }) => {
    const colors = useTheme();

    return (

        <Pressable style={styles.mainView}
            onPress={() =>
                NavigationService.navigate('InnerChat', {
                    roomId: item.roomId,
                    name: `${item.name}`,
                    image: item.image,
                    remoteId: item.userId,
                    remoteData: item
                })
            }
        >
            <View
                style={{
                    flexDirection: 'row',
                }}
            >
                <Image
                    source={{ uri: item.image }}
                    style={styles.image}
                />

                <View
                    style={{
                        marginLeft: moderateScale(20)
                    }}
                >
                    <Text style={styles.profileName}>{item.name}</Text>
                    <Text numberOfLines={1} style={styles.msgText}>{item.lastMsg}</Text>
                </View>
            </View>

            <Text style={{ ...styles.msgText, marginTop: 10, maxWidth: 70, color: 'black', fontSize: 10 }}>
                {/* {new Date(item.lastMsgTime).toUTCString()} */}
                {moment(item.lastMsgTime).format('DD-MM-YY hh:mm a')}
            </Text>
        </Pressable>


    );
};

export default ProviderMailComp;

const styles = StyleSheet.create({

    mainView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: moderateScale(10),
        marginTop: moderateScale(10),
        marginHorizontal: moderateScale(10),
        backgroundColor: '#fff',
        elevation: 5,
        borderRadius: 5,
        paddingVertical: 5
    },
    image: {
        height: moderateScale(50),
        width: moderateScale(50),
        borderRadius: moderateScale(30)
    },
    msgText: {
        marginTop: moderateScale(2),
        fontFamily: FONTS.semibold,
        fontSize: moderateScale(10),
        maxWidth: 180,
        // backgroundColor:'red'
    },
    profileName: {
        marginTop: moderateScale(5),
        fontFamily: FONTS.medium,
        fontSize: moderateScale(14)
    }
});