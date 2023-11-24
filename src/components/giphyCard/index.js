import { View, TouchableOpacity, Pressable } from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import styles from './styles';
import Colors from '../../constants/Colors';
import alpha from 'color-alpha';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';


const GiphyCard = ({
  uri,
  onPressWhatsapp,
  onPressDownload,
  isDarkTheme,
  onPlay,
  isPlaying,
}) => {
  return (
    <Animated.View
      entering={FadeInUp.duration(400)}
      exiting={FadeInDown.duration(400)}>
      <Pressable
        onPress={onPlay}
        style={[
          styles.giphyCard,
          {
            backgroundColor: isDarkTheme
              ? Colors.black.light
              : Colors.white.default,
          },
        ]}>
        <TouchableOpacity style={[styles.playContainer, { backgroundColor: alpha(!isDarkTheme ? Colors.white.default : Colors.black.default, 0.6), }]} onPress={onPlay} >
          {isPlaying ? (
            <AntDesign
              size={22}
              name="pausecircle"
              color={isDarkTheme ? Colors.white.default : Colors.black.default}
            />
          ) : (
            <AntDesign
              size={22}
              name="play"
              color={isDarkTheme ? Colors.white.default : Colors.black.default}
            />
          )}
        </TouchableOpacity>
        <FastImage style={styles.gif} source={{ uri }} />
        <View style={styles.iconView}>
          <TouchableOpacity onPress={onPressWhatsapp} activeOpacity={0.7}>
            <Fontisto
              size={22}
              name="whatsapp"
              color={isDarkTheme ? Colors.white.default : Colors.black.default}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressDownload} activeOpacity={0.5}>
            <Feather
              size={22}
              name="download"
              color={isDarkTheme ? Colors.white.default : Colors.black.default}
            />
          </TouchableOpacity>

        </View>
      </Pressable>
    </Animated.View>

  );
};

export default GiphyCard;
