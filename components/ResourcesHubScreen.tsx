import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { 
  Resource, 
  ExamInfo, 
  RESOURCES, 
  EXAM_INFO, 
  STUDY_PROGRESS, 
  RESOURCE_CATEGORIES,
  searchResources,
  getResourcesByCategory,
  getResourcesByExam,
  getFeaturedResources
} from '../data/resourcesData';

const NAVY = '#1E3A5F';
const NAVY_DARK = '#0F2A3F';

interface Props {
  onBack: () => void;
}

type ViewState = 'home' | 'category' | 'exam' | 'resource-detail' | 'progress';

const ResourcesHubScreen: React.FC<Props> = ({ onBack }) => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Resource[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedExam, setSelectedExam] = useState<string | null>(null);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [showSearch, setShowSearch] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim().length > 0) {
      const results = searchResources(query);
      setSearchResults(results);
      setShowSearch(true);
    } else {
      setShowSearch(false);
      setSearchResults([]);
    }
  };

  const handleResourcePress = (resource: Resource) => {
    setSelectedResource(resource);
    setCurrentView('resource-detail');
  };

  const handleCategoryPress = (categoryId: string) => {
    const categoryName = RESOURCE_CATEGORIES.find(cat => cat.id === categoryId)?.name || '';
    setSelectedCategory(categoryName);
    setCurrentView('category');
  };

  const handleExamPress = (examId: string) => {
    setSelectedExam(examId);
    setCurrentView('exam');
  };

  const handleDownload = (resource: Resource) => {
    Alert.alert(
      'Download Resource',
      `Download "${resource.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Download', 
          onPress: () => {
            Alert.alert('Success', 'Resource downloaded successfully!');
          }
        }
      ]
    );
  };

  // Render main home screen
  const renderHome = () => (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={onBack} style={styles.headerIcon}>
            <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>📚 Resources Hub</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <MaterialIcons name="search" size={20} color="#888" />
              <TextInput
                style={styles.searchInput}
                placeholder="Search by Exam / Subject / Topic"
                value={searchQuery}
                onChangeText={handleSearch}
                placeholderTextColor="#888"
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => handleSearch('')}>
                  <MaterialIcons name="clear" size={20} color="#888" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Search Results */}
          {showSearch && (
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>
                🔍 Search Results ({searchResults.length})
              </Text>
              {searchResults.length > 0 ? (
                searchResults.slice(0, 5).map(resource => (
                  <TouchableOpacity
                    key={resource.id}
                    style={styles.resourceItem}
                    onPress={() => handleResourcePress(resource)}
                  >
                    <View style={[styles.resourceIcon, { backgroundColor: resource.color + '20' }]}>
                      <MaterialCommunityIcons name={resource.icon as any} size={20} color={resource.color} />
                    </View>
                    <View style={styles.resourceInfo}>
                      <Text style={styles.resourceTitle}>{resource.title}</Text>
                      <Text style={styles.resourceMeta}>
                        {resource.category} • {resource.fileType}
                        {resource.size && ` • ${resource.size}`}
                      </Text>
                    </View>
                    <MaterialIcons name="arrow-forward" size={16} color={NAVY} />
                  </TouchableOpacity>
                ))
              ) : (
                <Text style={styles.noResultsText}>No resources found for "{searchQuery}"</Text>
              )}
            </View>
          )}

          {/* Categories Grid */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>📂 Categories</Text>
            <View style={styles.categoriesGrid}>
              {RESOURCE_CATEGORIES.map(category => (
                <TouchableOpacity
                  key={category.id}
                  style={styles.categoryCard}
                  onPress={() => handleCategoryPress(category.id)}
                >
                  <View style={[styles.categoryIcon, { backgroundColor: category.color + '20' }]}>
                    <MaterialCommunityIcons name={category.icon as any} size={24} color={category.color} />
                  </View>
                  <Text style={styles.categoryName}>{category.name}</Text>
                  <Text style={styles.categoryCount}>{category.count} items</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Featured Section */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>🔔 Featured Resources</Text>
            <View style={styles.featuredContainer}>
              {getFeaturedResources().slice(0, 3).map(resource => (
                <TouchableOpacity
                  key={resource.id}
                  style={styles.featuredCard}
                  onPress={() => handleResourcePress(resource)}
                >
                  <View style={styles.featuredHeader}>
                    <View style={[styles.resourceIcon, { backgroundColor: resource.color + '20' }]}>
                      <MaterialCommunityIcons name={resource.icon as any} size={20} color={resource.color} />
                    </View>
                    <View style={styles.featuredBadge}>
                      <Text style={styles.featuredBadgeText}>NEW</Text>
                    </View>
                  </View>
                  <Text style={styles.featuredTitle}>{resource.title}</Text>
                  <Text style={styles.featuredDesc}>{resource.description}</Text>
                  <View style={styles.featuredFooter}>
                    <Text style={styles.featuredMeta}>
                      {resource.downloadCount?.toLocaleString()} downloads
                    </Text>
                    <View style={styles.ratingContainer}>
                      <MaterialIcons name="star" size={14} color="#FFD700" />
                      <Text style={styles.ratingText}>{resource.rating}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {/* Featured News Items */}
            <View style={styles.newsContainer}>
              <View style={styles.newsItem}>
                <MaterialIcons name="fiber-new" size={16} color="#E53E3E" />
                <Text style={styles.newsText}>New Mock Test for NEET 2025 uploaded</Text>
              </View>
              <View style={styles.newsItem}>
                <MaterialIcons name="update" size={16} color="#3182CE" />
                <Text style={styles.newsText}>CUET Previous Year Papers added</Text>
              </View>
              <View style={styles.newsItem}>
                <MaterialIcons name="school" size={16} color="#38A169" />
                <Text style={styles.newsText}>Scholarship Preparation Guide available</Text>
              </View>
            </View>
          </View>

          {/* Quick Access by Exam */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>🧭 Quick Access by Exam</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.examScroll}>
              {EXAM_INFO.map(exam => (
                <TouchableOpacity
                  key={exam.id}
                  style={[styles.examChip, { borderColor: exam.color }]}
                  onPress={() => handleExamPress(exam.id)}
                >
                  <MaterialCommunityIcons name={exam.icon as any} size={20} color={exam.color} />
                  <Text style={[styles.examChipText, { color: exam.color }]}>{exam.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Personal Progress Tracker */}
          <View style={styles.sectionCard}>
            <View style={styles.progressHeader}>
              <Text style={styles.sectionTitle}>📊 Personal Progress Tracker</Text>
              <TouchableOpacity 
                style={styles.viewDetailButton}
                onPress={() => setCurrentView('progress')}
              >
                <Text style={styles.viewDetailText}>View Details</Text>
                <MaterialIcons name="arrow-forward" size={16} color={NAVY} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.progressGrid}>
              <View style={styles.progressItem}>
                <Text style={styles.progressNumber}>{STUDY_PROGRESS.totalExamsAttempted}</Text>
                <Text style={styles.progressLabel}>Exams Attempted</Text>
              </View>
              <View style={styles.progressItem}>
                <Text style={styles.progressNumber}>{STUDY_PROGRESS.averageAccuracy}%</Text>
                <Text style={styles.progressLabel}>Accuracy</Text>
              </View>
              <View style={styles.progressItem}>
                <Text style={styles.progressNumber}>{STUDY_PROGRESS.studyStreak}</Text>
                <Text style={styles.progressLabel}>Study Streak</Text>
              </View>
              <View style={styles.progressItem}>
                <Text style={styles.progressNumber}>{STUDY_PROGRESS.hoursStudied}</Text>
                <Text style={styles.progressLabel}>Hours Studied</Text>
              </View>
            </View>

            <View style={styles.suggestionCard}>
              <MaterialCommunityIcons name="lightbulb" size={20} color="#D69E2E" />
              <View style={styles.suggestionText}>
                <Text style={styles.suggestionTitle}>Suggested Next Topic:</Text>
                <Text style={styles.suggestionTopic}>{STUDY_PROGRESS.suggestedTopics[0]}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );

  // Render category view
  const renderCategoryView = () => {
    const resources = selectedCategory ? getResourcesByCategory(selectedCategory) : [];
    
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => setCurrentView('home')} style={styles.headerIcon}>
              <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{selectedCategory}</Text>
          </View>
        </View>

        <ScrollView style={styles.scrollView}>
          <View style={styles.content}>
            <Text style={styles.categoryHeader}>{resources.length} resources found</Text>
            {resources.map(resource => (
              <TouchableOpacity
                key={resource.id}
                style={styles.resourceCard}
                onPress={() => handleResourcePress(resource)}
              >
                <View style={styles.resourceCardHeader}>
                  <View style={[styles.resourceIcon, { backgroundColor: resource.color + '20' }]}>
                    <MaterialCommunityIcons name={resource.icon as any} size={24} color={resource.color} />
                  </View>
                  <View style={styles.resourceCardInfo}>
                    <Text style={styles.resourceCardTitle}>{resource.title}</Text>
                    <Text style={styles.resourceCardMeta}>
                      {resource.fileType}
                      {resource.size && ` • ${resource.size}`}
                      {resource.downloadCount && ` • ${resource.downloadCount.toLocaleString()} downloads`}
                    </Text>
                  </View>
                  <View style={styles.resourceCardRating}>
                    <MaterialIcons name="star" size={16} color="#FFD700" />
                    <Text style={styles.ratingText}>{resource.rating}</Text>
                  </View>
                </View>
                <Text style={styles.resourceCardDesc}>{resource.description}</Text>
                <View style={styles.resourceCardTags}>
                  {resource.examType?.map(exam => (
                    <View key={exam} style={styles.examTag}>
                      <Text style={styles.examTagText}>{exam}</Text>
                    </View>
                  ))}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  };

  // Render exam-specific view
  const renderExamView = () => {
    const examInfo = EXAM_INFO.find(exam => exam.id === selectedExam);
    const resources = selectedExam ? getResourcesByExam(selectedExam.toUpperCase()) : [];
    
    if (!examInfo) return null;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => setCurrentView('home')} style={styles.headerIcon}>
              <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{examInfo.name}</Text>
          </View>
        </View>

        <ScrollView style={styles.scrollView}>
          <View style={styles.content}>
            {/* Exam Info Card */}
            <View style={styles.examInfoCard}>
              <View style={styles.examInfoHeader}>
                <MaterialCommunityIcons name={examInfo.icon as any} size={32} color={examInfo.color} />
                <View style={styles.examInfoText}>
                  <Text style={styles.examInfoTitle}>{examInfo.fullName}</Text>
                  <Text style={styles.examInfoDesc}>{examInfo.description}</Text>
                </View>
              </View>
              
              <View style={styles.examDetails}>
                <View style={styles.examDetailItem}>
                  <MaterialIcons name="schedule" size={16} color={NAVY} />
                  <Text style={styles.examDetailText}>Duration: {examInfo.pattern.duration}</Text>
                </View>
                <View style={styles.examDetailItem}>
                  <MaterialIcons name="quiz" size={16} color={NAVY} />
                  <Text style={styles.examDetailText}>Questions: {examInfo.pattern.questions}</Text>
                </View>
                <View style={styles.examDetailItem}>
                  <MaterialIcons name="event" size={16} color={NAVY} />
                  <Text style={styles.examDetailText}>Exam Date: {examInfo.examDates}</Text>
                </View>
              </View>
            </View>

            {/* Resources for this exam */}
            <Text style={styles.categoryHeader}>{resources.length} resources available for {examInfo.name}</Text>
            {resources.map(resource => (
              <TouchableOpacity
                key={resource.id}
                style={styles.resourceCard}
                onPress={() => handleResourcePress(resource)}
              >
                <View style={styles.resourceCardHeader}>
                  <View style={[styles.resourceIcon, { backgroundColor: resource.color + '20' }]}>
                    <MaterialCommunityIcons name={resource.icon as any} size={24} color={resource.color} />
                  </View>
                  <View style={styles.resourceCardInfo}>
                    <Text style={styles.resourceCardTitle}>{resource.title}</Text>
                    <Text style={styles.resourceCardMeta}>
                      {resource.fileType}
                      {resource.size && ` • ${resource.size}`}
                    </Text>
                  </View>
                </View>
                <Text style={styles.resourceCardDesc}>{resource.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  };

  // Render resource detail view
  const renderResourceDetail = () => {
    if (!selectedResource) return null;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => setCurrentView('home')} style={styles.headerIcon}>
              <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Resource Details</Text>
          </View>
        </View>

        <ScrollView style={styles.scrollView}>
          <View style={styles.content}>
            <View style={styles.resourceDetailCard}>
              <View style={styles.resourceDetailHeader}>
                <View style={[styles.resourceIcon, { backgroundColor: selectedResource.color + '20' }]}>
                  <MaterialCommunityIcons name={selectedResource.icon as any} size={32} color={selectedResource.color} />
                </View>
                <Text style={styles.resourceDetailTitle}>{selectedResource.title}</Text>
                <Text style={styles.resourceDetailCategory}>{selectedResource.category}</Text>
              </View>

              <Text style={styles.resourceDetailDesc}>{selectedResource.description}</Text>

              <View style={styles.resourceDetailStats}>
                <View style={styles.statItem}>
                  <MaterialIcons name="file-download" size={16} color={NAVY} />
                  <Text style={styles.statText}>{selectedResource.downloadCount?.toLocaleString()} downloads</Text>
                </View>
                <View style={styles.statItem}>
                  <MaterialIcons name="star" size={16} color="#FFD700" />
                  <Text style={styles.statText}>{selectedResource.rating} rating</Text>
                </View>
                <View style={styles.statItem}>
                  <MaterialIcons name="storage" size={16} color={NAVY} />
                  <Text style={styles.statText}>{selectedResource.size || 'N/A'}</Text>
                </View>
              </View>

              {selectedResource.examType && (
                <View style={styles.examTypesContainer}>
                  <Text style={styles.examTypesTitle}>Relevant for:</Text>
                  <View style={styles.examTypesList}>
                    {selectedResource.examType.map(exam => (
                      <View key={exam} style={styles.examTypeTag}>
                        <Text style={styles.examTypeTagText}>{exam}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              <TouchableOpacity
                style={styles.downloadButton}
                onPress={() => handleDownload(selectedResource)}
              >
                <MaterialIcons name="file-download" size={20} color="#FFFFFF" />
                <Text style={styles.downloadButtonText}>
                  {selectedResource.fileType === 'Video' ? 'Watch Now' : 
                   selectedResource.fileType === 'Quiz' ? 'Take Test' : 'Download'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  };

  // Render detailed progress view
  const renderProgressView = () => (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => setCurrentView('home')} style={styles.headerIcon}>
            <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Progress Tracker</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          {/* Overall Stats */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>📊 Overall Statistics</Text>
            <View style={styles.progressGrid}>
              <View style={styles.progressItem}>
                <Text style={styles.progressNumber}>{STUDY_PROGRESS.totalExamsAttempted}</Text>
                <Text style={styles.progressLabel}>Exams Attempted</Text>
              </View>
              <View style={styles.progressItem}>
                <Text style={styles.progressNumber}>{STUDY_PROGRESS.averageAccuracy}%</Text>
                <Text style={styles.progressLabel}>Average Accuracy</Text>
              </View>
              <View style={styles.progressItem}>
                <Text style={styles.progressNumber}>{STUDY_PROGRESS.studyStreak}</Text>
                <Text style={styles.progressLabel}>Study Streak</Text>
              </View>
              <View style={styles.progressItem}>
                <Text style={styles.progressNumber}>{STUDY_PROGRESS.hoursStudied}</Text>
                <Text style={styles.progressLabel}>Total Hours</Text>
              </View>
            </View>
          </View>

          {/* Strong Subjects */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>💪 Strong Subjects</Text>
            <View style={styles.subjectsList}>
              {STUDY_PROGRESS.strongSubjects.map((subject, index) => (
                <View key={index} style={styles.strongSubject}>
                  <MaterialIcons name="trending-up" size={16} color="#38A169" />
                  <Text style={styles.strongSubjectText}>{subject}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Weak Subjects */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>📚 Areas to Improve</Text>
            <View style={styles.subjectsList}>
              {STUDY_PROGRESS.weakSubjects.map((subject, index) => (
                <View key={index} style={styles.weakSubject}>
                  <MaterialIcons name="trending-down" size={16} color="#E53E3E" />
                  <Text style={styles.weakSubjectText}>{subject}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Suggested Topics */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>💡 Suggested Study Topics</Text>
            {STUDY_PROGRESS.suggestedTopics.map((topic, index) => (
              <TouchableOpacity key={index} style={styles.suggestionItem}>
                <MaterialCommunityIcons name="lightbulb" size={16} color="#D69E2E" />
                <Text style={styles.suggestionItemText}>{topic}</Text>
                <MaterialIcons name="arrow-forward" size={16} color={NAVY} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );

  // Main render switch
  switch (currentView) {
    case 'home':
      return renderHome();
    case 'category':
      return renderCategoryView();
    case 'exam':
      return renderExamView();
    case 'resource-detail':
      return renderResourceDetail();
    case 'progress':
      return renderProgressView();
    default:
      return renderHome();
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
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  searchContainer: {
    marginTop: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#D6DEE8',
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: '#111',
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
    marginBottom: 12,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '47%',
    backgroundColor: '#F8FAFC',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: '700',
    color: NAVY,
    textAlign: 'center',
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 10,
    color: '#6B7280',
  },
  featuredContainer: {
    marginBottom: 16,
  },
  featuredCard: {
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  featuredHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  featuredBadge: {
    backgroundColor: '#E53E3E',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  featuredBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  featuredTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: NAVY,
    marginBottom: 4,
  },
  featuredDesc: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 16,
    marginBottom: 8,
  },
  featuredFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  featuredMeta: {
    fontSize: 10,
    color: '#6B7280',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 10,
    color: '#6B7280',
    marginLeft: 2,
  },
  newsContainer: {
    marginTop: 12,
  },
  newsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  newsText: {
    fontSize: 12,
    color: '#374151',
    marginLeft: 8,
  },
  examScroll: {
    marginTop: 8,
  },
  examChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  examChipText: {
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 6,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  viewDetailButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewDetailText: {
    fontSize: 12,
    color: NAVY,
    fontWeight: '600',
    marginRight: 4,
  },
  progressGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  progressItem: {
    width: '47%',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  progressNumber: {
    fontSize: 20,
    fontWeight: '800',
    color: NAVY,
  },
  progressLabel: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 4,
    textAlign: 'center',
  },
  suggestionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF7ED',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FED7AA',
  },
  suggestionText: {
    marginLeft: 8,
  },
  suggestionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#92400E',
  },
  suggestionTopic: {
    fontSize: 14,
    fontWeight: '700',
    color: '#D97706',
  },
  resourceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  resourceIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  resourceInfo: {
    flex: 1,
  },
  resourceTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: NAVY,
    marginBottom: 2,
  },
  resourceMeta: {
    fontSize: 11,
    color: '#6B7280',
  },
  noResultsText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    paddingVertical: 20,
  },
  categoryHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: NAVY,
    marginTop: 16,
    marginBottom: 12,
  },
  resourceCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#D6DEE8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  resourceCardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  resourceCardInfo: {
    flex: 1,
    marginLeft: 12,
  },
  resourceCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: NAVY,
    marginBottom: 4,
  },
  resourceCardMeta: {
    fontSize: 12,
    color: '#6B7280',
  },
  resourceCardRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resourceCardDesc: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 12,
  },
  resourceCardTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  examTag: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 4,
  },
  examTagText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#6B7280',
  },
  examInfoCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#D6DEE8',
  },
  examInfoHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  examInfoText: {
    flex: 1,
    marginLeft: 12,
  },
  examInfoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: NAVY,
    marginBottom: 4,
  },
  examInfoDesc: {
    fontSize: 14,
    color: '#6B7280',
  },
  examDetails: {
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 12,
  },
  examDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  examDetailText: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 8,
  },
  resourceDetailCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#D6DEE8',
  },
  resourceDetailHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  resourceDetailTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: NAVY,
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 4,
  },
  resourceDetailCategory: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  resourceDetailDesc: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  resourceDetailStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F3F4F6',
  },
  statItem: {
    alignItems: 'center',
  },
  statText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  examTypesContainer: {
    marginBottom: 20,
  },
  examTypesTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: NAVY,
    marginBottom: 8,
  },
  examTypesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  examTypeTag: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 6,
  },
  examTypeTagText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: NAVY,
    paddingVertical: 14,
    borderRadius: 12,
  },
  downloadButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  subjectsList: {
    marginTop: 8,
  },
  strongSubject: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  strongSubjectText: {
    fontSize: 14,
    color: '#15803D',
    marginLeft: 8,
    fontWeight: '600',
  },
  weakSubject: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  weakSubjectText: {
    fontSize: 14,
    color: '#DC2626',
    marginLeft: 8,
    fontWeight: '600',
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  suggestionItemText: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
    marginLeft: 8,
    fontWeight: '500',
  },
});

export default ResourcesHubScreen;