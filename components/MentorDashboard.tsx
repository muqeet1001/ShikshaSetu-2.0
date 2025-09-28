import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { getItem } from '../utils/storage';

type Tab = 'dashboard' | 'forum' | 'mentorship' | 'training';

interface Props {
  onNavigateToTab: (tab: Tab) => void;
}

const NAVY = '#1E3A5F';
const NAVY_DARK = '#0F2A3F';

const MentorDashboard = ({ onNavigateToTab }: Props) => {
  const [mentorName, setMentorName] = useState<string>('Mentor');

  const stats = [
    { label: 'Students Assigned', value: '3', icon: 'people' },
    { label: 'Interviews Scheduled', value: '1', icon: 'event' },
    { label: 'Trainings This Week', value: '2', icon: 'event-note' },
  ];

  const impactStats = [
    { label: 'Students Guided', value: '12', icon: 'school' },
    { label: 'Avg Feedback', value: '⭐ 4.7', icon: 'star' },
    { label: 'Sessions This Month', value: '5', icon: 'calendar-today' },
  ];

  const upcomingSchedule = [
    { title: 'Mock Interview', time: 'Tomorrow 5PM', icon: 'assignment-ind' },
    { title: 'Training', time: 'Oct 2, 6 PM', icon: 'event-note' },
  ];

  const opportunities = [
    { title: 'Apply as College Mentor', icon: 'school' },
    { title: 'Host Training', icon: 'library-books' },
    { title: 'Take Interviews', icon: 'assignment-ind' },
  ];

  const studentHighlights = [
    'Aditi got an internship! 🎉',
    '3 students hit 80% progress 📈',
  ];

  const forumHighlights = [
    { title: 'Resume Mistakes', replies: 23 },
  ];

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'Join Forum':
        onNavigateToTab('forum');
        break;
      case 'Start Mentor':
        onNavigateToTab('mentorship');
        break;
      case 'Host Training':
        onNavigateToTab('training');
        break;
      default:
        break;
    }
  };

  const handleOpportunityPress = (opportunity: string) => {
    switch (opportunity) {
      case 'Apply as College Mentor':
        Alert.alert(
          'Apply as College Mentor',
          'This will open the college mentor application form. Are you ready to guide students in college selection?',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Apply Now', onPress: () => onNavigateToTab('mentorship') }
          ]
        );
        break;
      case 'Host Training':
        Alert.alert(
          'Host Training',
          'Create a new training session to share your expertise with students.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Create Training', onPress: () => onNavigateToTab('training') }
          ]
        );
        break;
      case 'Take Interviews':
        Alert.alert(
          'Take Interviews',
          'Join our interviewer panel and help students prepare for their careers.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Apply as Interviewer', onPress: () => onNavigateToTab('training') }
          ]
        );
        break;
      default:
        break;
    }
  };

  const handleJoinForum = () => {
    onNavigateToTab('forum');
  };


  useEffect(() => {
    const loadMentorProfile = async () => {
      try {
        const userProfile = await getItem('SS_USER_PROFILE');
        if (userProfile) {
          const profile = JSON.parse(userProfile);
          const name = profile?.name || profile?.username || 'Mentor';
          // Get first name only
          const firstName = name.split(' ')[0];
          setMentorName(firstName);
        }
      } catch (error) {
        console.log('Error loading mentor profile:', error);
      }
    };
    loadMentorProfile();
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Welcome Message */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Hi, Mentor {mentorName} 👋</Text>
        </View>

        {/* Stats Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Stats:</Text>
          <View style={styles.statsContainer}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <MaterialIcons name={stat.icon as any} size={24} color={NAVY} />
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Your Impact */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 Your Impact</Text>
          <View style={styles.impactContainer}>
            {impactStats.map((stat, index) => (
              <View key={index} style={styles.impactItem}>
                <MaterialIcons name={stat.icon as any} size={20} color={NAVY} />
                <Text style={styles.impactText}>{stat.label}: {stat.value}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Upcoming Schedule */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📅 Upcoming Schedule</Text>
          <View style={styles.scheduleContainer}>
            {upcomingSchedule.map((item, index) => (
              <View key={index} style={styles.scheduleItem}>
                <MaterialIcons name={item.icon as any} size={20} color={NAVY} />
                <View style={styles.scheduleContent}>
                  <Text style={styles.scheduleTitle}>{item.title}: {item.time}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Opportunities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🚀 Opportunities</Text>
          <View style={styles.opportunitiesContainer}>
            {opportunities.map((opportunity, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.opportunityButton} 
                activeOpacity={0.8}
                onPress={() => handleOpportunityPress(opportunity.title)}
              >
                <MaterialIcons name={opportunity.icon as any} size={20} color="#FFFFFF" />
                <Text style={styles.opportunityButtonText}>{opportunity.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Student Highlights */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎉 Student Highlights</Text>
          <View style={styles.highlightsContainer}>
            {studentHighlights.map((highlight, index) => (
              <View key={index} style={styles.highlightItem}>
                <Text style={styles.highlightText}>- {highlight}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Forum Highlights */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💬 Forum Highlights</Text>
          <View style={styles.forumContainer}>
            {forumHighlights.map((thread, index) => (
              <View key={index} style={styles.forumItem}>
                <MaterialIcons name="forum" size={16} color={NAVY} />
                <Text style={styles.forumText}>- {thread.title} ({thread.replies} replies)</Text>
              </View>
            ))}
            <TouchableOpacity style={styles.joinForumButton} activeOpacity={0.8} onPress={handleJoinForum}>
              <MaterialIcons name="forum" size={18} color="#FFFFFF" />
              <Text style={styles.joinForumButtonText}>Join Forum</Text>
            </TouchableOpacity>
          </View>
        </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
  },
  welcomeSection: {
    paddingVertical: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    minWidth: 100,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: NAVY,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 4,
    fontWeight: '500',
  },
  impactContainer: {
    gap: 8,
  },
  impactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 12,
  },
  impactText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  scheduleContainer: {
    gap: 8,
  },
  scheduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 12,
  },
  scheduleContent: {
    flex: 1,
  },
  scheduleTitle: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  opportunitiesContainer: {
    gap: 10,
  },
  opportunityButton: {
    backgroundColor: NAVY,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  opportunityButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  highlightsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  highlightItem: {
    marginBottom: 6,
  },
  highlightText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  forumContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  forumItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  forumText: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },
  joinForumButton: {
    backgroundColor: NAVY,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginTop: 12,
    gap: 6,
  },
  joinForumButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default MentorDashboard;