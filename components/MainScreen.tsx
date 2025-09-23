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
import ProfileEditor from './ProfileEditor';

const { width, height } = Dimensions.get('window');
const AnimatedTouchableOpacity: any = Animated.createAnimatedComponent(TouchableOpacity);

type TabKey = 'home' | 'guidance' | 'courses' | 'plan' | 'updates';

const MainScreen = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const jump = useRef(new Animated.Value(0)).current;
  const [updatesBadge, setUpdatesBadge] = useState<{ unread: number; saved: number }>({ unread: 0, saved: 0 });
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

  useEffect(() => {
    (async () => {
      try {
        const raw = await getItem('SS_USER_PROFILE');
        if (raw) {
          const profile = JSON.parse(raw);
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
          <TouchableOpacity style={styles.headerIcon} onPress={() => setProfileOpen(true)}>
            <MaterialCommunityIcons name="account-circle-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content Area */}
      <ProfileEditor
        visible={profileOpen}
        onClose={() => setProfileOpen(false)}
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
          {/* Welcome Section */}
          <View style={styles.welcomeSection}>
            <View style={styles.welcomeHeader}>
              <Text style={styles.welcomeText}>👋 Hi, {userName ? userName.split(' ')[0] : 'Student'}!</Text>
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

          {/* Tile 1: Find my course */}
          <View style={styles.tileCard}>
            <Text style={styles.tileHeaderTitle}>Find my course</Text>
            <Text style={styles.tileSubtitle}>“2‑minute picks → tailored courses”</Text>
            <View style={styles.tileBtnRow}>
              <TouchableOpacity style={styles.primaryBtn}><Text style={styles.primaryBtnText}>Start</Text></TouchableOpacity>
              <TouchableOpacity style={styles.outlineBtn}><Text style={styles.outlineBtnText}>Text mode</Text></TouchableOpacity>
            </View>
            <View style={styles.chipsRow}>
              {['Enjoy labs','Numbers','People','Hands-on','Design','Service'].map((c) => (
                <View key={c} style={styles.chip}><Text style={styles.chipText}>{c}</Text></View>
              ))}
            </View>
            <View style={styles.microTask}>
              <Text style={styles.microTaskText}>Micro‑task: Try 3‑line task (10 min timer)</Text>
            </View>
            <View style={styles.resultCard}>
              <Text style={styles.resultTitle}>Top matches: B.Sc Bio, B.Tech, B.Com</Text>
              <Text style={styles.resultWhy}>Why: your picks + micro‑task engagement</Text>
              <TouchableOpacity><Text style={styles.linkText}>See full list</Text></TouchableOpacity>
              <Text style={styles.sourceStamp}>Source • Updated: 23 Sep</Text>
            </View>
          </View>

          {/* Tile 2: Career path */}
          <View style={styles.tileCard}>
            <Text style={styles.tileHeaderTitle}>Career path</Text>
            <Text style={styles.tileSubtitle}>“Visual flow + options if exam not cleared”</Text>
            <View style={styles.tileBtnRow}>
              <TouchableOpacity style={styles.primaryBtn}><Text style={styles.primaryBtnText}>Open Flow</Text></TouchableOpacity>
              <TouchableOpacity style={styles.outlineBtn}><Text style={styles.outlineBtnText}>Text outline</Text></TouchableOpacity>
            </View>
            <View style={styles.flowThumb}>
              <Text style={styles.flowText}>Start → Exam decision → Study → Roles</Text>
              <View style={styles.chipsRow}>
                {['Duration','Cost','Seats','Mobility'].map((c) => (
                  <View key={c} style={styles.chip}><Text style={styles.chipText}>{c}</Text></View>
                ))}
              </View>
            </View>
            <View>
              {[{role:'Accounts Assistant'},{role:'Lab Technologist'},{role:'Field Technician'}].map((r) => (
                <View key={r.role} style={styles.roleCard}>
                  <Text style={styles.roleText}>• {r.role}</Text>
                  <TouchableOpacity><Text style={styles.linkText}>View jobs</Text></TouchableOpacity>
                </View>
              ))}
              <Text style={styles.sourceStamp}>Source: Role cards from NCS • Updated: 23 Sep</Text>
            </View>
          </View>

          {/* Tile 3: Nearby government colleges */}
          <View style={styles.tileCard}>
            <Text style={styles.tileHeaderTitle}>Nearby government colleges</Text>
            <View style={styles.filtersRow}>
              <View style={styles.filterChip}><Text style={styles.filterText}>District ▼</Text></View>
              <View style={[styles.filterChip, styles.filterActive]}><Text style={[styles.filterText, styles.filterActiveText]}>Govt only ✓</Text></View>
              <View style={styles.filterChip}><Text style={styles.filterText}>Fees ₹—₹</Text></View>
              <View style={styles.filterChip}><Text style={styles.filterText}>Medium ▼</Text></View>
            </View>
            {[{name:'Govt College X',dist:'2.1 km',fees:'₹8.5k/yr',lang:'EN/HIN',fac:'Labs • Hostel • Library',alumni:['Priya','Aamir'],src:'AY 2024–25'},
              {name:'Govt College Y',dist:'7.9 km',fees:'₹12k/yr',lang:'EN/HIN',fac:'Library • Sports',alumni:['Sameer'],src:'AY 2024–25'}].map((c,idx)=> (
              <View key={idx} style={styles.collegeCard}>
                <Text style={styles.collegeTitle}>{c.name} • {c.dist} • Fees {c.fees} • {c.lang}</Text>
                <Text style={styles.collegeSub}>Facilities: {c.fac}</Text>
                <Text style={styles.collegeSub}>From your district ({c.alumni.length}): {c.alumni.map(a => `${a} ✓`).join(', ')}</Text>
                <Text style={styles.sourceStamp}>Source • Updated: {c.src}</Text>
              </View>
            ))}
            <TouchableOpacity><Text style={styles.linkText}>See all colleges</Text></TouchableOpacity>
          </View>

          {/* Tile 4: Scholarships */}
          <View style={styles.tileCard}>
            <Text style={styles.tileHeaderTitle}>Scholarships (this week)</Text>
            <View style={styles.schRow}>
              <Text style={styles.schText}>• Post‑Matric: last date 30 Sep</Text>
              <TouchableOpacity><Text style={styles.linkText}>Add reminder</Text></TouchableOpacity>
            </View>
            <Text style={styles.schText}>• Merit‑cum‑Means: window 01–15 Oct</Text>
            <Text style={styles.schText}>• State aid: opens 05 Oct</Text>
            <Text style={styles.sourceStamp}>Source • Updated: 23 Sep</Text>
            <TouchableOpacity><Text style={styles.linkText}>View all • auto‑filter by district/caste/income</Text></TouchableOpacity>
          </View>
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
