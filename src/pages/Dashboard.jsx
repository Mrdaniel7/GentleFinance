import React from 'react';
import DashboardHeader from '../components/Dashboard/Header';
import DashboardSummary from '../components/Dashboard/Summary';
import DashboardTransactions from '../components/Dashboard/Transactions';
import { useData } from '../context/DataContext';

const Dashboard = () => {
  const { transactions, financials, loading } = useData();

  if (loading) return <div className="p-6 text-center text-slate-500">Cargando datos...</div>;

  return (
    <div className="flex flex-col h-full">
      <DashboardHeader />
      <DashboardSummary
        netWorth={financials.netWorth}
        income={financials.income}
        expenses={financials.expenses}
      />
      <DashboardTransactions transactions={transactions} />
    </div>
  );
};

export default Dashboard;
