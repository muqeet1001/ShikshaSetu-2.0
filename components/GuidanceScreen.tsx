import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons, Ionicons, MaterialIcons } from '@expo/vector-icons';

const NAVY = '#1E3A5F';
const NAVY_DARK = '#0F2A3F';

const Chip = ({ iconFamily: Icon, icon, label }: { iconFamily: any; icon: any; label: string }) => (
  <TouchableOpacity style={styles.chip}>
    <Icon name={icon} size={18} color={NAVY} />
    <Text style={styles.chipLabel}>{label}</Text>
  </TouchableOpacity>
);

const GuidanceScreen = () => {
  return (
    <View style={styles.container}>
      {/* Title and Subtitle */}
      <View style={styles.headerBlock}>
        <Text style={styles.title}>Guidance</Text>
        <Text style={styles.subtitle}>Choose your path easily</Text>
      </View>

      {/* Search */}
      <View style={styles.searchBar}>
        <MaterialIcons name="search" size={20} color="#888" style={{ marginRight: 8 }} />
        <Text style={styles.searchText}>Find course, college, job...</Text>
      </View>

      {/* Quick Help Grid */}
      <View style={styles.grid}>
        <TouchableOpacity style={styles.gridCard}>
          <MaterialCommunityIcons name="target" size={28} color={NAVY} />
          <Text style={styles.gridTitle}>My Skills</Text>
          <Text style={styles.gridSub}>Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridCard}>
          <MaterialCommunityIcons name="school-outline" size={28} color={NAVY} />
          <Text style={styles.gridTitle}>After 10th</Text>
          <Text style={styles.gridSub}>or 12th?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridCard}>
          <MaterialCommunityIcons name={"route" as any} size={28} color={NAVY} />
          <Text style={styles.gridTitle}>Careers</Text>
          <Text style={styles.gridSub}>Roadmap</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridCard}>
          <MaterialCommunityIcons name="clipboard-text-outline" size={28} color={NAVY} />
          <Text style={styles.gridTitle}>Exams Info</Text>
          <Text style={styles.gridSub}>Updates</Text>
        </TouchableOpacity>
      </View>

      {/* Career Spotlight */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Career Spotlight</Text>
        <View style={styles.spotlightCard}>
          <MaterialCommunityIcons name={"teach" as any} size={28} color="#FFFFFF" />
          <View style={{ marginLeft: 12, flex: 1 }}>
            <Text style={styles.spotlightTitle}>Teacher – How to become one</Text>
            <TouchableOpacity>
              <Text style={styles.linkText}>Know More →</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Explore Paths */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Explore Paths</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 8 }}>
          <Chip iconFamily={MaterialIcons} icon="work-outline" label="Govt Jobs" />
          <Chip iconFamily={MaterialCommunityIcons} icon="school-outline" label="Teacher" />
          <Chip iconFamily={MaterialCommunityIcons} icon="hard-hat" label="Engineer" />
          <Chip iconFamily={MaterialCommunityIcons} icon="stethoscope" label="Nurse" />
          <Chip iconFamily={MaterialCommunityIcons} icon="bank" label="Banking" />
          <Chip iconFamily={MaterialCommunityIcons} icon="shield-account" label="Police" />
          <Chip iconFamily={MaterialCommunityIcons} icon="palette-outline" label="Arts" />
          <Chip iconFamily={MaterialCommunityIcons} icon="tractor" label="Farmer-Tech" />
        </ScrollView>
      </View>

      {/* Upcoming Important Dates */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Important Dates</Text>
        <View style={styles.listCard}>
          <View style={styles.listItem}>
            <MaterialCommunityIcons name="calendar" size={18} color={NAVY} />
            <Text style={styles.listText}>Scholarship deadline – Nov 15</Text>
          </View>
          <View style={styles.listItem}>
            <MaterialCommunityIcons name="calendar" size={18} color={NAVY} />
            <Text style={styles.listText}>Polytechnic entrance – Dec 20</Text>
          </View>
          <View style={styles.listItem}>
            <MaterialCommunityIcons name="calendar" size={18} color={NAVY} />
            <Text style={styles.listText}>Govt Exam application – Jan 10</Text>
          </View>
          <TouchableOpacity style={{ marginTop: 8, alignSelf: 'flex-start' }}>
            <Text style={styles.linkText}>View All Dates →</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Resources */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Resources</Text>
        <View style={styles.resourceRow}>
          <MaterialCommunityIcons name="play-circle-outline" size={22} color={NAVY} />
          <Text style={styles.resourceText}>Video: "Why Graduation Matters"</Text>
        </View>
        <View style={styles.resourceRow}>
          <MaterialCommunityIcons name="file-document-outline" size={22} color={NAVY} />
          <Text style={styles.resourceText}>Article: "Scholarships You Can Apply"</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  headerBlock: {
    marginTop: 16,
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: NAVY,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: '#374151',
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
    marginTop: 12,
  },
  searchText: {
    flex: 1,
    fontSize: 14,
    color: '#888',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  gridCard: {
    width: '47%',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#D6DEE8',
  },
  gridTitle: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '700',
    color: NAVY,
  },
  gridSub: {
    fontSize: 12,
    color: '#6B7280',
  },
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: NAVY,
    marginBottom: 8,
  },
  spotlightCard: {
    backgroundColor: NAVY,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  spotlightTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  linkText: {
    color: '#FFFFFF',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  chipLabel: {
    marginLeft: 6,
    color: NAVY,
    fontWeight: '600',
  },
  listCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#D6DEE8',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  listText: {
    marginLeft: 8,
    color: '#111827',
  },
  resourceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#D6DEE8',
  },
  resourceText: {
    marginLeft: 8,
    color: '#111827',
    fontWeight: '600',
  },
});

export default GuidanceScreen;
