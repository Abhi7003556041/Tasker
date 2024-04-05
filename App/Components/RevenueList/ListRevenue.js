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
import { Card, Icon, useTheme } from 'react-native-basic-elements';
import { moderateScale, verticalScale } from '../../Constants/PixelRatio';


const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const ListRevenue = ({ item }) => {

    const colors = useTheme()
    return (
        <View>
            {/* <ImageBackground
                source={require('../../Assets/images/revenue_bg.jpg')}
                style={styles.bg_img}> */}

            <Card style={{
                ...styles.card_view,
                backgroundColor: colors.pageBackgroundColor
            }}>
                <Text style={styles.date_txt}>{item.text}</Text>
                <View style={styles.top_view}>
                    <View style={styles.inner_view}>
                        <Image
                            source={item.image}
                            style={styles.profile_img}
                        />
                        <View style={styles.middle_view}>
                            <Text style={styles.name_txt}>{item.subtext}</Text>
                            
                            <View style={styles.star_icon_view2}>
                                <Icon
                                    name="star"
                                    type="Entypo"
                                    style={[styles.star_icon, { fontSize: 10 }]}
                                />
                                <Icon
                                    name="star"
                                    type="Entypo"
                                    style={[styles.star_icon, { fontSize: 10 }]}
                                />
                                <Icon
                                    name="star"
                                    type="Entypo"
                                    style={[styles.star_icon, { fontSize: 10 }]}
                                />
                                <Icon
                                    name="star"
                                    type="Entypo"
                                    style={[styles.star_icon, { fontSize: 10 }]}
                                />
                                <Icon
                                    name="star"
                                    type="Entypo"
                                    style={[styles.star_icon, { fontSize: 10 }]}
                                />
                            </View>
                        </View>
                    </View>


                    <Text style={styles.price_txt}>{item.Price}</Text>
                </View>
            </Card>

            {/* </ImageBackground> */}
        </View>
    );
};

export default ListRevenue;

const styles = StyleSheet.create({
    bg_img: {
        // width: width,
        // height: height,
        flex: 1
    },
    card_view: {
        width: '90%',
        alignSelf: 'center',
        marginTop: verticalScale(10),
        marginBottom: moderateScale(20),
        borderRadius: moderateScale(10),
        elevation: 5,
    },
    date_txt: {
        fontSize: moderateScale(11),
        paddingTop: verticalScale(10),
        paddingStart: moderateScale(15),
    },
    top_view: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: moderateScale(10),
        paddingTop: verticalScale(10),
    },
    inner_view: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    profile_img: {
        height: moderateScale(50),
        width: moderateScale(50),
        borderRadius: moderateScale(25),
    },
    star_icon_view: {
        flexDirection: 'row',
    },
    star_icon: {
        fontSize: moderateScale(10),
    },
    middle_view: {
        paddingHorizontal: moderateScale(5),
    },
    name_txt: {
        fontSize: moderateScale(12),
    },
    price_txt: {

        fontSize: moderateScale(12),
    },
    star_icon_view2: {
        flexDirection: 'row',
        marginLeft: moderateScale(5)
    },
});
