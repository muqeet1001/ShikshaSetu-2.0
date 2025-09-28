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

const ParentColleges = ({ onBack }: Props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');

  const types = ['All', 'Engineering', 'Medical', 'Management', 'Arts & Science', 'Technical'];

  const allColleges = [
    {
      id: 1,
      name: 'TechUni',
      fullName: 'Technical University of Excellence',
      type: 'Engineering',
      location: 'Srinagar, J&K',
      description: 'Placement Focused',
      rating: 4.5,
      fees: '₹2.5L/year',
      icon: '🎓',
      established: 2010,
      placement: '95%',
      avgPackage: '₹8.5L',
      courses: ['B.Tech CSE', 'B.Tech ECE', 'B.Tech ME', 'M.Tech'],
      facilities: ['Library', 'Labs', 'Hostel', 'Sports', 'WiFi'],
      highlights: ['Top Placement Record', 'Industry Partnerships', 'Research Excellence']
    },
    {
      id: 2,
      name: 'Global Institute of IT',
      fullName: 'Global Institute of Information Technology',
      type: 'Technical',
      location: 'Jammu, J&K',
      description: 'Technology Excellence',
      rating: 4.3,
      fees: '₹3.2L/year',
      icon: '🏛',
      established: 2005,
      placement: '88%',
      avgPackage: '₹6.2L',
      courses: ['BCA', 'MCA', 'B.Tech IT', 'M.Tech CSE'],
      facilities: ['Modern Labs', 'Library', 'Cafeteria', 'Transport'],
      highlights: ['Industry Ready Curriculum', 'Experienced Faculty', 'Modern Infrastructure']
    },
    {
      id: 3,
      name: 'Innovate University',
      fullName: 'Innovate University of Sciences',
      type: 'Engineering',
      location: 'Baramulla, J&K',
      description: 'Research & Innovation',
      rating: 4.6,
      fees: '₹2.8L/year',
      icon: '🌟',
      established: 2015,
      placement: '92%',
      avgPackage: '₹7.8L',
      courses: ['B.Tech AI/ML', 'B.Tech Robotics', 'M.Tech AI', 'PhD Programs'],
      facilities: ['Research Labs', 'Innovation Center', 'Hostels', 'Sports Complex'],
      highlights: ['Cutting-edge Research', 'Innovation Hub', 'Industry Collaborations']
    },
    {
      id: 4,
      name: 'Kashmir Medical College',
      fullName: 'Government Medical College Kashmir',
      type: 'Medical',
      location: 'Srinagar, J&K',
      description: 'Premier Medical Institution',
      rating: 4.8,
      fees: '₹1.5L/year',
      icon: '🏥',
      established: 1959,
      placement: '100%',
      avgPackage: '₹12L',
      courses: ['MBBS', 'MD', 'MS', 'DM', 'MCh'],
      facilities: ['Hospital', 'Medical Library', 'Research Centers', 'Hostels'],
      highlights: ['100% Placement', 'Experienced Faculty', 'Modern Medical Facilities']
    },
    {
      id: 5,
      name: 'Business Excellence Institute',
      fullName: 'Institute of Management & Business Excellence',
      type: 'Management',
      location: 'Jammu, J&K',
      description: 'Management Leadership',
      rating: 4.2,
      fees: '₹4.5L/year',
      icon: '💼',
      established: 2008,
      placement: '85%',
      avgPackage: '₹5.8L',
      courses: ['MBA', 'PGDM', 'Executive MBA', 'BBA'],
      facilities: ['Library', 'Seminar Halls', 'Computer Labs', 'Placement Cell'],
      highlights: ['Industry Connections', 'Case Study Method', 'Leadership Development']
    },
    {
      id: 6,
      name: 'Arts & Sciences University',
      fullName: 'University of Arts, Sciences & Humanities',
      type: 'Arts & Science',
      location: 'Anantnag, J&K',
      description: 'Liberal Arts Excellence',
      rating: 4.1,
      fees: '₹1.8L/year',
      icon: '📚',
      established: 1995,
      placement: '75%',
      avgPackage: '₹4.2L',
      courses: ['B.A', 'B.Sc', 'M.A', 'M.Sc', 'PhD'],
      facilities: ['Central Library', 'Laboratories', 'Auditorium', 'Sports Ground'],
      highlights: ['Diverse Programs', 'Research Opportunities', 'Cultural Activities']
    }
  ];

  const filteredColleges = allColleges.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         college.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         college.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         college.courses.some(course => course.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = selectedType === 'All' || college.type === selectedType;
    return matchesSearch && matchesType;
  });

  const CollegeCard = ({ college }: { college: any }) => (
    <TouchableOpacity style={styles.collegeCard}>
      <View style={styles.collegeHeader}>
        <Text style={styles.collegeIcon}>{college.icon}</Text>
        <View style={styles.collegeInfo}>
          <Text style={styles.collegeName}>{college.name}</Text>
          <Text style={styles.collegeFullName}>{college.fullName}</Text>
          <View style={styles.collegeMetaRow}>
            <View style={styles.ratingContainer}>
              <MaterialIcons name="star" size={14} color="#FFD700" />
              <Text style={styles.ratingText}>{college.rating}</Text>
            </View>
            <View style={styles.typeBadge}>
              <Text style={styles.typeText}>{college.type}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.locationRow}>
        <MaterialIcons name="location-on" size={14} color="#666" />
        <Text style={styles.locationText}>{college.location}</Text>
        <Text style={styles.establishedText}>• Est. {college.established}</Text>
      </View>
      
      <Text style={styles.collegeDescription}>{college.description}</Text>
      
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Placement</Text>
          <Text style={styles.statValue}>{college.placement}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Avg Package</Text>
          <Text style={styles.statValue}>{college.avgPackage}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Fees</Text>
          <Text style={styles.statValue}>{college.fees}</Text>
        </View>
      </View>

      <View style={styles.coursesSection}>
        <Text style={styles.coursesTitle}>Popular Courses:</Text>
        <View style={styles.coursesContainer}>
          {college.courses.slice(0, 3).map((course: string, index: number) => (
            <View key={index} style={styles.courseTag}>
              <Text style={styles.courseText}>{course}</Text>
            </View>
          ))}
          {college.courses.length > 3 && (
            <Text style={styles.moreCourses}>+{college.courses.length - 3} more</Text>
          )}
        </View>
      </View>

      <View style={styles.highlightsSection}>
        <Text style={styles.highlightsTitle}>Key Highlights:</Text>
        {college.highlights.slice(0, 2).map((highlight: string, index: number) => (
          <View key={index} style={styles.highlightItem}>
            <MaterialIcons name="check-circle" size={12} color="#10B981" />
            <Text style={styles.highlightText}>{highlight}</Text>
          </View>
        ))}
      </View>
      
      <View style={styles.collegeFooter}>
        <TouchableOpacity style={styles.detailsButton}>
          <Text style={styles.detailsButtonText}>View Details</Text>
          <MaterialIcons name="arrow-forward" size={16} color={NAVY} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.compareButton}>
          <MaterialIcons name="compare-arrows" size={16} color="#666" />
          <Text style={styles.compareButtonText}>Compare</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton}>
          <MaterialIcons name="bookmark-border" size={18} color="#666" />
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
        <Text style={styles.headerTitle}>Popular Colleges</Text>
        <TouchableOpacity style={styles.mapButton}>
          <MaterialIcons name="map" size={24} color={NAVY} />
        </TouchableOpacity>
      </View>

      {/* Search and Filter */}
      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <MaterialIcons name="search" size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search colleges, courses..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#666"
          />
        </View>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.typesScroll}
        >
          {types.map(type => (
            <TouchableOpacity
              key={type}
              style={[
                styles.typeButton,
                selectedType === type && styles.activeTypeButton
              ]}
              onPress={() => setSelectedType(type)}
            >
              <Text style={[
                styles.typeButtonText,
                selectedType === type && styles.activeTypeButtonText
              ]}>
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Results */}
      <ScrollView style={styles.collegesList} showsVerticalScrollIndicator={false}>
        <Text style={styles.resultsText}>
          {filteredColleges.length} college{filteredColleges.length !== 1 ? 's' : ''} found
        </Text>
        
        {filteredColleges.map(college => (
          <CollegeCard key={college.id} college={college} />
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
  mapButton: {
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
  typesScroll: {
    flexDirection: 'row',
  },
  typeButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    marginRight: 8,
    borderWidth: 1,
    borderColor: LIGHT_BORDER,
  },
  activeTypeButton: {
    backgroundColor: NAVY,
    borderColor: NAVY,
  },
  typeButtonText: {
    fontSize: 12,
    color: NAVY,
    fontWeight: '500',
  },
  activeTypeButtonText: {
    color: '#FFFFFF',
  },
  collegesList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  resultsText: {
    fontSize: 12,
    color: '#666',
    marginVertical: 12,
  },
  collegeCard: {
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
  collegeHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  collegeIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  collegeInfo: {
    flex: 1,
  },
  collegeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: NAVY,
    marginBottom: 4,
  },
  collegeFullName: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
  },
  collegeMetaRow: {
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
  typeBadge: {
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  typeText: {
    fontSize: 10,
    color: NAVY,
    fontWeight: '500',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
    flex: 1,
  },
  establishedText: {
    fontSize: 12,
    color: '#666',
  },
  collegeDescription: {
    fontSize: 14,
    color: NAVY,
    fontWeight: '600',
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingVertical: 8,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 10,
    color: '#666',
    marginBottom: 2,
  },
  statValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: NAVY,
  },
  coursesSection: {
    marginBottom: 12,
  },
  coursesTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: NAVY,
    marginBottom: 6,
  },
  coursesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  courseTag: {
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: LIGHT_BORDER,
  },
  courseText: {
    fontSize: 10,
    color: NAVY,
    fontWeight: '500',
  },
  moreCourses: {
    fontSize: 10,
    color: '#666',
    alignSelf: 'center',
  },
  highlightsSection: {
    marginBottom: 12,
  },
  highlightsTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: NAVY,
    marginBottom: 6,
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  highlightText: {
    fontSize: 11,
    color: '#666',
    marginLeft: 6,
  },
  collegeFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: LIGHT_BORDER,
  },
  detailsButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: NAVY,
    marginRight: 4,
  },
  compareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  compareButtonText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  saveButton: {
    padding: 8,
  },
});

export default ParentColleges;