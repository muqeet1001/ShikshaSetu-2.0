import React, { useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Pressable, Animated, Alert } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { setItem } from '../utils/storage';

const NAVY = '#1E3A5F';

// Enhanced categories with more specific career paths
const CAREER_CATEGORIES = [
  'Engineering & Technology',
  'Medical & Healthcare', 
  'Creative & Design',
  'Business & Management',
  'Social Service & Education',
  'Science & Research',
  'Arts & Humanities',
  'Law & Governance'
] as const;

export type CareerCategory = typeof CAREER_CATEGORIES[number];

// Enhanced question set with more variety and depth
const ENHANCED_QUESTIONS = [
  {
    id: 'intro',
    kind: 'intro' as const,
    text: 'Hi! I\'m your AI Career Counselor 🤖\n\nI\'ll help you discover your interests, strengths, and potential career paths through a personalized assessment.\n\nThis will take about 5-7 minutes. Ready to explore your future?',
  },
  {
    id: 'q1',
    kind: 'mcq' as const,
    text: '🎯 What type of activities energize you the most?',
    options: [
      { 
        label: 'Building & Creating Things', 
        icon: { family: 'mci', name: 'hammer-wrench' }, 
        w: { 'Engineering & Technology': 3, 'Creative & Design': 1 },
        emoji: '🔧'
      },
      { 
        label: 'Helping & Healing People', 
        icon: { family: 'mci', name: 'heart-pulse' }, 
        w: { 'Medical & Healthcare': 3, 'Social Service & Education': 2 },
        emoji: '❤️'
      },
      { 
        label: 'Designing & Visualizing', 
        icon: { family: 'mci', name: 'palette-advanced' }, 
        w: { 'Creative & Design': 3, 'Arts & Humanities': 1 },
        emoji: '🎨'
      },
      { 
        label: 'Leading & Organizing', 
        icon: { family: 'mci', name: 'account-group' }, 
        w: { 'Business & Management': 3, 'Law & Governance': 1 },
        emoji: '👥'
      },
    ],
  },
  {
    id: 'q2',
    kind: 'mcq' as const,
    text: '📚 Which school subjects do you find most interesting?',
    options: [
      { 
        label: 'Mathematics & Physics', 
        icon: { family: 'mci', name: 'calculator-variant' }, 
        w: { 'Engineering & Technology': 3, 'Science & Research': 2 },
        emoji: '🔢'
      },
      { 
        label: 'Biology & Chemistry', 
        icon: { family: 'mci', name: 'dna' }, 
        w: { 'Medical & Healthcare': 3, 'Science & Research': 2 },
        emoji: '🧬'
      },
      { 
        label: 'Literature & Languages', 
        icon: { family: 'mci', name: 'book-open-variant' }, 
        w: { 'Arts & Humanities': 3, 'Social Service & Education': 1 },
        emoji: '📖'
      },
      { 
        label: 'Economics & Commerce', 
        icon: { family: 'mci', name: 'cash-multiple' }, 
        w: { 'Business & Management': 3, 'Law & Governance': 1 },
        emoji: '💼'
      },
    ],
  },
  {
    id: 'q3',
    kind: 'mcq' as const,
    text: '⚡ How do you prefer to solve problems?',
    options: [
      { 
        label: 'Through logical analysis & data', 
        icon: { family: 'mci', name: 'chart-line' }, 
        w: { 'Engineering & Technology': 2, 'Science & Research': 3 },
        emoji: '📊'
      },
      { 
        label: 'Through understanding people', 
        icon: { family: 'mci', name: 'account-heart' }, 
        w: { 'Social Service & Education': 3, 'Medical & Healthcare': 2 },
        emoji: '🤝'
      },
      { 
        label: 'Through creative solutions', 
        icon: { family: 'mci', name: 'lightbulb-on' }, 
        w: { 'Creative & Design': 3, 'Arts & Humanities': 2 },
        emoji: '💡'
      },
      { 
        label: 'Through systematic planning', 
        icon: { family: 'mci', name: 'clipboard-list' }, 
        w: { 'Business & Management': 3, 'Law & Governance': 2 },
        emoji: '📋'
      },
    ],
  },
  {
    id: 'q4',
    kind: 'mcq' as const,
    text: '🌟 What kind of work environment appeals to you?',
    options: [
      { 
        label: 'High-tech labs & innovation centers', 
        icon: { family: 'mci', name: 'flask' }, 
        w: { 'Engineering & Technology': 2, 'Science & Research': 3 },
        emoji: '🔬'
      },
      { 
        label: 'Hospitals & community centers', 
        icon: { family: 'mci', name: 'hospital-building' }, 
        w: { 'Medical & Healthcare': 3, 'Social Service & Education': 2 },
        emoji: '🏥'
      },
      { 
        label: 'Studios & creative spaces', 
        icon: { family: 'mci', name: 'palette' }, 
        w: { 'Creative & Design': 3, 'Arts & Humanities': 2 },
        emoji: '🎭'
      },
      { 
        label: 'Corporate offices & boardrooms', 
        icon: { family: 'mci', name: 'office-building' }, 
        w: { 'Business & Management': 3, 'Law & Governance': 2 },
        emoji: '🏢'
      },
    ],
  },
  {
    id: 'q5',
    kind: 'mcq' as const,
    text: '🎮 In your free time, you\'re most likely to:',
    options: [
      { 
        label: 'Code, build apps, or tinker with gadgets', 
        icon: { family: 'mci', name: 'code-tags' }, 
        w: { 'Engineering & Technology': 3 },
        emoji: '💻'
      },
      { 
        label: 'Research health topics or volunteer', 
        icon: { family: 'mci', name: 'hand-heart' }, 
        w: { 'Medical & Healthcare': 2, 'Social Service & Education': 2 },
        emoji: '🤲'
      },
      { 
        label: 'Draw, design, or create content', 
        icon: { family: 'mci', name: 'brush' }, 
        w: { 'Creative & Design': 3, 'Arts & Humanities': 1 },
        emoji: '🖌️'
      },
      { 
        label: 'Read business news or plan events', 
        icon: { family: 'mci', name: 'newspaper' }, 
        w: { 'Business & Management': 3 },
        emoji: '📰'
      },
    ],
  },
  {
    id: 'q6',
    kind: 'open' as const,
    text: '💭 Describe a recent problem you solved and how you approached it (2-3 lines):',
    hint: 'Think about any challenge - academic, personal, or social. What steps did you take?'
  },
  {
    id: 'q7',
    kind: 'open' as const,
    text: '🌍 If you could make one positive change in the world, what would it be and why?',
    hint: 'This helps understand your values and motivations.'
  },
  {
    id: 'q8',
    kind: 'mcq' as const,
    text: '🏆 What type of success motivates you most?',
    options: [
      { 
        label: 'Inventing something revolutionary', 
        icon: { family: 'mci', name: 'rocket' }, 
        w: { 'Engineering & Technology': 3, 'Science & Research': 2 },
        emoji: '🚀'
      },
      { 
        label: 'Saving lives and improving health', 
        icon: { family: 'mci', name: 'medical-bag' }, 
        w: { 'Medical & Healthcare': 3 },
        emoji: '⚕️'
      },
      { 
        label: 'Creating beautiful, inspiring work', 
        icon: { family: 'mci', name: 'star' }, 
        w: { 'Creative & Design': 3, 'Arts & Humanities': 2 },
        emoji: '✨'
      },
      { 
        label: 'Building successful organizations', 
        icon: { family: 'mci', name: 'trophy' }, 
        w: { 'Business & Management': 3 },
        emoji: '🏆'
      },
    ],
  },
] as const;

