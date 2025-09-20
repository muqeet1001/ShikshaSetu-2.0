// Lightweight storage wrapper with graceful fallback if AsyncStorage isn't installed
let AS = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  AS = require('@react-native-async-storage/async-storage').default;
} catch (e) {
  // Fallback to in-memory store if AsyncStorage is unavailable
}

const memory = {};

export const getItem = async (key) => {
  try {
    if (AS) return await AS.getItem(key);
    return memory[key] ?? null;
  } catch (e) {
    return null;
  }
};

export const setItem = async (key, value) => {
  try {
    if (AS) return await AS.setItem(key, value);
    memory[key] = value;
  } catch (e) {
    // noop
  }
};

export const removeItem = async (key) => {
  try {
    if (AS) return await AS.removeItem(key);
    delete memory[key];
  } catch (e) {
    // noop
  }
};
