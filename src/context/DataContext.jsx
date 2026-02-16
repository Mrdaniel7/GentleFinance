import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  addUserCollectionDoc,
  clearUserData,
  deleteUserCollectionDoc,
  getUserCollection,
  getUserFiles,
  uploadUserFile
} from '../services/firebaseData';
import { useAuth } from './AuthContext';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [assets, setAssets] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (!user?.uid) {
        setTransactions([]);
        setAssets([]);
        setSubscriptions([]);
        setFiles([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const [txs, assts, subs, fls] = await Promise.all([
          getUserCollection('transactions', user.uid),
          getUserCollection('assets', user.uid),
          getUserCollection('subscriptions', user.uid),
          getUserFiles(user.uid)
        ]);

        setTransactions(txs || []);
        setAssets(assts || []);
        setSubscriptions(subs || []);
        setFiles(fls || []);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user?.uid]);

  const addTransaction = async (transaction) => {
    const newTx = await addUserCollectionDoc('transactions', user.uid, transaction);
    setTransactions((prev) => [newTx, ...prev]);
  };

  const removeTransaction = async (id) => {
    await deleteUserCollectionDoc('transactions', user.uid, id);
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const addAsset = async (asset) => {
    const newAsset = await addUserCollectionDoc('assets', user.uid, asset);
    setAssets((prev) => [newAsset, ...prev]);
  };

  const removeAsset = async (id) => {
    await deleteUserCollectionDoc('assets', user.uid, id);
    setAssets((prev) => prev.filter((a) => a.id !== id));
  };

  const addSubscription = async (sub) => {
    const newSub = await addUserCollectionDoc('subscriptions', user.uid, sub);
    setSubscriptions((prev) => [newSub, ...prev]);
  };

  const removeSubscription = async (id) => {
    await deleteUserCollectionDoc('subscriptions', user.uid, id);
    setSubscriptions((prev) => prev.filter((s) => s.id !== id));
  };

  const addFile = async (file) => {
    const uploaded = await uploadUserFile(user.uid, file);
    setFiles((prev) => [uploaded, ...prev]);
  };

  const resetData = async () => {
    await clearUserData(user.uid);
    setTransactions([]);
    setAssets([]);
    setSubscriptions([]);
    setFiles([]);
  };

  const openTransactionModal = () => setIsTransactionModalOpen(true);
  const closeTransactionModal = () => setIsTransactionModalOpen(false);

  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);

  const expenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);

  const assetValue = assets.reduce((sum, a) => sum + parseFloat(a.value || 0), 0);
  const netWorth = income - expenses + assetValue;

  return (
    <DataContext.Provider
      value={{
        transactions,
        addTransaction,
        removeTransaction,
        assets,
        addAsset,
        removeAsset,
        subscriptions,
        addSubscription,
        removeSubscription,
        files,
        addFile,
        resetData,
        loading,
        financials: {
          income,
          expenses,
          netWorth
        },
        isTransactionModalOpen,
        openTransactionModal,
        closeTransactionModal
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