// Career recommendations based on top categories
const CAREER_RECOMMENDATIONS: Record<CareerCategory, {
  careers: string[];
  description: string;
  nextSteps: string[];
  exams: string[];
}> = {
  'Engineering & Technology': {
    careers: ['Software Engineer', 'Mechanical Engineer', 'Data Scientist', 'Robotics Engineer', 'Cybersecurity Expert'],
    description: 'You show strong aptitude for problem-solving, innovation, and technology. Engineering careers involve designing, building, and improving systems.',
    nextSteps: ['Focus on Math & Physics', 'Learn programming languages', 'Participate in tech competitions', 'Build personal projects'],
    exams: ['JEE Main/Advanced', 'BITSAT', 'State Engineering Exams']
  },
  'Medical & Healthcare': {
    careers: ['Doctor (MBBS)', 'Nurse', 'Pharmacist', 'Physiotherapist', 'Medical Researcher'],
    description: 'You have a natural inclination to help others and interest in health sciences. Medical careers focus on healing and wellness.',
    nextSteps: ['Excel in Biology & Chemistry', 'Volunteer at hospitals', 'Learn basic first aid', 'Stay updated with medical news'],
    exams: ['NEET-UG', 'AIIMS', 'State Medical Exams']
  },
  'Creative & Design': {
    careers: ['Graphic Designer', 'UI/UX Designer', 'Architect', 'Fashion Designer', 'Game Designer'],
    description: 'You have strong creative instincts and visual thinking abilities. Design careers involve creating beautiful and functional solutions.',
    nextSteps: ['Build a portfolio', 'Learn design software', 'Study color theory', 'Follow design trends'],
    exams: ['NIFT', 'NID', 'CEED', 'Architecture entrance exams']
  },
  'Business & Management': {
    careers: ['Business Analyst', 'Marketing Manager', 'Entrepreneur', 'Financial Advisor', 'Project Manager'],
    description: 'You show leadership potential and business acumen. Management careers involve planning, organizing, and leading teams.',
    nextSteps: ['Develop communication skills', 'Learn about markets', 'Practice leadership roles', 'Understand economics'],
    exams: ['CAT', 'XAT', 'GMAT', 'State MBA exams']
  },
  'Social Service & Education': {
    careers: ['Teacher', 'Social Worker', 'NGO Leader', 'Counselor', 'Public Administrator'],
    description: 'You have a strong desire to help society and make a positive impact. These careers focus on serving communities.',
    nextSteps: ['Volunteer for causes', 'Develop teaching skills', 'Study social issues', 'Practice public speaking'],
    exams: ['B.Ed entrance', 'Social Work exams', 'UPSC (Civil Services)']
  },
  'Science & Research': {
    careers: ['Research Scientist', 'Data Analyst', 'Lab Technician', 'Environmental Scientist', 'Biotechnologist'],
    description: 'You have analytical thinking and curiosity about how things work. Research careers involve discovering new knowledge.',
    nextSteps: ['Excel in science subjects', 'Read research papers', 'Join science clubs', 'Do experiments'],
    exams: ['GATE', 'NET', 'Various PhD entrance exams']
  },
  'Arts & Humanities': {
    careers: ['Writer', 'Journalist', 'Historian', 'Psychologist', 'Translator'],
    description: 'You have strong language skills and interest in human culture. Arts careers involve expression and communication.',
    nextSteps: ['Read extensively', 'Practice writing', 'Learn new languages', 'Study different cultures'],
    exams: ['Mass Communication exams', 'Literature entrance exams', 'Psychology entrance exams']
  },
  'Law & Governance': {
    careers: ['Lawyer', 'Judge', 'Legal Advisor', 'Civil Servant', 'Policy Analyst'],
    description: 'You show interest in justice, rules, and governance. Legal careers involve upholding law and order.',
    nextSteps: ['Study current affairs', 'Develop debate skills', 'Understand the constitution', 'Practice critical thinking'],
    exams: ['CLAT', 'AILET', 'State Law exams', 'UPSC (Civil Services)']
  },
};

