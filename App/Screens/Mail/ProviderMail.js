import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Image } from 'react-native';
import { Card, useTheme, Text, Icon } from 'react-native-basic-elements';
import SettingsHeader from '../../Components/Header/SettingsHeader';
import { moderateScale, verticalScale } from '../../Constants/PixelRatio';
import SelectLan from '../../Components/Language/SelectLan';
import { FONTS } from '../../Constants/Fonts';
import { ScrollView } from 'react-native-gesture-handler';
import ProviderMailComp from './ProviderMailComp';
import database from '@react-native-firebase/database';
import { useSelector } from 'react-redux';

const ProviderMail = ({ navigation }) => {
    const colors = useTheme();
    const userData = useSelector(state => state.User.userData);
    const [all, setAll] = useState([]);

    useEffect(() => {

        database()
            .ref(`/chatlist/${userData._id}`)
            .once('value', snapshot => {
                // console.log("snapshot.exists()", snapshot.exists())
                if (snapshot.exists()) {
                    console.log("Object.values(qwqw1231212.val())", Object.values(snapshot.val()))
                    setAll(Object.values(snapshot.val()));

                }
            });
        const unsubscribe = navigation.addListener('focus', () => {
            database()
                .ref(`/chatlist/${userData._id}`)
                .once('value', snapshot => {
                    // console.log("snapshot.exists()", snapshot.exists())
                    if (snapshot.exists()) {
                        console.log("Object.values(qwqw1231212.val())", Object.values(snapshot.val()))
                        setAll(Object.values(snapshot.val()));

                    }
                });
        });

        return unsubscribe;
    }, [navigation])


    return (
        <View style={{ flex: 1, }}>

            <SettingsHeader headerText={SelectLan('Messages')} />
{
    console.log('userdatachatlist',userData)
}
            {
                all.length ? (
                    <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}>

                        {
                            all.map((item, ind) => {
                                return (
                                    <ProviderMailComp item={item} />
                                )
                            })
                        }
                    </ScrollView>
                ) : (
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
                            No messages here
                        </Text>
                    </View>
                )
            }


        </View>
    );
};

export default ProviderMail;

const styles = StyleSheet.create({

    mainView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: moderateScale(10),
        marginTop: moderateScale(8),
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
        marginTop: moderateScale(5),
        fontFamily: FONTS.semibold,
        fontSize: moderateScale(10)
    },
    profileName: {
        marginTop: moderateScale(5),
        fontFamily: FONTS.medium,
        fontSize: moderateScale(14)
    }
});