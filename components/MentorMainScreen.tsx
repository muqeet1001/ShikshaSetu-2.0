import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import MentorDashboard from './MentorDashboard';
import MentorForum from './MentorForum';
import MentorMentorship from './MentorMentorship';
import MentorTraining from './MentorTraining';
import Watermark from './Watermark';

const NAVY = '#1E3A5F';
const NAVY_DARK = '#0F2A3F';

type Tab = 'dashboard' | 'forum' | 'mentorship' | 'training';

const MentorMainScreen = () => {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: 'home' },
    { id: 'forum', label: 'Forum', icon: 'forum' },
    { id: 'mentorship', label: 'Mentorship', icon: 'school' },
    { id: 'training', label: 'Training', icon: 'library-books' },
  ];

  const handleNavigateToTab = (tabId: Tab) => {
    setActiveTab(tabId);
  };

  const handleNotificationPress = () => {
    // TODO: Show notifications modal or navigate to notifications
    console.log('Notifications pressed');
  };


  const handleProfilePress = () => {
    // TODO: Show profile modal or navigate to profile
    console.log('Profile pressed');
  };

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <MentorDashboard onNavigateToTab={handleNavigateToTab} />;
      case 'forum':
        return <MentorForum onNavigateToTab={handleNavigateToTab} />;
      case 'mentorship':
        return <MentorMentorship onNavigateToTab={handleNavigateToTab} />;
      case 'training':
        return <MentorTraining onNavigateToTab={handleNavigateToTab} />;
      default:
        return <MentorDashboard onNavigateToTab={handleNavigateToTab} />;
    }
  };

  return (
    <View style={styles.container}>
      <Watermark />
      {/* Header matching student app */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {/* J&K Government Logo */}
          <View style={styles.headerLogoWrapper}>
            <Image 
              source={require('../assets/jammu and kashmir logo.jpeg')} 
              style={styles.headerLogo}
              resizeMode="contain"
            />
          </View>
          {/* App Name */}
          <Text style={styles.headerTitle}>Urooj</Text>
        </View>
        
        <View style={styles.headerRight}>
          {/* Notification Icon */}
          <TouchableOpacity style={styles.headerIcon} onPress={handleNotificationPress}>
            <Ionicons name="notifications-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          
          {/* Profile Icon */}
          <TouchableOpacity style={styles.headerIcon} onPress={handleProfilePress}>
            <MaterialCommunityIcons name="account-circle-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content Area */}
      <View style={styles.content}>
        {renderActiveComponent()}
      </View>

      {/* Bottom Tab Navigation matching student app */}
      <View style={styles.bottomNav}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={styles.navItem}
            onPress={() => setActiveTab(tab.id as Tab)}
            activeOpacity={0.7}
          >
            <MaterialIcons
              name={tab.icon as any}
              size={24}
              color={activeTab === tab.id ? '#FFFFFF' : '#B0B0B0'}
            />
            <Text style={[
              styles.navText,
              activeTab === tab.id && styles.activeNavText
            ]}>
              {tab.label.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#1E3A5F',
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 35,
    paddingBottom: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLogoWrapper: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
  headerLogo: {
    width: 60,
    height: 60,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginLeft: 16,
    padding: 4,
  },
  content: {
    flex: 1,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#1E3A5F',
    borderTopWidth: 1,
    borderTopColor: '#0F2A3F',
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  navText: {
    fontSize: 10,
    marginTop: 4,
    textAlign: 'center',
    color: '#B0B0B0',
    fontWeight: '500',
  },
  activeNavText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default MentorMainScreen;