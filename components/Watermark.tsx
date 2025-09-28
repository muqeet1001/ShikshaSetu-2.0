import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const BASE_SIZE = Math.min(width, height) * 0.8; // increased size for better visibility

const Watermark = () => {
  return (
    <View pointerEvents="none" style={styles.wrapper}>
      <Image
        source={require('../assets/map.png')}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1, // keep watermark behind all interactive content
    elevation: 0,
  },
  image: {
    width: BASE_SIZE,
    height: BASE_SIZE,
    opacity: 0.165, // slightly stronger visibility
    resizeMode: 'contain',
  },
});

export default Watermark;
