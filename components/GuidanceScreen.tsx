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

import MySkillsBot from './MySkillsBot';
import ScholarshipScreen from './ScholarshipScreen';
import ThemeMatchedCareerScreen from './ThemeMatchedCareerScreen';
import ResourcesHubScreen from './ResourcesHubScreen';

const GuidanceScreen = () => {
  const [screen, setScreen] = React.useState<'home' | 'myskills' | 'scholarships' | 'careerRoadmap' | 'resources'>('home');
  return (
    <View style={styles.container}>
      {screen === 'home' ? (
        <>
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
            <TouchableOpacity style={styles.gridCard} onPress={() => setScreen('myskills')}>
              <MaterialCommunityIcons name="target" size={28} color={NAVY} />
              <Text style={styles.gridTitle}>My Skills</Text>
              <Text style={styles.gridSub}>AI Chat Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.gridCard} onPress={() => setScreen('scholarships')}>
              <MaterialCommunityIcons name="school-outline" size={28} color={NAVY} />
              <Text style={styles.gridTitle}>Scholarships</Text>
              <Text style={styles.gridSub}>Find yours</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.gridCard} onPress={() => setScreen('careerRoadmap')}>
              <MaterialCommunityIcons name="map" size={28} color={NAVY} />
              <Text style={styles.gridTitle}>After 10th</Text>
              <Text style={styles.gridSub}>or 12th?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.gridCard} onPress={() => setScreen('resources')}>
              <MaterialCommunityIcons name="book-open-page-variant" size={28} color={NAVY} />
              <Text style={styles.gridTitle}>Resources Hub</Text>
              <Text style={styles.gridSub}>Books & Tests</Text>
            </TouchableOpacity>
          </View>

          {/* Scholarship Spotlight */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Scholarship Spotlight</Text>
            <View style={styles.spotlightCard}>
              <MaterialCommunityIcons name="school" size={28} color="#FFFFFF" />
              <View style={{ marginLeft: 12, flex: 1 }}>
                <Text style={styles.spotlightTitle}>INSPIRE Scholarship – ₹80,000/year</Text>
                <TouchableOpacity onPress={() => setScreen('scholarships')}>
                  <Text style={styles.linkText}>Apply Now →</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Scholarship Categories */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Scholarship Categories</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 8 }}>
              <Chip iconFamily={MaterialIcons} icon="account-balance" label="Government" />
              <Chip iconFamily={MaterialCommunityIcons} icon="office-building" label="Private" />
              <Chip iconFamily={MaterialCommunityIcons} icon="school-outline" label="Merit Based" />
              <Chip iconFamily={MaterialCommunityIcons} icon="account-group" label="Category" />
              <Chip iconFamily={MaterialIcons} icon="female" label="Girl Child" />
              <Chip iconFamily={MaterialCommunityIcons} icon="wheelchair-accessibility" label="Disability" />
              <Chip iconFamily={MaterialCommunityIcons} icon="bank" label="Income Based" />
              <Chip iconFamily={MaterialCommunityIcons} icon="flask-outline" label="Science" />
            </ScrollView>
          </View>

          {/* Upcoming Scholarship Deadlines */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Upcoming Scholarship Deadlines</Text>
            <View style={styles.listCard}>
              <View style={styles.listItem}>
                <MaterialCommunityIcons name="calendar" size={18} color={NAVY} />
                <Text style={styles.listText}>INSPIRE Scholarship – Sept 30</Text>
              </View>
              <View style={styles.listItem}>
                <MaterialCommunityIcons name="calendar" size={18} color={NAVY} />
                <Text style={styles.listText}>Pre-Matric SC/ST – Oct 15</Text>
              </View>
              <View style={styles.listItem}>
                <MaterialCommunityIcons name="calendar" size={18} color={NAVY} />
                <Text style={styles.listText}>KVPY Registration – Nov 30</Text>
              </View>
              <View style={styles.listItem}>
                <MaterialCommunityIcons name="calendar" size={18} color={NAVY} />
                <Text style={styles.listText}>Minority Scholarship – Dec 20</Text>
              </View>
              <TouchableOpacity style={{ marginTop: 8, alignSelf: 'flex-start' }} onPress={() => setScreen('scholarships')}>
                <Text style={styles.linkText}>View All Scholarships →</Text>
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
            <TouchableOpacity style={styles.resourceRow} onPress={() => setScreen('resources')}>
              <MaterialCommunityIcons name="book-open-variant" size={22} color={NAVY} />
              <Text style={styles.resourceText}>Complete Resources Hub →</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : screen === 'myskills' ? (
        <MySkillsBot onBack={() => setScreen('home')} />
      ) : screen === 'scholarships' ? (
        <ScholarshipScreen onBack={() => setScreen('home')} />
      ) : screen === 'resources' ? (
        <ResourcesHubScreen onBack={() => setScreen('home')} />
      ) : (
        <ThemeMatchedCareerScreen onBack={() => setScreen('home')} />
      )}
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