const MySkillsBot = ({ onBack }: { onBack: () => void }) => {
  const [idx, setIdx] = useState(0);
  const [scores, setScores] = useState<Record<CareerCategory, number>>(() => 
    Object.fromEntries(CAREER_CATEGORIES.map(c => [c, 0])) as any
  );
  const [messages, setMessages] = useState<{who:'bot'|'me'; text:string; typing?: boolean}[]>([
    { who: 'bot', text: ENHANCED_QUESTIONS[0].text },
  ]);
  const inputRef = useRef<TextInput>(null);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const current = ENHANCED_QUESTIONS[idx];

  // Animate MCQ block
  const appear = useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    appear.setValue(0);
    Animated.timing(appear, { toValue: 1, duration: 220, useNativeDriver: true }).start();
  }, [idx]);

  // Auto-scroll to bottom when new messages are added
  React.useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages.length]);

  const addMsg = (m: { who: 'bot' | 'me'; text: string }) => {
    setMessages(prev => [...prev, m]);
  };

  const applyWeights = (w: Partial<Record<CareerCategory, number>>) => {
    setScores(prev => {
      const next = { ...prev } as Record<CareerCategory, number>;
      (Object.keys(w) as CareerCategory[]).forEach(k => {
        next[k] += (w[k] || 0);
      });
      return next;
    });
  };

  const simulateTyping = (callback: () => void) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      callback();
    }, 800 + Math.random() * 1200);
  };

  const onPick = (opt: { label: string; w?: Partial<Record<CareerCategory, number>> }) => {
    addMsg({ who: 'me', text: opt.label });
    if (opt.w) applyWeights(opt.w);
    
    const next = idx + 1;
    if (next < ENHANCED_QUESTIONS.length) {
      simulateTyping(() => {
        setIdx(next);
        addMsg({ who: 'bot', text: ENHANCED_QUESTIONS[next].text });
      });
    } else {
      finish();
    }
  };

  const onSend = () => {
    const t = input.trim();
    if (!t) return;
    
    addMsg({ who: 'me', text: t });
    setInput('');
    
    // Enhanced heuristic analysis for open answers
    const lower = t.toLowerCase();
    const w: Partial<Record<CareerCategory, number>> = {};
    
    // Technology & Engineering keywords
    if (/code|programming|app|website|robot|algorithm|debug|software|hardware|tech|computer|data/.test(lower)) {
      w['Engineering & Technology'] = (w['Engineering & Technology'] || 0) + 3;
    }
    
    // Medical & Healthcare keywords
    if (/health|clinic|patient|hospital|disease|blood|medicine|doctor|nurse|heal|cure/.test(lower)) {
      w['Medical & Healthcare'] = (w['Medical & Healthcare'] || 0) + 3;
    }
    
    // Creative & Design keywords
    if (/design|draw|art|creative|poster|ui|ux|visual|aesthetic|beautiful|color/.test(lower)) {
      w['Creative & Design'] = (w['Creative & Design'] || 0) + 3;
    }
    
    // Business & Management keywords
    if (/business|sell|market|startup|profit|manage|lead|organize|plan|strategy/.test(lower)) {
      w['Business & Management'] = (w['Business & Management'] || 0) + 3;
    }
    
    // Social Service & Education keywords
    if (/help|community|teach|volunteer|ngo|social|education|people|society|change/.test(lower)) {
      w['Social Service & Education'] = (w['Social Service & Education'] || 0) + 3;
    }
    
    // Science & Research keywords
    if (/research|science|experiment|discover|analyze|study|investigate|theory/.test(lower)) {
      w['Science & Research'] = (w['Science & Research'] || 0) + 3;
    }
    
    // Arts & Humanities keywords
    if (/write|literature|history|culture|language|philosophy|psychology|story/.test(lower)) {
      w['Arts & Humanities'] = (w['Arts & Humanities'] || 0) + 3;
    }
    
    // Law & Governance keywords
    if (/law|legal|justice|government|policy|rule|constitution|judge|lawyer/.test(lower)) {
      w['Law & Governance'] = (w['Law & Governance'] || 0) + 3;
    }
    
    if (Object.keys(w).length) applyWeights(w);
    
    const next = idx + 1;
    if (next < ENHANCED_QUESTIONS.length) {
      simulateTyping(() => {
        setIdx(next);
        addMsg({ who: 'bot', text: ENHANCED_QUESTIONS[next].text });
      });
    } else {
      finish();
    }
  };

  const result = useMemo(() => {
    const total = Object.values(scores).reduce((a, b) => a + b, 0) || 1;
    const entries = CAREER_CATEGORIES.map(cat => ({
      cat,
      pct: Math.round((scores[cat] / total) * 100)
    })).sort((a, b) => b.pct - a.pct);
    return { total, entries };
  }, [scores]);

  const finish = async () => {
    simulateTyping(() => {
      addMsg({ who: 'bot', text: '🎉 Analysis complete! Generating your personalized career report...' });
      setIdx(ENHANCED_QUESTIONS.length); // lock
    });
    
    // Save results
    try {
      await setItem('SS_ENHANCED_SKILLS_REPORT', JSON.stringify({
        ...result,
        timestamp: new Date().toISOString(),
        topCategory: result.entries[0]?.cat
      }));
    } catch (e) {
      console.log('Failed to save results:', e);
    }
  };

  const restart = () => {
    setIdx(0);
    setScores(Object.fromEntries(CAREER_CATEGORIES.map(c => [c, 0])) as any);
    setMessages([{ who: 'bot', text: ENHANCED_QUESTIONS[0].text }]);
    setInput('');
    setIsTyping(false);
  };

  const startAssessment = () => {
    setIdx(1);
    addMsg({ who: 'me', text: 'Yes, let\'s start!' });
    simulateTyping(() => {
      addMsg({ who: 'bot', text: ENHANCED_QUESTIONS[1].text });
    });
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

      <ScrollView 
        ref={scrollViewRef}
        style={{ flex: 1 }} 
        contentContainerStyle={{ padding: 12 }}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((m, i) => (
          <View key={i} style={[styles.bubble, m.who === 'me' ? styles.me : styles.bot]}>
            <Text style={m.who === 'me' ? styles.meText : styles.botText}>{m.text}</Text>
          </View>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <View style={[styles.bubble, styles.bot]}>
            <View style={styles.typingIndicator}>
              <View style={styles.typingDot} />
              <View style={[styles.typingDot, { animationDelay: '0.2s' }]} />
              <View style={[styles.typingDot, { animationDelay: '0.4s' }]} />
            </View>
          </View>
        )}

        {/* Active question UI */}
        {idx > 0 && idx < ENHANCED_QUESTIONS.length && !isTyping && (
          <View style={{ marginTop: 8 }}>
            {current.kind === 'mcq' ? (
              <Animated.View style={[styles.mcqBox, { opacity: appear, transform: [{ translateY: appear.interpolate({ inputRange:[0,1], outputRange:[8,0] }) }] }]}>
                <View style={styles.optsWrap}>
                  {current.options?.map((o) => (
                    <Pressable 
                      key={o.label} 
                      style={({pressed}) => [styles.optBtn, pressed && styles.optBtnPressed]} 
                      onPress={() => onPick(o)}
                    >
                      <View style={{ flexDirection:'row', alignItems:'center' }}>
                        <Text style={styles.optEmoji}>{o.emoji}</Text>
                        <Text style={styles.optText}>{o.label}</Text>
                      </View>
                    </Pressable>
                  ))}
                </View>
              </Animated.View>
            ) : (
              <View style={styles.inputContainer}>
                {current.hint && (
                  <Text style={styles.inputHint}>{current.hint}</Text>
                )}
                <View style={styles.inputRow}>
                  <TextInput
                    ref={inputRef}
                    value={input}
                    onChangeText={setInput}
                    placeholder="Type your answer here..."
                    style={styles.input}
                    multiline
                    maxLength={200}
                  />
                  <TouchableOpacity 
                    style={[styles.sendBtn, !input.trim() && styles.sendBtnDisabled]} 
                    onPress={onSend}
                    disabled={!input.trim()}
                  >
                    <MaterialIcons name="send" size={18} color={input.trim() ? "#FFFFFF" : "#9CA3AF"} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        )}

        {/* Enhanced Results */}
        {idx >= ENHANCED_QUESTIONS.length && (
          <View>
            {/* Main Results Card */}
            <View style={styles.reportCard}>
              <View style={styles.reportHeader}>
                <MaterialCommunityIcons name="chart-donut" size={32} color={NAVY} />
                <Text style={styles.reportTitle}>🎯 Your Career Profile</Text>
              </View>
              
              {result.entries.slice(0, 3).map((e, index) => (
                <View key={e.cat} style={{ marginTop: 12 }}>
                  <View style={{ flexDirection: 'row', justifyContent:'space-between', alignItems: 'center' }}>
                    <Text style={[styles.catLabel, index === 0 && styles.topCatLabel]}>
                      {index === 0 ? '🏆 ' : index === 1 ? '🥈 ' : '🥉 '}{e.cat}
                    </Text>
                    <Text style={[styles.catPct, index === 0 && styles.topCatPct]}>{e.pct}%</Text>
                  </View>
                  <View style={styles.barBg}>
                    <View style={[styles.barFill, { width: `${e.pct}%`, backgroundColor: index === 0 ? NAVY : index === 1 ? '#4F46E5' : '#7C3AED' }]} />
                  </View>
                </View>
              ))}
            </View>

            {/* Career Recommendations */}
            {result.entries[0] && (
              <View style={styles.recommendationCard}>
                <Text style={styles.recommendationTitle}>💼 Recommended Careers</Text>
                <Text style={styles.recommendationDesc}>
                  {CAREER_RECOMMENDATIONS[result.entries[0].cat]?.description}
                </Text>
                
                <View style={styles.careersContainer}>
                  {CAREER_RECOMMENDATIONS[result.entries[0].cat]?.careers.slice(0, 3).map((career, index) => (
                    <View key={career} style={styles.careerChip}>
                      <Text style={styles.careerChipText}>{career}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.nextStepsContainer}>
                  <Text style={styles.nextStepsTitle}>🚀 Next Steps:</Text>
                  {CAREER_RECOMMENDATIONS[result.entries[0].cat]?.nextSteps.slice(0, 3).map((step, index) => (
                    <View key={index} style={styles.stepRow}>
                      <Text style={styles.stepBullet}>•</Text>
                      <Text style={styles.stepText}>{step}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.examsContainer}>
                  <Text style={styles.examsTitle}>📚 Key Exams:</Text>
                  <View style={styles.examChipsContainer}>
                    {CAREER_RECOMMENDATIONS[result.entries[0].cat]?.exams.map((exam, index) => (
                      <View key={exam} style={styles.examChip}>
                        <Text style={styles.examChipText}>{exam}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            )}

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.primary} onPress={restart}>
                <MaterialIcons name="refresh" size={20} color="#FFFFFF" />
                <Text style={styles.primaryText}>Retake Assessment</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondary} onPress={onBack}>
                <MaterialIcons name="home" size={20} color={NAVY} />
                <Text style={styles.secondaryText}>Back to Home</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Start Button */}
      {idx === 0 && (
        <View style={{ padding: 16 }}>
          <TouchableOpacity style={styles.startButton} onPress={startAssessment}>
            <MaterialCommunityIcons name="rocket-launch" size={24} color="#FFFFFF" />
            <Text style={styles.startButtonText}>Start Career Assessment</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: '#F8FAFC' },
  topBar: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 16, 
    paddingVertical: 12, 
    borderBottomWidth: 1, 
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF'
  },
  topTitle: { color: NAVY, fontWeight: '800', fontSize: 18, marginLeft: 8 },
  
  // Chat bubbles
  bubble: { 
    maxWidth: '85%', 
    paddingHorizontal: 16, 
    paddingVertical: 12, 
    borderRadius: 18, 
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  bot: { 
    alignSelf: 'flex-start', 
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
  },
  me: { 
    alignSelf: 'flex-end', 
    backgroundColor: NAVY,
    borderBottomRightRadius: 4,
  },
  botText: { color: '#111827', fontSize: 15, lineHeight: 22 },
  meText: { color: '#FFFFFF', fontSize: 15, lineHeight: 22 },
  
  // Typing indicator
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#9CA3AF',
    marginHorizontal: 2,
  },
  
  // MCQ Options
  mcqBox: { 
    backgroundColor: '#F0F9FF', 
    borderWidth: 2, 
    borderColor: '#BAE6FD', 
    padding: 16, 
    borderRadius: 16,
    marginTop: 8,
  },
  optsWrap: { flexDirection: 'column', gap: 8 },
  optBtn: { 
    backgroundColor: '#FFFFFF', 
    borderWidth: 2, 
    borderColor: '#E0E7FF', 
    paddingHorizontal: 16, 
    paddingVertical: 14, 
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  optBtnPressed: { backgroundColor: '#EFF6FF', borderColor: NAVY },
  optEmoji: { fontSize: 18, marginRight: 12 },
  optText: { color: NAVY, fontWeight: '700', fontSize: 15, flex: 1 },
  
  // Input container
  inputContainer: {
    marginTop: 8,
  },
  inputHint: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  inputRow: { 
    flexDirection: 'row', 
    alignItems: 'flex-end',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    padding: 4,
  },
  input: { 
    flex: 1, 
    paddingHorizontal: 12, 
    paddingVertical: 10, 
    color: '#111827',
    fontSize: 15,
    maxHeight: 100,
  },
  sendBtn: { 
    backgroundColor: NAVY, 
    borderRadius: 8, 
    padding: 10,
    margin: 4,
  },
  sendBtnDisabled: {
    backgroundColor: '#E5E7EB',
  },
  
  // Results cards
  reportCard: { 
    backgroundColor: '#FFFFFF', 
    borderWidth: 1, 
    borderColor: '#E5E7EB', 
    padding: 20, 
    borderRadius: 16, 
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  reportHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  reportTitle: { 
    color: NAVY, 
    fontWeight: '800', 
    fontSize: 20,
    marginLeft: 12,
  },
  
  // Category labels and bars
  catLabel: { color: '#111827', fontWeight: '700', fontSize: 16 },
  topCatLabel: { color: NAVY, fontWeight: '800', fontSize: 17 },
  catPct: { color: '#111827', fontWeight: '700', fontSize: 16 },
  topCatPct: { color: NAVY, fontWeight: '800', fontSize: 17 },
  barBg: { 
    height: 12, 
    backgroundColor: '#F3F4F6', 
    borderRadius: 8, 
    overflow: 'hidden', 
    marginTop: 6 
  },
  barFill: { 
    height: '100%', 
    backgroundColor: NAVY,
    borderRadius: 8,
  },
  
  // Recommendation card
  recommendationCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 20,
    borderRadius: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  recommendationTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: NAVY,
    marginBottom: 12,
  },
  recommendationDesc: {
    fontSize: 15,
    color: '#4B5563',
    lineHeight: 22,
    marginBottom: 16,
  },
  
  // Career chips
  careersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  careerChip: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#C7D2FE',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  careerChipText: {
    color: NAVY,
    fontWeight: '600',
    fontSize: 13,
  },
  
  // Next steps
  nextStepsContainer: {
    marginBottom: 20,
  },
  nextStepsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: NAVY,
    marginBottom: 8,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  stepBullet: {
    color: NAVY,
    fontWeight: '900',
    marginRight: 8,
    marginTop: 2,
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  
  // Exams
  examsContainer: {
    marginBottom: 20,
  },
  examsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: NAVY,
    marginBottom: 8,
  },
  examChipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  examChip: {
    backgroundColor: '#FEF3C7',
    borderWidth: 1,
    borderColor: '#FCD34D',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  examChipText: {
    color: '#92400E',
    fontWeight: '600',
    fontSize: 12,
  },
  
  // Action buttons
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  primary: { 
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: NAVY, 
    paddingVertical: 14, 
    paddingHorizontal: 20, 
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  primaryText: { 
    color: '#FFFFFF', 
    fontWeight: '800',
    fontSize: 15,
    marginLeft: 8,
  },
  secondary: { 
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF', 
    borderWidth: 2, 
    borderColor: NAVY, 
    paddingVertical: 14, 
    paddingHorizontal: 20, 
    borderRadius: 12 
  },
  secondaryText: { 
    color: NAVY, 
    fontWeight: '800',
    fontSize: 15,
    marginLeft: 8,
  },
  
  // Start button
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: NAVY,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 18,
    marginLeft: 8,
  },
});

export default MySkillsBot;
