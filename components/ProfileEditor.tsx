import React, { useEffect, useState } from 'react';
import { Modal, View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { getItem, setItem } from '../utils/storage';

const NAVY = '#1E3A5F';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSaved?: () => void;
}

const FilledButton = ({ label, onPress, icon }:{ label: string; onPress?: () => void; icon?: any }) => (
  <TouchableOpacity style={styles.filledBtn} onPress={onPress} activeOpacity={0.9}>
    {icon && <MaterialIcons name={icon as any} size={18} color="#FFFFFF" style={{ marginRight: 8 }} />}
    <Text style={styles.filledBtnText}>{label}</Text>
  </TouchableOpacity>
);

const OutlineButton = ({ label, onPress, icon }:{ label: string; onPress?: () => void; icon?: any }) => (
  <TouchableOpacity style={styles.outlineBtn} onPress={onPress} activeOpacity={0.9}>
    {icon && <MaterialIcons name={icon as any} size={18} color={NAVY} style={{ marginRight: 8 }} />}
    <Text style={styles.outlineBtnText}>{label}</Text>
  </TouchableOpacity>
);

const ProfileEditor = ({ visible, onClose, onSaved }: Props) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [currentClass, setCurrentClass] = useState('');
  const [board, setBoard] = useState('');
  const [marks10, setMarks10] = useState('');
  const [marks12, setMarks12] = useState('');
  const [district, setDistrict] = useState('');
  const [area, setArea] = useState('');

  useEffect(() => {
    if (!visible) return;
    (async () => {
      try {
        const raw = await getItem('SS_USER_PROFILE');
        if (raw) {
          const p = JSON.parse(raw);
          setUsername(p?.username || p?.name || '');
          setEmail(p?.email || '');
          setCurrentClass(p?.currentClass || '');
          setBoard(p?.board || '');
          setMarks10(p?.marks10 || '');
          setMarks12(p?.marks12 || '');
          setDistrict(p?.district || '');
          setArea(p?.area || '');
        }
      } catch {}
    })();
  }, [visible]);

  const save = async () => {
    try {
      const raw = await getItem('SS_USER_PROFILE');
      const base = raw ? JSON.parse(raw) : {};
      const profile = {
        ...base,
        username,
        name: username,
        email,
        currentClass,
        board,
        marks10,
        marks12,
        district,
        area,
      };
      await setItem('SS_USER_PROFILE', JSON.stringify(profile));
      if (onSaved) onSaved();
    } catch {}
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose} transparent>
      <View style={styles.backdrop}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
          <View style={styles.modalCard}>
            <Text style={styles.title}>Edit Profile</Text>
            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 16 }} keyboardShouldPersistTaps="always">
              <View style={styles.inputRow}>
                <MaterialIcons name="badge" size={18} color={NAVY} />
                <TextInput value={username} onChangeText={setUsername} placeholder="Username" style={styles.input} autoCapitalize="none" blurOnSubmit={false} />
              </View>
              <View style={styles.inputRow}>
                <MaterialIcons name="email" size={18} color={NAVY} />
                <TextInput value={email} onChangeText={setEmail} placeholder="Email" style={styles.input} autoCapitalize="none" keyboardType="email-address" blurOnSubmit={false} />
              </View>
              <View style={styles.inputRow}>
                <MaterialIcons name="class" size={18} color={NAVY} />
                <TextInput value={currentClass} onChangeText={setCurrentClass} placeholder="Current Class" style={styles.input} blurOnSubmit={false} />
              </View>
              <View style={styles.inputRow}>
                <MaterialIcons name="assignment" size={18} color={NAVY} />
                <TextInput value={board} onChangeText={setBoard} placeholder="Board" style={styles.input} blurOnSubmit={false} />
              </View>
              <View style={styles.inputRow}>
                <MaterialIcons name="looks-one" size={18} color={NAVY} />
                <TextInput value={marks10} onChangeText={setMarks10} placeholder="10th %" style={styles.input} keyboardType="numeric" blurOnSubmit={false} />
              </View>
              <View style={styles.inputRow}>
                <MaterialIcons name="looks-two" size={18} color={NAVY} />
                <TextInput value={marks12} onChangeText={setMarks12} placeholder="12th %" style={styles.input} keyboardType="numeric" blurOnSubmit={false} />
              </View>
              <View style={styles.inputRow}>
                <MaterialIcons name="map" size={18} color={NAVY} />
                <TextInput value={district} onChangeText={setDistrict} placeholder="District" style={styles.input} blurOnSubmit={false} />
              </View>
              <View style={styles.inputRow}>
                <MaterialIcons name="place" size={18} color={NAVY} />
                <TextInput value={area} onChangeText={setArea} placeholder="Area" style={styles.input} blurOnSubmit={false} />
              </View>
            </ScrollView>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <OutlineButton label="Close" icon="close" onPress={onClose} />
              <FilledButton label="Save" icon="save" onPress={save} />
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.35)', padding: 16, justifyContent: 'flex-end' },
  modalCard: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, maxHeight: '90%' },
  title: { color: NAVY, fontWeight: '800', fontSize: 18, marginBottom: 8, textAlign: 'center' },
  inputRow: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#D6DEE8', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 8, marginTop: 8 },
  input: { marginLeft: 8, flex: 1, color: '#111827' },
  filledBtn: { backgroundColor: NAVY, paddingVertical: 12, paddingHorizontal: 14, borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10 },
  filledBtnText: { color: '#FFFFFF', fontWeight: '800' },
  outlineBtn: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: NAVY, paddingVertical: 12, paddingHorizontal: 14, borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10 },
  outlineBtnText: { color: NAVY, fontWeight: '800' },
});

export default ProfileEditor;
