import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import SplashScreen from './components/SplashScreen';
import MainScreen from './components/MainScreen';
import AuthGate from './components/AuthGate';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showAuth, setShowAuth] = useState(true);

  useEffect(() => {
    // Show splash screen for 3 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {showSplash ? (
        <SplashScreen />
      ) : showAuth ? (
        <AuthGate onDone={() => setShowAuth(false)} />
      ) : (
        <MainScreen />
      )}
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
