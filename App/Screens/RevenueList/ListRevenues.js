import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Dimensions,
    Image,
    Pressable,
    ScrollView,
} from 'react-native';
import { Card, Container, Icon, useTheme } from 'react-native-basic-elements';
import { FlatList } from 'react-native-gesture-handler';
import SettingsHeader from '../../Components/Header/SettingsHeader';
import ListRevenue from '../../Components/RevenueList/ListRevenue';
import { moderateScale, verticalScale } from '../../Constants/PixelRatio';


const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const ListRevenues = () => {

    const colors = useTheme()

    const Revenue = [
        {
            image: require('../../Assets/images/Menpic.png'),
            text: "January 29th, 2022",
            subtext: "Arpit Das",
            Price: "$MXN 1500.00",
        },
        {
            image: require('../../Assets/images/Image.png'),
            text: "January 29th, 2022",
            subtext: "Arpit Das",
            Price: "$MXN 1500.00",
        },
        {
            image: require('../../Assets/images/Recta3ngle40.png'),
            text: "January 29th, 2022",
            subtext: "Nimi Sen",
            Price: "$MXN 1500.00",
        },
        {
            image: require('../../Assets/images/Image.png'),
            text: "January 29th, 2022",
            subtext: "Arpit Das",
            Price: "$MXN 1500.00",
        },
        {
            image: require('../../Assets/images/Menpic.png'),
            text: "January 29th, 2022",
            subtext: "Arpit Das",
            Price: "$MXN 1500.00",
        },
        {
            image: require('../../Assets/images/Recta3ngle40.png'),
            text: "January 29th, 2022",
            subtext: "Tanish Jain",
            Price: "$MXN 1500.00",
        },
        {
            image: require('../../Assets/images/Menpic.png'),
            text: "January 29th, 2022",
            subtext: "Arpit Das",
            Price: "$MXN 1500.00",
        },

    ]

    return (
        <Container >

            <SettingsHeader headerText="List of Revenues" />
            <ImageBackground
                source={require('../../Assets/images/revenue_bg.jpg')}
                style={styles.bg_img}>
                
                <FlatList showsVerticalScrollIndicator={false}
                    data={Revenue}
                    renderItem={({ item, index }) => {
                        return (
                            <ListRevenue item={item} index={index} />
                        )
                    }}

                />

            </ImageBackground>
        </Container>
    );
};

export default ListRevenues;

const styles = StyleSheet.create({
    bg_img: {
        width: width,
        height: height,
    },

});
