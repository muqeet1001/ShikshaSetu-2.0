import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { getItem } from '../utils/storage';

const NAVY = '#1E3A5F';
const LIGHT_BORDER = '#D6DEE8';

interface Props {
  onOpenForum: () => void;
  onOpenCourses: () => void;
  onOpenColleges: () => void;
}

const ParentDashboard = ({ onOpenForum, onOpenCourses, onOpenColleges }: Props) => {
  const [parentName, setParentName] = useState<string>('Mr./Mrs. Khan');

  useEffect(() => {
    const loadParentName = async () => {
      try {
        const userProfile = await getItem('SS_USER_PROFILE');
        if (userProfile) {
          const profile = JSON.parse(userProfile);
          const name = profile?.name || profile?.username;
          if (name) {
            setParentName(name);
          }
        }
      } catch (error) {
        console.error('Error loading parent name:', error);
      }
    };
    loadParentName();
  }, []);

  const forumDiscussions = [
    { id: 1, title: 'How to guide my child?', replies: 15, icon: '💬' },
    { id: 2, title: 'Placement worries', replies: 25, icon: '💬' },
    { id: 3, title: 'Top skills for IT students', replies: 12, icon: '💬' },
  ];

  const trendingCourses = [
    { id: 1, title: 'Advanced Resume Building', icon: '📘' },
    { id: 2, title: 'AI for Beginners', icon: '🤖' },
    { id: 3, title: 'Soft Skills Mastery', icon: '🌱' },
  ];

  const popularColleges = [
    { id: 1, name: 'TechUni', description: 'Placement Focused', icon: '🎓' },
    { id: 2, name: 'Global Institute of IT', description: 'Technology Excellence', icon: '🏛' },
    { id: 3, name: 'Innovate University', description: 'Research & Innovation', icon: '🌟' },
  ];

  const DiscussionCard = ({ discussion }: { discussion: any }) => (
    <TouchableOpacity style={styles.discussionCard} onPress={onOpenForum}>
      <View style={styles.discussionContent}>
        <Text style={styles.discussionIcon}>{discussion.icon}</Text>
        <View style={styles.discussionInfo}>
          <Text style={styles.discussionTitle}>{discussion.title}</Text>
          <Text style={styles.discussionReplies}>({discussion.replies})</Text>
        </View>
        <MaterialIcons name="chevron-right" size={20} color={NAVY} />
      </View>
    </TouchableOpacity>
  );

  const CourseCard = ({ course }: { course: any }) => (
    <TouchableOpacity style={styles.courseCard} onPress={onOpenCourses}>
      <View style={styles.courseContent}>
        <Text style={styles.courseIcon}>{course.icon}</Text>
        <Text style={styles.courseTitle}>{course.title}</Text>
        <MaterialIcons name="chevron-right" size={16} color={NAVY} />
      </View>
    </TouchableOpacity>
  );

  const CollegeCard = ({ college }: { college: any }) => (
    <TouchableOpacity style={styles.collegeCard} onPress={onOpenColleges}>
      <View style={styles.collegeContent}>
        <Text style={styles.collegeIcon}>{college.icon}</Text>
        <View style={styles.collegeInfo}>
          <Text style={styles.collegeName}>{college.name}</Text>
          <Text style={styles.collegeDescription}>{college.description}</Text>
        </View>
        <MaterialIcons name="chevron-right" size={20} color={NAVY} />
      </View>
    </TouchableOpacity>
  );

  const SectionButton = ({ title, onPress }: { title: string; onPress: () => void }) => (
    <TouchableOpacity style={styles.sectionButton} onPress={onPress}>
      <MaterialIcons name="search" size={16} color={NAVY} />
      <Text style={styles.sectionButtonText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeText}>Hi, {parentName} 👋</Text>
        <Text style={styles.welcomeSubtext}>🌟 Explore the latest trends in education for your child</Text>
      </View>

      {/* Trending Forum Discussions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🗣 Trending Forum Discussions</Text>
        <View style={styles.sectionContainer}>
          {forumDiscussions.map(discussion => (
            <DiscussionCard key={discussion.id} discussion={discussion} />
          ))}
        </View>
        <SectionButton 
          title="View All Topics" 
          onPress={onOpenForum} 
        />
      </View>

      {/* Trending Courses */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎓 Trending Courses</Text>
        <View style={styles.sectionContainer}>
          {trendingCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </View>
        <SectionButton 
          title="Explore All Courses" 
          onPress={onOpenCourses} 
        />
      </View>

      {/* Popular Colleges */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🏫 Popular Colleges</Text>
        <View style={styles.sectionContainer}>
          {popularColleges.map(college => (
            <CollegeCard key={college.id} college={college} />
          ))}
        </View>
        <SectionButton 
          title="Explore All Colleges" 
          onPress={onOpenColleges} 
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
  },
  welcomeSection: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: LIGHT_BORDER,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: NAVY,
    marginBottom: 8,
  },
  welcomeSubtext: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: NAVY,
    marginBottom: 12,
  },
  sectionContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: LIGHT_BORDER,
    marginBottom: 12,
  },
  discussionCard: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  discussionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  discussionIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  discussionInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  discussionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: NAVY,
    flex: 1,
  },
  discussionReplies: {
    fontSize: 12,
    color: '#666',
    marginLeft: 8,
  },
  courseCard: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  courseContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  courseIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  courseTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: NAVY,
    flex: 1,
  },
  collegeCard: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  collegeContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  collegeIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  collegeInfo: {
    flex: 1,
  },
  collegeName: {
    fontSize: 14,
    fontWeight: '600',
    color: NAVY,
    marginBottom: 2,
  },
  collegeDescription: {
    fontSize: 12,
    color: '#666',
  },
  sectionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F9FA',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: LIGHT_BORDER,
  },
  sectionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: NAVY,
    marginLeft: 6,
  },
});

export default ParentDashboard;