import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { getItem, setItem } from '../utils/storage';

const NAVY = '#1E3A5F';
const NAVY_DARK = '#0F2A3F';

const BOT_GREETING = "Hi! I'm your Shikshasetu assistant. Ask me about courses, colleges, scholarships, exams, or guidance. You can also say: 'open courses', 'open colleges', 'show updates', or 'my plan'.";

const QuickChip = ({ icon, label, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.chip}>
    <MaterialCommunityIcons name={icon} size={16} color={NAVY} />
    <Text style={styles.chipText}>{label}</Text>
  </TouchableOpacity>
);

const ChatBot = ({ visible, onClose, onNavigate }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (visible) {
      (async () => {
        const raw = await getItem('SS_CHAT_HISTORY');
        if (raw) {
          const hist = JSON.parse(raw);
          setMessages(hist);
        } else {
          const first = [{ role: 'bot', text: BOT_GREETING, at: Date.now() }];
          setMessages(first);
          await setItem('SS_CHAT_HISTORY', JSON.stringify(first));
        }
      })();
    }
  }, [visible]);

  useEffect(() => {
    if (visible && scrollRef.current) {
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 50);
    }
  }, [messages, visible]);

  const save = async (list) => setItem('SS_CHAT_HISTORY', JSON.stringify(list)).catch(()=>{});

  const addMessage = async (role, text) => {
    const next = [...messages, { role, text, at: Date.now() }];
    setMessages(next);
    await save(next);
  };

  const handleNavigate = (tab) => {
    onClose?.();
    onNavigate?.(tab);
  };

  const reply = async (userText) => {
    const t = userText.trim().toLowerCase();
    // Simple intent detection
    if (t.includes('course')) {
      await addMessage('bot', "You can explore Courses under 'Courses & Colleges'. Should I open it?");
      return;
    }
    if (t.includes('college')) {
      await addMessage('bot', "I can take you to 'Colleges' in Courses & Colleges. Want to go there?");
      return;
    }
    if (t.includes('scholar') || t.includes('scholarship')) {
      await addMessage('bot', 'Check the latest Scholarships in Updates → Scholarships filter. I can open Updates for you.');
      return;
    }
    if (t.includes('exam')) {
      await addMessage('bot', 'Exam reminders live in Updates → Exams. I can open Updates or add to your Timeline.');
      return;
    }
    if (t.includes('guidance') || t.includes('career')) {
      await addMessage('bot', 'The Guidance page has quick help, roadmaps, and resources. Shall I open Guidance?');
      return;
    }
    if (t.includes('plan')) {
      await addMessage('bot', 'Opening My Plan will show your saved courses/colleges. Want to open it?');
      return;
    }
    if (t.includes('update')) {
      await addMessage('bot', 'You can view Admissions, Scholarships, Exams and Tips in Updates. Should I open Updates?');
      return;
    }
    await addMessage('bot', "I'm here to help. Try asking about 'courses', 'colleges', 'scholarships', 'exams', 'guidance', or 'my plan'.");
  };

  const onSend = async () => {
    const txt = input.trim();
    if (!txt) return;
    setInput('');
    await addMessage('user', txt);
    await reply(txt);
  };

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.panel}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <MaterialCommunityIcons name="robot" size={20} color="#FFFFFF" />
            <Text style={styles.headerTitle}>Assistant</Text>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Ionicons name="close" size={22} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Messages */}
        <ScrollView ref={scrollRef} style={styles.messages} contentContainerStyle={{ padding: 12 }}>
          {messages.map((m, idx) => (
            <View key={idx} style={[styles.bubble, m.role === 'user' ? styles.userBubble : styles.botBubble]}>
              <Text style={m.role === 'user' ? styles.userText : styles.botText}>{m.text}</Text>
            </View>
          ))}

          {/* Quick actions */}
          <View style={styles.quickRow}>
            <QuickChip icon="book-outline" label="Courses" onPress={() => handleNavigate('courses')} />
            <QuickChip icon="school-outline" label="Colleges" onPress={() => handleNavigate('courses')} />
            <QuickChip icon="newspaper-variant-outline" label="Updates" onPress={() => handleNavigate('updates')} />
          </View>
          <View style={styles.quickRow}>
            <QuickChip icon="lightbulb-on-outline" label="Guidance" onPress={() => handleNavigate('guidance')} />
            <QuickChip icon="bookmark-outline" label="My Plan" onPress={() => handleNavigate('plan')} />
            <QuickChip icon="delete-outline" label="Clear Chat" onPress={async () => { const init = [{ role: 'bot', text: BOT_GREETING, at: Date.now() }]; setMessages(init); await setItem('SS_CHAT_HISTORY', JSON.stringify(init)); }} />
          </View>
        </ScrollView>

        {/* Composer */}
        <View style={styles.composer}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Type your message..."
            placeholderTextColor="#9CA3AF"
            style={styles.input}
            onSubmitEditing={onSend}
            returnKeyType="send"
          />
          <TouchableOpacity onPress={onSend} style={styles.sendBtn}>
            <Ionicons name="send" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.2)',
    zIndex: 2000,
    elevation: 20, // ensure above watermark on Android
  },
  panel: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  header: {
    backgroundColor: NAVY,
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  headerTitle: { color: '#FFFFFF', fontWeight: '700', marginLeft: 8 },
  closeBtn: { padding: 6 },

  messages: {
    maxHeight: 380,
    backgroundColor: '#F5F7FA',
  },
  bubble: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 8,
    maxWidth: '85%',
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: NAVY,
  },
  botBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D6DEE8',
  },
  userText: { color: '#FFFFFF' },
  botText: { color: '#111827' },

  quickRow: {
    flexDirection: 'row',
    marginTop: 4,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D6DEE8',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  chipText: { marginLeft: 6, color: NAVY, fontWeight: '700' },

  composer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D6DEE8',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    color: '#111827',
  },
  sendBtn: {
    backgroundColor: NAVY,
    borderRadius: 18,
    padding: 10,
  },
});

export default ChatBot;
