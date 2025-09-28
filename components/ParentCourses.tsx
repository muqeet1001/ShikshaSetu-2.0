import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const NAVY = '#1E3A5F';
const LIGHT_BORDER = '#D6DEE8';

interface Props {
  onBack: () => void;
}

const ParentCourses = ({ onBack }: Props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Technical Skills', 'Soft Skills', 'Career Development', 'Exam Prep', 'Personal Growth'];

  const allCourses = [
    {
      id: 1,
      title: 'Advanced Resume Building',
      instructor: 'Career Experts',
      duration: '3 hours',
      level: 'Beginner',
      rating: 4.8,
      students: 1234,
      price: 'Free',
      category: 'Career Development',
      icon: '📘',
      description: 'Learn to create compelling resumes that stand out to employers.',
      skills: ['Resume Writing', 'LinkedIn Optimization', 'Interview Prep']
    },
    {
      id: 2,
      title: 'AI for Beginners',
      instructor: 'Dr. Tech Guru',
      duration: '8 hours',
      level: 'Beginner',
      rating: 4.6,
      students: 2156,
      price: '₹999',
      category: 'Technical Skills',
      icon: '🤖',
      description: 'Understanding AI fundamentals and their real-world applications.',
      skills: ['Machine Learning Basics', 'Python', 'Data Science']
    },
    {
      id: 3,
      title: 'Soft Skills Mastery',
      instructor: 'Communication Pro',
      duration: '6 hours',
      level: 'Intermediate',
      rating: 4.9,
      students: 3421,
      price: '₹1499',
      category: 'Soft Skills',
      icon: '🌱',
      description: 'Master essential soft skills for professional success.',
      skills: ['Communication', 'Leadership', 'Time Management']
    },
    {
      id: 4,
      title: 'JEE Main Strategy 2024',
      instructor: 'IIT Faculty',
      duration: '12 hours',
      level: 'Advanced',
      rating: 4.7,
      students: 5678,
      price: '₹2999',
      category: 'Exam Prep',
      icon: '🎯',
      description: 'Comprehensive JEE Main preparation strategy and tips.',
      skills: ['Physics', 'Chemistry', 'Mathematics', 'Test Strategy']
    },
    {
      id: 5,
      title: 'Public Speaking Confidence',
      instructor: 'Speaker Coach',
      duration: '4 hours',
      level: 'Beginner',
      rating: 4.5,
      students: 987,
      price: 'Free',
      category: 'Personal Growth',
      icon: '🎤',
      description: 'Overcome fear and become a confident public speaker.',
      skills: ['Public Speaking', 'Confidence Building', 'Presentation Skills']
    },
    {
      id: 6,
      title: 'Digital Marketing Fundamentals',
      instructor: 'Marketing Expert',
      duration: '10 hours',
      level: 'Intermediate',
      rating: 4.4,
      students: 2890,
      price: '₹1999',
      category: 'Technical Skills',
      icon: '📱',
      description: 'Learn digital marketing strategies and tools.',
      skills: ['SEO', 'Social Media Marketing', 'Content Marketing']
    }
  ];

  const filteredCourses = allCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const CourseCard = ({ course }: { course: any }) => (
    <TouchableOpacity style={styles.courseCard}>
      <View style={styles.courseHeader}>
        <Text style={styles.courseIcon}>{course.icon}</Text>
        <View style={styles.courseInfo}>
          <Text style={styles.courseTitle}>{course.title}</Text>
          <Text style={styles.instructorName}>by {course.instructor}</Text>
          <View style={styles.courseMetaRow}>
            <View style={styles.ratingContainer}>
              <MaterialIcons name="star" size={14} color="#FFD700" />
              <Text style={styles.ratingText}>{course.rating}</Text>
              <Text style={styles.studentsText}>({course.students})</Text>
            </View>
            <View style={styles.levelBadge}>
              <Text style={styles.levelText}>{course.level}</Text>
            </View>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text style={[styles.priceText, course.price === 'Free' && styles.freePrice]}>
            {course.price}
          </Text>
        </View>
      </View>
      
      <Text style={styles.courseDescription}>{course.description}</Text>
      
      <View style={styles.skillsContainer}>
        {course.skills.slice(0, 3).map((skill: string, index: number) => (
          <View key={index} style={styles.skillTag}>
            <Text style={styles.skillText}>{skill}</Text>
          </View>
        ))}
        {course.skills.length > 3 && (
          <Text style={styles.moreSkills}>+{course.skills.length - 3} more</Text>
        )}
      </View>
      
      <View style={styles.courseFooter}>
        <View style={styles.durationContainer}>
          <MaterialIcons name="access-time" size={14} color="#666" />
          <Text style={styles.durationText}>{course.duration}</Text>
        </View>
        <TouchableOpacity style={styles.enrollButton}>
          <Text style={styles.enrollButtonText}>
            {course.price === 'Free' ? 'Enroll Free' : 'View Course'}
          </Text>
          <MaterialIcons name="arrow-forward" size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color={NAVY} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Trending Courses</Text>
        <TouchableOpacity style={styles.filterButton}>
          <MaterialIcons name="filter-list" size={24} color={NAVY} />
        </TouchableOpacity>
      </View>

      {/* Search and Filter */}
      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <MaterialIcons name="search" size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search courses, skills..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#666"
          />
        </View>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.categoriesScroll}
        >
          {categories.map(category => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.activeCategoryButton
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={[
                styles.categoryButtonText,
                selectedCategory === category && styles.activeCategoryButtonText
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Results */}
      <ScrollView style={styles.coursesList} showsVerticalScrollIndicator={false}>
        <Text style={styles.resultsText}>
          {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} found
        </Text>
        
        {filteredCourses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: LIGHT_BORDER,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: NAVY,
    flex: 1,
    textAlign: 'center',
  },
  filterButton: {
    padding: 8,
  },
  searchSection: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: LIGHT_BORDER,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: NAVY,
  },
  categoriesScroll: {
    flexDirection: 'row',
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    marginRight: 8,
    borderWidth: 1,
    borderColor: LIGHT_BORDER,
  },
  activeCategoryButton: {
    backgroundColor: NAVY,
    borderColor: NAVY,
  },
  categoryButtonText: {
    fontSize: 12,
    color: NAVY,
    fontWeight: '500',
  },
  activeCategoryButtonText: {
    color: '#FFFFFF',
  },
  coursesList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  resultsText: {
    fontSize: 12,
    color: '#666',
    marginVertical: 12,
  },
  courseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: LIGHT_BORDER,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  courseHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  courseIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  courseInfo: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: NAVY,
    marginBottom: 4,
  },
  instructorName: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
  },
  courseMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: NAVY,
    marginLeft: 2,
  },
  studentsText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  levelBadge: {
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  levelText: {
    fontSize: 10,
    color: NAVY,
    fontWeight: '500',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: NAVY,
  },
  freePrice: {
    color: '#10B981',
  },
  courseDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  skillTag: {
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: LIGHT_BORDER,
  },
  skillText: {
    fontSize: 11,
    color: NAVY,
    fontWeight: '500',
  },
  moreSkills: {
    fontSize: 11,
    color: '#666',
    alignSelf: 'center',
    marginLeft: 4,
  },
  courseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  enrollButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: NAVY,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  enrollButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    marginRight: 6,
  },
});

export default ParentCourses;