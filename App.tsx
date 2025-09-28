import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import SplashScreen from './components/SplashScreen';
import MainScreen from './components/MainScreen';
import MentorMainScreen from './components/MentorMainScreen';
import ParentMainScreen from './components/ParentMainScreen';
import AuthGate from './components/AuthGate';
import { getItem, removeItem } from './utils/storage';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showAuth, setShowAuth] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    // Show splash screen for 3 seconds
    const timer = setTimeout(async () => {
      setShowSplash(false);
      // Show the role selection/auth screen after splash
      setShowAuth(true);
      // If you later want to auto-skip to a saved role, uncomment below:
      /*
      try {
        const authDone = await getItem('SS_AUTH_DONE');
        const userProfile = await getItem('SS_USER_PROFILE');
        if (authDone === '1' && userProfile) {
          const profile = JSON.parse(userProfile);
          setUserRole(profile.role || null);
          setShowAuth(false);
        }
      } catch (error) {}
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

  const handleBackToRoleSelection = () => {
    setShowAuth(true);
    setUserRole(null);
  };

  const handleLogout = async () => {
    console.log('[App] handleLogout start');
    try {
      const keys = [
        'SS_AUTH_DONE',
        'SS_USER_PROFILE',
        'SS_MY_PLAN',
        'SS_COMPARE',
        'SS_UPDATES_READ',
        'SS_UPDATES_SAVED',
        'SS_UPDATES_BADGES',
        'SS_TIMELINE_LIST',
      ];
      await Promise.all(keys.map(k => removeItem(k)));
    } catch {}
    // Immediately show Splash and clear user role
    setShowSplash(true);
    console.log('[App] showSplash set to true');
    setUserRole(null);
    setShowAuth(true);
    console.log('[App] userRole cleared, showAuth set to true');
    // Hide splash after 1 second
    setTimeout(() => {
      setShowSplash(false);
      console.log('[App] showSplash set to false after 1s');
    }, 1000);
  };

  const renderMainContent = () => {
    if (userRole === 'mentor') {
      return <MentorMainScreen onBackToRoleSelection={handleBackToRoleSelection} onLogout={handleLogout} />;
    } else if (userRole === 'guardian') {
      return <ParentMainScreen onBackToRoleSelection={handleBackToRoleSelection} onLogout={handleLogout} />;
    }
    // Default to regular app for students or no role
    return <MainScreen onBackToRoleSelection={handleBackToRoleSelection} onLogout={handleLogout} />;
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
