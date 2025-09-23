import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { CareerPath, CareerPathway, PathwayStep, CAREER_INTERESTS, getCareerPathsForClass, getCareerPathById } from '../data/careerData';

const NAVY = '#1E3A5F';
const NAVY_DARK = '#0F2A3F';

interface Props {
  onBack: () => void;
}

type ScreenState = 'classSelection' | 'interestSelection' | 'roadmapView' | 'pathwayDetail';

const CareerRoadmapScreen: React.FC<Props> = ({ onBack }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenState>('classSelection');
  const [selectedClass, setSelectedClass] = useState<'10th' | '12th' | null>(null);
  const [selectedCareerPath, setSelectedCareerPath] = useState<CareerPath | null>(null);
  const [selectedPathway, setSelectedPathway] = useState<CareerPathway | null>(null);

  // Reset flow
  const resetFlow = () => {
    setCurrentScreen('classSelection');
    setSelectedClass(null);
    setSelectedCareerPath(null);
    setSelectedPathway(null);
  };

  // Class Selection Screen
  const renderClassSelection = () => (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color={NAVY} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Career Guidance</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.questionCard}>
          <Text style={styles.questionTitle}>What's your current status?</Text>
          <Text style={styles.questionSubtitle}>Tell us which class you're in so we can show you the right path</Text>
          
          <View style={styles.classOptionsContainer}>
            <TouchableOpacity 
              style={[styles.classOption, selectedClass === '10th' && styles.selectedClassOption]}
              onPress={() => {
                setSelectedClass('10th');
                setTimeout(() => setCurrentScreen('interestSelection'), 500);
              }}
            >
              <View style={styles.classIconContainer}>
                <MaterialCommunityIcons name="book-open-variant" size={32} color={selectedClass === '10th' ? '#FFFFFF' : NAVY} />
              </View>
              <Text style={[styles.classOptionTitle, selectedClass === '10th' && styles.selectedClassText]}>Class 10th</Text>
              <Text style={[styles.classOptionDesc, selectedClass === '10th' && styles.selectedClassText]}>
                Planning after completing 10th standard
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.classOption, selectedClass === '12th' && styles.selectedClassOption]}
              onPress={() => {
                setSelectedClass('12th');
                setTimeout(() => setCurrentScreen('interestSelection'), 500);
              }}
            >
              <View style={styles.classIconContainer}>
                <MaterialCommunityIcons name="school" size={32} color={selectedClass === '12th' ? '#FFFFFF' : NAVY} />
              </View>
              <Text style={[styles.classOptionTitle, selectedClass === '12th' && styles.selectedClassText]}>Class 12th</Text>
              <Text style={[styles.classOptionDesc, selectedClass === '12th' && styles.selectedClassText]}>
                Planning after completing 12th standard
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );

  // Career Interest Selection Screen
  const renderInterestSelection = () => {
    if (!selectedClass) return null;
    
    const availablePaths = getCareerPathsForClass(selectedClass);

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setCurrentScreen('classSelection')} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color={NAVY} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>What excites you?</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.questionCard}>
            <Text style={styles.questionTitle}>What excites you?</Text>
            <Text style={styles.questionSubtitle}>
              Select your areas of interest to get personalized career recommendations
            </Text>
            
            <View style={styles.interestsGrid}>
              {availablePaths.map((path) => (
                <TouchableOpacity
                  key={path.id}
                  style={styles.interestOption}
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
                    <View style={styles.checkMark}>
                      <MaterialIcons name="check-circle" size={16} color="#4CAF50" />
                    </View>
                  </View>
                  <Text style={styles.interestTitle}>{path.name}</Text>
                  <Text style={styles.interestDesc}>{path.description}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Confused Option */}
            <TouchableOpacity 
              style={styles.confusedOption}
              onPress={() => {
                // Navigate to skills quiz - you can modify this to integrate with your existing MySkillsBot
                alert('This will redirect to the AI Skills Quiz to help determine your interests!');
              }}
            >
              <MaterialCommunityIcons name="help-circle-outline" size={24} color={NAVY} />
              <Text style={styles.confusedText}>Confused? Take a quiz to find your interests</Text>
              <MaterialIcons name="arrow-forward" size={20} color={NAVY} />
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
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setCurrentScreen('interestSelection')} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color={NAVY} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Career Roadmap</Text>
          <TouchableOpacity onPress={resetFlow}>
            <MaterialIcons name="refresh" size={24} color={NAVY} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Career Path Header */}
          <View style={styles.pathHeader}>
            <View style={styles.pathIconLarge}>
              {selectedCareerPath.iconFamily === 'MaterialCommunityIcons' ? (
                <MaterialCommunityIcons name={selectedCareerPath.icon as any} size={40} color="#FFFFFF" />
              ) : (
                <MaterialIcons name={selectedCareerPath.icon as any} size={40} color="#FFFFFF" />
              )}
            </View>
            <Text style={styles.pathName}>{selectedCareerPath.name}</Text>
            <Text style={styles.pathDescription}>{selectedCareerPath.description}</Text>
            {selectedCareerPath.duration && (
              <Text style={styles.pathDuration}>Duration: {selectedCareerPath.duration}</Text>
            )}
          </View>

          {/* Flow Chart */}
          <View style={styles.flowChart}>
            <View style={styles.flowStep}>
              <View style={styles.flowStepBox}>
                <Text style={styles.flowStepText}>Class {selectedClass} Completed</Text>
              </View>
            </View>
            
            <View style={styles.flowArrow}>
              <MaterialIcons name="keyboard-arrow-down" size={24} color={NAVY} />
            </View>

            <View style={styles.flowStep}>
              <View style={[styles.flowStepBox, styles.highlightBox]}>
                <Text style={[styles.flowStepText, { color: '#FFFFFF' }]}>{selectedCareerPath.name} Pathways</Text>
              </View>
            </View>
          </View>

          {/* Pros and Cons */}
          <View style={styles.prosConsContainer}>
            <View style={styles.prosContainer}>
              <Text style={styles.prosConsTitle}>✓ Pros:</Text>
              {selectedCareerPath.pros.map((pro, index) => (
                <View key={index} style={styles.prosConsItem}>
                  <Text style={styles.prosText}>• {pro}</Text>
                </View>
              ))}
            </View>

            <View style={styles.consContainer}>
              <Text style={styles.prosConsTitle}>✗ Cons:</Text>
              {selectedCareerPath.cons.map((con, index) => (
                <View key={index} style={styles.prosConsItem}>
                  <Text style={styles.consText}>• {con}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Available Pathways */}
          <View style={styles.pathwaysContainer}>
            <Text style={styles.sectionTitle}>Available Pathways</Text>
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
                  <Text style={styles.pathwayName}>{pathway.name}</Text>
                  <Text style={styles.pathwayDuration}>{pathway.duration}</Text>
                </View>
                <Text style={styles.pathwayDesc}>{pathway.description}</Text>
                <Text style={styles.pathwaySalary}>Average Salary: {pathway.averageSalary}</Text>
                <View style={styles.pathwayFooter}>
                  <Text style={styles.viewDetailsText}>View Details</Text>
                  <MaterialIcons name="arrow-forward" size={16} color={NAVY} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  };

  // Pathway Detail Screen
  const renderPathwayDetail = () => {
    if (!selectedPathway) return null;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setCurrentScreen('roadmapView')} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color={NAVY} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{selectedPathway.name}</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Pathway Overview */}
          <View style={styles.pathwayOverview}>
            <Text style={styles.pathwayTitle}>{selectedPathway.name}</Text>
            <Text style={styles.pathwaySubtitle}>{selectedPathway.description}</Text>
            <View style={styles.pathwayStats}>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>Duration</Text>
                <Text style={styles.statValue}>{selectedPathway.duration}</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>Avg. Salary</Text>
                <Text style={styles.statValue}>{selectedPathway.averageSalary}</Text>
              </View>
            </View>
          </View>

          {/* Eligibility */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Eligibility</Text>
            {selectedPathway.eligibility.map((req, index) => (
              <Text key={index} style={styles.bulletPoint}>• {req}</Text>
            ))}
          </View>

          {/* Entrance Exams */}
          {selectedPathway.exams && selectedPathway.exams.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Entrance Exams</Text>
              {selectedPathway.exams.map((exam, index) => (
                <Text key={index} style={styles.bulletPoint}>• {exam}</Text>
              ))}
            </View>
          )}

          {/* Step-by-Step Roadmap */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Step-by-Step Roadmap</Text>
            <View style={styles.stepsContainer}>
              {selectedPathway.steps.map((step, index) => (
                <View key={step.id} style={styles.stepCard}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>{index + 1}</Text>
                  </View>
                  <View style={styles.stepContent}>
                    <Text style={styles.stepTitle}>{step.title}</Text>
                    <Text style={styles.stepDesc}>{step.description}</Text>
                    <Text style={styles.stepDuration}>Duration: {step.duration}</Text>
                    {step.requirements && step.requirements.length > 0 && (
                      <View style={styles.stepRequirements}>
                        <Text style={styles.requirementsTitle}>Requirements:</Text>
                        {step.requirements.map((req, reqIndex) => (
                          <Text key={reqIndex} style={styles.requirementText}>• {req}</Text>
                        ))}
                      </View>
                    )}
                  </View>
                  {index < selectedPathway.steps.length - 1 && (
                    <View style={styles.stepConnector} />
                  )}
                </View>
              ))}
            </View>
          </View>

          {/* Colleges */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Top Colleges</Text>
            {selectedPathway.colleges.map((college, index) => (
              <Text key={index} style={styles.bulletPoint}>• {college}</Text>
            ))}
          </View>

          {/* Pathway Pros and Cons */}
          <View style={styles.prosConsContainer}>
            <View style={styles.prosContainer}>
              <Text style={styles.prosConsTitle}>✓ Pros:</Text>
              {selectedPathway.pros.map((pro, index) => (
                <Text key={index} style={styles.prosText}>• {pro}</Text>
              ))}
            </View>

            <View style={styles.consContainer}>
              <Text style={styles.prosConsTitle}>✗ Cons:</Text>
              {selectedPathway.cons.map((con, index) => (
                <Text key={index} style={styles.consText}>• {con}</Text>
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
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: NAVY,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  
  // Class Selection Styles
  questionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  questionTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: NAVY,
    textAlign: 'center',
    marginBottom: 8,
  },
  questionSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  classOptionsContainer: {
    gap: 16,
  },
  classOption: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  selectedClassOption: {
    backgroundColor: NAVY,
    borderColor: NAVY_DARK,
  },
  classIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  classOptionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: NAVY,
    marginBottom: 4,
  },
  classOptionDesc: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  selectedClassText: {
    color: '#FFFFFF',
  },

  // Interest Selection Styles
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 20,
  },
  interestOption: {
    width: '48%',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    position: 'relative',
  },
  interestIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  checkMark: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  interestTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: NAVY,
    marginBottom: 4,
    textAlign: 'center',
  },
  interestDesc: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  confusedOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF7ED',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FED7AA',
  },
  confusedText: {
    flex: 1,
    marginLeft: 12,
    marginRight: 12,
    fontSize: 16,
    fontWeight: '600',
    color: NAVY,
  },

  // Roadmap View Styles
  pathHeader: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pathIconLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: NAVY,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  pathName: {
    fontSize: 24,
    fontWeight: '800',
    color: NAVY,
    marginBottom: 8,
  },
  pathDescription: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 8,
  },
  pathDuration: {
    fontSize: 14,
    fontWeight: '600',
    color: NAVY,
    backgroundColor: '#F0F7FF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  flowChart: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  flowStep: {
    alignItems: 'center',
  },
  flowStepBox: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  highlightBox: {
    backgroundColor: NAVY,
    borderColor: NAVY_DARK,
  },
  flowStepText: {
    fontSize: 16,
    fontWeight: '700',
    color: NAVY,
  },
  flowArrow: {
    marginVertical: 8,
  },
  prosConsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  prosContainer: {
    marginBottom: 16,
  },
  consContainer: {},
  prosConsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: NAVY,
    marginBottom: 8,
  },
  prosConsItem: {
    marginBottom: 4,
  },
  prosText: {
    fontSize: 14,
    color: '#059669',
    marginLeft: 8,
  },
  consText: {
    fontSize: 14,
    color: '#DC2626',
    marginLeft: 8,
  },
  pathwaysContainer: {
    marginTop: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: NAVY,
    marginBottom: 12,
  },
  pathwayCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  pathwayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  pathwayName: {
    fontSize: 16,
    fontWeight: '700',
    color: NAVY,
    flex: 1,
  },
  pathwayDuration: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  pathwayDesc: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  pathwaySalary: {
    fontSize: 14,
    fontWeight: '600',
    color: '#059669',
    marginBottom: 12,
  },
  pathwayFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  viewDetailsText: {
    fontSize: 14,
    fontWeight: '600',
    color: NAVY,
    marginRight: 4,
  },

  // Pathway Detail Styles
  pathwayOverview: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  pathwayTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: NAVY,
    marginBottom: 8,
  },
  pathwaySubtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 16,
    lineHeight: 22,
  },
  pathwayStats: {
    flexDirection: 'row',
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: NAVY,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  bulletPoint: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 4,
    marginLeft: 8,
  },
  stepsContainer: {
    position: 'relative',
  },
  stepCard: {
    flexDirection: 'row',
    marginBottom: 16,
    position: 'relative',
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: NAVY,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    zIndex: 1,
  },
  stepNumberText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  stepContent: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 12,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: NAVY,
    marginBottom: 4,
  },
  stepDesc: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
    lineHeight: 20,
  },
  stepDuration: {
    fontSize: 12,
    fontWeight: '600',
    color: '#059669',
    marginBottom: 8,
  },
  stepRequirements: {
    marginTop: 8,
  },
  requirementsTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: NAVY,
    marginBottom: 4,
  },
  requirementText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 8,
    marginBottom: 2,
  },
  stepConnector: {
    position: 'absolute',
    left: 15,
    top: 32,
    bottom: -16,
    width: 2,
    backgroundColor: '#E5E7EB',
    zIndex: 0,
  },
});

export default CareerRoadmapScreen;