import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const SplashScreen = () => {
  const rotateValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Rotating animation for the outer circle
    const rotate = Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    );

    // Scaling animation for logo entrance
    const scale = Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]);

    rotate.start();
    scale.start();

    return () => {
      rotate.stop();
      scale.stop();
    };
  }, []);

  const spin = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* J&K Government Logo with Animated Loader */}
        <View style={styles.emblemContainer}>
          {/* Outer Rotating Circle */}
          <Animated.View 
            style={[
              styles.outerCircle,
              {
                transform: [{ rotate: spin }]
              }
            ]}
          >
            <View style={styles.circleSegment1} />
            <View style={styles.circleSegment2} />
            <View style={styles.circleSegment3} />
          </Animated.View>
          
          {/* Logo with scale animation */}
          <Animated.View 
            style={[
              styles.logoWrapper,
              {
                transform: [{ scale: scaleValue }]
              }
            ]}
          >
            <Image 
              source={require('../assets/jammu and kashmir logo.jpeg')} 
              style={styles.logoImage}
              resizeMode="contain"
            />
          </Animated.View>
        </View>
        
        {/* App Name */}
        <Text style={styles.appName}>shikshasetu</Text>
        
        {/* Government of Jammu and Kashmir text */}
        <Text style={styles.govText}>Government of Jammu and Kashmir</Text>
        
        {/* Department text */}
        <Text style={styles.ministryText}>Department of Education</Text>
        
        {/* Loading Text */}
        <Text style={styles.loadingText}>Loading Shikshasetu...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E3A5F', // Deep blue background similar to government apps
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emblemContainer: {
    marginBottom: 40,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerCircle: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleSegment1: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 3,
    borderColor: 'transparent',
    borderTopColor: '#FFFFFF', // White
    borderRightColor: '#FFFFFF',
  },
  circleSegment2: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'transparent',
    borderBottomColor: '#4A90E2', // Blue
    borderLeftColor: '#4A90E2',
  },
  circleSegment3: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: 120,
    borderWidth: 2,
    borderColor: 'transparent',
    borderTopColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent white
    borderLeftColor: 'rgba(255, 255, 255, 0.7)',
  },
  logoWrapper: {
    width: 170,
    height: 170,
    borderRadius: 85, // Perfect circle
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden', // Keep it circular
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 12,
    zIndex: 10, // Above the rotating circles
  },
  logoImage: {
    width: 180,
    height: 180,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    textTransform: 'lowercase',
    letterSpacing: 1,
  },
  govText: {
    fontSize: 16,
    color: '#E8E8E8',
    marginBottom: 5,
    textAlign: 'center',
  },
  ministryText: {
    fontSize: 14,
    color: '#D0D0D0',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  loadingText: {
    marginTop: 50,
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default SplashScreen;