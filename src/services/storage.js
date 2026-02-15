import { openDB } from 'idb';

const DB_NAME = 'gentle_finance_db';
const STORES = {
  TRANSACTIONS: 'transactions',
  ASSETS: 'assets',
  SUBSCRIPTIONS: 'subscriptions',
  USER_DATA: 'user_data',
  FILES: 'files_store'
};

export const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORES.TRANSACTIONS)) {
        db.createObjectStore(STORES.TRANSACTIONS, { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains(STORES.ASSETS)) {
        db.createObjectStore(STORES.ASSETS, { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains(STORES.SUBSCRIPTIONS)) {
        db.createObjectStore(STORES.SUBSCRIPTIONS, { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains(STORES.USER_DATA)) {
        db.createObjectStore(STORES.USER_DATA);
      }
      if (!db.objectStoreNames.contains(STORES.FILES)) {
        db.createObjectStore(STORES.FILES, { keyPath: 'id', autoIncrement: true });
      }
    },
  });
};

// --- Generic Helper ---
const dbOp = async (storeName, mode, callback) => {
    const db = await initDB();
    const tx = db.transaction(storeName, mode);
    const store = tx.objectStore(storeName);
    const result = await callback(store);
    await tx.done;
    return result;
};

// --- Transactions ---
export const addTransaction = async (transaction) => {
  return dbOp(STORES.TRANSACTIONS, 'readwrite', (store) => store.add(transaction));
};
export const getTransactions = async () => {
  return dbOp(STORES.TRANSACTIONS, 'readonly', (store) => store.getAll());
};
export const deleteTransaction = async (id) => {
  return dbOp(STORES.TRANSACTIONS, 'readwrite', (store) => store.delete(id));
};

// --- Assets ---
export const addAsset = async (asset) => {
  return dbOp(STORES.ASSETS, 'readwrite', (store) => store.add(asset));
};
export const getAssets = async () => {
  return dbOp(STORES.ASSETS, 'readonly', (store) => store.getAll());
};
export const deleteAsset = async (id) => {
  return dbOp(STORES.ASSETS, 'readwrite', (store) => store.delete(id));
};

// --- Subscriptions ---
export const addSubscription = async (sub) => {
  return dbOp(STORES.SUBSCRIPTIONS, 'readwrite', (store) => store.add(sub));
};
export const getSubscriptions = async () => {
  return dbOp(STORES.SUBSCRIPTIONS, 'readonly', (store) => store.getAll());
};
export const deleteSubscription = async (id) => {
  return dbOp(STORES.SUBSCRIPTIONS, 'readwrite', (store) => store.delete(id));
};

// --- User Data ---
export const saveUserData = async (key, value) => {
  const db = await initDB();
  await db.put(STORES.USER_DATA, value, key);
};
export const getUserData = async (key) => {
  const db = await initDB();
  return db.get(STORES.USER_DATA, key);
};

// --- Files ---
export const saveFile = async (fileData) => {
  return dbOp(STORES.FILES, 'readwrite', (store) => store.put(fileData));
};
export const getFiles = async () => {
  return dbOp(STORES.FILES, 'readonly', (store) => store.getAll());
};

// --- Clear All Data ---
export const clearAllData = async () => {
    const db = await initDB();
    const tx = db.transaction(Object.values(STORES), 'readwrite');
    await Promise.all([
        tx.objectStore(STORES.TRANSACTIONS).clear(),
        tx.objectStore(STORES.ASSETS).clear(),
        tx.objectStore(STORES.SUBSCRIPTIONS).clear(),
        tx.objectStore(STORES.USER_DATA).clear(),
        tx.objectStore(STORES.FILES).clear(),
        tx.done
    ]);
};
