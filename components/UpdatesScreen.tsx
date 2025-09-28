import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Linking, Share } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { getItem, setItem } from '../utils/storage';

const NAVY = '#1E3A5F';
const NAVY_DARK = '#0F2A3F';

const FILTERS = ['All', 'Admission', 'Scholarships', 'Exams', 'Tips'];

// Seeded updates. In a real app this would come from an API.
const seededUpdates = [
  {
    id: 'u1',
    type: 'Admission',
    date: '2025-09-25',
    title: 'Admission Open: B.Sc Computer Science at Govt College, Mumbai',
    description: 'Applications are open for B.Sc CS with merit-based intake. Submit online before the deadline.',
    applyUrl: 'https://example.gov/admissions/bsc-cs',
    importantDates: [
      { label: 'Applications Open', value: '25 Sept 2025' },
      { label: 'Last Date', value: '10 Oct 2025' },
    ],
  },
  {
    id: 'u2',
    type: 'Scholarships',
    date: '2025-10-15',
    title: 'Scholarship Alert: Merit-based scholarship for Arts students',
    description: 'Merit scholarship for Arts stream students with minimum 75% in Class 12.',
    applyUrl: 'https://example.gov/scholarships/arts-merit',
    importantDates: [
      { label: 'Deadline', value: '15 Oct 2025' },
    ],
    eligibility: 'Class 12 Arts, 75% and above',
  },
  {
    id: 'u3',
    type: 'Tips',
    title: 'Tip: How to choose the right subject stream after Class 12',
    description: 'Consider aptitude, interests, and future opportunities. Talk to mentors and alumni.',
    readMoreUrl: 'https://example.gov/tips/choose-right-stream',
  },
  {
    id: 'u4',
    type: 'Exams',
    date: '2025-12-20',
    title: 'Exam Reminder: Polytechnic Entrance Exam',
    description: 'State polytechnic entrance exam date announced. Prepare and keep documents ready.',
    importantDates: [
      { label: 'Exam Date', value: '20 Dec 2025' },
    ],
  },
];

const Pill: React.FC<{ label: string; active?: boolean; onPress?: () => void }> = ({ label, active, onPress }) => (
  <TouchableOpacity style={[styles.pill, active && styles.pillActive]} onPress={onPress}>
    <Text style={[styles.pillText, active && styles.pillTextActive]}>{label}</Text>
  </TouchableOpacity>
);

