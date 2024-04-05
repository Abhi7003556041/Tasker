import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, ImageBackground } from 'react-native';
import { Container, Icon, useTheme } from 'react-native-basic-elements';
import ImagePicker from 'react-native-image-crop-picker';
import SettingsHeader from '../../Components/Header/SettingsHeader';
import { FONTS } from '../../Constants/Fonts';
import { moderateScale } from '../../Constants/PixelRatio';
import Video from 'react-native-video';
import AuthService from '../../Services/Auth';

const UploadImage = () => {

    const colors = useTheme();
    const [image, setImage] = useState('');
    const [video, setVideo] = useState('');

    // const imagHandle = async index => {
    //     ImagePicker.openPicker({
    //         multiple: true,
    //         width: 300,
    //         height: 400,
    //         cropping: true,
    //     }).then(async image => {
    //         console.log('image uri ....', image);
    //         setImage(image.path);

    //     });
    // };
    function multipleImages() {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            // console.log("immmmmmmmmm>", image.path)
            setSelImg(image);
            setUploading(true);
            // let AllImagess = [];
            AuthService.uploadimage(image).then(result => {
                // console.log('result>>>Image', result);
                if (result) {
                    let Responseimg = result.url;
                    setSelImg(Responseimg);

                    allImag.push(Responseimg);

                    // console.log('allImag---------', allImag);
                    setUploading(false);
                    setRefress(!refress);
                }
            });
        });
    }

    // const videoHandle = async index => {
    //     ImagePicker.openPicker({
    //         width: 300,
    //         height: 400,
    //         mediaType: "video",
    //     }).then((video) => {
    //         setVideo(video.path)
    //         console.log('Video data.........', video);
    //     });
    // };

    return (
        <Container style={styles.container}>
            <ImageBackground source={require('../../Assets/images/payment_bg.jpg')}>
                <SettingsHeader headerText={'Image & Video Upload'} />

                <View style={styles.ImageUploadView}>
                    <Pressable onPress={() => multipleImages()}
                        style={styles.circle}>
                        {/* {image == '' ?
                            <Icon
                                name="ios-cloud-upload-outline"
                                type="Ionicons"
                                resizemode="contain"
                                size={40}
                                style={{
                                    color: 'grey',
                                }}
                            />
                            :
                            <Image
                                style={{
                                    height: '100%',
                                    width: '100%',
                                    borderRadius: moderateScale(10),
                                }}
                                source={{ uri: image }} />
                        } */}
                        {image.map(() => {
                            return (
                                <View style={styles.images}>
                                    <Image style={styles.ScrollImage}
                                        source={{ uri: image }}
                                        // resizeMode='contain'
                                    />
                                </View>
                            );
                        })}
                        <Text style={{
                            color: colors.textgrey,
                            fontFamily: FONTS.medium,
                            fontSize: moderateScale(15)
                        }}>Upload your image</Text>

                    </Pressable>
                </View>

                <View style={{ height: moderateScale(30) }} />

                <View style={styles.ImageUploadView}>


                    <Pressable onPress={() => videoHandle()}
                        style={styles.circle}>
                        {video == '' ?
                            <Icon
                                name="ios-cloud-upload-outline"
                                type="Ionicons"
                                resizemode="contain"
                                size={40}
                                style={{
                                    color: 'grey',
                                }}
                            />
                            :
                            <Video
                                style={{
                                    height: '100%',
                                    width: '100%',
                                    borderRadius: moderateScale(10),
                                }}
                                source={{ uri: video }} />
                        }
                        <Text style={{
                            color: colors.textgrey,
                            fontFamily: FONTS.medium,
                            fontSize: moderateScale(15)
                        }}>Upload your video</Text>
                    </Pressable>
                </View>

            </ImageBackground>
        </Container>
    );
};

export default UploadImage;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#B8ECFC',
    },
    images: {
        // height: moderateScale(70),
        width: moderateScale(70),
        borderRadius: 15,
        backgroundColor: '#f6f6f6',
        justifyContent: 'center',
        alignItems: 'center',
        // resizeMode: 'cover',
        marginLeft: moderateScale(10),
    },
    ScrollImage: {
        // resizeMode: 'contain',
        height: moderateScale(65),
        width: moderateScale(70),
        borderRadius: moderateScale(15),
    },

    circle: {
        height: moderateScale(230),
        width: moderateScale(300),
        borderRadius: moderateScale(10),
        marginTop: moderateScale(20),
        justifyContent: 'center',
        alignItems: 'center',

    },
    ImageUploadView: {
        backgroundColor: '#fff',
        height: moderateScale(230),
        width: moderateScale(300),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: moderateScale(15),
        marginTop: moderateScale(30),
        marginHorizontal: moderateScale(20),
        elevation: moderateScale(10)

    }
});