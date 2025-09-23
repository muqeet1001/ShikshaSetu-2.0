import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Modal } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Scholarship, SCHOLARSHIPS, getEligibleScholarships } from '../data/scholarshipData';

const NAVY = '#1E3A5F';
const NAVY_DARK = '#0F2A3F';

interface Props {
  onBack: () => void;
}

interface EligibilityCriteria {
  class: string;
  caste: string;
  income: string;
  gender: string;
  state: string;
  percentage: string;
}

const ScholarshipScreen: React.FC<Props> = ({ onBack }) => {
  const [currentView, setCurrentView] = useState<'checker' | 'results' | 'detail'>('checker');
  const [eligibilityCriteria, setEligibilityCriteria] = useState<EligibilityCriteria>({
    class: '',
    caste: '',
    income: '',
    gender: '',
    state: '',
    percentage: ''
  });
  const [eligibleScholarships, setEligibleScholarships] = useState<Scholarship[]>([]);
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);
  const [showAllScholarships, setShowAllScholarships] = useState(false);

  const classes = ['5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th', 'Graduate', 'Post-Graduate'];
  const castes = ['General', 'SC', 'ST', 'OBC', 'EWS'];
  const incomes = ['< ₹1 LPA', '₹1-2 LPA', '₹2-4 LPA', '₹4-6 LPA', '> ₹6 LPA'];
  const genders = ['Male', 'Female', 'Other'];
  const states = ['Andhra Pradesh', 'Bihar', 'Gujarat', 'Karnataka', 'Maharashtra', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Uttar Pradesh', 'West Bengal', 'Other'];
  const percentages = ['< 50%', '50-60%', '60-70%', '70-80%', '80-90%', '> 90%'];

  const checkEligibility = () => {
    const incomeValue = eligibilityCriteria.income.includes('1') ? 100000 : 
                       eligibilityCriteria.income.includes('2') ? 200000 :
                       eligibilityCriteria.income.includes('4') ? 400000 :
                       eligibilityCriteria.income.includes('6') ? 600000 : 700000;

    const eligible = getEligibleScholarships({
      class: eligibilityCriteria.class,
      caste: eligibilityCriteria.caste === 'General' ? undefined : eligibilityCriteria.caste,
      income: incomeValue,
      gender: eligibilityCriteria.gender,
      state: eligibilityCriteria.state === 'Other' ? undefined : eligibilityCriteria.state
    });

    setEligibleScholarships(eligible);
    setCurrentView('results');
  };

  const renderEligibilityChecker = () => (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={onBack} style={styles.headerIcon}>
            <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Scholarship Finder</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Hero Section */}
          <View style={styles.heroBanner}>
            <Text style={styles.heroTitle}>🎓 Find Your Scholarships</Text>
            <Text style={styles.heroSub}>Answer a few questions to discover scholarships you're eligible for</Text>
          </View>

          {/* Quick Access - Show All Scholarships */}
          <View style={styles.sectionCard}>
            <TouchableOpacity 
              style={styles.quickAccessBtn}
              onPress={() => {
                setEligibleScholarships(SCHOLARSHIPS);
                setShowAllScholarships(true);
                setCurrentView('results');
              }}
            >
              <MaterialIcons name="list-alt" size={24} color={NAVY} />
              <View style={styles.quickAccessText}>
                <Text style={styles.quickAccessTitle}>View All Scholarships</Text>
                <Text style={styles.quickAccessSubtitle}>Browse complete scholarship database</Text>
              </View>
              <MaterialIcons name="arrow-forward" size={20} color={NAVY} />
            </TouchableOpacity>
          </View>

          {/* Eligibility Form */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>📋 Check Your Eligibility</Text>
            <Text style={styles.previewLine}>Fill in your details to get personalized results</Text>

            {/* Class Selection */}
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Current Class/Level</Text>
              <View style={styles.optionsGrid}>
                {classes.map(cls => (
                  <TouchableOpacity
                    key={cls}
                    style={[
                      styles.optionChip,
                      eligibilityCriteria.class === cls && styles.selectedChip
                    ]}
                    onPress={() => setEligibilityCriteria(prev => ({ ...prev, class: cls }))}
                  >
                    <Text style={[
                      styles.chipText,
                      eligibilityCriteria.class === cls && styles.selectedChipText
                    ]}>
                      {cls}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Caste Selection */}
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Category</Text>
              <View style={styles.optionsGrid}>
                {castes.map(caste => (
                  <TouchableOpacity
                    key={caste}
                    style={[
                      styles.optionChip,
                      eligibilityCriteria.caste === caste && styles.selectedChip
                    ]}
                    onPress={() => setEligibilityCriteria(prev => ({ ...prev, caste }))}
                  >
                    <Text style={[
                      styles.chipText,
                      eligibilityCriteria.caste === caste && styles.selectedChipText
                    ]}>
                      {caste}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Income Selection */}
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Family Income</Text>
              <View style={styles.optionsGrid}>
                {incomes.map(income => (
                  <TouchableOpacity
                    key={income}
                    style={[
                      styles.optionChip,
                      eligibilityCriteria.income === income && styles.selectedChip
                    ]}
                    onPress={() => setEligibilityCriteria(prev => ({ ...prev, income }))}
                  >
                    <Text style={[
                      styles.chipText,
                      eligibilityCriteria.income === income && styles.selectedChipText
                    ]}>
                      {income}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Gender Selection */}
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Gender</Text>
              <View style={styles.optionsGrid}>
                {genders.map(gender => (
                  <TouchableOpacity
                    key={gender}
                    style={[
                      styles.optionChip,
                      eligibilityCriteria.gender === gender && styles.selectedChip
                    ]}
                    onPress={() => setEligibilityCriteria(prev => ({ ...prev, gender }))}
                  >
                    <Text style={[
                      styles.chipText,
                      eligibilityCriteria.gender === gender && styles.selectedChipText
                    ]}>
                      {gender}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* State Selection */}
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>State</Text>
              <View style={styles.optionsGrid}>
                {states.slice(0, 8).map(state => (
                  <TouchableOpacity
                    key={state}
                    style={[
                      styles.optionChip,
                      eligibilityCriteria.state === state && styles.selectedChip
                    ]}
                    onPress={() => setEligibilityCriteria(prev => ({ ...prev, state }))}
                  >
                    <Text style={[
                      styles.chipText,
                      eligibilityCriteria.state === state && styles.selectedChipText
                    ]}>
                      {state}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Check Button */}
            <TouchableOpacity
              style={[
                styles.checkButton,
                !eligibilityCriteria.class && styles.disabledButton
              ]}
              onPress={checkEligibility}
              disabled={!eligibilityCriteria.class}
            >
              <MaterialIcons name="search" size={20} color="#FFFFFF" />
              <Text style={styles.checkButtonText}>Find My Scholarships</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );

  const renderScholarshipResults = () => (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => setCurrentView('checker')} style={styles.headerIcon}>
            <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {showAllScholarships ? 'All Scholarships' : 'Your Scholarships'}
          </Text>
        </View>
        <TouchableOpacity onPress={() => setCurrentView('checker')} style={styles.headerIcon}>
          <MaterialIcons name="tune" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Results Header */}
          <View style={styles.heroBanner}>
            <Text style={styles.heroTitle}>
              🎉 {eligibleScholarships.length} Scholarships Found!
            </Text>
            <Text style={styles.heroSub}>
              {showAllScholarships 
                ? 'Complete scholarship database' 
                : 'Scholarships matching your profile'
              }
            </Text>
          </View>

          {/* Category Filter */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>📂 Categories</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
              {['All', 'Government', 'Private'].map(category => (
                <TouchableOpacity key={category} style={styles.categoryChip}>
                  <Text style={styles.categoryChipText}>{category}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Scholarship List */}
          {eligibleScholarships.map(scholarship => (
            <TouchableOpacity
              key={scholarship.id}
              style={styles.scholarshipCard}
              onPress={() => {
                setSelectedScholarship(scholarship);
                setCurrentView('detail');
              }}
            >
              <View style={styles.scholarshipHeader}>
                <View style={[styles.scholarshipIcon, { backgroundColor: scholarship.color + '20' }]}>
                  {scholarship.iconFamily === 'MaterialCommunityIcons' ? (
                    <MaterialCommunityIcons name={scholarship.icon as any} size={24} color={scholarship.color} />
                  ) : (
                    <MaterialIcons name={scholarship.icon as any} size={24} color={scholarship.color} />
                  )}
                </View>
                <View style={styles.scholarshipInfo}>
                  <Text style={styles.scholarshipName}>{scholarship.name}</Text>
                  <Text style={styles.scholarshipProvider}>{scholarship.provider}</Text>
                  <Text style={styles.scholarshipAmount}>{scholarship.amount}</Text>
                </View>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryBadgeText}>{scholarship.category}</Text>
                </View>
              </View>
              
              <Text style={styles.scholarshipDesc}>{scholarship.description}</Text>
              
              <View style={styles.scholarshipFooter}>
                <Text style={styles.applicationPeriod}>📅 {scholarship.applicationPeriod}</Text>
                <MaterialIcons name="arrow-forward" size={16} color={NAVY} />
              </View>
            </TouchableOpacity>
          ))}

          {eligibleScholarships.length === 0 && (
            <View style={styles.noResultsCard}>
              <MaterialIcons name="search-off" size={48} color="#9CA3AF" />
              <Text style={styles.noResultsTitle}>No Scholarships Found</Text>
              <Text style={styles.noResultsDesc}>
                Try adjusting your criteria or check back later for new scholarships
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );

  const renderScholarshipDetail = () => {
    if (!selectedScholarship) return null;

    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => setCurrentView('results')} style={styles.headerIcon}>
              <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Scholarship Details</Text>
          </View>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            {/* Scholarship Header */}
            <View style={styles.detailHeader}>
              <View style={[styles.scholarshipIcon, { backgroundColor: selectedScholarship.color + '20' }]}>
                {selectedScholarship.iconFamily === 'MaterialCommunityIcons' ? (
                  <MaterialCommunityIcons name={selectedScholarship.icon as any} size={32} color={selectedScholarship.color} />
                ) : (
                  <MaterialIcons name={selectedScholarship.icon as any} size={32} color={selectedScholarship.color} />
                )}
              </View>
              <Text style={styles.detailTitle}>{selectedScholarship.name}</Text>
              <Text style={styles.detailProvider}>{selectedScholarship.provider}</Text>
              <View style={styles.amountBadge}>
                <Text style={styles.amountText}>{selectedScholarship.amount}</Text>
              </View>
            </View>

            {/* Description */}
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>📖 About</Text>
              <Text style={styles.previewLine}>{selectedScholarship.description}</Text>
            </View>

            {/* Eligibility */}
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>✅ Eligibility Criteria</Text>
              {selectedScholarship.eligibility.class && (
                <View style={styles.criteriaRow}>
                  <MaterialIcons name="school" size={20} color={NAVY} />
                  <Text style={styles.criteriaText}>Class: {selectedScholarship.eligibility.class.join(', ')}</Text>
                </View>
              )}
              {selectedScholarship.eligibility.income && (
                <View style={styles.criteriaRow}>
                  <MaterialIcons name="attach-money" size={20} color={NAVY} />
                  <Text style={styles.criteriaText}>Income: {selectedScholarship.eligibility.income}</Text>
                </View>
              )}
              {selectedScholarship.eligibility.caste && (
                <View style={styles.criteriaRow}>
                  <MaterialIcons name="people" size={20} color={NAVY} />
                  <Text style={styles.criteriaText}>Category: {selectedScholarship.eligibility.caste.join(', ')}</Text>
                </View>
              )}
              {selectedScholarship.eligibility.gender && (
                <View style={styles.criteriaRow}>
                  <MaterialIcons name="person" size={20} color={NAVY} />
                  <Text style={styles.criteriaText}>Gender: {selectedScholarship.eligibility.gender}</Text>
                </View>
              )}
              {selectedScholarship.eligibility.percentage && (
                <View style={styles.criteriaRow}>
                  <MaterialIcons name="grade" size={20} color={NAVY} />
                  <Text style={styles.criteriaText}>Marks: {selectedScholarship.eligibility.percentage}</Text>
                </View>
              )}
            </View>

            {/* Benefits */}
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>🎁 Benefits</Text>
              {selectedScholarship.benefits.map((benefit, index) => (
                <View key={index} style={styles.bulletRow}>
                  <Text style={styles.bulletDot}>•</Text>
                  <Text style={styles.benefitText}>{benefit}</Text>
                </View>
              ))}
            </View>

            {/* Documents Required */}
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>📄 Documents Required</Text>
              {selectedScholarship.documents.map((doc, index) => (
                <View key={index} style={styles.bulletRow}>
                  <Text style={styles.bulletDot}>•</Text>
                  <Text style={styles.documentText}>{doc}</Text>
                </View>
              ))}
            </View>

            {/* Application Info */}
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>⏰ Application Timeline</Text>
              <View style={styles.timelineCard}>
                <MaterialIcons name="schedule" size={24} color={NAVY} />
                <View style={styles.timelineText}>
                  <Text style={styles.timelineTitle}>Application Period</Text>
                  <Text style={styles.timelinePeriod}>{selectedScholarship.applicationPeriod}</Text>
                </View>
              </View>
            </View>

            {/* Apply Button */}
            <TouchableOpacity style={styles.applyButton}>
              <MaterialIcons name="launch" size={20} color="#FFFFFF" />
              <Text style={styles.applyButtonText}>Visit Website</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  };

  // Main render
  switch (currentView) {
    case 'checker':
      return renderEligibilityChecker();
    case 'results':
      return renderScholarshipResults();
    case 'detail':
      return renderScholarshipDetail();
    default:
      return renderEligibilityChecker();
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: NAVY,
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
  scrollView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  heroBanner: {
    backgroundColor: NAVY,
    padding: 18,
    borderRadius: 14,
    marginTop: 16,
    borderWidth: 1,
    borderColor: NAVY_DARK,
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: NAVY,
    marginBottom: 10,
  },
  previewLine: {
    color: '#334155',
    marginTop: 4,
    lineHeight: 20,
  },
  quickAccessBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 16,
    borderRadius: 12,
  },
  quickAccessText: {
    flex: 1,
    marginLeft: 12,
    marginRight: 12,
  },
  quickAccessTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: NAVY,
  },
  quickAccessSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  formGroup: {
    marginTop: 20,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: NAVY,
    marginBottom: 10,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionChip: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 8,
  },
  selectedChip: {
    backgroundColor: NAVY,
    borderColor: NAVY,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
    color: NAVY,
  },
  selectedChipText: {
    color: '#FFFFFF',
  },
  checkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: NAVY,
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 24,
  },
  disabledButton: {
    backgroundColor: '#9CA3AF',
  },
  checkButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  categoryScroll: {
    marginTop: 8,
  },
  categoryChip: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  categoryChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: NAVY,
  },
  scholarshipCard: {
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
  scholarshipHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  scholarshipIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  scholarshipInfo: {
    flex: 1,
  },
  scholarshipName: {
    fontSize: 16,
    fontWeight: '700',
    color: NAVY,
    marginBottom: 2,
  },
  scholarshipProvider: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  scholarshipAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10B981',
  },
  categoryBadge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  categoryBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#6B7280',
  },
  scholarshipDesc: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 12,
  },
  scholarshipFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  applicationPeriod: {
    fontSize: 12,
    color: NAVY,
    fontWeight: '600',
  },
  noResultsCard: {
    backgroundColor: '#FFFFFF',
    padding: 32,
    borderRadius: 12,
    marginTop: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D6DEE8',
  },
  noResultsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#374151',
    marginTop: 16,
    marginBottom: 8,
  },
  noResultsDesc: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  detailHeader: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 12,
    marginTop: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D6DEE8',
  },
  detailTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: NAVY,
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 4,
  },
  detailProvider: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 12,
  },
  amountBadge: {
    backgroundColor: '#10B981',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  amountText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  criteriaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  criteriaText: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 8,
    flex: 1,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 4,
  },
  bulletDot: {
    color: NAVY,
    fontWeight: '900',
    marginRight: 8,
  },
  benefitText: {
    fontSize: 14,
    color: '#059669',
    lineHeight: 20,
    flex: 1,
  },
  documentText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    flex: 1,
  },
  timelineCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  timelineText: {
    marginLeft: 12,
  },
  timelineTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: NAVY,
  },
  timelinePeriod: {
    fontSize: 16,
    fontWeight: '700',
    color: '#374151',
    marginTop: 2,
  },
  applyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: NAVY,
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 24,
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginLeft: 8,
  },
});

export default ScholarshipScreen;