const UpdateCard: React.FC<{ u: any; onPress?: () => void; onPrimary?: () => void; onSecondary?: () => void }> = ({ u, onPress, onPrimary, onSecondary }) => (
  <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
    <View style={{ marginBottom: 6 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {u.type === 'Admission' && <MaterialCommunityIcons name="school-outline" size={20} color={NAVY} style={{ marginRight: 6 }} />}
        {u.type === 'Scholarships' && <MaterialCommunityIcons name="cash-multiple" size={20} color={NAVY} style={{ marginRight: 6 }} />}
        {u.type === 'Exams' && <MaterialCommunityIcons name="clipboard-text-outline" size={20} color={NAVY} style={{ marginRight: 6 }} />}
        {u.type === 'Tips' && <MaterialCommunityIcons name="lightbulb-on-outline" size={20} color={NAVY} style={{ marginRight: 6 }} />}
        <Text style={styles.cardTitle}>{u.title}</Text>
      </View>
      {u.date && (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
          <MaterialCommunityIcons name="calendar" size={16} color={NAVY} />
          <Text style={[styles.cardLine, { marginLeft: 6 }]}>{u.date}</Text>
        </View>
      )}
    </View>
    <Text style={styles.cardLine}>{u.description}</Text>
    <View style={styles.cardActionsRow}>
      {onPrimary && (
        <TouchableOpacity style={styles.primaryBtn} onPress={onPrimary}>
          <Text style={styles.primaryBtnText}>{u.type === 'Tips' ? 'Read More' : u.type === 'Exams' ? 'Add to Timeline' : 'Apply Now'}</Text>
        </TouchableOpacity>
      )}
      {onSecondary && (
        <TouchableOpacity style={styles.secondaryBtn} onPress={onSecondary}>
          <Text style={styles.secondaryBtnText}>Save</Text>
        </TouchableOpacity>
      )}
    </View>
  </TouchableOpacity>
);

interface Props { onBack?: () => void; onOpenProfile?: () => void }

const UpdatesScreen = ({ onBack, onOpenProfile }: Props) => {
  const [filterIdx, setFilterIdx] = useState(0);
  const [readIds, setReadIds] = useState<string[]>([]); // array of update ids
  const [savedIds, setSavedIds] = useState<string[]>([]); // array of update ids
  const [detail, setDetail] = useState<any>(null); // update object
  const [mode, setMode] = useState<'feed' | 'saved' | 'timeline'>('feed');
  const [timeline, setTimeline] = useState<Array<{id: string; at: number}>>([]);

  // load saved/read
  useEffect(() => {
    (async () => {
      try {
        const r = await getItem('SS_UPDATES_READ');
        const s = await getItem('SS_UPDATES_SAVED');
        const t = await getItem('SS_TIMELINE_LIST');
        if (r) setReadIds(JSON.parse(r));
        if (s) setSavedIds(JSON.parse(s));
        if (t) setTimeline(JSON.parse(t));
      } catch {}
    })();
  }, []);

  // persist on change
  useEffect(() => { setItem('SS_UPDATES_READ', JSON.stringify(readIds)).catch(()=>{}); }, [readIds]);
  useEffect(() => { setItem('SS_UPDATES_SAVED', JSON.stringify(savedIds)).catch(()=>{}); }, [savedIds]);
  useEffect(() => { setItem('SS_TIMELINE_LIST', JSON.stringify(timeline)).catch(()=>{}); }, [timeline]);

  const updates = useMemo(() => {
    const f = FILTERS[filterIdx];
    if (f === 'All') return seededUpdates;
    return seededUpdates.filter(u => u.type === f);
  }, [filterIdx]);

  const newCount = useMemo(() => {
    const allIds = seededUpdates.map(u => u.id);
    return allIds.filter(id => !readIds.includes(id)).length;
  }, [readIds]);

  // expose badge counts to storage for nav badges
  useEffect(() => {
    setItem('SS_UPDATES_BADGES', JSON.stringify({ unread: newCount, saved: savedIds.length })).catch(()=>{});
  }, [newCount, savedIds]);

  const markAllAsRead = () => {
    const allIds = seededUpdates.map(u => u.id);
    setReadIds(allIds);
    Alert.alert('Marked as read', 'All updates marked as read.');
  };

  const saveUpdate = (u: any) => {
    setSavedIds(prev => prev.includes(u.id) ? prev : [...prev, u.id]);
    Alert.alert('Saved', 'Update saved to bookmarks.');
  };

  const addToTimeline = (u: any) => {
    setTimeline(prev => {
      const next = [...prev, { id: u.id, at: Date.now() }];
      return next;
    });
    Alert.alert('Added', 'Added to your timeline.');
  };

  const openPrimary = (u: any) => {
    if (u.type === 'Tips' && u.readMoreUrl) return Linking.openURL(u.readMoreUrl);
    if (u.type === 'Exams') return addToTimeline(u);
    if (u.applyUrl) return Linking.openURL(u.applyUrl);
    Alert.alert('Info', 'No link available.');
  };

  const openShare = async (u: any) => {
    try {
      await Share.share({ message: `${u.title}\n${u.description || ''}`.trim() });
    } catch {}
  };

  const renderDetail = () => (
    <View style={styles.detailContainer}>
      <TouchableOpacity style={styles.backRow} onPress={() => setDetail(null)}>
        <MaterialIcons name="arrow-back-ios" size={18} color={NAVY} />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.detailTitle}>{detail.title}</Text>
      <Text style={styles.detailMeta}>Type: {detail.type}</Text>
      {detail.date && <Text style={styles.detailMeta}>Date: {detail.date}</Text>}
      {detail.eligibility && (
        <>
          <Text style={styles.sectionTitle}>Eligibility Criteria</Text>
          <Text style={styles.cardLine}>{detail.eligibility}</Text>
        </>
      )}
      {detail.importantDates && detail.importantDates.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Important Dates</Text>
          {detail.importantDates.map((d: any, i: number) => (
            <Text key={i} style={styles.cardLine}>• {d.label}: {d.value}</Text>
          ))}
        </>
      )}
      {detail.description && (
        <>
          <Text style={styles.sectionTitle}>Details</Text>
          <Text style={styles.cardLine}>{detail.description}</Text>
        </>
      )}
      <View style={styles.detailActions}>
        <TouchableOpacity style={styles.primaryBtn} onPress={() => openPrimary(detail)}>
          <Text style={styles.primaryBtnText}>
            {detail.type === 'Tips' ? 'Read More' : detail.type === 'Exams' ? 'Add to Timeline' : 'Apply Now'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryBtn} onPress={() => saveUpdate(detail)}>
          <Text style={styles.secondaryBtnText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryBtn} onPress={() => openShare(detail)}>
          <Text style={styles.secondaryBtnText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={[styles.headerBlock, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {onBack && (
            <TouchableOpacity style={[styles.backRow, { marginBottom: 0, marginRight: 8 }]} onPress={onBack}>
              <MaterialIcons name="arrow-back-ios" size={18} color={NAVY} />
              <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>
          )}
          <Text style={styles.pageTitle}>Latest Updates & Notifications</Text>
        </View>
        {onOpenProfile && (
          <TouchableOpacity onPress={onOpenProfile} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <MaterialIcons name="account-circle" size={24} color={NAVY} />
          </TouchableOpacity>
        )}
      </View>

      {/* Summary */}
      <View style={styles.summaryBar}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="notifications-outline" size={18} color={NAVY} />
          <Text style={styles.summaryText}>  You have {newCount} new updates</Text>
        </View>
        <TouchableOpacity onPress={markAllAsRead}>
          <Text style={styles.summaryAction}>Mark All as Read</Text>
        </TouchableOpacity>
      </View>

      {/* Shortcuts */}
      <View style={styles.shortcutsRow}>
        <TouchableOpacity style={styles.secondaryBtn} onPress={() => { setMode('saved'); setDetail(null); }}>
          <Text style={styles.secondaryBtnText}>Saved Updates</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryBtn} onPress={() => { setMode('timeline'); setDetail(null); }}>
          <Text style={styles.secondaryBtnText}>Timeline</Text>
        </TouchableOpacity>
        {mode !== 'feed' && (
          <TouchableOpacity style={styles.linkBtn} onPress={() => setMode('feed')}>
            <Text style={styles.linkBtnText}>Back to Feed</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Filters (hidden on non-feed modes) */}
      {mode === 'feed' && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersScroll}>
          <View style={styles.filtersRow}>
            {FILTERS.map((f, i) => (
              <Pill key={f} label={f} active={i === filterIdx} onPress={() => setFilterIdx(i)} />
            ))}
          </View>
        </ScrollView>
      )}

      {/* Content */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {detail ? (
          renderDetail()
        ) : mode === 'saved' ? (
          savedIds.length === 0 ? (
            <View style={styles.emptyBox}>
              <MaterialCommunityIcons name="bookmark-outline" size={36} color={NAVY} />
              <Text style={styles.emptyText}>No saved updates.</Text>
            </View>
          ) : (
            savedIds.map(id => {
              const u = seededUpdates.find(x => x.id === id);
              if (!u) return null;
              return (
                <UpdateCard
                  key={`saved_${id}`}
                  u={u}
                  onPress={() => { setDetail(u); if (!readIds.includes(u.id)) setReadIds(prev => [...prev, u.id]); }}
                  onPrimary={() => openPrimary(u)}
                  onSecondary={() => setSavedIds(prev => prev.filter(x => x !== id))}
                />
              );
            })
          )
        ) : mode === 'timeline' ? (
          timeline.length === 0 ? (
            <View style={styles.emptyBox}>
              <MaterialCommunityIcons name="calendar" size={36} color={NAVY} />
              <Text style={styles.emptyText}>Your timeline is empty.</Text>
            </View>
          ) : (
            timeline
              .slice()
              .reverse()
              .map((t, idx) => {
                const u = seededUpdates.find(x => x.id === t.id);
                if (!u) return null;
                const when = new Date(t.at).toLocaleString();
                return (
                  <View key={`tl_${idx}`} style={styles.card}>
                    <Text style={styles.cardTitle}>{u.title}</Text>
                    <Text style={styles.cardLine}>Added: {when}</Text>
                    {u.date && <Text style={styles.cardLine}>Event Date: {u.date}</Text>}
                    <View style={styles.cardActionsRow}>
                      <TouchableOpacity style={styles.primaryBtn} onPress={() => setDetail(u)}>
                        <Text style={styles.primaryBtnText}>Open</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })
          )
        ) : (
          updates.map(u => (
            <UpdateCard
              key={u.id}
              u={u}
              onPress={() => { setDetail(u); if (!readIds.includes(u.id)) setReadIds(prev => [...prev, u.id]); }}
              onPrimary={() => openPrimary(u)}
              onSecondary={() => saveUpdate(u)}
            />
          ))
        )}
      </ScrollView>
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
  pageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: NAVY,
  },
  summaryBar: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D6DEE8',
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  summaryText: {
    color: NAVY,
    fontWeight: '700',
  },
  summaryAction: {
    color: NAVY,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  filtersScroll: {
    marginBottom: 8,
  },
  filtersRow: {
    flexDirection: 'row',
  },
  pill: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 18,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  pillActive: {
    backgroundColor: NAVY,
    borderColor: NAVY_DARK,
  },
  pillText: {
    color: NAVY,
    fontWeight: '600',
  },
  pillTextActive: {
    color: '#FFFFFF',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D6DEE8',
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 4,
  },
  cardTitle: {
    color: NAVY,
    fontWeight: '800',
    flexShrink: 1,
  },
  cardLine: {
    color: '#374151',
    marginTop: 2,
  },
  cardActionsRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  primaryBtn: {
    backgroundColor: NAVY,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 8,
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  secondaryBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: NAVY,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 8,
  },
  secondaryBtnText: {
    color: NAVY,
    fontWeight: '700',
  },
  linkBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  linkBtnText: {
    color: NAVY,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  backText: {
    color: NAVY,
    fontWeight: '700',
    marginLeft: 2,
  },
  detailContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D6DEE8',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 4,
  },
  shortcutsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  emptyBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D6DEE8',
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  emptyText: {
    color: NAVY,
    fontWeight: '800',
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: NAVY,
    marginBottom: 6,
  },
  detailMeta: {
    color: '#374151',
    marginTop: 2,
  },
  sectionTitle: {
    marginTop: 10,
    color: NAVY,
    fontWeight: '800',
  },
  detailActions: {
    flexDirection: 'row',
    marginTop: 12,
    flexWrap: 'wrap',
  },
});

export default UpdatesScreen;
