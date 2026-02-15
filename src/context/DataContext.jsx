import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getTransactions, addTransaction as addTx, deleteTransaction as deleteTx,
  getAssets, addAsset as addAss, deleteAsset as deleteAss,
  getSubscriptions, addSubscription as addSub, deleteSubscription as deleteSub,
  getFiles, saveFile as saveF, clearAllData as clearAll
} from '../services/storage';

const DataContext = createContext();

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};

export const DataProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [assets, setAssets] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
        try {
          const [txs, assts, subs, fls] = await Promise.all([
            getTransactions(),
            getAssets(),
            getSubscriptions(),
            getFiles()
          ]);
          setTransactions(txs || []);
          setAssets(assts || []);
          setSubscriptions(subs || []);
          setFiles(fls || []);
        } catch (error) {
          console.error("Error loading data:", error);
        } finally {
          setLoading(false);
        }
      };
    loadData();
  }, []);


  // --- Transactions ---
  const addTransaction = async (transaction) => {
    // Add type if missing (simple heuristic or required field)
    const newTx = { ...transaction, id: Date.now() };
    await addTx(newTx);
    setTransactions(prev => [newTx, ...prev]);
  };

  const removeTransaction = async (id) => {
    await deleteTx(id);
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  // --- Assets ---
  const addAsset = async (asset) => {
    const newAsset = { ...asset, id: Date.now() };
    await addAss(newAsset);
    setAssets(prev => [newAsset, ...prev]);
  };

  const removeAsset = async (id) => {
    await deleteAss(id);
    setAssets(prev => prev.filter(a => a.id !== id));
  };

  // --- Subscriptions ---
  const addSubscription = async (sub) => {
    const newSub = { ...sub, id: Date.now() };
    await addSub(newSub);
    setSubscriptions(prev => [newSub, ...prev]);
  };

  const removeSubscription = async (id) => {
    await deleteSub(id);
    setSubscriptions(prev => prev.filter(s => s.id !== id));
  };

  // --- Files ---
  const addFile = async (file) => {
    await saveF(file);
    setFiles(prev => [...prev, file]);
  };

  // --- Reset ---
  const resetData = async () => {
    await clearAll();
    setTransactions([]);
    setAssets([]);
    setSubscriptions([]);
    setFiles([]);
  };

  // --- Derived State (Calculations) ---
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);

  const expenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);

  // Net worth = Income - Expenses + Asset Values
  const assetValue = assets.reduce((sum, a) => sum + parseFloat(a.value || 0), 0);
  const netWorth = (income - expenses) + assetValue;

  return (
    <DataContext.Provider value={{
      transactions, addTransaction, removeTransaction,
      assets, addAsset, removeAsset,
      subscriptions, addSubscription, removeSubscription,
      files, addFile,
      resetData,
      loading,
      financials: {
        income,
        expenses,
        netWorth
      }
    }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
