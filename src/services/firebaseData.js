import { getFirebaseProjectId, getSession } from './firebaseAuth';

const USER_COLLECTIONS = {
  transactions: 'transactions',
  assets: 'accounts',
  subscriptions: 'subscriptions'
};

const projectId = getFirebaseProjectId();
const baseUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents`;

const authHeaders = () => {
  const session = getSession();
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${session?.idToken || ''}`
  };
};

const encodeValue = (value) => {
  if (value === null || value === undefined) return { nullValue: null };
  if (typeof value === 'string') return { stringValue: value };
  if (typeof value === 'boolean') return { booleanValue: value };
  if (typeof value === 'number') {
    return Number.isInteger(value) ? { integerValue: value } : { doubleValue: value };
  }
  if (Array.isArray(value)) return { arrayValue: { values: value.map(encodeValue) } };
  if (typeof value === 'object') {
    return {
      mapValue: {
        fields: Object.fromEntries(Object.entries(value).map(([k, v]) => [k, encodeValue(v)]))
      }
    };
  }

  return { stringValue: String(value) };
};

const decodeValue = (field) => {
  if (!field) return null;
  if (Object.prototype.hasOwnProperty.call(field, 'stringValue')) return field.stringValue;
  if (Object.prototype.hasOwnProperty.call(field, 'integerValue')) return Number(field.integerValue);
  if (Object.prototype.hasOwnProperty.call(field, 'doubleValue')) return Number(field.doubleValue);
  if (Object.prototype.hasOwnProperty.call(field, 'booleanValue')) return field.booleanValue;
  if (Object.prototype.hasOwnProperty.call(field, 'nullValue')) return null;
  if (Object.prototype.hasOwnProperty.call(field, 'timestampValue')) return field.timestampValue;
  if (Object.prototype.hasOwnProperty.call(field, 'arrayValue')) return (field.arrayValue.values || []).map(decodeValue);
  if (Object.prototype.hasOwnProperty.call(field, 'mapValue')) {
    const fields = field.mapValue.fields || {};
    return Object.fromEntries(Object.entries(fields).map(([k, v]) => [k, decodeValue(v)]));
  }
  return null;
};

const decodeDocument = (document) => {
  const id = document.name.split('/').pop();
  const fields = document.fields || {};
  return { id, ...Object.fromEntries(Object.entries(fields).map(([k, v]) => [k, decodeValue(v)])) };
};

const firestoreRequest = async (path, options = {}) => {
  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: {
      ...authHeaders(),
      ...(options.headers || {})
    }
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error?.message || 'Firestore request failed');
  }
  return data;
};

export const ensureUserProfile = async (user) => {
  await updateUserProfile(user.uid, {
    userId: user.uid,
    email: user.email || '',
    name: user.name || user.displayName || user.email?.split('@')[0] || 'Usuario',
    avatar: user.avatar || ''
  });
};

export const getUserProfile = async (uid) => {
  try {
    const doc = await firestoreRequest(`/users/${uid}`);
    return decodeDocument(doc);
  } catch {
    return null;
  }
};

export const updateUserProfile = async (uid, data) => {
  const fields = Object.fromEntries(Object.entries({ ...data, updatedAt: new Date().toISOString() }).map(([k, v]) => [k, encodeValue(v)]));
  await firestoreRequest(`/users/${uid}`, {
    method: 'PATCH',
    body: JSON.stringify({ fields })
  });
};

export const getUserCollection = async (type, uid) => {
  const collectionName = USER_COLLECTIONS[type];
  const result = await firestoreRequest(':runQuery', {
    method: 'POST',
    body: JSON.stringify({
      structuredQuery: {
        from: [{ collectionId: collectionName }],
        where: {
          fieldFilter: {
            field: { fieldPath: 'userId' },
            op: 'EQUAL',
            value: encodeValue(uid)
          }
        },
        orderBy: [{ field: { fieldPath: 'date' }, direction: 'DESCENDING' }]
      }
    })
  });

  return result.filter((item) => item.document).map((item) => decodeDocument(item.document));
};

export const addUserCollectionDoc = async (type, uid, payload) => {
  const collectionName = USER_COLLECTIONS[type];
  const normalized = {
    ...payload,
    userId: uid,
    date: payload.date || new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const fields = Object.fromEntries(Object.entries(normalized).map(([k, v]) => [k, encodeValue(v)]));
  const created = await firestoreRequest(`/${collectionName}`, {
    method: 'POST',
    body: JSON.stringify({ fields })
  });

  return decodeDocument(created);
};

export const deleteUserCollectionDoc = async (type, uid, id) => {
  const collectionName = USER_COLLECTIONS[type];
  const current = await firestoreRequest(`/${collectionName}/${id}`);
  const decoded = decodeDocument(current);
  if (decoded.userId !== uid) {
    throw new Error('No autorizado');
  }

  await firestoreRequest(`/${collectionName}/${id}`, { method: 'DELETE' });
};

export const uploadUserFile = async (uid, file) => {
  const metadata = {
    userId: uid,
    name: file.name,
    type: file.type,
    size: file.size,
    uploadedAt: new Date().toISOString()
  };

  const fields = Object.fromEntries(Object.entries(metadata).map(([k, v]) => [k, encodeValue(v)]));
  const created = await firestoreRequest(`/users/${uid}/files`, {
    method: 'POST',
    body: JSON.stringify({ fields })
  });

  return decodeDocument(created);
};

export const getUserFiles = async (uid) => {
  const result = await firestoreRequest(`/users/${uid}/files`);
  return (result.documents || []).map(decodeDocument);
};

export const clearUserData = async (uid) => {
  const collections = ['transactions', 'assets', 'subscriptions'];
  for (const type of collections) {
    const docs = await getUserCollection(type, uid);
    for (const d of docs) {
      await firestoreRequest(`/${USER_COLLECTIONS[type]}/${d.id}`, { method: 'DELETE' });
    }
  }

  const files = await getUserFiles(uid);
  for (const file of files) {
    await firestoreRequest(`/users/${uid}/files/${file.id}`, { method: 'DELETE' });
  }
};
