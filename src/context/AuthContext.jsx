import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUserData, saveUserData } from '../services/storage';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const savedUser = await getUserData('currentUser');
      if (savedUser) {
        setUser(savedUser);
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  const login = async (email, password) => {
    // Mock login logic - in a real app this would verify credentials
    const userData = { email, name: email.split('@')[0], avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgE3XEPMRpEGu98BK90tXD6sxcHw5D1r8qRaJXm986SQP2OC2kPhg-p4_jxOALzRn-wqTlSEneJk26r7BL3RO_XX7bgFFhXpnGxLjgEkeBaukfjZq2QhLaHQjcEKuOsu0Q8d6Pao92p-NrPGdbsuzj5bkKL80eKnG-alnXQhwLLtHQRcMjlpL7xW_1yF3ewIO80hq8YWWNrQx2gJFBojngckOmm7VTR92_SWQ0ZHlwBtKmhElZNGH_z1MmWZHAXpzd7Zn6qP2c7Y8' };
    await saveUserData('currentUser', userData);
    setUser(userData);
    return true;
  };

  const logout = async () => {
    await saveUserData('currentUser', null);
    setUser(null);
  };

  const updateProfile = async (newData) => {
    const updatedUser = { ...user, ...newData };
    await saveUserData('currentUser', updatedUser);
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateProfile, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
