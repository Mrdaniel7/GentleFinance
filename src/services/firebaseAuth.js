const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyC2Yo_gFLfTZGEBeMpxvkduB3Dl8E9ct1I',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'gentlefinances-c9b79'
};

const SESSION_KEY = 'gf_auth_session';
const listeners = new Set();

const notifyListeners = (session) => {
  listeners.forEach((callback) => callback(session));
};

const saveSession = (session) => {
  if (!session) {
    localStorage.removeItem(SESSION_KEY);
    return;
  }
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
};

export const getSession = () => {
  const raw = localStorage.getItem(SESSION_KEY);
  return raw ? JSON.parse(raw) : null;
};

const authRequest = async (path, body) => {
  const response = await fetch(`https://identitytoolkit.googleapis.com/v1/${path}?key=${firebaseConfig.apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error?.message || 'Auth error');
  }
  return data;
};

export const signUp = async (name, email, password) => {
  const account = await authRequest('accounts:signUp', { email, password, returnSecureToken: true });

  const profile = await authRequest('accounts:update', {
    idToken: account.idToken,
    displayName: name,
    returnSecureToken: true
  });

  const session = {
    uid: profile.localId,
    email: profile.email,
    name: profile.displayName || name || email.split('@')[0],
    idToken: profile.idToken,
    refreshToken: profile.refreshToken
  };

  saveSession(session);
  notifyListeners(session);
  return session;
};

export const signIn = async (email, password) => {
  const account = await authRequest('accounts:signInWithPassword', {
    email,
    password,
    returnSecureToken: true
  });

  const lookup = await authRequest('accounts:lookup', { idToken: account.idToken });
  const user = lookup.users?.[0] || {};

  const session = {
    uid: account.localId,
    email: account.email,
    name: user.displayName || account.email.split('@')[0],
    idToken: account.idToken,
    refreshToken: account.refreshToken
  };

  saveSession(session);
  notifyListeners(session);
  return session;
};

export const signOutUser = async () => {
  saveSession(null);
  notifyListeners(null);
};

export const updateAuthProfile = async (session, data) => {
  const result = await authRequest('accounts:update', {
    idToken: session.idToken,
    displayName: data.name || session.name,
    returnSecureToken: true
  });

  const updated = {
    ...session,
    name: result.displayName || session.name,
    idToken: result.idToken,
    refreshToken: result.refreshToken
  };

  saveSession(updated);
  notifyListeners(updated);
  return updated;
};

export const onAuthStateChanged = (callback) => {
  listeners.add(callback);
  callback(getSession());
  return () => listeners.delete(callback);
};

export const getFirebaseProjectId = () => firebaseConfig.projectId;
