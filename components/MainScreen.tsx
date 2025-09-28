import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, ScrollView, Animated } from 'react-native';
import { MaterialCommunityIcons, Ionicons, MaterialIcons } from '@expo/vector-icons';
import GuidanceScreen from './GuidanceScreen';
import PwDSupportScreen from './PwDSupportScreen';
import CoursesCollegesScreen from './CoursesCollegesScreen';
import PlanScreen from './PlanScreen';
import UpdatesScreen from './UpdatesScreen';
import Watermark from './Watermark';
import ChatBot from './ChatBot';
import { getItem } from '../utils/storage';
import ProfileEditor from './ProfileEditor';

const { width, height } = Dimensions.get('window');
const AnimatedTouchableOpacity: any = Animated.createAnimatedComponent(TouchableOpacity);

type TabKey = 'home' | 'guidance' | 'courses' | 'plan' | 'updates';

interface Props {
  onBackToRoleSelection?: () => void;
}

const MainScreen = ({ onBackToRoleSelection, onLogout = () => {} }: Props) => {
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const jump = useRef(new Animated.Value(0)).current;
  const [updatesBadge, setUpdatesBadge] = useState<{ unread: number; saved: number }>({ unread: 0, saved: 0 });
  const [isPwd, setIsPwd] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

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

  const [userName, setUserName] = useState<string | null>(null);

  // Data for new home sections
  const successStories = [
    { name: 'Aisha', tag: 'Engineer @ Google' },
    { name: 'Umar', tag: 'Doctor @ AIIMS' },
    { name: 'Sana', tag: 'Designer @ IIT Guwahati' },
  ];
  const newsFeed = [
    '📢 NEET 2025 Registration Opens → Feb 1',
    '🎯 Scholarships open for J&K girls → Apply now',
    '🗓️ CBSE Results → May 2025',
  ];
  const localPool = [
    '📍 From Baramulla Today: Fatima got into Google',
    '💡 From Jammu: Bilal cracked UPSC!',
    '📍 From Anantnag: Aamir placed at Infosys',
    '💡 From Srinagar: Mehak won State Hackathon',
  ];
  const dayIdx = Math.floor((Date.now() / 86400000)) % localPool.length;
  const localSpot1 = localPool[dayIdx];
  const localSpot2 = localPool[(dayIdx + 1) % localPool.length];
  const quotes = [
    'Dream Big, Start Small.',
    'Consistency beats intensity.',
    'Every expert was once a beginner.',
  ];
  const quoteOfTheDay = quotes[dayIdx % quotes.length];

  useEffect(() => {
    (async () => {
      try {
        const raw = await getItem('SS_USER_PROFILE');
        if (raw) {
          const profile = JSON.parse(raw);
          setIsPwd(!!profile?.isPwd);
          const currentUsername: string | null = profile?.username ? String(profile.username) : null;
          const currentName: string | null = profile?.name ? String(profile.name) : null;
          let friendly = currentUsername || currentName;
          // If name is missing or looks like an email, derive from email
          if (!friendly || /@/.test(friendly)) {
            const email: string | null = profile?.email ? String(profile.email) : null;
            if (email) {
              const local = (email.split('@')[0] || '').replace(/[._-]+/g, ' ').trim();
              if (local) {
                friendly = local
                  .split(' ')
                  .filter(Boolean)
                  .map(w => w.charAt(0).toUpperCase() + w.slice(1))
                  .join(' ');
              }
            }
          }
          if (friendly) setUserName(friendly);
        }
      } catch {}
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Watermark />
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {/* Back Button - only show if callback provided */}
          {onBackToRoleSelection && (
            <TouchableOpacity style={styles.backButton} onPress={onBackToRoleSelection}>
              <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          )}
          
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
          <TouchableOpacity style={styles.headerIcon} onPress={() => setProfileOpen(true)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <MaterialCommunityIcons name="account-circle-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content Area */}
      <ProfileEditor
        visible={profileOpen}
        onClose={() => setProfileOpen(false)}
        onLogout={() => { setProfileOpen(false); onLogout && onLogout(); }}
        onSaved={() => {
          // refresh greeting immediately
          (async () => {
            try {
              const raw = await getItem('SS_USER_PROFILE');
              if (raw) {
                const profile = JSON.parse(raw);
                const currentUsername: string | null = profile?.username ? String(profile.username) : null;
                const currentName: string | null = profile?.name ? String(profile.name) : null;
                let friendly = currentUsername || currentName;
                if (!friendly || /@/.test(friendly)) {
                  const email: string | null = profile?.email ? String(profile.email) : null;
                  if (email) {
                    const local = (email.split('@')[0] || '').replace(/[._-]+/g, ' ').trim();
                    if (local) {
                      friendly = local
                        .split(' ')
                        .filter(Boolean)
                        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
                        .join(' ');
                    }
                  }
                }
                if (friendly) setUserName(friendly);
              }
            } catch {}
          })();
        }}
      />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {activeTab === 'home' ? (
        <View style={styles.content}>
          {isPwd ? (
            <PwDSupportScreen />
          ) : (
            <>
          {/* HERO SECTION */}
          <View style={styles.heroBanner}>
            <Text style={styles.heroTitle}>Your Future, Your Choice 🚀</Text>
            <Text style={styles.heroSub}>Discover careers, colleges & success paths</Text>
            <View style={styles.heroBtnRow}>
              <TouchableOpacity style={styles.heroButton} onPress={() => setActiveTab('guidance')}>
                <Text style={styles.heroButtonText}>🎯 Take the Career Quiz</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.heroButton} onPress={() => setActiveTab('plan')}>
                <Text style={styles.heroButtonText}>📁 Saved Plans</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* WHY EDUCATION MATTERS */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionHeaderTitle}>🎓 Did You Know?</Text>
            <View style={styles.bulletRow}><Text style={styles.bulletDot}>•</Text><Text style={styles.previewLine}>Graduates earn 2x more in lifetime</Text></View>
            <View style={styles.bulletRow}><Text style={styles.bulletDot}>•</Text><Text style={styles.previewLine}>80% of J&K toppers pursued higher studies</Text></View>
            <TouchableOpacity onPress={() => setActiveTab('guidance')}>
              <Text style={styles.linkText}>See Benefits of Graduation →</Text>
            </TouchableOpacity>
          </View>

          {/* LOCAL INSPIRATION */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionHeaderTitle}>🌟 Local Inspiration (Today)</Text>
            <Text style={styles.previewLine}>{localSpot1}</Text>
            <Text style={styles.previewLine}>{localSpot2}</Text>
            <Text style={[styles.mutedNote, { marginTop: 6 }]}>🔄 Rotates daily</Text>
          </View>

          {/* SUCCESS WALL (Carousel) */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionHeaderTitle}>🏆 Success Wall</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {successStories.map((s) => (
                <View key={s.name} style={styles.storyCard}>
                  <View style={styles.storyAvatar}>
                    <MaterialCommunityIcons name="account-circle" size={40} color="#1E3A5F" />
                  </View>
                  <Text style={styles.storyName}>{s.name}</Text>
                  <Text style={styles.storyTag}>{s.tag}</Text>
                </View>
              ))}
            </ScrollView>
            <TouchableOpacity style={{ marginTop: 8 }}>
              <Text style={styles.linkText}>View All Stories →</Text>
            </TouchableOpacity>
          </View>

          {/* WHAT'S NEW */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionHeaderTitle}>🔔 What's New</Text>
            {newsFeed.map((n, i) => (<Text key={i} style={styles.previewLine}>{n}</Text>))}
          </View>

          {/* MOTIVATION CORNER */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionHeaderTitle}>✨ Motivation Corner</Text>
            <Text style={styles.quoteLine}>Quote of the Day: “{quoteOfTheDay}”</Text>
          </View>
          </>
          )}
        </View>
        ) : activeTab === 'guidance' ? (
          <GuidanceScreen />
        ) : activeTab === 'courses' ? (
          <CoursesCollegesScreen onOpenProfile={() => setProfileOpen(true)} />
        ) : activeTab === 'plan' ? (
          <PlanScreen />
        ) : (
          <UpdatesScreen onOpenProfile={() => setProfileOpen(true)} />
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
  backButton: {
    padding: 8,
    marginRight: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  heroBanner: {
    backgroundColor: '#1E3A5F',
    padding: 18,
    borderRadius: 14,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#0F2A3F',
  },
  heroTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: '800' },
  heroSub: { color: 'rgba(255,255,255,0.9)', marginTop: 6 },
  heroBtnRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'stretch', marginTop: 12 },
  heroButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D6DEE8',
    width: '48%',
    marginTop: 8,
  },
  heroButtonText: { color: '#1E3A5F', fontWeight: '800', textAlign: 'center' },

  sectionCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#D6DEE8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeaderTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1E3A5F',
    marginBottom: 10,
  },
  bulletRow: { flexDirection: 'row', alignItems: 'flex-start', marginTop: 4 },
  bulletDot: { color: '#1E3A5F', fontWeight: '900', marginRight: 6 },
  highlightCard: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 12,
    borderRadius: 10,
    marginTop: 8,
  },
  highlightText: { color: '#0F172A', fontWeight: '600' },

  previewLine: { color: '#334155', marginTop: 4 },
  quoteLine: { color: '#334155', marginTop: 6, fontStyle: 'italic' },
  mutedNote: { color: '#64748B', fontSize: 12 },

  storyCard: {
    width: 160,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 12,
    borderRadius: 12,
    marginRight: 10,
    alignItems: 'center',
  },
  storyAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D6DEE8',
  },
  storyName: { color: '#0F172A', fontWeight: '800', marginTop: 8 },
  storyTag: { color: '#334155', marginTop: 2, fontSize: 12, textAlign: 'center' },
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

  /* Tiles */
  tileCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#D6DEE8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  tileHeaderTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1E3A5F',
  },
  tileSubtitle: {
    marginTop: 4,
    color: '#475569',
  },
  tileBtnRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  primaryBtn: {
    backgroundColor: '#1E3A5F',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    marginRight: 8,
  },
  primaryBtnText: { color: '#FFFFFF', fontWeight: '800' },
  outlineBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#1E3A5F',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  outlineBtnText: { color: '#1E3A5F', fontWeight: '800' },
  chipsRow: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#F0F7FF',
    borderWidth: 1,
    borderColor: '#D6DEE8',
    borderRadius: 14,
    marginRight: 8,
    marginTop: 8,
  },
  chipText: { color: '#1E3A5F', fontWeight: '700', fontSize: 12 },
  microTask: {
    marginTop: 12,
    backgroundColor: '#FFF7ED',
    borderColor: '#FED7AA',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  microTaskText: { color: '#9A3412', fontWeight: '600' },
  resultCard: {
    marginTop: 12,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 10,
    borderRadius: 10,
  },
  resultTitle: { color: '#0F172A', fontWeight: '700' },
  resultWhy: { color: '#475569', marginTop: 2, marginBottom: 6 },
  linkText: { color: '#1E3A5F', fontWeight: '700', textDecorationLine: 'underline' },
  sourceStamp: { color: '#64748B', fontSize: 12, marginTop: 6 },

  flowThumb: {
    marginTop: 10,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 10,
    borderRadius: 10,
  },
  flowText: { color: '#334155', fontWeight: '600' },
  roleCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 8,
  },
  roleText: { color: '#0F172A', fontWeight: '600' },

  filtersRow: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 },
  filterChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#D6DEE8',
    borderRadius: 14,
    marginRight: 8,
    marginTop: 8,
  },
  filterActive: { backgroundColor: '#E3F2FF', borderColor: '#1E3A5F' },
  filterText: { color: '#334155', fontWeight: '600', fontSize: 12 },
  filterActiveText: { color: '#1E3A5F' },

  collegeCard: {
    marginTop: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  collegeTitle: { color: '#0F172A', fontWeight: '700' },
  collegeSub: { color: '#475569', marginTop: 2 },

  schRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  schText: { color: '#0F172A' },
});

export default MainScreen;
