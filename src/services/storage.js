import { openDB } from 'idb';

const DB_NAME = 'gentle_finance_db';
const STORE_NAME = 'user_data';
const FILES_STORE = 'files_store';

export const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
      if (!db.objectStoreNames.contains(FILES_STORE)) {
        db.createObjectStore(FILES_STORE, { keyPath: 'id', autoIncrement: true });
      }
    },
  });
};

export const saveUserData = async (key, value) => {
  const db = await initDB();
  await db.put(STORE_NAME, value, key);
};

export const getUserData = async (key) => {
  const db = await initDB();
  return db.get(STORE_NAME, key);
};

// File operations
export const saveFile = async (fileData) => {
  const db = await initDB();
  return db.put(FILES_STORE, fileData);
};

export const getFiles = async () => {
  const db = await initDB();
  return db.getAll(FILES_STORE);
};

// LocalStorage wrapper for sync/simple data
export const localStore = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.error("Error reading from localStorage", e);
      return null;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error("Error writing to localStorage", e);
    }
  },
  remove: (key) => {
      localStorage.removeItem(key);
  }
};
