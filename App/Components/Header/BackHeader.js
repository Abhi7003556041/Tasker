import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Icon, useTheme } from 'react-native-basic-elements';
import { moderateScale } from '../../Constants/PixelRatio';
import NavigationService from '../../Services/Navigation';

export default function Header(props) {
    const colors = useTheme()
    const { name } = props;

    return (
        <View style={styles.header}>
            <Pressable
                onPress={() => NavigationService.back()}>
                <Icon
                    name="ios-arrow-back"
                    type="Ionicons"
                    style={{ color: '#000', fontSize: moderateScale(25)}}
                />
            </Pressable>
            <Text
                numberOfLines={1}
                style={{
                    color: '#006B15',
                    fontSize: 19,
                    fontFamily: 'Changa-SemiBold',
                    marginLeft: 15,
                    width: '85%',
                    fontWeight:'700'
                }}>
                {name}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        height: moderateScale(55),
        alignItems: 'center',
        flexDirection: 'row',
    },
});