import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, StatusBar } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { CareerPath, CareerPathway, MODERN_CAREER_INTERESTS, getCareerPathsForClass, getCareerPathById } from '../data/modernCareerData';

const { width, height } = Dimensions.get('window');
const NAVY = '#1E3A5F';
const NAVY_DARK = '#0F2A3F';

interface Props {
  onBack: () => void;
}

type ScreenState = 'classSelection' | 'interestSelection' | 'roadmapView' | 'pathwayDetail';

const ThemeMatchedCareerScreen: React.FC<Props> = ({ onBack }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenState>('classSelection');
  const [selectedClass, setSelectedClass] = useState<'10th' | '12th' | null>(null);
  const [selectedCareerPath, setSelectedCareerPath] = useState<CareerPath | null>(null);
  const [selectedPathway, setSelectedPathway] = useState<CareerPathway | null>(null);

  const resetFlow = () => {
    setCurrentScreen('classSelection');
    setSelectedClass(null);
    setSelectedCareerPath(null);
    setSelectedPathway(null);
  };

  // Class Selection Screen - Matching your exact theme
  const renderClassSelection = () => (
    <View style={styles.container}>
      <StatusBar backgroundColor={NAVY} barStyle="light-content" />
      
      {/* Header - Exactly like your MainScreen header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={onBack} style={styles.headerIcon}>
            <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Career Planning</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Hero Banner - Exactly like your MainScreen heroBanner */}
          <View style={styles.heroBanner}>
            <Text style={styles.heroTitle}>🎯 Plan Your Career Path</Text>
            <Text style={styles.heroSub}>Choose your current class to get personalized guidance</Text>
          </View>

          {/* Class Selection Cards */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionHeaderTitle}>What's your current status?</Text>
            <Text style={styles.previewLine}>Select your class to see relevant career opportunities</Text>
            
            <View style={styles.classOptionsContainer}>
              <TouchableOpacity 
                style={styles.classOptionCard}
                onPress={() => {
                  setSelectedClass('10th');
                  setTimeout(() => setCurrentScreen('interestSelection'), 200);
                }}
              >
                <View style={styles.classOptionIcon}>
                  <MaterialCommunityIcons name="book-open-variant" size={32} color={NAVY} />
                </View>
                <Text style={styles.classOptionTitle}>Class 10th</Text>
                <Text style={styles.classOptionDesc}>Just completed 10th standard</Text>
                <View style={styles.classOptionBadge}>
                  <Text style={styles.classOptionBadgeText}>✨ Fresh Start</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.classOptionCard}
                onPress={() => {
                  setSelectedClass('12th');
                  setTimeout(() => setCurrentScreen('interestSelection'), 200);
                }}
              >
                <View style={styles.classOptionIcon}>
                  <MaterialCommunityIcons name="school" size={32} color={NAVY} />
                </View>
                <Text style={styles.classOptionTitle}>Class 12th</Text>
                <Text style={styles.classOptionDesc}>Completed/Pursuing 12th</Text>
                <View style={styles.classOptionBadge}>
                  <Text style={styles.classOptionBadgeText}>🚀 Ready to Launch</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Success Stats - Like your success stories */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionHeaderTitle}>🎉 Join the Success Stories</Text>
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>50K+</Text>
                <Text style={styles.statLabel}>Students Guided</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>15+</Text>
                <Text style={styles.statLabel}>Career Paths</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>95%</Text>
                <Text style={styles.statLabel}>Success Rate</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );

  // Interest Selection Screen - Clean grid like your app
  const renderInterestSelection = () => {
    if (!selectedClass) return null;
    
    const availablePaths = getCareerPathsForClass(selectedClass);

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={NAVY} barStyle="light-content" />
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => setCurrentScreen('classSelection')} style={styles.headerIcon}>
              <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>What Excites You?</Text>
          </View>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            {/* Hero Banner */}
            <View style={styles.heroBanner}>
              <Text style={styles.heroTitle}>✨ Choose Your Passion</Text>
              <Text style={styles.heroSub}>Select what makes you excited to work every day</Text>
            </View>

            {/* Interests Grid */}
            <View style={styles.sectionCard}>
              <Text style={styles.sectionHeaderTitle}>Career Interests</Text>
              <Text style={styles.previewLine}>Pick the field that interests you the most</Text>
              
              {/* Perfect 2x2 Grid */}
              <View style={styles.interestsGrid}>
                {availablePaths.map((path, index) => (
                  <TouchableOpacity
                    key={path.id}
                    style={styles.interestCard}
                    onPress={() => {
                      setSelectedCareerPath(path);
                      setCurrentScreen('roadmapView');
                    }}
                  >
                    <View style={styles.interestIconContainer}>
                      {path.iconFamily === 'MaterialCommunityIcons' ? (
                        <MaterialCommunityIcons name={path.icon as any} size={28} color={NAVY} />
                      ) : (
                        <MaterialIcons name={path.icon as any} size={28} color={NAVY} />
                      )}
                    </View>
                    <Text style={styles.interestTitle}>{path.name}</Text>
                    <Text style={styles.interestDesc}>{path.description}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Confused Section */}
            <View style={styles.sectionCard}>
              <TouchableOpacity 
                style={styles.confusedOption}
                onPress={() => {
                  alert('🤖 AI Quiz will help you discover your perfect career match!');
                }}
              >
                <MaterialCommunityIcons name="help-circle-outline" size={24} color={NAVY} />
                <View style={styles.confusedTextContainer}>
                  <Text style={styles.confusedTitle}>🤔 Still Confused?</Text>
                  <Text style={styles.confusedSubtitle}>Take our AI-powered quiz to find your perfect match</Text>
                </View>
                <MaterialIcons name="arrow-forward" size={20} color={NAVY} />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  };

  // Roadmap View Screen - Clean like your app's sections
  const renderRoadmapView = () => {
    if (!selectedCareerPath) return null;

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={NAVY} barStyle="light-content" />
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => setCurrentScreen('interestSelection')} style={styles.headerIcon}>
              <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Career Roadmap</Text>
          </View>
          <TouchableOpacity onPress={resetFlow} style={styles.headerIcon}>
            <MaterialIcons name="refresh" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            {/* Career Header */}
            <View style={styles.heroBanner}>
              <View style={styles.careerHeaderIcon}>
                {selectedCareerPath.iconFamily === 'MaterialCommunityIcons' ? (
                  <MaterialCommunityIcons name={selectedCareerPath.icon as any} size={40} color="#FFFFFF" />
                ) : (
                  <MaterialIcons name={selectedCareerPath.icon as any} size={40} color="#FFFFFF" />
                )}
              </View>
              <Text style={styles.heroTitle}>{selectedCareerPath.name}</Text>
              <Text style={styles.heroSub}>{selectedCareerPath.description}</Text>
              {selectedCareerPath.duration && (
                <View style={styles.durationBadge}>
                  <Text style={styles.durationText}>⏰ {selectedCareerPath.duration}</Text>
                </View>
              )}
            </View>

            {/* Journey Flow */}
            <View style={styles.sectionCard}>
              <Text style={styles.sectionHeaderTitle}>🗺️ Your Journey</Text>
              <View style={styles.journeyFlow}>
                <View style={styles.journeyStep}>
                  <View style={styles.journeyStepCircle}>
                    <Text style={styles.journeyStepNumber}>1</Text>
                  </View>
                  <Text style={styles.journeyStepText}>Class {selectedClass}</Text>
                </View>
                
                <View style={styles.journeyArrow}>
                  <MaterialIcons name="arrow-forward" size={20} color={NAVY} />
                </View>
                
                <View style={styles.journeyStep}>
                  <View style={[styles.journeyStepCircle, styles.activeStep]}>
                    <Text style={[styles.journeyStepNumber, styles.activeStepText]}>2</Text>
                  </View>
                  <Text style={styles.journeyStepText}>{selectedCareerPath.name}</Text>
                </View>
                
                <View style={styles.journeyArrow}>
                  <MaterialIcons name="arrow-forward" size={20} color={NAVY} />
                </View>
                
                <View style={styles.journeyStep}>
                  <View style={styles.journeyStepCircle}>
                    <Text style={styles.journeyStepNumber}>3</Text>
                  </View>
                  <Text style={styles.journeyStepText}>Success! 🎉</Text>
                </View>
              </View>
            </View>

            {/* Pros and Cons */}
            <View style={styles.sectionCard}>
              <Text style={styles.sectionHeaderTitle}>⚖️ Pros & Cons</Text>
              <View style={styles.prosConsGrid}>
                <View style={styles.prosSection}>
                  <Text style={styles.prosConsTitle}>✅ Pros</Text>
                  {selectedCareerPath.pros.slice(0, 4).map((pro, index) => (
                    <View key={index} style={styles.bulletRow}>
                      <Text style={styles.bulletDot}>•</Text>
                      <Text style={styles.prosText}>{pro}</Text>
                    </View>
                  ))}
                </View>
                
                <View style={styles.consSection}>
                  <Text style={styles.prosConsTitle}>⚠️ Cons</Text>
                  {selectedCareerPath.cons.slice(0, 4).map((con, index) => (
                    <View key={index} style={styles.bulletRow}>
                      <Text style={styles.bulletDot}>•</Text>
                      <Text style={styles.consText}>{con}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>

            {/* Available Pathways */}
            <View style={styles.sectionCard}>
              <Text style={styles.sectionHeaderTitle}>🛤️ Available Pathways</Text>
              <Text style={styles.previewLine}>Choose a specific path to see detailed roadmap</Text>
              
              {selectedCareerPath.pathways.map((pathway) => (
                <TouchableOpacity
                  key={pathway.id}
                  style={styles.pathwayCard}
                  onPress={() => {
                    setSelectedPathway(pathway);
                    setCurrentScreen('pathwayDetail');
                  }}
                >
                  <View style={styles.pathwayHeader}>
                    <Text style={styles.pathwayTitle}>{pathway.name}</Text>
                    <View style={styles.salaryBadge}>
                      <Text style={styles.salaryText}>{pathway.averageSalary}</Text>
                    </View>
                  </View>
                  <Text style={styles.pathwayDesc}>{pathway.description}</Text>
                  <View style={styles.pathwayFooter}>
                    <Text style={styles.pathwayDuration}>⏱️ {pathway.duration}</Text>
                    <View style={styles.viewDetailsBtn}>
                      <Text style={styles.viewDetailsBtnText}>View Roadmap</Text>
                      <MaterialIcons name="arrow-forward" size={16} color="#FFFFFF" />
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  };

  // Pathway Detail Screen - Clean detailed view
  const renderPathwayDetail = () => {
    if (!selectedPathway) return null;

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={NAVY} barStyle="light-content" />
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => setCurrentScreen('roadmapView')} style={styles.headerIcon}>
              <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{selectedPathway.name}</Text>
          </View>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            {/* Pathway Header */}
            <View style={styles.heroBanner}>
              <Text style={styles.heroTitle}>{selectedPathway.name}</Text>
              <Text style={styles.heroSub}>{selectedPathway.description}</Text>
              <View style={styles.pathwayStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{selectedPathway.duration}</Text>
                  <Text style={styles.statLabel}>Duration</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{selectedPathway.averageSalary}</Text>
                  <Text style={styles.statLabel}>Avg. Salary</Text>
                </View>
              </View>
            </View>

            {/* Step-by-Step Roadmap */}
            <View style={styles.sectionCard}>
              <Text style={styles.sectionHeaderTitle}>🗺️ Step-by-Step Roadmap</Text>
              <View style={styles.stepsContainer}>
                {selectedPathway.steps.map((step, index) => (
                  <View key={step.id} style={styles.stepItem}>
                    <View style={styles.stepNumber}>
                      <Text style={styles.stepNumberText}>{index + 1}</Text>
                    </View>
                    <View style={styles.stepContent}>
                      <View style={styles.stepCard}>
                        <Text style={styles.stepTitle}>{step.title}</Text>
                        <Text style={styles.stepDescription}>{step.description}</Text>
                        <View style={styles.stepDurationBadge}>
                          <Text style={styles.stepDurationText}>⏰ {step.duration}</Text>
                        </View>
                        {step.requirements && step.requirements.length > 0 && (
                          <View style={styles.requirementsSection}>
                            <Text style={styles.requirementsTitle}>📋 Requirements:</Text>
                            {step.requirements.map((req, reqIndex) => (
                              <View key={reqIndex} style={styles.bulletRow}>
                                <Text style={styles.bulletDot}>•</Text>
                                <Text style={styles.requirementText}>{req}</Text>
                              </View>
                            ))}
                          </View>
                        )}
                      </View>
                    </View>
                    {index < selectedPathway.steps.length - 1 && (
                      <View style={styles.stepConnector} />
                    )}
                  </View>
                ))}
              </View>
            </View>

            {/* Additional Information */}
            <View style={styles.sectionCard}>
              <Text style={styles.sectionHeaderTitle}>🎓 Eligibility Criteria</Text>
              {selectedPathway.eligibility.map((req, index) => (
                <View key={index} style={styles.bulletRow}>
                  <Text style={styles.bulletDot}>•</Text>
                  <Text style={styles.previewLine}>{req}</Text>
                </View>
              ))}
            </View>

            {selectedPathway.exams && selectedPathway.exams.length > 0 && (
              <View style={styles.sectionCard}>
                <Text style={styles.sectionHeaderTitle}>📝 Entrance Exams</Text>
                {selectedPathway.exams.map((exam, index) => (
                  <View key={index} style={styles.bulletRow}>
                    <Text style={styles.bulletDot}>•</Text>
                    <Text style={styles.previewLine}>{exam}</Text>
                  </View>
                ))}
              </View>
            )}

            <View style={styles.sectionCard}>
              <Text style={styles.sectionHeaderTitle}>🏫 Top Colleges</Text>
              {selectedPathway.colleges.slice(0, 5).map((college, index) => (
                <View key={index} style={styles.bulletRow}>
                  <Text style={styles.bulletDot}>•</Text>
                  <Text style={styles.previewLine}>{college}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  };

  // Main render logic
  switch (currentScreen) {
    case 'classSelection':
      return renderClassSelection();
    case 'interestSelection':
      return renderInterestSelection();
    case 'roadmapView':
      return renderRoadmapView();
    case 'pathwayDetail':
      return renderPathwayDetail();
    default:
      return renderClassSelection();
  }
};

const styles = StyleSheet.create({
  // Base styles - Exactly matching your app
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  
  // Header - Exactly like MainScreen
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
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 0.5,
    marginLeft: 12,
  },
  headerIcon: {
    padding: 4,
  },
  
  // Content - Exactly like MainScreen
  scrollView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  
  // Hero Banner - Exactly like MainScreen heroBanner
  heroBanner: {
    backgroundColor: '#1E3A5F',
    padding: 18,
    borderRadius: 14,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#0F2A3F',
    alignItems: 'center',
  },
  heroTitle: { 
    color: '#FFFFFF', 
    fontSize: 18, 
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 6,
  },
  heroSub: { 
    color: 'rgba(255,255,255,0.9)', 
    textAlign: 'center',
    lineHeight: 20,
  },
  
  // Section Cards - Exactly like MainScreen sectionCard
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
  previewLine: { 
    color: '#334155', 
    marginTop: 4,
    lineHeight: 20,
  },
  bulletRow: { 
    flexDirection: 'row', 
    alignItems: 'flex-start', 
    marginTop: 4 
  },
  bulletDot: { 
    color: '#1E3A5F', 
    fontWeight: '900', 
    marginRight: 6 
  },
  
  // Class Selection - Clean cards
  classOptionsContainer: {
    marginTop: 16,
    gap: 16,
  },
  classOptionCard: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  classOptionIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#D6DEE8',
  },
  classOptionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1E3A5F',
    marginBottom: 4,
  },
  classOptionDesc: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 12,
  },
  classOptionBadge: {
    backgroundColor: '#F0F7FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#D6DEE8',
  },
  classOptionBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E3A5F',
  },
  
  // Stats - Like your success stories
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1E3A5F',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  
  // Interest Grid - Perfect 2x2
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  interestCard: {
    width: '47%',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  interestIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#D6DEE8',
  },
  interestTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E3A5F',
    marginBottom: 4,
    textAlign: 'center',
  },
  interestDesc: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 16,
  },
  
  // Confused Option
  confusedOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF7ED',
    borderWidth: 1,
    borderColor: '#FED7AA',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  confusedTextContainer: {
    flex: 1,
    marginLeft: 12,
    marginRight: 12,
  },
  confusedTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E3A5F',
    marginBottom: 2,
  },
  confusedSubtitle: {
    fontSize: 12,
    color: '#6B7280',
  },
  
  // Career Header
  careerHeaderIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  durationBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    marginTop: 12,
  },
  durationText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  
  // Journey Flow
  journeyFlow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  journeyStep: {
    alignItems: 'center',
    flex: 1,
  },
  journeyStepCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  activeStep: {
    backgroundColor: '#1E3A5F',
  },
  journeyStepNumber: {
    fontSize: 14,
    fontWeight: '800',
    color: '#6B7280',
  },
  activeStepText: {
    color: '#FFFFFF',
  },
  journeyStepText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1E3A5F',
    textAlign: 'center',
  },
  journeyArrow: {
    paddingHorizontal: 8,
  },
  
  // Pros and Cons
  prosConsGrid: {
    marginTop: 16,
  },
  prosSection: {
    marginBottom: 16,
  },
  consSection: {},
  prosConsTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E3A5F',
    marginBottom: 8,
  },
  prosText: {
    fontSize: 14,
    color: '#059669',
    lineHeight: 20,
  },
  consText: {
    fontSize: 14,
    color: '#DC2626',
    lineHeight: 20,
  },
  
  // Pathway Cards
  pathwayCard: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 16,
    borderRadius: 12,
    marginTop: 12,
  },
  pathwayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  pathwayTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E3A5F',
    flex: 1,
  },
  salaryBadge: {
    backgroundColor: '#10B981',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  salaryText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  pathwayDesc: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
    lineHeight: 18,
  },
  pathwayFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pathwayDuration: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1E3A5F',
  },
  viewDetailsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E3A5F',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  viewDetailsBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
    marginRight: 4,
  },
  
  // Pathway Stats
  pathwayStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
  },
  
  // Steps Container
  stepsContainer: {
    marginTop: 16,
  },
  stepItem: {
    flexDirection: 'row',
    marginBottom: 16,
    position: 'relative',
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#1E3A5F',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    zIndex: 1,
  },
  stepNumberText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  stepContent: {
    flex: 1,
  },
  stepCard: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 12,
    borderRadius: 10,
  },
  stepTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E3A5F',
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 8,
    lineHeight: 18,
  },
  stepDurationBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#F0F7FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D6DEE8',
    marginBottom: 8,
  },
  stepDurationText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#1E3A5F',
  },
  requirementsSection: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  requirementsTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E3A5F',
    marginBottom: 6,
  },
  requirementText: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 16,
  },
  stepConnector: {
    position: 'absolute',
    left: 13,
    top: 28,
    bottom: -16,
    width: 2,
    backgroundColor: '#E2E8F0',
    zIndex: 0,
  },
});

export default ThemeMatchedCareerScreen;