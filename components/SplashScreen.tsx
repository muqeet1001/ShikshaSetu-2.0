import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, Animated } from 'react-native';

const { width, height } = Dimensions.get('window');

const AView: any = Animated.View;
const AText: any = Animated.Text;

const MESSAGES = [
  'Believe in yourself.',
  'Every step counts.',
  'Keep pushing forward.',
  'Success is a journey.',
  'Dream big, act bigger.',
  'Your time is now.',
  'Stay positive, work hard.',
  'Small progress is progress.',
  'You are unstoppable.',
];

const SplashScreen = () => {
  const rotateValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(0.8)).current;
  const [msgIndex, setMsgIndex] = useState(0);
  const msgOpacity = useRef(new Animated.Value(0)).current;
  const msgY = useRef(new Animated.Value(6)).current;

  useEffect(() => {
    // Smooth rotating spinner
    const rotate = Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 1400,
        useNativeDriver: true,
      })
    );

    // Subtle breathing animation on the logo
    const breathe = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, { toValue: 1.04, duration: 700, useNativeDriver: true }),
        Animated.timing(scaleValue, { toValue: 0.96, duration: 700, useNativeDriver: true }),
      ])
    );

    rotate.start();
    breathe.start();

    return () => {
      rotate.stop();
      breathe.stop();
    };
  }, []);

  // Cycle motivation messages
  useEffect(() => {
    const id = setInterval(() => {
      setMsgIndex(prev => (prev + 1) % MESSAGES.length);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  // Animate message appearance on index change
  useEffect(() => {
    msgOpacity.setValue(0);
    msgY.setValue(6);
    Animated.sequence([
      Animated.parallel([
        Animated.timing(msgOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.timing(msgY, { toValue: 0, duration: 500, useNativeDriver: true }),
      ]),
      Animated.delay(900),
      Animated.timing(msgOpacity, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start();
  }, [msgIndex]);

  const spin = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Logo and loader */}
        <View style={styles.logoBlock}>
          {/* Logo with subtle breathing */}
          <AView
            style={[
              styles.logoWrapper,
              { transform: [{ scale: scaleValue }] }
            ]}
          >
            <Image 
              source={require('../assets/jammu and kashmir logo.jpeg')} 
              style={styles.logoImage}
              resizeMode="contain"
            />
          </AView>

          {/* Themed ring spinner */}
          <AView
            style={[
              styles.spinner,
              { transform: [{ rotate: spin }] }
            ]}
          />
        </View>
        
        {/* App Name */}
        <Text style={styles.appName}>Urooj</Text>
        
        {/* Government of Jammu and Kashmir text */}
        <Text style={styles.govText}>Government of Jammu and Kashmir</Text>
        
        {/* Department text */}
        <Text style={styles.ministryText}>Department of Education</Text>
        
        {/* Loading Text */}
        <Text style={styles.loadingText}>Starting app...</Text>
        <AText
          style={[styles.motivationText, { opacity: msgOpacity, transform: [{ translateY: msgY }] }]}
          numberOfLines={1}
        >
          {MESSAGES[msgIndex]}
        </AText>
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
  logoBlock: {
    marginBottom: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrapper: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  logoImage: {
    width: 175,
    height: 175,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
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
    marginTop: 22,
    fontSize: 14,
    color: '#E8E8E8',
    fontWeight: '500',
    textAlign: 'center',
  },
  spinner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginTop: 16,
    borderWidth: 4,
    // Themed dual-tone ring
    borderColor: 'rgba(255,255,255,0.18)',
    borderTopColor: '#FFFFFF',
    borderRightColor: '#E6EEF7',
  },
  motivationText: {
    marginTop: 10,
    color: '#E8E8E8',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.2,
    textAlign: 'center',
  },
});

export default SplashScreen;
