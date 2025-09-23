import React, { useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Pressable, Animated } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { setItem } from '../utils/storage';

const NAVY = '#1E3A5F';

// Simple scoring model for categories
const CATS = ['Engineering','Medicine','Design','Business','Social Service','IT'] as const;
export type Cat = typeof CATS[number];

const QUESTIONS = [
  {
    id: 'q1',
    kind: 'mcq' as const,
    text: 'What activity sounds most fun to you?',
    options: [
      { label: 'Solving tricky puzzles', icon: { family: 'mci', name: 'puzzle-outline' }, w: { Engineering: 2, IT: 1 } },
      { label: 'Helping at a clinic', icon: { family: 'mci', name: 'hospital-box-outline' }, w: { Medicine: 2, Social: 1 } },
      { label: 'Making posters/UI', icon: { family: 'mci', name: 'palette-outline' }, w: { Design: 2, Business: 1 } },
      { label: 'Selling a new idea', icon: { family: 'mci', name: 'storefront-outline' }, w: { Business: 2 } },
    ],
  },
  {
    id: 'q2',
    kind: 'mcq' as const,
    text: 'Which school subject do you enjoy the most?',
    options: [
      { label: 'Math/Physics', icon: { family: 'mci', name: 'calculator-variant' }, w: { Engineering: 2, IT: 1 } },
      { label: 'Biology', icon: { family: 'mci', name: 'dna' }, w: { Medicine: 2 } },
      { label: 'Art/Graphics', icon: { family: 'mci', name: 'palette-outline' }, w: { Design: 2 } },
      { label: 'Commerce/Economics', icon: { family: 'mci', name: 'cash-multiple' }, w: { Business: 2 } },
    ],
  },
  {
    id: 'q3',
    kind: 'mcq' as const,
    text: 'Pick a weekend role:',
    options: [
      { label: 'Fix gadgets', icon: { family: 'mci', name: 'tools' }, w: { Engineering: 2, IT: 1 } },
      { label: 'Volunteer at blood camp', icon: { family: 'mci', name: 'hand-heart-outline' }, w: { Medicine: 2, Social: 1 } },
      { label: 'Design club poster', icon: { family: 'mci', name: 'brush' }, w: { Design: 2 } },
      { label: 'Organize a sale', icon: { family: 'mci', name: 'cart-outline' }, w: { Business: 2 } },
    ],
  },
  {
    id: 'q4',
    kind: 'open' as const,
    text: 'Tell me one problem you recently solved and how you solved it (1-2 lines).',
  },
  {
    id: 'q5',
    kind: 'open' as const,
    text: 'If you could help your community in one way, what would you do?',
  },
] as const;

