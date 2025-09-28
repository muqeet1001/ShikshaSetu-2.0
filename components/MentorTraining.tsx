import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type Tab = 'dashboard' | 'forum' | 'mentorship' | 'training';

interface Props {
  onNavigateToTab: (tab: Tab) => void;
}

const NAVY = '#1E3A5F';
const NAVY_DARK = '#0F2A3F';

const MentorTraining = ({ onNavigateToTab }: Props) => {
  const upcomingClasses = [
    { title: 'AI Career Talk', attendees: 40, date: 'Tomorrow 3PM', status: 'confirmed' },
    { title: 'Data Science Fundamentals', attendees: 25, date: 'Wed 5PM', status: 'pending' },
  ];

  const recentInterviews = [
    { candidate: 'Arjun Kumar', position: 'Software Engineer', date: 'Yesterday', earning: '₹500' },
    { candidate: 'Sneha Reddy', position: 'Data Analyst', date: '2 days ago', earning: '₹500' },
  ];

  const handleHostNewClass = () => {
    Alert.alert(
      'Host a New Class',
      'Create a new training session to share your expertise with students. Choose your topic and schedule.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Create Class', onPress: () => console.log('Creating new training class') }
      ]
    );
  };

  const handleApplyAsInterviewer = () => {
    Alert.alert(
      'Apply as Interviewer',
      'Join our panel of expert interviewers. Help students prepare for their careers while earning money.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Apply Now', 
          onPress: () => {
            Alert.alert('Application Submitted', 'Your interviewer application has been submitted. Our team will review and contact you within 48 hours.');
          }
        }
      ]
    );
  };

  const handleJoinInterview = () => {
    Alert.alert(
      'Join Interview Session',
      'Ready to conduct the interview with Rohit Sharma for Full Stack Developer position at TechCorp Solutions?',
      [
        { text: 'Not Now', style: 'cancel' },
        { text: 'Join Now', onPress: () => console.log('Joining interview session') }
      ]
    );
  };

  const handleClassAction = (className: string, action: string) => {
    Alert.alert(
      `${className}`,
      `${action} this training session. You can manage attendees, update content, or start the session.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: action, onPress: () => console.log(`${action} ${className}`) }
      ]
    );
  };

  const handleViewEarnings = () => {
    Alert.alert(
      'Earnings Details',
      'This Month: ₹4,500\nTotal Interviews: 12\nAverage Rating: 4.8⭐\n\nPayment will be processed on the 1st of next month.',
      [{ text: 'OK' }]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Training Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Training:</Text>
          
          {/* Host New Class Button */}
          <TouchableOpacity style={styles.hostButton} activeOpacity={0.8} onPress={handleHostNewClass}>
            <MaterialIcons name="add" size={24} color="#FFFFFF" />
            <Text style={styles.hostButtonText}>Host a New Class</Text>
          </TouchableOpacity>

          {/* Upcoming Classes */}
          <View style={styles.classesContainer}>
            {upcomingClasses.map((classItem, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.classCard} 
                activeOpacity={0.8}
                onPress={() => handleClassAction(classItem.title, classItem.status === 'confirmed' ? 'Start Session' : 'Edit Class')}
              >
                <View style={styles.classHeader}>
                  <View style={styles.classInfo}>
                    <Text style={styles.classTitle}>{classItem.title}</Text>
                    <View style={styles.classDetails}>
                      <MaterialIcons name="people" size={16} color="#6B7280" />
                      <Text style={styles.classDetail}>Attendees: {classItem.attendees}</Text>
                    </View>
                    <View style={styles.classDetails}>
                      <MaterialIcons name="schedule" size={16} color="#6B7280" />
                      <Text style={styles.classDetail}>{classItem.date}</Text>
                    </View>
                  </View>
                  <View style={[
                    styles.statusBadge,
                    classItem.status === 'confirmed' ? styles.confirmedBadge : styles.pendingBadge
                  ]}>
                    <Text style={[
                      styles.statusText,
                      classItem.status === 'confirmed' ? styles.confirmedText : styles.pendingText
                    ]}>
                      {classItem.status.toUpperCase()}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Interview Role Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Interview Role:</Text>
          
          {/* Apply as Interviewer */}
          <TouchableOpacity style={styles.actionCard} activeOpacity={0.8} onPress={handleApplyAsInterviewer}>
            <View style={styles.cardHeader}>
              <MaterialIcons name="assignment-ind" size={24} color={NAVY} />
              <Text style={styles.cardTitle}>Apply as Interviewer</Text>
              <MaterialIcons name="arrow-forward-ios" size={16} color="#9CA3AF" />
            </View>
            <Text style={styles.cardDescription}>
              Conduct technical interviews and earn money for your expertise
            </Text>
          </TouchableOpacity>

          {/* Next Interview */}
          <View style={styles.interviewCard}>
            <View style={styles.cardHeader}>
              <MaterialIcons name="event" size={24} color={NAVY} />
              <Text style={styles.cardTitle}>Next Interview: Tomorrow 5PM</Text>
            </View>
            <View style={styles.interviewDetails}>
              <View style={styles.interviewInfo}>
                <Text style={styles.candidateLabel}>Candidate: Rohit Sharma</Text>
                <Text style={styles.positionLabel}>Position: Full Stack Developer</Text>
                <Text style={styles.companyLabel}>Company: TechCorp Solutions</Text>
              </View>
              <TouchableOpacity style={styles.joinButton} onPress={handleJoinInterview}>
                <Text style={styles.joinButtonText}>Join Interview</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Earnings Summary */}
          <TouchableOpacity style={styles.earningsCard} activeOpacity={0.8} onPress={handleViewEarnings}>
            <View style={styles.earningsHeader}>
              <MaterialIcons name="account-balance-wallet" size={24} color={NAVY} />
              <Text style={styles.earningsTitle}>Earnings Summary</Text>
            </View>
            <View style={styles.earningsStats}>
              <View style={styles.earningsStat}>
                <Text style={styles.earningsValue}>₹4,500</Text>
                <Text style={styles.earningsLabel}>This Month</Text>
              </View>
              <View style={styles.earningsStat}>
                <Text style={styles.earningsValue}>12</Text>
                <Text style={styles.earningsLabel}>Interviews</Text>
              </View>
              <View style={styles.earningsStat}>
                <Text style={styles.earningsValue}>4.8</Text>
                <Text style={styles.earningsLabel}>Rating</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Recent Interviews */}
          <View style={styles.recentSection}>
            <Text style={styles.subsectionTitle}>Recent Interviews:</Text>
            <View style={styles.recentContainer}>
              {recentInterviews.map((interview, index) => (
                <View key={index} style={styles.recentItem}>
                  <View style={styles.recentInfo}>
                    <Text style={styles.recentCandidate}>{interview.candidate}</Text>
                    <Text style={styles.recentPosition}>{interview.position}</Text>
                    <Text style={styles.recentDate}>{interview.date}</Text>
                  </View>
                  <View style={styles.earningAmount}>
                    <Text style={styles.earningText}>{interview.earning}</Text>
                  </View>
                </View>
              ))}
            </View>
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
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 16,
    marginTop: 16,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  hostButton: {
    backgroundColor: NAVY,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 16,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  hostButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
  classesContainer: {
    gap: 12,
  },
  classCard: {
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
  classHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  classInfo: {
    flex: 1,
  },
  classTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  classDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  classDetail: {
    fontSize: 14,
    color: '#6B7280',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 8,
  },
  confirmedBadge: {
    backgroundColor: '#D1FAE5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  pendingBadge: {
    backgroundColor: '#FEF3C7',
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  confirmedText: {
    color: '#065F46',
  },
  pendingText: {
    color: '#92400E',
  },
  actionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
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
  interviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  interviewDetails: {
    marginTop: 12,
  },
  interviewInfo: {
    marginBottom: 12,
  },
  candidateLabel: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 4,
  },
  positionLabel: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 4,
  },
  companyLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  joinButton: {
    backgroundColor: '#10B981',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  joinButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  earningsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  earningsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  earningsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  earningsStats: {
    flexDirection: 'row',
    gap: 20,
  },
  earningsStat: {
    alignItems: 'center',
    flex: 1,
  },
  earningsValue: {
    fontSize: 20,
    fontWeight: '800',
    color: NAVY,
  },
  earningsLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  recentSection: {
    marginTop: 8,
  },
  recentContainer: {
    gap: 8,
  },
  recentItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recentInfo: {
    flex: 1,
  },
  recentCandidate: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  recentPosition: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  recentDate: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
  earningAmount: {
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  earningText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#166534',
  },
});

export default MentorTraining;