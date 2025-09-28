import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Linking } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

const NAVY = '#1E3A5F';
const NAVY_DARK = '#0F2A3F';

interface Props {
  onBack?: () => void;
}

const SectionCard: React.FC<{ title: string }>= ({ title, children }) => (
  <View style={styles.sectionCard}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const PwDSupportScreen: React.FC<Props> = ({ onBack }) => {
  const [view, setView] = useState<'overview'|'benefits'|'colleges'|'deadlines'>('overview');

  const Header = (
    <View style={[styles.rowBetween, { marginBottom: 8 }]}>
      <View style={styles.rowCenter}>
        {onBack && (
          <TouchableOpacity style={styles.backRow} onPress={onBack}>
            <MaterialIcons name="arrow-back-ios" size={18} color={NAVY} />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.pageTitle}>Disability Support</Text>
      </View>
      <View style={styles.rowCenter}>
        <TouchableOpacity style={styles.chipSm} onPress={() => setView('overview')}>
          <Text style={styles.chipSmText}>Overview</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {Header}

      {view === 'overview' && (
        <>
          <SectionCard title="Scholarships & Benefits">
            <TouchableOpacity style={styles.listItem} onPress={() => setView('benefits')}>
              <Text style={styles.listText}>💰 PwD Scholarship – Apply by Oct 20</Text>
              <MaterialIcons name="chevron-right" size={18} color={NAVY} />
            </TouchableOpacity>
            <View style={styles.listItem}><Text style={styles.listText}>🎓 Reservation Quota – 5% seats reserved</Text></View>
            <View style={styles.listItem}><Text style={styles.listText}>📄 Exam Relaxation – Extra time in JEE/NEET</Text></View>
          </SectionCard>

          <SectionCard title="Colleges with Facilities">
            <TouchableOpacity style={styles.listItem} onPress={() => setView('colleges')}>
              <Text style={styles.listText}>🏛️ College A – Wheelchair Access • Hostel Support</Text>
              <MaterialIcons name="chevron-right" size={18} color={NAVY} />
            </TouchableOpacity>
            <View style={styles.listItem}><Text style={styles.listText}>🏛️ College B – Sign Language Support • Special Library</Text></View>
          </SectionCard>

          <SectionCard title="Special Assistance">
            <TouchableOpacity style={styles.listItem} onPress={() => Alert.alert('Helpdesk','Call 1800-123-456 (example)')}>
              <Text style={styles.listText}>📞 PwD Helpdesk Contact</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.listItem} onPress={() => Alert.alert('Mentors','We will connect you with mentors experienced in PwD support.')}>
              <Text style={styles.listText}>👩‍🏫 Mentors with PwD Experience</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.listItem} onPress={() => Alert.alert('Transport','Check local government site for concession details.')}>
              <Text style={styles.listText}>🚌 Transport Concession Info</Text>
            </TouchableOpacity>
          </SectionCard>

          {/* Quick Actions */}
          <View style={styles.quickGrid}>
            <TouchableOpacity style={styles.quickCell} onPress={() => setView('benefits')}>
              <Text style={styles.quickEmoji}>💰</Text>
              <Text style={styles.quickTitle}>Benefits</Text>
              <Text style={styles.quickSub}>View All</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickCell} onPress={() => setView('colleges')}>
              <Text style={styles.quickEmoji}>🏫</Text>
              <Text style={styles.quickTitle}>Colleges</Text>
              <Text style={styles.quickSub}>PwD Support</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickCell} onPress={() => setView('deadlines')}>
              <Text style={styles.quickEmoji}>📅</Text>
              <Text style={styles.quickTitle}>Deadlines</Text>
              <Text style={styles.quickSub}>Exam Dates</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {view === 'benefits' && (
        <View style={styles.sectionCard}>
          <TouchableOpacity style={styles.backRow} onPress={() => setView('overview')}>
            <MaterialIcons name="arrow-back-ios" size={18} color={NAVY} />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.sectionTitle}>All Benefits</Text>
          <TouchableOpacity style={styles.actionBtn} onPress={() => Linking.openURL('https://example.gov/pwd-scholarships')}>
            <Text style={styles.actionBtnText}>Apply PwD Scholarship</Text>
          </TouchableOpacity>
          <View style={styles.bullet}><Text style={styles.bulletText}>• Reservation Quota: 5%</Text></View>
          <View style={styles.bullet}><Text style={styles.bulletText}>• Exam Relaxation: Extra time + scribe</Text></View>
        </View>
      )}

      {view === 'colleges' && (
        <View style={styles.sectionCard}>
          <TouchableOpacity style={styles.backRow} onPress={() => setView('overview')}>
            <MaterialIcons name="arrow-back-ios" size={18} color={NAVY} />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.sectionTitle}>Colleges with PwD Facilities</Text>
          <View style={styles.listItem}><Text style={styles.listText}>🏛️ Govt Tech College – Ramp, Hostel, Counselor</Text></View>
          <View style={styles.listItem}><Text style={styles.listText}>🏛️ State Arts College – Sign Language, Library</Text></View>
          <TouchableOpacity style={styles.actionBtn} onPress={() => Alert.alert('Info','Opening detailed list soon.') }>
            <Text style={styles.actionBtnText}>Open Full List</Text>
          </TouchableOpacity>
        </View>
      )}

      {view === 'deadlines' && (
        <View style={styles.sectionCard}>
          <TouchableOpacity style={styles.backRow} onPress={() => setView('overview')}>
            <MaterialIcons name="arrow-back-ios" size={18} color={NAVY} />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.sectionTitle}>Important Dates</Text>
          <View style={styles.listItem}><Text style={styles.listText}>🎓 NEET PwD Doc Verification – Nov 10</Text></View>
          <View style={styles.listItem}><Text style={styles.listText}>📑 JEE PwD Certificate Upload – Dec 05</Text></View>
          <View style={styles.listItem}><Text style={styles.listText}>💰 Scholarship Deadline – Oct 20</Text></View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingBottom: 20 },
  pageTitle: { fontSize: 20, fontWeight: 'bold', color: NAVY },
  sectionCard: { backgroundColor: '#FFFFFF', padding: 14, borderRadius: 12, borderWidth: 1, borderColor: '#D6DEE8', marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: NAVY, marginBottom: 8 },
  listItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 8 },
  listText: { color: '#111827', flex: 1, marginRight: 8 },
  actionBtn: { backgroundColor: NAVY, paddingVertical: 10, paddingHorizontal: 12, borderRadius: 8, alignSelf: 'flex-start', marginTop: 8 },
  actionBtnText: { color: '#FFFFFF', fontWeight: '800' },
  quickGrid: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  quickCell: { width: '32%', backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#D6DEE8', borderRadius: 12, alignItems: 'center', paddingVertical: 14 },
  quickEmoji: { fontSize: 22 },
  quickTitle: { color: NAVY, fontWeight: '800', marginTop: 6 },
  quickSub: { color: '#6B7280', fontSize: 12 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  rowCenter: { flexDirection: 'row', alignItems: 'center' },
  backRow: { flexDirection: 'row', alignItems: 'center' },
  backText: { color: NAVY, fontWeight: '700' },
  chipSm: { backgroundColor: '#F0F7FF', borderWidth: 1, borderColor: NAVY, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 14 },
  chipSmText: { color: NAVY, fontWeight: '700', fontSize: 12 },
  bullet: { paddingVertical: 4 },
  bulletText: { color: '#374151' },
});

export default PwDSupportScreen;
