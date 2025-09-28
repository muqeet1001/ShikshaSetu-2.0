import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import ParentDashboard from './ParentDashboard';
import Watermark from './Watermark';
import ParentForumDiscussions from './ParentForumDiscussions';
import CoursesCollegesScreen from './CoursesCollegesScreen';
import UpdatesScreen from './UpdatesScreen';
import ProfileEditor from './ProfileEditor';
import { removeItem } from '../utils/storage';

const NAVY = '#1E3A5F';
const NAVY_DARK = '#0F2A3F';

interface Props {
  onBackToRoleSelection: () => void;
  onLogout: () => void;
}

const ParentMainScreen = ({ onBackToRoleSelection, onLogout }: Props) => {
  const [active, setActive] = useState<'dashboard' | 'forum' | 'courses' | 'colleges' | 'updates'>('dashboard');
  const [showProfile, setShowProfile] = useState(false);

  const handleNotificationPress = () => {
    setActive('updates');
  };

  const handleProfilePress = () => {
    setShowProfile(true);
  };

  const handleLogout = async () => {
    console.log('[ParentMainScreen] handleLogout called');
    setShowProfile(false);
    onLogout();
  };

  return (
    <View style={styles.container}>
      <Watermark />
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {/* Back Button */}
          <TouchableOpacity style={styles.backButton} onPress={onBackToRoleSelection}>
            <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          
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
          <TouchableOpacity style={styles.headerIcon} onPress={handleNotificationPress} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Ionicons name="notifications-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          
          {/* Profile Icon */}
          <TouchableOpacity style={styles.headerIcon} onPress={handleProfilePress} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <MaterialCommunityIcons name="account-circle-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content Area */}
      <View style={styles.content}>
        {active === 'dashboard' && (
          <ParentDashboard
            onOpenForum={() => setActive('forum')}
            onOpenCourses={() => setActive('courses')}
            onOpenColleges={() => setActive('colleges')}
          />
        )}
        {active === 'forum' && (
          <ParentForumDiscussions onBack={() => setActive('dashboard')} onOpenProfile={() => setShowProfile(true)} />
        )}
        {(active === 'courses' || active === 'colleges') && (
          <CoursesCollegesScreen
            initialTab={active === 'courses' ? 'courses' : 'colleges'}
            onBack={() => setActive('dashboard')}
            onOpenProfile={() => setShowProfile(true)}
          />
        )}
        {active === 'updates' && (
          <UpdatesScreen onBack={() => setActive('dashboard')} onOpenProfile={() => setShowProfile(true)} />
        )}
      </View>

      <ProfileEditor visible={showProfile} onClose={() => setShowProfile(false)} onLogout={handleLogout} />
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
  backButton: {
    padding: 8,
    marginRight: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
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
});

export default ParentMainScreen;