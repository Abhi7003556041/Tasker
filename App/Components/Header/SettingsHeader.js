import React from 'react';
import { StyleSheet, Text, View, Dimensions, StatusBar, Pressable } from 'react-native';
import { AppBar, Icon, useTheme } from 'react-native-basic-elements';
import LinearGradient from 'react-native-linear-gradient';
import { moderateScale } from '../../Constants/PixelRatio';
import NavigationService from '../../Services/Navigation';
import { FONTS } from '../../Constants/Fonts';

const width = Dimensions.get('screen').width;

const SettingsHeader = ({ headerText }) => {
    const colors = useTheme()
    return (
        <View>
            <StatusBar backgroundColor={colors.primaryThemeColor} />
            <LinearGradient
                style={styles.root_view}
                colors={['#3BB6DF', '#1972B6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}>
                <Pressable
                    transparent
                    onPress={() => NavigationService.back()}>
                    <Icon
                        name="left"
                        type="AntDesign"
                        style={{
                            color: colors.pageBackgroundColor,
                            fontSize: moderateScale(20),
                            paddingStart: 10

                        }}
                    />
                </Pressable>
                <View
                style={{
                    justifyContent:'center',
                    alignItems:'center',
                    width:'80%'
                }}
                >
                <Text style={styles.header_txt}>{headerText}</Text>

                </View>
            </LinearGradient>
        </View>

    );
};

export default SettingsHeader;

const styles = StyleSheet.create({
    root_view: {
        height: moderateScale(65),
        flexDirection: 'row',
        alignItems: 'center',
    },
    inner_view: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
    },
    icon: {
        fontSize: moderateScale(15),
        paddingStart: moderateScale(10),
        color: 'white',
    },
    header_txt: {
        textAlign: 'center',
        color: "white",
        fontSize: moderateScale(16),
        fontFamily: FONTS.bold
    },
});
