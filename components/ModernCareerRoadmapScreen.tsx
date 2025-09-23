import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, StatusBar } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { CareerPath, CareerPathway, MODERN_CAREER_INTERESTS, getCareerPathsForClass, getCareerPathById } from '../data/modernCareerData';

const { width, height } = Dimensions.get('window');
const NAVY = '#1E3A5F';
const NAVY_DARK = '#0F2A3F';

interface Props {
  onBack: () => void;
}

type ScreenState = 'classSelection' | 'interestSelection' | 'roadmapView' | 'pathwayDetail';

const ModernCareerRoadmapScreen: React.FC<Props> = ({ onBack }) => {
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

  // Class Selection Screen
  const renderClassSelection = () => (
    <View style={styles.container}>
      <StatusBar backgroundColor={NAVY} barStyle="light-content" />
      
      {/* Gradient Header */}
      <LinearGradient colors={[NAVY, NAVY_DARK]} style={styles.gradientHeader}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Career Journey</Text>
          <View style={{ width: 24 }} />
        </View>
        
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>🎯 Let's Plan Your Future!</Text>
          <Text style={styles.heroSubtitle}>Every great career starts with one important decision</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.questionSection}>
          <Text style={styles.questionTitle}>What's your current status?</Text>
          <Text style={styles.questionDesc}>Choose your current class to get personalized career guidance</Text>
          
          <View style={styles.classCardsContainer}>
            <TouchableOpacity 
              style={styles.classCard}
              onPress={() => {
                setSelectedClass('10th');
                setTimeout(() => setCurrentScreen('interestSelection'), 300);
              }}
              activeOpacity={0.9}
            >
              <LinearGradient colors={['#667eea', '#764ba2']} style={styles.classCardGradient}>
                <View style={styles.classCardIcon}>
                  <MaterialCommunityIcons name="book-open-variant" size={40} color="#FFFFFF" />
                </View>
                <Text style={styles.classCardTitle}>Class 10th</Text>
                <Text style={styles.classCardSubtitle}>Just completed 10th standard</Text>
                <View style={styles.classCardBadge}>
                  <Text style={styles.classCardBadgeText}>✨ Fresh Start</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.classCard}
              onPress={() => {
                setSelectedClass('12th');
                setTimeout(() => setCurrentScreen('interestSelection'), 300);
              }}
              activeOpacity={0.9}
            >
              <LinearGradient colors={['#ff6b6b', '#ee5a6f']} style={styles.classCardGradient}>
                <View style={styles.classCardIcon}>
                  <MaterialCommunityIcons name="school" size={40} color="#FFFFFF" />
                </View>
                <Text style={styles.classCardTitle}>Class 12th</Text>
                <Text style={styles.classCardSubtitle}>Completed/Pursuing 12th</Text>
                <View style={styles.classCardBadge}>
                  <Text style={styles.classCardBadgeText}>🚀 Ready to Launch</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Stats Section */}
          <View style={styles.statsSection}>
            <Text style={styles.statsTitle}>🎉 Join 50,000+ students who found their path!</Text>
            <View style={styles.statsGrid}>
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

  // Interest Selection Screen
  const renderInterestSelection = () => {
    if (!selectedClass) return null;
    
    const availablePaths = getCareerPathsForClass(selectedClass);

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={NAVY} barStyle="light-content" />
        
        {/* Gradient Header */}
        <LinearGradient colors={[NAVY, NAVY_DARK]} style={styles.gradientHeader}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setCurrentScreen('classSelection')} style={styles.backButton}>
              <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>What Excites You?</Text>
            <View style={{ width: 24 }} />
          </View>
          
          <View style={styles.heroSection}>
            <Text style={styles.heroTitle}>✨ Discover Your Passion</Text>
            <Text style={styles.heroSubtitle}>Select what makes you excited to work every day</Text>
          </View>
        </LinearGradient>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.interestsContainer}>
            <Text style={styles.sectionTitle}>Choose Your Interest</Text>
            
            {/* 2x2 Grid Layout */}
            <View style={styles.interestsGrid}>
              {availablePaths.map((path, index) => (
                <TouchableOpacity
                  key={path.id}
                  style={[
                    styles.interestCard,
                    index % 2 === 0 ? { marginRight: 8 } : { marginLeft: 8 }
                  ]}
                  onPress={() => {
                    setSelectedCareerPath(path);
                    setCurrentScreen('roadmapView');
                  }}
                  activeOpacity={0.9}
                >
                  <LinearGradient colors={path.gradient} style={styles.interestCardGradient}>
                    <View style={styles.interestCardIcon}>
                      {path.iconFamily === 'MaterialCommunityIcons' ? (
                        <MaterialCommunityIcons name={path.icon as any} size={32} color="#FFFFFF" />
                      ) : (
                        <MaterialIcons name={path.icon as any} size={32} color="#FFFFFF" />
                      )}
                    </View>
                    <Text style={styles.interestCardTitle}>{path.name}</Text>
                    <Text style={styles.interestCardDesc}>{path.description}</Text>
                    
                    {/* Pulse Animation Indicator */}
                    <View style={styles.pulseIndicator}>
                      <View style={styles.pulse} />
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>

            {/* Confused Section */}
            <TouchableOpacity 
              style={styles.confusedCard}
              onPress={() => {
                alert('🤖 AI Quiz coming soon! This will help you discover your perfect career match.');
              }}
            >
              <LinearGradient colors={['#ffeaa7', '#fdcb6e']} style={styles.confusedCardGradient}>
                <MaterialCommunityIcons name="help-circle-outline" size={28} color={NAVY} />
                <View style={styles.confusedTextContainer}>
                  <Text style={styles.confusedTitle}>🤔 Still Confused?</Text>
                  <Text style={styles.confusedSubtitle}>Take our AI-powered quiz to find your perfect match!</Text>
                </View>
                <MaterialIcons name="arrow-forward" size={24} color={NAVY} />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  };

  // Roadmap View Screen
  const renderRoadmapView = () => {
    if (!selectedCareerPath) return null;

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={NAVY} barStyle="light-content" />
        
        {/* Dynamic Gradient Header */}
        <LinearGradient colors={selectedCareerPath.gradient} style={styles.gradientHeader}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setCurrentScreen('interestSelection')} style={styles.backButton}>
              <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Career Roadmap</Text>
            <TouchableOpacity onPress={resetFlow}>
              <MaterialIcons name="refresh" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          
          {/* Career Header */}
          <View style={styles.careerHeader}>
            <View style={styles.careerIconLarge}>
              {selectedCareerPath.iconFamily === 'MaterialCommunityIcons' ? (
                <MaterialCommunityIcons name={selectedCareerPath.icon as any} size={48} color="#FFFFFF" />
              ) : (
                <MaterialIcons name={selectedCareerPath.icon as any} size={48} color="#FFFFFF" />
              )}
            </View>
            <Text style={styles.careerTitle}>{selectedCareerPath.name}</Text>
            <Text style={styles.careerDescription}>{selectedCareerPath.description}</Text>
            {selectedCareerPath.duration && (
              <View style={styles.durationBadge}>
                <Text style={styles.durationText}>⏰ {selectedCareerPath.duration}</Text>
              </View>
            )}
          </View>
        </LinearGradient>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Journey Flow */}
          <View style={styles.journeySection}>
            <Text style={styles.sectionTitle}>🗺️ Your Journey</Text>
            <View style={styles.journeyFlow}>
              <View style={styles.journeyStep}>
                <View style={styles.journeyStepCircle}>
                  <Text style={styles.journeyStepNumber}>1</Text>
                </View>
                <Text style={styles.journeyStepText}>Class {selectedClass}</Text>
              </View>
              
              <View style={styles.journeyArrow}>
                <MaterialIcons name="arrow-forward" size={24} color={NAVY} />
              </View>
              
              <View style={styles.journeyStep}>
                <View style={[styles.journeyStepCircle, styles.activeStep]}>
                  <Text style={[styles.journeyStepNumber, styles.activeStepText]}>2</Text>
                </View>
                <Text style={styles.journeyStepText}>{selectedCareerPath.name}</Text>
              </View>
              
              <View style={styles.journeyArrow}>
                <MaterialIcons name="arrow-forward" size={24} color={NAVY} />
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
          <View style={styles.prosConsSection}>
            <Text style={styles.sectionTitle}>⚖️ Pros & Cons</Text>
            <View style={styles.prosConsGrid}>
              <View style={styles.prosCard}>
                <Text style={styles.prosConsCardTitle}>✅ Pros</Text>
                {selectedCareerPath.pros.slice(0, 3).map((pro, index) => (
                  <View key={index} style={styles.prosConsItem}>
                    <Text style={styles.prosText}>• {pro}</Text>
                  </View>
                ))}
              </View>
              
              <View style={styles.consCard}>
                <Text style={styles.prosConsCardTitle}>⚠️ Cons</Text>
                {selectedCareerPath.cons.slice(0, 3).map((con, index) => (
                  <View key={index} style={styles.prosConsItem}>
                    <Text style={styles.consText}>• {con}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* Available Pathways */}
          <View style={styles.pathwaysSection}>
            <Text style={styles.sectionTitle}>🛤️ Available Pathways</Text>
            {selectedCareerPath.pathways.map((pathway) => (
              <TouchableOpacity
                key={pathway.id}
                style={styles.pathwayCard}
                onPress={() => {
                  setSelectedPathway(pathway);
                  setCurrentScreen('pathwayDetail');
                }}
                activeOpacity={0.9}
              >
                <LinearGradient colors={['#ffffff', '#f8f9fa']} style={styles.pathwayCardGradient}>
                  <View style={styles.pathwayCardHeader}>
                    <Text style={styles.pathwayCardTitle}>{pathway.name}</Text>
                    <View style={styles.salaryBadge}>
                      <Text style={styles.salaryText}>{pathway.averageSalary}</Text>
                    </View>
                  </View>
                  <Text style={styles.pathwayCardDesc}>{pathway.description}</Text>
                  <View style={styles.pathwayCardFooter}>
                    <Text style={styles.pathwayDuration}>⏱️ {pathway.duration}</Text>
                    <View style={styles.viewDetailsButton}>
                      <Text style={styles.viewDetailsText}>View Roadmap</Text>
                      <MaterialIcons name="arrow-forward" size={16} color="#FFFFFF" />
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  };

  // Pathway Detail Screen (Enhanced)
  const renderPathwayDetail = () => {
    if (!selectedPathway) return null;

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={NAVY} barStyle="light-content" />
        
        <LinearGradient colors={selectedCareerPath?.gradient || [NAVY, NAVY_DARK]} style={styles.gradientHeader}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setCurrentScreen('roadmapView')} style={styles.backButton}>
              <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{selectedPathway.name}</Text>
            <View style={{ width: 24 }} />
          </View>
          
          <View style={styles.pathwayDetailHeader}>
            <Text style={styles.pathwayDetailTitle}>{selectedPathway.name}</Text>
            <Text style={styles.pathwayDetailSubtitle}>{selectedPathway.description}</Text>
            <View style={styles.pathwayStats}>
              <View style={styles.pathwayStat}>
                <Text style={styles.pathwayStatValue}>{selectedPathway.duration}</Text>
                <Text style={styles.pathwayStatLabel}>Duration</Text>
              </View>
              <View style={styles.pathwayStat}>
                <Text style={styles.pathwayStatValue}>{selectedPathway.averageSalary}</Text>
                <Text style={styles.pathwayStatLabel}>Avg. Salary</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Step-by-Step Roadmap */}
          <View style={styles.roadmapSection}>
            <Text style={styles.sectionTitle}>🗺️ Step-by-Step Roadmap</Text>
            <View style={styles.stepsContainer}>
              {selectedPathway.steps.map((step, index) => (
                <View key={step.id} style={styles.stepItem}>
                  <View style={styles.stepItemLeft}>
                    <View style={styles.stepNumberCircle}>
                      <Text style={styles.stepNumber}>{index + 1}</Text>
                    </View>
                    {index < selectedPathway.steps.length - 1 && (
                      <View style={styles.stepConnectorLine} />
                    )}
                  </View>
                  
                  <View style={styles.stepItemRight}>
                    <View style={styles.stepCard}>
                      <Text style={styles.stepTitle}>{step.title}</Text>
                      <Text style={styles.stepDescription}>{step.description}</Text>
                      <View style={styles.stepDurationBadge}>
                        <Text style={styles.stepDurationText}>⏰ {step.duration}</Text>
                      </View>
                      {step.requirements && (
                        <View style={styles.requirementsSection}>
                          <Text style={styles.requirementsTitle}>📋 Requirements:</Text>
                          {step.requirements.map((req, reqIndex) => (
                            <Text key={reqIndex} style={styles.requirementText}>• {req}</Text>
                          ))}
                        </View>
                      )}
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Additional Info Sections */}
          <View style={styles.additionalInfoSection}>
            <View style={styles.infoCard}>
              <Text style={styles.infoCardTitle}>🎓 Eligibility</Text>
              {selectedPathway.eligibility.map((req, index) => (
                <Text key={index} style={styles.infoText}>• {req}</Text>
              ))}
            </View>
            
            {selectedPathway.exams && selectedPathway.exams.length > 0 && (
              <View style={styles.infoCard}>
                <Text style={styles.infoCardTitle}>📝 Entrance Exams</Text>
                {selectedPathway.exams.map((exam, index) => (
                  <Text key={index} style={styles.infoText}>• {exam}</Text>
                ))}
              </View>
            )}
            
            <View style={styles.infoCard}>
              <Text style={styles.infoCardTitle}>🏫 Top Colleges</Text>
              {selectedPathway.colleges.slice(0, 5).map((college, index) => (
                <Text key={index} style={styles.infoText}>• {college}</Text>
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
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  
  // Header Styles
  gradientHeader: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  
  // Hero Section
  heroSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    lineHeight: 22,
  },
  
  // Content
  content: {
    flex: 1,
  },
  
  // Class Selection Styles
  questionSection: {
    padding: 20,
  },
  questionTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: NAVY,
    textAlign: 'center',
    marginBottom: 8,
  },
  questionDesc: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  
  classCardsContainer: {
    gap: 20,
    marginBottom: 40,
  },
  classCard: {
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  classCardGradient: {
    padding: 24,
    alignItems: 'center',
    position: 'relative',
  },
  classCardIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  classCardTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  classCardSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 16,
  },
  classCardBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  classCardBadgeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  
  // Stats Section
  statsSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginTop: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: NAVY,
    textAlign: 'center',
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: NAVY,
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  
  // Interest Selection Styles
  interestsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: NAVY,
    marginBottom: 20,
  },
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
    marginBottom: 30,
  },
  interestCard: {
    width: (width - 56) / 2, // Account for padding and gap
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  interestCardGradient: {
    padding: 20,
    alignItems: 'center',
    minHeight: 160,
    justifyContent: 'center',
    position: 'relative',
  },
  interestCardIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  interestCardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  interestCardDesc: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    lineHeight: 16,
  },
  pulseIndicator: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  pulse: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#00FF88',
  },
  
  // Confused Card
  confusedCard: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  confusedCardGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  confusedTextContainer: {
    flex: 1,
    marginLeft: 16,
    marginRight: 16,
  },
  confusedTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: NAVY,
    marginBottom: 4,
  },
  confusedSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  
  // Career Header
  careerHeader: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  careerIconLarge: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  careerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  careerDescription: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    marginBottom: 16,
  },
  durationBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  durationText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  
  // Journey Section
  journeySection: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: -10,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  journeyFlow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  journeyStep: {
    alignItems: 'center',
    flex: 1,
  },
  journeyStepCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  activeStep: {
    backgroundColor: NAVY,
  },
  journeyStepNumber: {
    fontSize: 16,
    fontWeight: '800',
    color: '#6B7280',
  },
  activeStepText: {
    color: '#FFFFFF',
  },
  journeyStepText: {
    fontSize: 12,
    fontWeight: '600',
    color: NAVY,
    textAlign: 'center',
  },
  journeyArrow: {
    paddingHorizontal: 8,
  },
  
  // Pros and Cons Section
  prosConsSection: {
    padding: 20,
  },
  prosConsGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  prosCard: {
    flex: 1,
    backgroundColor: '#DCFCE7',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#16A34A',
  },
  consCard: {
    flex: 1,
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#DC2626',
  },
  prosConsCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
    color: NAVY,
  },
  prosConsItem: {
    marginBottom: 6,
  },
  prosText: {
    fontSize: 14,
    color: '#16A34A',
    fontWeight: '500',
  },
  consText: {
    fontSize: 14,
    color: '#DC2626',
    fontWeight: '500',
  },
  
  // Pathways Section
  pathwaysSection: {
    padding: 20,
  },
  pathwayCard: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  pathwayCardGradient: {
    padding: 20,
  },
  pathwayCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  pathwayCardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: NAVY,
    flex: 1,
  },
  salaryBadge: {
    backgroundColor: '#10B981',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  salaryText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  pathwayCardDesc: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
    lineHeight: 20,
  },
  pathwayCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pathwayDuration: {
    fontSize: 14,
    fontWeight: '600',
    color: NAVY,
  },
  viewDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: NAVY,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  viewDetailsText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    marginRight: 4,
  },
  
  // Pathway Detail Header
  pathwayDetailHeader: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  pathwayDetailTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  pathwayDetailSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  pathwayStats: {
    flexDirection: 'row',
    gap: 40,
  },
  pathwayStat: {
    alignItems: 'center',
  },
  pathwayStatValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  pathwayStatLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  
  // Roadmap Section
  roadmapSection: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: -10,
    borderRadius: 16,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  stepsContainer: {
    paddingLeft: 10,
  },
  stepItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  stepItemLeft: {
    alignItems: 'center',
    marginRight: 16,
  },
  stepNumberCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: NAVY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  stepConnectorLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#E5E7EB',
    marginTop: 8,
  },
  stepItemRight: {
    flex: 1,
  },
  stepCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: NAVY,
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
    lineHeight: 20,
  },
  stepDurationBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 12,
  },
  stepDurationText: {
    fontSize: 12,
    fontWeight: '600',
    color: NAVY,
  },
  requirementsSection: {
    marginTop: 8,
  },
  requirementsTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: NAVY,
    marginBottom: 8,
  },
  requirementText: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
    marginLeft: 8,
  },
  
  // Additional Info Section
  additionalInfoSection: {
    padding: 20,
    gap: 16,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  infoCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: NAVY,
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 6,
    lineHeight: 20,
  },
});

export default ModernCareerRoadmapScreen;