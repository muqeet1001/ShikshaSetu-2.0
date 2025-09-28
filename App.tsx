import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import SplashScreen from './components/SplashScreen';
import MainScreen from './components/MainScreen';
import MentorMainScreen from './components/MentorMainScreen';
import AuthGate from './components/AuthGate';
import { getItem } from './utils/storage';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showAuth, setShowAuth] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    // Show splash screen for 3 seconds
    const timer = setTimeout(async () => {
      setShowSplash(false);
      
      // TEMPORARILY DISABLED FOR TESTING - Always show auth flow
      // Remove this comment and uncomment below code when you want to restore normal behavior
      
      /*
      // Check if user is already authenticated and get their role
      try {
        const authDone = await getItem('SS_AUTH_DONE');
        const userProfile = await getItem('SS_USER_PROFILE');
        
        if (authDone === '1' && userProfile) {
          const profile = JSON.parse(userProfile);
          setUserRole(profile.role || null);
          setShowAuth(false);
        }
      } catch (error) {
        // If there's an error reading storage, continue with auth flow
      }
      */
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleAuthComplete = async () => {
    // Get user role after auth completion
    try {
      const userProfile = await getItem('SS_USER_PROFILE');
      if (userProfile) {
        const profile = JSON.parse(userProfile);
        setUserRole(profile.role || null);
      }
    } catch (error) {
      console.error('Error getting user profile:', error);
    }
    setShowAuth(false);
  };

  const renderMainContent = () => {
    if (userRole === 'mentor') {
      return <MentorMainScreen />;
    }
    // Default to regular app for students, guardians, or no role
    return <MainScreen />;
  };

  return (
    <View style={styles.container}>
      {showSplash ? (
        <SplashScreen />
      ) : showAuth ? (
        <AuthGate onDone={handleAuthComplete} />
      ) : (
        renderMainContent()
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
