import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type Tab = 'dashboard' | 'forum' | 'mentorship' | 'training';

interface Props {
  onNavigateToTab: (tab: Tab) => void;
}

const NAVY = '#1E3A5F';
const NAVY_DARK = '#0F2A3F';

const MentorForum = ({ onNavigateToTab }: Props) => {
  const [searchQuery, setSearchQuery] = useState('');

  const allForumThreads = [
    { id: 1, title: 'Placement Prep Q&A', replies: 23, category: 'Placement', lastActivity: '2h ago' },
    { id: 2, title: 'Industry Insights', replies: 15, category: 'Career', lastActivity: '5h ago' },
    { id: 3, title: 'Mock Interviews Tips', replies: 40, category: 'Interview', lastActivity: '1d ago' },
    { id: 4, title: 'Resume Building Guide', replies: 31, category: 'Career', lastActivity: '2d ago' },
    { id: 5, title: 'Salary Negotiation Tips', replies: 18, category: 'Career', lastActivity: '3d ago' },
  ];

  // Filter threads based on search query
  const filteredThreads = allForumThreads.filter(thread => 
    thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    thread.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleThreadPress = (threadId: number, title: string) => {
    Alert.alert(
      title,
      'This would open the full discussion thread with all replies and allow you to participate.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Join Discussion', onPress: () => console.log(`Opening thread ${threadId}`) }
      ]
    );
  };

  const handleStartNewDiscussion = () => {
    Alert.alert(
      'Start New Discussion',
      'Create a new forum thread to share knowledge or ask questions.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Create Thread', onPress: () => console.log('Creating new discussion thread') }
      ]
    );
  };

  const handleSearchClear = () => {
    setSearchQuery('');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <MaterialIcons name="search" size={20} color="#6B7280" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search Discussions"
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={handleSearchClear} style={styles.clearButton}>
                <MaterialIcons name="clear" size={18} color="#6B7280" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Forum Threads */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {searchQuery ? `Search Results (${filteredThreads.length})` : 'Forum Threads:'}
          </Text>
          {filteredThreads.length === 0 ? (
            <View style={styles.noResultsContainer}>
              <MaterialIcons name="search-off" size={48} color="#9CA3AF" />
              <Text style={styles.noResultsText}>
                {searchQuery ? 'No discussions found' : 'No threads available'}
              </Text>
              <Text style={styles.noResultsSubtext}>
                {searchQuery ? 'Try a different search term' : 'Be the first to start a discussion!'}
              </Text>
            </View>
          ) : (
            <View style={styles.threadsContainer}>
              {filteredThreads.map((thread) => (
                <TouchableOpacity 
                  key={thread.id} 
                  style={styles.threadCard} 
                  activeOpacity={0.8}
                  onPress={() => handleThreadPress(thread.id, thread.title)}
                >
                  <View style={styles.threadHeader}>
                    <Text style={styles.threadTitle}>{thread.title}</Text>
                    <View style={styles.categoryBadge}>
                      <Text style={styles.categoryText}>{thread.category}</Text>
                    </View>
                  </View>
                  <View style={styles.threadFooter}>
                    <View style={styles.threadStats}>
                      <MaterialIcons name="forum" size={16} color="#6B7280" />
                      <Text style={styles.repliesCount}>({thread.replies})</Text>
                    </View>
                    <Text style={styles.lastActivity}>{thread.lastActivity}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* New Discussion Button */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.newDiscussionButton} activeOpacity={0.8} onPress={handleStartNewDiscussion}>
            <MaterialIcons name="add" size={24} color="#FFFFFF" />
            <Text style={styles.newDiscussionText}>Start New Discussion</Text>
          </TouchableOpacity>
        </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
  },
  searchSection: {
    paddingVertical: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  threadsContainer: {
    gap: 12,
  },
  threadCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  threadHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  threadTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
    marginRight: 8,
  },
  categoryBadge: {
    backgroundColor: '#F0F9FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E0E7FF',
  },
  categoryText: {
    fontSize: 12,
    color: NAVY,
    fontWeight: '500',
  },
  threadFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  threadStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  repliesCount: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  lastActivity: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  newDiscussionButton: {
    backgroundColor: NAVY,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  newDiscussionText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
  clearButton: {
    padding: 4,
  },
  noResultsContainer: {
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginTop: 8,
  },
  noResultsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 12,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 4,
    textAlign: 'center',
  },
});

export default MentorForum;