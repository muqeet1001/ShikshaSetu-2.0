import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const NAVY = '#1E3A5F';
const LIGHT_BORDER = '#D6DEE8';

interface Props {
  onBack: () => void;
  onOpenProfile?: () => void;
}

const ParentForumDiscussions = ({ onBack, onOpenProfile }: Props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Career Guidance', 'College Admissions', 'Study Tips', 'Placement Help', 'General'];

  const allDiscussions = [
    {
      id: 1,
      title: 'How to guide my child in career selection?',
      author: 'Mrs. Sharma',
      replies: 15,
      views: 234,
      lastActivity: '2h ago',
      category: 'Career Guidance',
      isHot: true,
      excerpt: 'My child is confused between engineering and medicine. How do I help them decide?'
    },
    {
      id: 2,
      title: 'Placement worries - What should parents do?',
      author: 'Mr. Kumar',
      replies: 25,
      views: 456,
      lastActivity: '4h ago',
      category: 'Placement Help',
      isHot: true,
      excerpt: 'Final year student, still no placement. How can parents support without adding pressure?'
    },
    {
      id: 3,
      title: 'Top skills for IT students in 2024',
      author: 'Dr. Patel',
      replies: 12,
      views: 189,
      lastActivity: '6h ago',
      category: 'Career Guidance',
      isHot: false,
      excerpt: 'Which programming languages and skills should my child focus on?'
    },
    {
      id: 4,
      title: 'Private vs Government colleges - Worth the cost?',
      author: 'Mrs. Singh',
      replies: 32,
      views: 678,
      lastActivity: '1d ago',
      category: 'College Admissions',
      isHot: true,
      excerpt: 'Is it worth spending lakhs on private college or should we stick to government?'
    },
    {
      id: 5,
      title: 'Managing study stress during board exams',
      author: 'Mr. Gupta',
      replies: 8,
      views: 145,
      lastActivity: '2d ago',
      category: 'Study Tips',
      isHot: false,
      excerpt: 'My child is getting stressed about board exams. Any tips from experienced parents?'
    },
    {
      id: 6,
      title: 'Should I let my child take a gap year?',
      author: 'Mrs. Reddy',
      replies: 19,
      views: 267,
      lastActivity: '3d ago',
      category: 'General',
      isHot: false,
      excerpt: 'Child wants to take gap year for JEE preparation. Is it a good idea?'
    },
  ];

  const filteredDiscussions = allDiscussions.filter(discussion => {
    const matchesSearch = discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         discussion.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || discussion.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const DiscussionCard = ({ discussion }: { discussion: any }) => (
    <TouchableOpacity style={styles.discussionCard}>
      <View style={styles.discussionHeader}>
        <View style={styles.discussionTitleRow}>
          <Text style={styles.discussionTitle}>{discussion.title}</Text>
          {discussion.isHot && (
            <View style={styles.hotBadge}>
              <Text style={styles.hotText}>🔥 Hot</Text>
            </View>
          )}
        </View>
        <Text style={styles.categoryTag}>{discussion.category}</Text>
      </View>
      
      <Text style={styles.discussionExcerpt}>{discussion.excerpt}</Text>
      
      <View style={styles.discussionFooter}>
        <View style={styles.discussionStats}>
          <View style={styles.statItem}>
            <MaterialIcons name="person" size={14} color="#666" />
            <Text style={styles.statText}>{discussion.author}</Text>
          </View>
          <View style={styles.statItem}>
            <MaterialIcons name="chat-bubble-outline" size={14} color="#666" />
            <Text style={styles.statText}>{discussion.replies}</Text>
          </View>
          <View style={styles.statItem}>
            <MaterialIcons name="visibility" size={14} color="#666" />
            <Text style={styles.statText}>{discussion.views}</Text>
          </View>
        </View>
        <Text style={styles.lastActivity}>{discussion.lastActivity}</Text>
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
        <Text style={styles.headerTitle}>Forum Discussions</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity style={styles.newPostButton}>
            <MaterialIcons name="add" size={24} color={NAVY} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.newPostButton} onPress={onOpenProfile} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <MaterialCommunityIcons name="account-circle-outline" size={24} color={NAVY} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search and Filter */}
      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <MaterialIcons name="search" size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search discussions..."
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
      <ScrollView style={styles.discussionsList} showsVerticalScrollIndicator={false}>
        <Text style={styles.resultsText}>
          {filteredDiscussions.length} discussion{filteredDiscussions.length !== 1 ? 's' : ''} found
        </Text>
        
        {filteredDiscussions.map(discussion => (
          <DiscussionCard key={discussion.id} discussion={discussion} />
        ))}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <MaterialIcons name="create" size={24} color="#FFFFFF" />
      </TouchableOpacity>
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
  newPostButton: {
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
  discussionsList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  resultsText: {
    fontSize: 12,
    color: '#666',
    marginVertical: 12,
  },
  discussionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: LIGHT_BORDER,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  discussionHeader: {
    marginBottom: 8,
  },
  discussionTitleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  discussionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: NAVY,
    flex: 1,
    marginRight: 8,
  },
  hotBadge: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  hotText: {
    fontSize: 10,
    fontWeight: '600',
  },
  categoryTag: {
    fontSize: 12,
    color: '#666',
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  discussionExcerpt: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  discussionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  discussionStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  statText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  lastActivity: {
    fontSize: 12,
    color: '#666',
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: NAVY,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});

export default ParentForumDiscussions;