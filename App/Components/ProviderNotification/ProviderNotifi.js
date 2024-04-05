
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Container, useTheme } from 'react-native-basic-elements';
import SettingsHeader from '../../Components/Header/SettingsHeader';
import { FONTS } from '../../Constants/Fonts';
import { moderateScale, verticalScale } from '../../Constants/PixelRatio';


const ProviderNotifi = ({ item }) => {

    const colors = useTheme()

    return (
        <View style={{
            alignItems: 'center',
            flexDirection: 'row',
            marginTop: moderateScale(10),

        }}>
            <Image source={item.image}
                style={styles.images} />
            <View>
                <Text style={styles.textMain}>
                    {item.text} {''}
                    <Text style={{
                        ...styles.textMain,
                        color: colors.primaryFontColor,

                    }}>{item.subtext}
                    </Text>
                </Text>
                <Text style={{
                    ...styles.texthrs,
                    color: colors.textgrey,
                }}>{item.hrs}
                </Text>
            </View>

        </View>
    );
};

export default ProviderNotifi;

const styles = StyleSheet.create({
    images: {
        width: moderateScale(45),
        height: moderateScale(45),
        borderRadius: 30,
        marginHorizontal: moderateScale(15)

    },
    textMain: {
        fontSize: 12,
        fontFamily: FONTS.medium,
        color: '#4863A0',

    },
    texthrs: {
        fontSize: 10,
        fontFamily: FONTS.semibold,
    }
});