const MySkillsBot = ({ onBack }: { onBack: () => void }) => {
  const [idx, setIdx] = useState(0);
  const [scores, setScores] = useState<Record<Cat, number>>(() => Object.fromEntries(CATS.map(c=>[c,0])) as any);
  const [messages, setMessages] = useState<{who:'bot'|'me'; text:string}[]>([
    { who: 'bot', text: 'Hi! I will ask a few quick questions (2 mins). Ready?' },
  ]);
  const inputRef = useRef<TextInput>(null);
  const [input, setInput] = useState('');

  const current = QUESTIONS[idx];

  // Animate MCQ block
  const appear = useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    appear.setValue(0);
    Animated.timing(appear, { toValue: 1, duration: 220, useNativeDriver: true }).start();
  }, [idx]);

  const addMsg = (m:{who:'bot'|'me'; text:string}) => setMessages(prev=>[...prev,m]);
  const applyWeights = (w: Partial<Record<Cat, number>>) => {
    setScores(prev => {
      const next = { ...prev } as Record<Cat, number>;
      (Object.keys(w) as Cat[]).forEach(k => { next[k] += (w[k] || 0); });
      return next;
    });
  };

  const onPick = (opt: {label:string; w?: Partial<Record<Cat, number>>}) => {
    addMsg({ who:'me', text: opt.label });
    if (opt.w) applyWeights(opt.w);
    const next = idx + 1;
    if (next < QUESTIONS.length) {
      setIdx(next);
      setTimeout(()=> addMsg({ who:'bot', text: QUESTIONS[next].text }), 200);
    } else {
      finish();
    }
  };

  const onSend = () => {
    const t = input.trim(); if (!t) return;
    addMsg({ who:'me', text: t });
    setInput('');
    // Light heuristic from open answers
    const lower = t.toLowerCase();
    const w: Partial<Record<Cat, number>> = {};
    if (/code|app|website|robot|algorithm|debug/.test(lower)) { w.IT = (w.IT||0)+2; w.Engineering=(w.Engineering||0)+1; }
    if (/diagram|design|poster|ui|ux|draw/.test(lower)) { w.Design=(w.Design||0)+2; }
    if (/clinic|patient|health|hospital|disease|blood/.test(lower)) { w.Medicine=(w.Medicine||0)+2; }
    if (/sell|business|market|startup|profit/.test(lower)) { w.Business=(w.Business||0)+2; }
    if (/help|community|teach|volunteer|ngo/.test(lower)) { w['Social Service']=(w['Social Service']||0)+2; }
    if (Object.keys(w).length) applyWeights(w as any);
    const next = idx + 1;
    if (next < QUESTIONS.length) {
      setIdx(next);
      setTimeout(()=> addMsg({ who:'bot', text: QUESTIONS[next].text }), 200);
    } else {
      finish();
    }
  };

  const result = useMemo(() => {
    const total = Object.values(scores).reduce((a,b)=>a+b,0) || 1;
    const entries = CATS.map(cat => ({ cat, pct: Math.round((scores[cat]/total)*100) }))
      .sort((a,b)=>b.pct-a.pct);
    return { total, entries };
  }, [scores]);

  const finish = async () => {
    addMsg({ who:'bot', text: 'Thanks! Generating your skill profile…' });
    // save
    try { await setItem('SS_SKILLS_REPORT', JSON.stringify(result)); } catch {}
    setIdx(QUESTIONS.length); // lock
  };

  const restart = () => {
    setIdx(0);
    setScores(Object.fromEntries(CATS.map(c=>[c,0])) as any);
    setMessages([{ who:'bot', text: 'Hi! I will ask a few quick questions (2 mins). Ready?' }]);
    setInput('');
    setTimeout(()=> addMsg({ who:'bot', text: QUESTIONS[0].text }), 100);
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={onBack} style={{ padding: 6 }}>
          <MaterialIcons name="arrow-back" size={20} color={NAVY} />
        </TouchableOpacity>
        <Text style={styles.topTitle}>My Skills – Quick Quiz</Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 12 }}>
        {messages.map((m, i) => (
          <View key={i} style={[styles.bubble, m.who==='me'? styles.me: styles.bot]}>
            <Text style={m.who==='me'? styles.meText: styles.botText}>{m.text}</Text>
          </View>
        ))}

        {/* Active question UI */}
        {idx < QUESTIONS.length && (
          <View style={{ marginTop: 8 }}>
            {current.kind === 'mcq' ? (
              <Animated.View style={[styles.mcqBox, { opacity: appear, transform: [{ translateY: appear.interpolate({ inputRange:[0,1], outputRange:[8,0] }) }] }] }>
                <View style={styles.optsWrap}>
                  {current.options.map((o) => (
                    <Pressable key={o.label} style={({pressed})=>[styles.optBtn, pressed && styles.optBtnPressed]} onPress={()=>onPick(o)}>
                      <View style={{ flexDirection:'row', alignItems:'center' }}>
                        {o.icon && (
                          o.icon.family === 'mci' ? (
                            <MaterialCommunityIcons name={o.icon.name as any} size={18} color={NAVY} style={{ marginRight: 8 }} />
                          ) : (
                            <MaterialIcons name={(o.icon.name as any)} size={18} color={NAVY} style={{ marginRight: 8 }} />
                          )
                        )}
                        <Text style={styles.optText}>{o.label}</Text>
                      </View>
                    </Pressable>
                  ))}
                </View>
              </Animated.View>
            ) : (
              <View style={styles.inputRow}>
                <TextInput
                  ref={inputRef}
                  value={input}
                  onChangeText={setInput}
                  placeholder="Type your answer…"
                  style={styles.input}
                  multiline
                />
                <TouchableOpacity style={styles.sendBtn} onPress={onSend}>
                  <MaterialIcons name="send" size={18} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}

        {/* Result */}
        {idx >= QUESTIONS.length && (
          <View style={styles.reportCard}>
            <Text style={styles.reportTitle}>Your Skill Fit</Text>
            {result.entries.map(e => (
              <View key={e.cat} style={{ marginTop: 8 }}>
                <View style={{ flexDirection: 'row', justifyContent:'space-between' }}>
                  <Text style={styles.catLabel}>{e.cat}</Text>
                  <Text style={styles.catPct}>{e.pct}%</Text>
                </View>
                <View style={styles.barBg}>
                  <View style={[styles.barFill,{ width: `${e.pct}%`}]} />
                </View>
              </View>
            ))}
            <Text style={styles.reportNote}>Tip: These percentages are based on your choices and short answers (e.g., problem solving → Engineering/IT, helping people → Medicine/Social Service).</Text>
            <View style={{ flexDirection:'row', marginTop: 10 }}>
              <TouchableOpacity style={styles.primary} onPress={restart}><Text style={styles.primaryText}>Retake</Text></TouchableOpacity>
              <TouchableOpacity style={[styles.secondary,{ marginLeft: 8 }]} onPress={onBack}><Text style={styles.secondaryText}>Close</Text></TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>

      {messages.length === 1 && idx === 0 && (
        <View style={{ padding: 12 }}>
          <TouchableOpacity style={styles.primary} onPress={() => { addMsg({ who:'bot', text: QUESTIONS[0].text }); }}>
            <Text style={styles.primaryText}>Start</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: { flex: 1 },
  topBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 8, borderBottomWidth: 1, borderColor: '#E5E7EB' },
  topTitle: { color: NAVY, fontWeight: '800', fontSize: 16, marginLeft: 6 },
  bubble: { maxWidth: '85%', paddingHorizontal: 10, paddingVertical: 8, borderRadius: 12, marginTop: 8 },
  bot: { alignSelf: 'flex-start', backgroundColor: '#F3F4F6' },
  me: { alignSelf: 'flex-end', backgroundColor: '#1E3A5F' },
  botText: { color: '#111827' },
  meText: { color: '#FFFFFF' },
  mcqBox: { backgroundColor: '#EFF6FF', borderWidth: 1, borderColor: '#BFDBFE', padding: 10, borderRadius: 12 },
  optsWrap: { flexDirection: 'column' },
  optBtn: { width: '100%', backgroundColor: '#DBEAFE', borderWidth: 1, borderColor: '#93C5FD', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 10, marginTop: 8 },
  optBtnPressed: { backgroundColor: '#BFDBFE', borderColor: NAVY },
  optText: { color: NAVY, fontWeight: '800' },
  inputRow: { flexDirection: 'row', alignItems: 'flex-end', marginTop: 8 },
  input: { flex: 1, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 8, color: '#111827' },
  sendBtn: { marginLeft: 8, backgroundColor: NAVY, borderRadius: 10, padding: 10 },
  reportCard: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB', padding: 12, borderRadius: 12, marginTop: 12 },
  reportTitle: { color: NAVY, fontWeight: '800', fontSize: 16 },
  catLabel: { color: '#111827', fontWeight: '700' },
  catPct: { color: '#111827', fontWeight: '700' },
  barBg: { height: 8, backgroundColor: '#E5E7EB', borderRadius: 6, overflow: 'hidden', marginTop: 4 },
  barFill: { height: '100%', backgroundColor: NAVY },
  reportNote: { color: '#6B7280', marginTop: 10, fontSize: 12 },
  primary: { backgroundColor: NAVY, paddingVertical: 10, paddingHorizontal: 14, borderRadius: 10 },
  primaryText: { color: '#FFFFFF', fontWeight: '800' },
  secondary: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: NAVY, paddingVertical: 10, paddingHorizontal: 14, borderRadius: 10 },
  secondaryText: { color: NAVY, fontWeight: '800' },
});

export default MySkillsBot;
