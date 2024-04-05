import { Dimensions, FlatList, Image, ImageBackground, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { AppTextInput, Card, Container, Icon, useTheme } from 'react-native-basic-elements'
import { moderateScale, verticalScale } from '../../Constants/PixelRatio';
import LinearGradient from 'react-native-linear-gradient';
import NavigationService from '../../Services/Navigation';
import SettingsHeader from '../../Components/Header/SettingsHeader';
import StarRating from 'react-native-star-rating';
import ImagesList from '../../Components/TaskerImage/ImagesList';
import { FONTS } from '../../Constants/Fonts';
import SelectLan from '../../Components/Language/SelectLan';


const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height

const RequesterTask = () => {

    const onStarRatingPress = async (rating) => {
        setstarCount(rating)
    }
    const [rating, setstarCount] = useState();

    const colors = useTheme()

    const imageList = [
        {
            image: require('../../Assets/images/Recta3ngle40.png'),
        },
        {
            image: require('../../Assets/images/Image.png'),
        },
        {
            image: require('../../Assets/images/colorful.png'),
        },
        {
            image: require('../../Assets/images/Image.png'),
        },
        {
            image: require('../../Assets/images/Recta3ngle40.png'),
        },
        {
            image: require('../../Assets/images/Image.png'),
        },
        {
            image: require('../../Assets/images/ImageGf.png'),
        },

    ]
    
    return (
        <Container>
            <SettingsHeader headerText={'Tasks'} />
            <ImageBackground
                source={require('../../Assets/images/payment_bg.jpg')}
                style={{
                    ...styles.bg_img,

                }}>

                <View style={styles.publication_view}>
                    <ImageBackground
                        source={require('../../Assets/images/publication.png')}
                        style={styles.publication_bg}>
                        <Pressable style={styles.publication_btn}>
                            <LinearGradient
                                colors={['#FEFDFC', '#C7C8C5']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.gradient}>
                                <Text
                                    style={{
                                        ...styles.publication_txt,
                                        color: colors.primaryThemeColor
                                    }}
                                    onPress={() => NavigationService.navigate('PublishTask')}>
                                    Publish a Task
                                </Text>
                            </LinearGradient>
                        </Pressable>

                        <View style={{ height: moderateScale(50) }} />

                        <Card style={{
                            ...styles.Card,
                            backgroundColor: colors.primaryFontColor
                        }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Image
                                        source={require('../../Assets/images/Menpic.png')}
                                        style={styles.profile_img}
                                    />
                                    <View
                                        style={{
                                            marginLeft: moderateScale(10)
                                        }}
                                    >
                                        <Text style={{
                                            fontFamily: FONTS.medium,
                                            fontSize: moderateScale(14),
                                            color: colors.pageBackgroundColor,
                                        }}>
                                            Architect
                                        </Text>
                                        <Text style={{
                                            fontFamily: FONTS.medium,
                                            fontSize: moderateScale(12),
                                            color: colors.pageBackgroundColor,
                                        }}>Carlos Tros</Text>
                                    </View>

                                </View>

                                <Pressable
                                    style={{
                                        ...styles.send_btn,
                                        height: moderateScale(25),
                                        width: moderateScale(80)
                                    }}
                                >
                                    <LinearGradient
                                        colors={['#FEFDFC', '#C7C8C5']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        style={styles.msg_gradient}>
                                        <Text style={{
                                            fontFamily: FONTS.semibold,
                                            fontSize: moderateScale(12)
                                        }}>Working</Text>

                                    </LinearGradient>
                                    <Text style={{
                                        fontFamily: FONTS.semibold,
                                        fontSize: moderateScale(10),
                                        color: colors.pageBackgroundColor,
                                        textAlign: 'center'
                                    }}>Carlos Tros</Text>
                                </Pressable>


                            </View>
                            <View style={styles.ratings_view}>
                                <Text style={{
                                    fontFamily: FONTS.medium,
                                    fontSize: moderateScale(12)
                                }}>4.5</Text>
                                <StarRating
                                    disabled={false}
                                    maxStars={5}
                                    rating={rating}
                                    starSize={10}
                                    fullStarColor='#e78200'
                                    emptyStarColor='#4267b2'
                                    selectedStar={(rating) => onStarRatingPress(rating)}
                                    containerStyle={{
                                        marginLeft: moderateScale(5)
                                    }}
                                />
                            </View>

                            <View style={{
                                marginTop: moderateScale(20),
                                marginHorizontal: moderateScale(5)
                            }}>
                                <Text style={{
                                    ...styles.jobtext,
                                    color: colors.pageBackgroundColor,
                                    fontFamily: FONTS.medium,

                                }}>Request Domestic Cleaner</Text>
                                <Text style={{
                                    ...styles.jobholder,
                                    color: colors.pageBackgroundColor,
                                }}>Name</Text>
                            </View>

                            <Text style={{
                                ...styles.desCrip,
                                color: colors.pageBackgroundColor,

                            }}>
                                {SelectLan('Description')}

                            </Text>

                            <Card style={{
                                backgroundColor: '#F4F6F6',
                                marginTop: moderateScale(10)
                            }}>
                                <Text style={{
                                    fontFamily: FONTS.medium,
                                    fontSize: moderateScale(12),
                                    color: colors.primaryThemeColor
                                }}>
                                    {SelectLan('I need a work in Home clin, I need a work in Home clin, I need a work in Home clin')}

                                    {/* {DesCrip.description} */}
                                </Text>
                            </Card>
                            <View>
                                <FlatList
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    data={imageList}
                                    contentContainerStyle={{
                                        flexDirection: 'row'
                                    }}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <ImagesList item={item} index={index} />
                                        )
                                    }}

                                />
                            </View>

                            <View style={{
                                ...styles.price_view,
                                backgroundColor: colors.secondaryThemeColor
                            }}>
                                <Text style={{
                                    ...styles.price_txt,
                                    color: colors.pageBackgroundColor,
                                    fontFamily: FONTS.medium,
                                    fontSize: moderateScale(12)
                                }}>TOTAL:</Text>
                                <Text style={{
                                    ...styles.price_txt,
                                    color: colors.pageBackgroundColor,
                                    fontFamily: FONTS.medium,
                                    fontSize: moderateScale(12)
                                }}>
                                    $MXN 1500.00
                                </Text>
                            </View>
                            <Pressable
                                style={{
                                    height: moderateScale(50),
                                    width: "50%",
                                    paddingHorizontal: 10,
                                    alignSelf: 'center',
                                    //    backgroundColor: 'red'
                                }}
                            >
                                <LinearGradient
                                    colors={['#FEFDFC', '#C7C8C5']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={{...styles.msg_gradient,
                                    height: '60%'
                                    }}>
                                    <Text style={{
                                        fontFamily: FONTS.medium
                                    }}>Send message</Text>
                                    <Icon
                                        name="send-o"
                                        type="FontAwesome"
                                        style={styles.send_icon}
                                    />
                                </LinearGradient>
                            </Pressable>
                        </Card>
                    </ImageBackground>
                </View>
            </ImageBackground >
        </Container >
    )
}

export default RequesterTask

const styles = StyleSheet.create({
    bg_img: {
        height: height,
        width: width,
        // paddingTop: StatusBar.currentHeight,
    },
    ratings_view: {
        flexDirection: 'row',
        marginTop: verticalScale(10),
        alignItems: 'center',
    },
    desCrip: {
        fontFamily: FONTS.medium,
        fontSize: moderateScale(14),

        marginHorizontal: moderateScale(7),
        marginTop: moderateScale(10)
    },
    publication_view: {
        // alignSelf: 'center',
        // alignItems: 'center',
        marginStart: moderateScale(20),
        // backgroundColor: 'red',
        marginTop: verticalScale(20),
    },
    publication_bg: {
        width: '96%',
        height: moderateScale(120),
    },
    publication_btn: {
        backgroundColor: '#EDE9E6',
        width: '40%',
        alignItems: 'center',
        height: verticalScale(29),
        justifyContent: 'center',
        borderRadius: moderateScale(5),
        marginTop: verticalScale(60),
        marginStart: moderateScale(90),
    },
    gradient: {
        justifyContent: 'center',
        borderRadius: moderateScale(5),
        width: '100%',
        alignItems: 'center',
        height: '100%',
        elevation: 5,
    },
    publication_txt: {
        fontWeight: 'bold',
    },

    price_view: {
        flexDirection: 'row',
        backgroundColor: '#1C73B6',
        marginVertical: verticalScale(15),
        justifyContent: 'space-between',
        paddingHorizontal: moderateScale(15),
        marginTop: moderateScale(30)
    },
    send_icon: {
        fontSize: moderateScale(12)
    },
    msg_gradient: {
        justifyContent: 'center',
        borderRadius: moderateScale(5),
        width: '100%',
        alignItems: 'center',
        height: '100%',
        elevation: 5,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    send_btn: {
        width: '45%',
        height: verticalScale(25),
        elevation: 5,
        borderRadius: moderateScale(3),
        marginBottom: verticalScale(15),
    },
    price_txt: {
        paddingVertical: verticalScale(5),
        fontSize: moderateScale(11),
    },
    Card: {
        // marginTop: moderateScale(40),
        width: '100%',

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
        fontSize: moderateScale(10)
    },
    top_view: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: moderateScale(20),
        marginTop: moderateScale(20)
    },

    btn: {
        borderRadius: moderateScale(15),
        height: verticalScale(40),
        width: moderateScale(150),

    },
    status_gradient: {
        justifyContent: 'center',
        borderRadius: moderateScale(3),
        alignItems: 'center',
        elevation: 5,

    },
    status_txt: {
        fontSize: moderateScale(11),
        marginHorizontal: moderateScale(5)
    },
    jobtext: {
        fontSize: moderateScale(14)
    },
    inputCont: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: moderateScale(10),
        marginHorizontal: moderateScale(15),
        marginTop: moderateScale(10),
        borderRadius: 3,
        borderWidth: 0,
    },
    imageUpload: {
        height: moderateScale(45),
        width: moderateScale(50),
        borderRadius: moderateScale(10),
        marginTop: moderateScale(20),
        marginHorizontal: moderateScale(15)
    }
})