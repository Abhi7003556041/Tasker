//import liraries
import moment from 'moment';
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useTheme } from 'react-native-basic-elements';
import SettingsHeader from '../../Components/Header/SettingsHeader';
import SelectLan from '../../Components/Language/SelectLan';
import { FONTS } from '../../Constants/Fonts';
import { moderateScale } from '../../Constants/PixelRatio';
import HomeService from '../../Services/HomeService';
import NavigationService from '../../Services/Navigation';
import StarRating from 'react-native-star-rating';

// create a component
const AllReviewData = (props) => {
    const [allReview, setAllReview] = useState([])
    const ID = props.route.params.Id
    const colors = useTheme();
    const [ratingg, setstarCountt] = useState();

    useEffect(() => {
        // getProfile()
        getAllReview()
    }, [])
    const getAllReview = async () => {
        HomeService.getReview(ID)
            .then((res) => {
                console.log('reviewAllll', res.data)
                setAllReview(res.data)
            })
            .catch((err) => console.log(err))
    }
    return (
        <View style={{ flex: 1, }}>

            <SettingsHeader headerText={SelectLan('All Review')} />

            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 50, marginTop: 10 }}>

                {
                    allReview.map((item, ind) => {
                        return (
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    backgroundColor: '#fff',
                                    // alignItems:'center',
                                    marginHorizontal: 15,
                                    paddingRight: 10,
                                    paddingVertical: 15,
                                    borderRadius: 5,
                                    marginVertical: 10
                                }}>
                                <View
                                    style={{
                                        width: '75%'
                                    }}
                                >
                                    <Text
                                        style={{
                                            ...styles.writeText,
                                            color: colors.primaryThemeColor,
                                            // marginTop:0
                                        }}>
                                        {item?.reviewerData.firstName} {item?.reviewerData.lastName}
                                    </Text>
                                    <Text
                                        numberOfLines={2}
                                        style={{
                                            ...styles.writeText,
                                            color: 'grey',
                                            // marginVertical:5,
                                            // maxWidth:150
                                        }}>
                                        {/* {allReview.splice(-1)[0]} */}
                                        {/* {allReview.slice(-1)[0].review} */}
                                        {item?.review}
                                        {/* sdksdjsjdlskhslfhslfhlsfhlsfhlsfhslfhslfhslfklsdlsdjlsdjlkdjleyreryeruyeiuryeiruyeiruyeiuryeiury */}
                                    </Text>
                                </View>
                                <View>
                                    <Text style={{ fontSize: 11, marginLeft: 14, color: 'black' }}>{moment(item?.createdOn).format('DD/MM/YY')}</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                                        <Text
                                            style={{ ...styles.ratings_num, color: colors.primaryThemeColor }}>
                                            {item?.rating}
                                        </Text>

                                        <StarRating
                                            disabled={false}
                                            maxStars={5}
                                            rating={item?.rating}
                                            starSize={10}
                                            fullStarColor="#e78200"
                                            emptyStarColor="#4267b2"
                                            
                                            // selectedStar={rating => onStarRatingPress(rating)}
                                            containerStyle={{
                                                marginLeft: moderateScale(5),
                                            }}
                                        />
                                    </View>
                                </View>
                                {
                                    console.log(allReview)
                                }
                            </View>
                        )
                    })
                }
            </ScrollView>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
    writeText: {
        fontFamily: FONTS.medium,
        fontSize: moderateScale(12),
        // marginTop: moderateScale(10),
        marginHorizontal: moderateScale(15)
    },
    ratings_num: {
        fontSize: moderateScale(12),
      },
});

//make this component available to the app
export default AllReviewData;
