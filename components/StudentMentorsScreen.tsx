import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, TextInput } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

const NAVY = '#1E3A5F';
const NAVY_DARK = '#0F2A3F';

const Chip = ({ label, active, onPress }: { label: string; active?: boolean; onPress?: () => void }) => (
  <TouchableOpacity style={[styles.chip, active && styles.chipActive]} onPress={onPress}>
    <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
  </TouchableOpacity>
);

const ActionBtn = ({ label, onPress }: { label: string; onPress?: () => void }) => (
  <TouchableOpacity style={styles.actionBtn} onPress={onPress}>
    <Text style={styles.actionBtnText}>{label}</Text>
  </TouchableOpacity>
);

const MentorCard = ({ name, subject, rating, students, last }: { name: string; subject: string; rating: number; students: number; last: string }) => (
  <View style={styles.card}>
    <View style={styles.row}>
      <MaterialCommunityIcons name="account-circle" size={44} color={NAVY} />
      <View style={{ marginLeft: 10, flex: 1 }}>
        <Text style={styles.cardTitle}>{name} ({subject})</Text>
        <Text style={styles.cardSub}>⭐ {rating} | {students} Students Guided</Text>
        <Text style={styles.cardMuted}>Last Interaction: {last}</Text>
      </View>
    </View>
    <View style={styles.row}>
      <ActionBtn label="Message" onPress={() => Alert.alert('Message', `Message to ${name}`)} />
      <ActionBtn label="Schedule" onPress={() => Alert.alert('Schedule', `Schedule with ${name}`)} />
      <ActionBtn label="Profile" onPress={() => Alert.alert('Profile', `Open profile of ${name}`)} />
    </View>
  </View>
);

const SuggestedCard = ({ name, stream, guided }: { name: string; stream: string; guided: string }) => (
  <View style={styles.card}>
    <View style={styles.row}>
      <MaterialCommunityIcons name="account-circle" size={44} color={NAVY} />
      <View style={{ marginLeft: 10, flex: 1 }}>
        <Text style={styles.cardTitle}>{name} ({stream})</Text>
        <Text style={styles.cardMuted}>Guided {guided}</Text>
      </View>
    </View>
    <View style={styles.row}>
      <ActionBtn label="Request Mentor" onPress={() => Alert.alert('Request', `Requested ${name}`)} />
      <ActionBtn label="View Profile" onPress={() => Alert.alert('Profile', `Open profile of ${name}`)} />
    </View>
  </View>
);

const StudentMentorsScreen = () => {
  const [tab, setTab] = useState<'my' | 'suggested' | 'resources'>('my');
  const [q, setQ] = useState('');

  return (
    <View style={styles.container}>
      {/* Header: Title + Search */}
      <View style={styles.headerRow}>
        <Text style={styles.pageTitle}>Mentors</Text>
        <View style={styles.searchWrap}>
          <MaterialIcons name="search" size={18} color="#666" />
          <TextInput value={q} onChangeText={setQ} placeholder="Search" style={styles.searchInput} placeholderTextColor="#666" />
        </View>
      </View>

      {/* Sub tabs */}
      <View style={styles.subTabs}>
        <Chip label="My Mentors" active={tab==='my'} onPress={() => setTab('my')} />
        <Chip label="Suggested" active={tab==='suggested'} onPress={() => setTab('suggested')} />
        <Chip label="Resources" active={tab==='resources'} onPress={() => setTab('resources')} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {tab === 'my' && (
          <View>
            <Text style={styles.sectionTitle}>My Mentors</Text>
            <MentorCard name="Dr. Khan" subject="Physics" rating={4.5} students={120} last="2 days ago" />
            <MentorCard name="Ms. Sharma" subject="Chemistry" rating={4.2} students={90} last="1 week ago" />
            <Text style={styles.sectionTitle}>Mentor Requests</Text>
            <View style={styles.listCard}>
              <Text style={styles.listText}>- Request sent to Ms. Priya ✅ Accepted</Text>
              <Text style={styles.listText}>- Request sent to Mr. Arjun ⏳ Pending</Text>
            </View>
          </View>
        )}

        {tab === 'suggested' && (
          <View>
            <Text style={styles.sectionTitle}>Recommended for You</Text>
            <SuggestedCard name="Ms. Priya" stream="Medical Stream" guided="200+ NEET Students" />
            <SuggestedCard name="Mr. Arjun" stream="Engineering Stream" guided="150+ JEE Students" />
          </View>
        )}

        {tab === 'resources' && (
          <View>
            <Text style={styles.sectionTitle}>Mentor Resources</Text>
            <View style={styles.listCard}>
              <Text style={styles.listText}>📹 Recorded Session: "How to Prepare for NEET"</Text>
              <Text style={styles.listText}>📑 Notes: "JEE Physics Important Topics"</Text>
              <Text style={styles.listText}>📅 Upcoming: Q&A Session - Oct 5 (Join)</Text>
            </View>
          </View>
        )}
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingBottom: 72 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 16 },
  pageTitle: { fontSize: 20, fontWeight: 'bold', color: NAVY },
  searchWrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8F9FA', borderRadius: 18, paddingHorizontal: 10, paddingVertical: 6, borderWidth: 1, borderColor: '#E5E7EB', minWidth: 140 },
  searchInput: { marginLeft: 6, minWidth: 80, color: '#111827' },
  subTabs: { flexDirection: 'row', marginTop: 10 },
  chip: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 18, paddingVertical: 6, paddingHorizontal: 12, marginRight: 8 },
  chipActive: { backgroundColor: NAVY, borderColor: NAVY_DARK },
  chipText: { color: NAVY, fontWeight: '600' },
  chipTextActive: { color: '#FFFFFF' },
  card: { backgroundColor: '#FFFFFF', borderRadius: 12, borderWidth: 1, borderColor: '#D6DEE8', padding: 12, marginTop: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.12, shadowRadius: 5, elevation: 4 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  cardTitle: { color: NAVY, fontWeight: '800' },
  cardSub: { color: '#374151', marginTop: 2 },
  cardMuted: { color: '#6B7280', marginTop: 2 },
  actionBtn: { backgroundColor: NAVY, paddingVertical: 6, paddingHorizontal: 10, borderRadius: 8, marginRight: 8, marginTop: 8 },
  actionBtnText: { color: '#FFFFFF', fontWeight: '800' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: NAVY, marginTop: 14 },
  listCard: { backgroundColor: '#FFFFFF', borderRadius: 12, borderWidth: 1, borderColor: '#D6DEE8', padding: 12, marginTop: 8 },
  listText: { color: '#111827', marginBottom: 6 },
  bottomSubNav: { position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: NAVY, flexDirection: 'row', borderTopWidth: 1, borderTopColor: NAVY_DARK, paddingVertical: 8, paddingHorizontal: 8 },
  subNavItem: { flex: 1, alignItems: 'center' },
  subNavText: { color: '#B0B0B0', fontSize: 12, marginTop: 2 },
  subNavTextActive: { color: '#FFFFFF', fontWeight: '700' },
});

export default StudentMentorsScreen;
