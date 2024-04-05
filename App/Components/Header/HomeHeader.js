import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    StatusBar,
    TextInput,
    Pressable,
} from 'react-native';
import { AppTextInput, Container, Icon, useTheme } from 'react-native-basic-elements';
import LinearGradient from 'react-native-linear-gradient';
import { moderateScale } from '../../Constants/PixelRatio';
import NavigationService from '../../Services/Navigation';

const width = Dimensions.get('screen').width;

const HomeHeader = () => {
    const colors = useTheme()
    return (
        <View>
            <StatusBar backgroundColor={'#1972B6'} barStyle="light-content" />
            <LinearGradient
                style={styles.root_view}
                colors={['#3BB6DF', '#1972B6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}>

                <View style={styles.inner_view}>
                    <Pressable onPress={() => NavigationService.openDrawer()} >
                        <Icon
                            name="menu-outline"
                            type="Ionicons"
                            style={{
                                ...styles.icon,
                                color: colors.pageBackgroundColor
                            }}

                        />
                    </Pressable>
                    <AppTextInput

                        titleStyle={{
                            color: 'blue'
                        }}
                        leftIcon={{
                            name: 'search1',
                            type: 'AntDesign'
                        }}
                        inputContainerStyle={{ ...styles.inputCont, backgroundColor: colors.pageBackgroundColor }}

                    // secureTextEntry={true}

                    />
                </View>

            </LinearGradient>
        </View>
    );
};

export default HomeHeader;

const styles = StyleSheet.create({
    root_view: {
        height: StatusBar.currentHeight + 55,
        paddingTop: StatusBar.currentHeight,
        // backgroundColor: COLORS.themecolor,
        flexDirection: 'row',
        alignItems: 'center',
    },
    inner_view: {
        flexDirection: 'row',
        justifyContent: "space-between",
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: moderateScale(10),

    },
    icon: {
        fontSize: moderateScale(25)

    },

    outer_input_view: {
        height: 30,
        width: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // paddingRight: 10,
        alignItems: 'center',
    },
    input_view: {

        alignItems: 'center',
        flexDirection: 'row',
        width: '45%',
        height: moderateScale(30),
        paddingLeft: 2,
        borderRadius: 3,
    },
    inputCont: {
        borderRadius: 5,
        borderWidth: 0,
        flexDirection: "row",
        height: moderateScale(30),
        width: moderateScale(150)
    },

});
