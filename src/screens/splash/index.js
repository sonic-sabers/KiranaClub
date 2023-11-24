import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { screen } from '../../components/screenDimensions';
import FastImage from 'react-native-fast-image';
import Colors from '../../constants/Colors';

const CARD_WIDTH = screen.width / 1.5;
const IMAGE_CONTAINER_ASPECT_RATIO = 756 / 136;
const IMAGE_CONTAINER_WIDTH = CARD_WIDTH;
const IMAGE_CONTAINER_HEIGHT = IMAGE_CONTAINER_WIDTH / IMAGE_CONTAINER_ASPECT_RATIO

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.white.default} barStyle={'light-content'} />
      <FastImage style={{ height: IMAGE_CONTAINER_HEIGHT, width: IMAGE_CONTAINER_WIDTH }} source={require('../../assets/images/KiranaClub.png')} resizeMode='cover' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }
})