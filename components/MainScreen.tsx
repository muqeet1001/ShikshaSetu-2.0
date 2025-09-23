import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, ScrollView, Animated } from 'react-native';
import { MaterialCommunityIcons, Ionicons, MaterialIcons } from '@expo/vector-icons';
import GuidanceScreen from './GuidanceScreen';
import CoursesCollegesScreen from './CoursesCollegesScreen';
import PlanScreen from './PlanScreen';
import UpdatesScreen from './UpdatesScreen';
import Watermark from './Watermark';
import ChatBot from './ChatBot';
import { getItem } from '../utils/storage';

const { width, height } = Dimensions.get('window');
const AnimatedTouchableOpacity: any = Animated.createAnimatedComponent(TouchableOpacity);

type TabKey = 'home' | 'guidance' | 'courses' | 'plan' | 'updates';

const MainScreen = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const jump = useRef(new Animated.Value(0)).current;
  const [updatesBadge, setUpdatesBadge] = useState<{ unread: number; saved: number }>({ unread: 0, saved: 0 });
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(jump, { toValue: -6, duration: 450, useNativeDriver: true }),
        Animated.timing(jump, { toValue: 0, duration: 450, useNativeDriver: true }),
        Animated.delay(1600),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [jump]);

  // Poll updates badge counts from storage for nav badge display
  useEffect(() => {
    let mounted = true;
    const readBadges = async () => {
      try {
        const raw = await getItem('SS_UPDATES_BADGES');
        if (raw && mounted) setUpdatesBadge(JSON.parse(raw));
      } catch {}
    };
    readBadges();
    const id = setInterval(readBadges, 1500);
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Watermark />
      {/* Header */}
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
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="notifications-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          
          {/* Profile Icon */}
          <TouchableOpacity style={styles.headerIcon}>
            <MaterialCommunityIcons name="account-circle-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content Area */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {activeTab === 'home' ? (
        <View style={styles.content}>
          {/* Welcome Section */}
          <View style={styles.welcomeSection}>
            <View style={styles.welcomeHeader}>
              <Text style={styles.welcomeText}>👋 Hi, Student!</Text>
              <TouchableOpacity style={styles.languageToggle}>
                <MaterialIcons name="language" size={16} color="#1E3A5F" />
                <Text style={styles.languageText}>EN</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.searchBar}>
              <MaterialIcons name="search" size={20} color="#888" style={styles.searchIcon} />
              <Text style={styles.searchText}>Search courses, colleges, scholarships...</Text>
            </View>
          </View>

          {/* Progress Tracker */}
          <TouchableOpacity style={styles.progressSection}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressTitle}>Your Profile: 70% complete</Text>
              <MaterialIcons name="arrow-forward-ios" size={16} color="#1E3A5F" />
            </View>
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBar}>
                <View style={styles.progressFill} />
              </View>
            </View>
            <Text style={styles.progressSubtext}>Complete profile to unlock better suggestions</Text>
          </TouchableOpacity>

          {/* Main Action Cards */}
          <View style={styles.cardGrid}>
            <TouchableOpacity style={styles.card}>
              <MaterialIcons name="book" size={32} color="#1E3A5F" />
              <Text style={styles.cardText}>Find My Course</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.card}>
              <MaterialIcons name="trending-up" size={32} color="#1E3A5F" />
              <Text style={styles.cardText}>Career Paths</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.card}>
              <MaterialIcons name="location-on" size={32} color="#1E3A5F" />
              <Text style={styles.cardText}>Nearby Colleges</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.card}>
              <MaterialIcons name="school" size={32} color="#1E3A5F" />
              <Text style={styles.cardText}>Scholarships</Text>
            </TouchableOpacity>
          </View>

          {/* Important Updates / Timeline Section */}
          <View style={styles.updatesSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Upcoming Timeline</Text>
              <TouchableOpacity>
                <Text style={styles.viewAllText}>View All</Text>
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity style={styles.updateCard}>
              <View style={styles.updateIcon}>
                <MaterialIcons name="school" size={20} color="#1E3A5F" />
              </View>
              <View style={styles.updateContent}>
                <Text style={styles.updateTitle}>BA Admissions open – till 30 Sept</Text>
                <Text style={styles.updateDate}>5 days remaining</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.updateCard}>
              <View style={styles.updateIcon}>
                <MaterialIcons name="emoji-events" size={20} color="#FFD700" />
              </View>
              <View style={styles.updateContent}>
                <Text style={styles.updateTitle}>Scholarship result announcement</Text>
                <Text style={styles.updateDate}>25 Sept, 2024</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.updateCard}>
              <View style={styles.updateIcon}>
                <MaterialIcons name="video-call" size={20} color="#28A745" />
              </View>
              <View style={styles.updateContent}>
                <Text style={styles.updateTitle}>Career Counseling Webinar</Text>
                <Text style={styles.updateDate}>25 Sept at 5 PM</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Featured Section */}
          <View style={styles.featuredSection}>
            <Text style={styles.sectionTitle}>Featured</Text>
            <View style={styles.featuredCard}>
              <MaterialIcons name="emoji-events" size={24} color="#FFFFFF" />
              <View style={styles.featuredContent}>
                <Text style={styles.featuredTitle}>Scholarship of the Week</Text>
                <Text style={styles.featuredSubtitle}>Merit-based scholarship for Engineering students</Text>
              </View>
            </View>
          </View>

          {/* Success Story Section */}
          <View style={styles.successSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Success Stories</Text>
              <TouchableOpacity>
                <Text style={styles.viewAllText}>View All</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.successCard}>
              <MaterialIcons name="account-circle" size={40} color="#28A745" />
              <View style={styles.successContent}>
                <Text style={styles.successName}>Ritika from Govt. College X</Text>
                <Text style={styles.successStory}>Cleared UPSC after BA - "Government colleges provided excellent foundation for my civil services preparation"</Text>
                <Text style={styles.successTag}>🎆 UPSC Success</Text>
              </View>
            </View>
          </View>

          {/* Saved Items Quick Access */}
          <TouchableOpacity style={styles.savedSection} onPress={() => setActiveTab('plan')}>
            <MaterialIcons name="bookmark" size={20} color="#1E3A5F" />
            <Text style={styles.savedText}>Your Saved Items</Text>
            <MaterialIcons name="arrow-forward-ios" size={16} color="#1E3A5F" />
          </TouchableOpacity>
        </View>
        ) : activeTab === 'guidance' ? (
          <GuidanceScreen />
        ) : activeTab === 'courses' ? (
          <CoursesCollegesScreen />
        ) : activeTab === 'plan' ? (
          <PlanScreen />
        ) : (
          <UpdatesScreen />
        )}
      </ScrollView>

      {/* Bottom Chatbot */}
      {!chatOpen && (
        <AnimatedTouchableOpacity
          style={[styles.bottomChatbot, { transform: [{ translateY: jump }] }]}
          activeOpacity={0.9}
          onPress={() => setChatOpen(true)}
        >
          <MaterialCommunityIcons name="message-processing" size={30} color="#FFFFFF" />
          <View style={styles.botBadge}>
            <MaterialCommunityIcons name="robot" size={12} color="#FFFFFF" />
          </View>
        </AnimatedTouchableOpacity>
      )}

      {/* ChatBot Panel */}
      <ChatBot visible={chatOpen} onClose={() => setChatOpen(false)} onNavigate={(tab) => { setChatOpen(false); setActiveTab(tab as TabKey); }} />

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('home')}>
          <MaterialIcons name="home" size={24} color={activeTab === 'home' ? '#FFFFFF' : '#B0B0B0'} />
          <Text style={[styles.navText, activeTab === 'home' && styles.activeNavText]}>HOME</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('guidance')}>
          <MaterialIcons name="menu-book" size={24} color={activeTab === 'guidance' ? '#FFFFFF' : '#B0B0B0'} />
          <Text style={[styles.navText, activeTab === 'guidance' && styles.activeNavText]}>GUIDANCE</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('courses')}>
          <MaterialIcons name="school" size={24} color={activeTab === 'courses' ? '#FFFFFF' : '#B0B0B0'} />
          <Text style={[styles.navText, activeTab === 'courses' && styles.activeNavText]}>COURSES & COLLEGES</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('updates')}>
          <View style={styles.iconWithBadge}>
            <MaterialIcons name="update" size={24} color={activeTab === 'updates' ? '#FFFFFF' : '#B0B0B0'} />
            {updatesBadge.unread > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{updatesBadge.unread > 99 ? '99+' : String(updatesBadge.unread)}</Text>
              </View>
            )}
          </View>
          <Text style={[styles.navText, activeTab === 'updates' && styles.activeNavText]}>UPDATES</Text>
        </TouchableOpacity>
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
  scrollView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  welcomeSection: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#D6DEE8',
  },
  welcomeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E3A5F',
  },
  languageToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F7FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1E3A5F',
  },
  languageText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '600',
    color: '#1E3A5F',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchText: {
    flex: 1,
    fontSize: 14,
    color: '#888',
  },
  progressSection: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#D6DEE8',
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E3A5F',
  },
  progressBarContainer: {
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E5E5E5',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    width: '70%',
    backgroundColor: '#1E3A5F',
    borderRadius: 3,
  },
  progressSubtext: {
    fontSize: 12,
    color: '#666',
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    width: '47%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#D6DEE8',
  },
  cardText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#1E3A5F',
    textAlign: 'center',
  },
  updatesSection: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E3A5F',
  },
  viewAllText: {
    fontSize: 14,
    color: '#1E3A5F',
    fontWeight: '600',
  },
  updateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#D6DEE8',
  },
  updateIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  updateContent: {
    flex: 1,
  },
  updateTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  updateDate: {
    fontSize: 12,
    color: '#666',
  },
  featuredSection: {
    marginBottom: 20,
  },
  featuredCard: {
    backgroundColor: '#1E3A5F',
    padding: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featuredContent: {
    marginLeft: 12,
    flex: 1,
  },
  featuredTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  featuredSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  successSection: {
    marginBottom: 20,
  },
  successCard: {
    flexDirection: 'row',
    backgroundColor: '#F8FFF8',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#28A745',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#D6DEE8',
  },
  successContent: {
    marginLeft: 12,
    flex: 1,
  },
  successName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#28A745',
    marginBottom: 4,
  },
  successStory: {
    fontSize: 13,
    color: '#333',
    lineHeight: 18,
    marginBottom: 6,
  },
  successTag: {
    fontSize: 12,
    color: '#28A745',
    fontWeight: '600',
  },
  savedSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#D6DEE8',
  },
  savedText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    fontWeight: '600',
    color: '#1E3A5F',
  },
  bottomChatbot: {
    position: 'absolute',
    bottom: 85,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1E3A5F',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
    borderWidth: 1.5,
    borderColor: '#0F2A3F',
  },
  botBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#0F2A3F',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 1.5,
    elevation: 2,
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
  iconWithBadge: {
    position: 'relative',
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -10,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#E02424',
    paddingHorizontal: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
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

export default MainScreen;
