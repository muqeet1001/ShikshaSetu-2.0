import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type Tab = 'dashboard' | 'forum' | 'mentorship' | 'training';

interface Props {
  onNavigateToTab: (tab: Tab) => void;
}

const NAVY = '#1E3A5F';
const NAVY_DARK = '#0F2A3F';

const MentorMentorship = ({ onNavigateToTab }: Props) => {
  const mentorshipStats = [
    { label: 'Assigned Students', value: '3' },
    { label: 'Progress', value: '65%' },
    { label: 'Completed Sessions', value: '12' },
  ];

  const handleApplyCollegeMentor = () => {
    Alert.alert(
      'Apply as College Mentor',
      'Submit your application to become a college mentor. You will guide students through college selection and admission processes.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Submit Application', 
          onPress: () => {
            Alert.alert('Application Submitted', 'Your college mentor application has been submitted for review. You will receive confirmation within 24 hours.');
          }
        }
      ]
    );
  };

  const handleAlumniConnect = () => {
    Alert.alert(
      'Alumni Connect',
      'Connect with our network of successful alumni who can share their industry experience and career insights.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Browse Alumni', onPress: () => console.log('Opening alumni directory') }
      ]
    );
  };

  const handleStudentMessage = (studentName: string) => {
    Alert.alert(
      `Message ${studentName}`,
      'Send a message to discuss progress, schedule sessions, or provide guidance.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Send Message', onPress: () => console.log(`Opening chat with ${studentName}`) }
      ]
    );
  };

  const handleViewProgress = (studentName: string) => {
    Alert.alert(
      `${studentName}'s Progress`,
      'View detailed progress report including completed modules, assessments, and career development milestones.',
      [
        { text: 'Close', style: 'cancel' },
        { text: 'View Details', onPress: () => console.log(`Viewing ${studentName}'s detailed progress`) }
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Sections */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sections:</Text>
        </View>

        {/* College Mentor Application */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.actionCard} activeOpacity={0.8} onPress={handleApplyCollegeMentor}>
            <View style={styles.cardHeader}>
              <MaterialIcons name="school" size={24} color={NAVY} />
              <Text style={styles.cardTitle}>Apply as College Mentor</Text>
              <MaterialIcons name="arrow-forward-ios" size={16} color="#9CA3AF" />
            </View>
            <Text style={styles.cardDescription}>
              Guide students in college selection and admission processes
            </Text>
          </TouchableOpacity>
        </View>

        {/* Placement Mentorship */}
        <View style={styles.section}>
          <View style={styles.placementCard}>
            <View style={styles.cardHeader}>
              <MaterialIcons name="work" size={24} color={NAVY} />
              <Text style={styles.cardTitle}>Placement Mentorship</Text>
            </View>
            <Text style={styles.cardDescription}>
              Help students with interview preparation and job placement
            </Text>
            
            {/* Stats */}
            <View style={styles.statsContainer}>
              {mentorshipStats.map((stat, index) => (
                <View key={index} style={styles.statItem}>
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </View>
              ))}
            </View>

            {/* Progress Bar */}
            <View style={styles.progressSection}>
              <Text style={styles.progressLabel}>Overall Progress</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '65%' }]} />
              </View>
              <Text style={styles.progressText}>65% Complete</Text>
            </View>
          </View>
        </View>

        {/* Alumni Connect */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.actionCard} activeOpacity={0.8} onPress={handleAlumniConnect}>
            <View style={styles.cardHeader}>
              <MaterialIcons name="people" size={24} color={NAVY} />
              <Text style={styles.cardTitle}>View Alumni Connect</Text>
              <MaterialIcons name="arrow-forward-ios" size={16} color="#9CA3AF" />
            </View>
            <Text style={styles.cardDescription}>
              Connect with alumni network and leverage industry connections
            </Text>
          </TouchableOpacity>
        </View>

        {/* Current Students */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Students:</Text>
          <View style={styles.studentsContainer}>
            {[
              { name: 'Rahul Sharma', progress: 78 },
              { name: 'Priya Patel', progress: 65 },
              { name: 'Amit Singh', progress: 82 }
            ].map((student, index) => (
              <View key={index} style={styles.studentCard}>
                <TouchableOpacity 
                  style={styles.studentInfo}
                  activeOpacity={0.8}
                  onPress={() => handleViewProgress(student.name)}
                >
                  <MaterialIcons name="account-circle" size={32} color={NAVY} />
                  <View style={styles.studentDetails}>
                    <Text style={styles.studentName}>{student.name}</Text>
                    <Text style={styles.studentProgress}>Progress: {student.progress}%</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.messageButton}
                  onPress={() => handleStudentMessage(student.name)}
                >
                  <MaterialIcons name="message" size={20} color={NAVY} />
                </TouchableOpacity>
              </View>
            ))}
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
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
    marginTop: 16,
  },
  actionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  placementCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  cardDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 16,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: NAVY,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
    textAlign: 'center',
  },
  progressSection: {
    marginTop: 16,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: NAVY,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  studentsContainer: {
    gap: 12,
  },
  studentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  studentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  studentDetails: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  studentProgress: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  messageButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F0F9FF',
    borderWidth: 1,
    borderColor: '#E0E7FF',
  },
});

export default MentorMentorship;