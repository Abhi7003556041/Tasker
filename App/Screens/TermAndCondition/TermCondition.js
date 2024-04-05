import { ActivityIndicator, Alert, Dimensions, Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Card, Container, useTheme } from 'react-native-basic-elements'
import SettingsHeader from '../../Components/Header/SettingsHeader'
import { moderateScale } from '../../Constants/PixelRatio'
import { FONTS } from '../../Constants/Fonts'
import SelectLan from '../../Components/Language/SelectLan'
import { ScrollView } from 'react-native-gesture-handler'
import useSelectLangue from '../../Components/Language/useSelectLangue'
import { useSelector } from 'react-redux';
import Pdf from 'react-native-pdf';
import RNFS from 'react-native-fs';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const TermCondition = () => {
    const [AllData, setAllData] = useState(null);
    const colors = useTheme();
    const { selectLanguage } = useSelector(s => s.Language)


    const source = selectLanguage == 'en' ? "https://fisibilitylite.s3.us-west-1.amazonaws.com/user/profile/63f5ccea2a1431e4f5f14663/5b7c46f0-0cd6-11ee-8333-795ca02ebc0a.pdf" : "https://fisibilitylite.s3.us-west-1.amazonaws.com/user/profile/63f5ccea2a1431e4f5f14663/4a350f30-0cd6-11ee-8333-795ca02ebc0a.pdf"
    useEffect(() => {

        let pdfPath = `${RNFS.CachesDirectoryPath}/${new Date().getTime()}.pdf`;
        // HttpClient.getPdf('view-invoice-details/' + route?.params?.invoice)
        // .then(r=> JSON.parse(r))
        // .then(res => {
        //     console.log(res.data);
        RNFS.downloadFile({
            fromUrl: source,
            toFile: pdfPath,
        }).promise.then(r => {
            setAllData(pdfPath);
            // this.setState({ isDone: true })
            // setAllData(res?.data);
        });
        return () => {

        }
    }, [])

    return (

        <Container>
            <SettingsHeader headerText={SelectLan('Terms & Conditions')} />
            <Image
                source={require('../../Assets/images/blue_logo.png')}
                style={styles.image}
            />
            {AllData ?
                <View style={styles.container}>
                    <Pdf
                        trustAllCerts={false}
                        source={{ uri: AllData }}
                        onLoadComplete={(numberOfPages, filePath) => {
                            console.log(`Number of pages: ${numberOfPages}`);
                        }}
                        onPageChanged={(page, numberOfPages) => {
                            console.log(`Current page: ${page}`);
                        }}
                        // onLoadProgress={}
                        onError={(error) => {
                            console.log(error);
                            Alert.alert(error)
                        }}
                        onPressLink={(uri) => {
                            console.log(`Link pressed: ${uri}`);
                        }}
                        style={styles.pdf} />
                </View> : <ActivityIndicator
                    color={"#000"}
                    size={"large"}
                    style={{ marginTop: 20 }}
                />}


        </Container>
    )
}

export default TermCondition

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    image: {
        height: moderateScale(40),
        width: moderateScale(110),
        resizeMode: 'center',
        marginTop: moderateScale(15)
    },

})