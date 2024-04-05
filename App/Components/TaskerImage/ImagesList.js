import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {moderateScale} from '../../Constants/PixelRatio';
import {ScrollView} from 'react-native-gesture-handler';

const ImagesList = ({item}) => {
  return (
    <View>
      {console.log('first', item)}
      <Image
        source={{uri: item}}
        style={styles.imageUpload}
        resizeMode="cover"
      />
    </View>
  );
};

export default ImagesList;


const styles = StyleSheet.create({
  imageUpload: {
    height: moderateScale(55),
    width: moderateScale(50),
    borderRadius: moderateScale(10),
    marginTop: moderateScale(20),
    marginHorizontal: moderateScale(5),
    borderWidth:0.5,
    borderColor:'grey'
  },
});
