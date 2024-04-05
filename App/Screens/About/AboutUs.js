import { Dimensions, Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Card, Container, useTheme } from 'react-native-basic-elements'
import SettingsHeader from '../../Components/Header/SettingsHeader'
import { moderateScale } from '../../Constants/PixelRatio'
import { FONTS } from '../../Constants/Fonts'
import SelectLan from '../../Components/Language/SelectLan'
import { ScrollView } from 'react-native-gesture-handler'
import useSelectLangue from '../../Components/Language/useSelectLangue'
import { useSelector } from 'react-redux'

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const AboutUs = () => {

    const colors = useTheme();
    const { setLanguage } = useSelectLangue()
    const { selectLanguage } = useSelector(s => s.Language)

    return (

        <Container>
            <SettingsHeader headerText={SelectLan('About Us')} />
            <ImageBackground
                style={styles.bg_img}
                source={require('../../Assets/images/payment_bg.jpg')}
            >
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View
                        style={{
                            height: moderateScale(50)
                        }}
                    />
                    {/* <ScrollView showsVerticalScrollIndicator={false}> */}
                    <Card style={{
                        ...styles.card,
                        marginBottom: 20,
                        backgroundColor: colors.pageBackgroundColor,
                        borderColor: colors.ttextgrey,
                    }}>
                        <Image
                            source={require('../../Assets/images/blue_logo.png')}
                            style={styles.image}
                        />
                        <View style={{
                            paddingHorizontal: moderateScale(5),
                        }}>
                            <Text style={{ ...styles.MainText, color: colors.cardColor }}>
                                {SelectLan("Tasker Meaning:")}

                            </Text>
                            <Text style={{
                                color: colors.cardColor,
                                fontFamily: FONTS.bold,
                                fontSize: moderateScale(12)
                            }}>
                                {SelectLan("Tasker")}
                                <Text style={{ ...styles.smallText, color: colors.cardColor, }}>
                                    {SelectLan("= One who performs a Task; One who imposes a Task")}
                                </Text>

                            </Text>
                            <Text style={{ ...styles.MainText, color: colors.cardColor }}>
                                {SelectLan("Tasker Purpose:")}
                            </Text>
                            <Text style={{ ...styles.smallText, color: colors.cardColor, }}>
                                {SelectLan("Tasker is a Task-Matching App connecting Users who need a task performed with users who are able to perform those tasks while providing complete visibility and transparency between the two user types throughout the entire task-matching, to task-performance, to task-completion, to task payment life-cycle in a user-friendly & friction-less manner.")}
                            </Text>
                            <Text style={{ ...styles.MainText, color: colors.cardColor }}>
                                {SelectLan("Tasker Market(s):")}
                            </Text>
                            <Text style={{ ...styles.smallText, color: colors.cardColor, }}>
                                {SelectLan("Tasker currently provides its platform service to the country of Mexico. Additional markets in Latin America will soon be opened. Currently this type of Digital Task Matching Service does not exist within the country of Mexico or other Latin American countries.")}
                            </Text>
                            <Text style={{ ...styles.MainText, color: colors.cardColor }}>
                                {SelectLan("Tasker App Designed & Developed For Two Primary User Types:")}
                            </Text>
                            <Text style={{ ...styles.smallText, color: colors.cardColor, }}>
                                {SelectLan("I. Task & Service Requesters (those who impose a task)")}
                            </Text>
                            <Text style={{ ...styles.smallText, color: colors.cardColor, }}>
                                {SelectLan("II. Task & Service Providers (those who perform a task)")}
                            </Text>
                            <Text style={{ ...styles.MainText, color: colors.cardColor }}>
                                {SelectLan("Tasker Partnership(s):")}
                            </Text>
                            <Text style={{ ...styles.smallText, color: colors.cardColor, }}>
                                {setLanguage("Tasker is currently part of a technology holding company that also focuses on Financial Management, economic growth initiatives, and environmentally friendly go-green initiatives.")}
                            </Text>

                        </View>
                    </Card>
                </ScrollView>
                <View style={{ height: moderateScale(150) }} />
            </ImageBackground>
        </Container>


    )
}

export default AboutUs

const styles = StyleSheet.create({
    bg_img: {
        height: height,
        width: width,
    },
    image: {
        height: moderateScale(40),
        width: moderateScale(110),
        resizeMode: 'center',
        marginTop: moderateScale(15)
    },
    card: {
        marginHorizontal: moderateScale(15),
        borderRadius: 0,
        borderWidth: 0.2,

    },
    MainText: {
        marginTop: moderateScale(10),
        fontSize: moderateScale(14),
        fontFamily: FONTS.bold
    },
    smallText: {
        fontFamily: FONTS.medium,
        fontSize: moderateScale(12)
    }
})