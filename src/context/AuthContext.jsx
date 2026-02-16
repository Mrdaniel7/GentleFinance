import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signIn,
  signOutUser,
  signUp
} from '../services/firebaseAuth';
import { ensureUserProfile, getUserProfile, updateUserProfile as updateProfileDoc } from '../services/firebaseData';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(async (sessionUser) => {
      if (!sessionUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      await ensureUserProfile(sessionUser);
      const profile = await getUserProfile(sessionUser.uid);

      setUser({
        uid: sessionUser.uid,
        email: sessionUser.email,
        name: profile?.name || sessionUser.name,
        avatar: profile?.avatar || ''
      });

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    await signIn(email, password);
  };

  const signup = async (name, email, password) => {
    await signUp(name, email, password);
  };

  const logout = async () => {
    await signOutUser();
  };

  const updateProfile = async (newData) => {
    if (!user?.uid) return;

    const profilePayload = {};
    if (newData.name) profilePayload.name = newData.name;
    if (newData.avatar) profilePayload.avatar = newData.avatar;

    await updateProfileDoc(user.uid, profilePayload);
    setUser((prev) => ({ ...prev, ...profilePayload }));
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateProfile, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
