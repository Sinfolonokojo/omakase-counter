import { openDB } from 'idb';

const DB_NAME = 'omakase-counter';
const DB_VERSION = 1;

// Initialize database
export const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // Sessions store
      if (!db.objectStoreNames.contains('sessions')) {
        const sessionsStore = db.createObjectStore('sessions', {
          keyPath: 'id'
        });
        sessionsStore.createIndex('date', 'date');
        sessionsStore.createIndex('count', 'count');
        sessionsStore.createIndex('isRecord', 'isRecord');
      }

      // Sushi types store
      if (!db.objectStoreNames.contains('sushiTypes')) {
        const typesStore = db.createObjectStore('sushiTypes', {
          keyPath: 'id'
        });
        typesStore.createIndex('category', 'category');
        typesStore.createIndex('custom', 'custom');
      }

      // Photos store
      if (!db.objectStoreNames.contains('photos')) {
        db.createObjectStore('photos', { keyPath: 'sessionId' });
      }

      // Settings store
      if (!db.objectStoreNames.contains('settings')) {
        db.createObjectStore('settings', { keyPath: 'key' });
      }
    }
  });
};

// Session operations
export const saveSession = async (session) => {
  const db = await initDB();
  return db.put('sessions', session);
};

export const getSession = async (id) => {
  const db = await initDB();
  return db.get('sessions', id);
};

export const getAllSessions = async () => {
  const db = await initDB();
  return db.getAllFromIndex('sessions', 'date');
};

export const getPersonalRecord = async () => {
  const db = await initDB();
  const sessions = await db.getAll('sessions');

  if (sessions.length === 0) return 0;

  return Math.max(...sessions.map(session => session.count));
};

// Photo operations
export const savePhoto = async (sessionId, photoData) => {
  const db = await initDB();
  return db.put('photos', { sessionId, photoData });
};

export const getPhoto = async (sessionId) => {
  const db = await initDB();
  return db.get('photos', sessionId);
};

// Sushi type operations
export const saveSushiType = async (type) => {
  const db = await initDB();
  return db.put('sushiTypes', type);
};

export const getAllSushiTypes = async () => {
  const db = await initDB();
  return db.getAll('sushiTypes');
};

export const deleteSushiType = async (id) => {
  const db = await initDB();
  return db.delete('sushiTypes', id);
};

// Initialize default sushi types
export const initDefaultSushiTypes = async () => {
  const db = await initDB();
  const existingTypes = await db.getAll('sushiTypes');

  if (existingTypes.length > 0) return; // Already initialized

  const defaultTypes = [
    // Nigiri
    { id: 'salmon', name: 'Salmon (Sake)', category: 'nigiri', timesEaten: 0, custom: false, emoji: '🐟' },
    { id: 'tuna', name: 'Tuna (Maguro)', category: 'nigiri', timesEaten: 0, custom: false, emoji: '🐟' },
    { id: 'fatty-tuna', name: 'Fatty Tuna (Toro)', category: 'nigiri', timesEaten: 0, custom: false, emoji: '🐟' },
    { id: 'yellowtail', name: 'Yellowtail (Hamachi)', category: 'nigiri', timesEaten: 0, custom: false, emoji: '🐟' },
    { id: 'eel', name: 'Eel (Unagi)', category: 'nigiri', timesEaten: 0, custom: false, emoji: '🦎' },
    { id: 'shrimp', name: 'Shrimp (Ebi)', category: 'nigiri', timesEaten: 0, custom: false, emoji: '🦐' },
    { id: 'octopus', name: 'Octopus (Tako)', category: 'nigiri', timesEaten: 0, custom: false, emoji: '🐙' },
    { id: 'mackerel', name: 'Mackerel (Saba)', category: 'nigiri', timesEaten: 0, custom: false, emoji: '🐟' },

    // Maki
    { id: 'california', name: 'California Roll', category: 'maki', timesEaten: 0, custom: false, emoji: '🍣' },
    { id: 'spicy-tuna', name: 'Spicy Tuna Roll', category: 'maki', timesEaten: 0, custom: false, emoji: '🌶️' },
    { id: 'salmon-roll', name: 'Salmon Roll', category: 'maki', timesEaten: 0, custom: false, emoji: '🍣' },
    { id: 'philadelphia', name: 'Philadelphia Roll', category: 'maki', timesEaten: 0, custom: false, emoji: '🍣' },
    { id: 'dragon', name: 'Dragon Roll', category: 'maki', timesEaten: 0, custom: false, emoji: '🐉' },
    { id: 'rainbow', name: 'Rainbow Roll', category: 'maki', timesEaten: 0, custom: false, emoji: '🌈' },

    // Sashimi
    { id: 'salmon-sashimi', name: 'Salmon Sashimi', category: 'sashimi', timesEaten: 0, custom: false, emoji: '🐟' },
    { id: 'tuna-sashimi', name: 'Tuna Sashimi', category: 'sashimi', timesEaten: 0, custom: false, emoji: '🐟' },
    { id: 'yellowtail-sashimi', name: 'Yellowtail Sashimi', category: 'sashimi', timesEaten: 0, custom: false, emoji: '🐟' },

    // Other
    { id: 'temaki', name: 'Temaki (Hand Roll)', category: 'other', timesEaten: 0, custom: false, emoji: '🍣' },
    { id: 'chirashi', name: 'Chirashi', category: 'other', timesEaten: 0, custom: false, emoji: '🍚' },
    { id: 'inari', name: 'Inari', category: 'other', timesEaten: 0, custom: false, emoji: '🍣' },
  ];

  const tx = db.transaction('sushiTypes', 'readwrite');
  await Promise.all(defaultTypes.map(type => tx.store.put(type)));
  await tx.done;
};

// Settings operations
export const saveSetting = async (key, value) => {
  const db = await initDB();
  return db.put('settings', { key, value });
};

export const getSetting = async (key) => {
  const db = await initDB();
  const result = await db.get('settings', key);
  return result?.value;
};
