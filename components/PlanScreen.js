import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { getItem, setItem } from '../utils/storage';

const NAVY = '#1E3A5F';
const NAVY_DARK = '#0F2A3F';

const PlanScreen = () => {
  const [items, setItems] = useState([]);

  const load = async () => {
    try {
      const raw = await getItem('SS_MY_PLAN');
      if (raw) setItems(JSON.parse(raw));
      else setItems([]);
    } catch (e) {
      setItems([]);
    }
  };

  useEffect(() => { load(); }, []);

  const remove = async (id) => {
    const next = items.filter(x => x.item.id !== id);
    setItems(next);
    await setItem('SS_MY_PLAN', JSON.stringify(next));
    Alert.alert('Removed', 'Item removed from your plan.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Plan</Text>
      <Text style={styles.subtitle}>Saved courses and colleges</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {items.length === 0 ? (
          <View style={styles.emptyBox}>
            <MaterialCommunityIcons name="bookmark-outline" size={36} color={NAVY} />
            <Text style={styles.emptyText}>No saved items yet.</Text>
            <Text style={styles.emptySub}>Go to Courses & Colleges to add items.</Text>
          </View>
        ) : (
          items.map(({ type, item }) => (
            <View key={`${type}_${item.id}`} style={styles.card}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.iconCircle}>
                  {type === 'course' ? (
                    <MaterialIcons name="menu-book" size={20} color="#FFFFFF" />
                  ) : (
                    <MaterialIcons name="school" size={20} color="#FFFFFF" />
                  )}
                </View>
                <View style={{ marginLeft: 10, flex: 1, minWidth: 0 }}>
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  {type === 'course' ? (
                    <Text style={styles.cardLine}>Stream: {item.stream} · Duration: {item.duration}</Text>
                  ) : (
                    <Text style={styles.cardLine}>{item.address || 'College'}</Text>
                  )}
                </View>
              </View>
              <View style={styles.actionsRow}>
                <TouchableOpacity style={styles.removeBtn} onPress={() => remove(item.id)}>
                  <Text style={styles.removeText}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: NAVY,
    marginTop: 16,
  },
  subtitle: {
    color: '#374151',
    marginTop: 4,
    marginBottom: 12,
  },
  emptyBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  emptyText: {
    color: NAVY,
    fontWeight: '800',
    marginTop: 8,
  },
  emptySub: {
    color: '#6B7280',
    marginTop: 4,
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
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: NAVY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    color: NAVY,
    fontWeight: '800',
  },
  cardLine: {
    color: '#374151',
    marginTop: 2,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  removeBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: NAVY,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  removeText: {
    color: NAVY,
    fontWeight: '700',
  },
});

export default PlanScreen;
