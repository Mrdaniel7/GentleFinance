import React, { useState } from 'react';
import DashboardHeader from '../components/Dashboard/Header';
import DashboardSummary from '../components/Dashboard/Summary';
import DashboardTransactions from '../components/Dashboard/Transactions';

const Dashboard = () => {
  // Mock Data
  const [user] = useState({
    name: "Julian Ross",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCQJCAj9zcSmXOu7aaxQikJ7b0CXg9NK5_lxf98qm714vE7LxkU75Tj4mp1MTRWWohHpIdR_mDO1vVwJvE0tb44VT12UwvMbc7R7aqqbFx7Ak6nE3525C0DDnBIVbxQxNNsNX06f24BUBUNN4swZFeDrmIs0HJDCzy1qNgDe3ATlfabyYt-u0N6eeVxv2-qa36S23aEK8N8FBLpNjXiZk5br8aFLYBAL2_6dU5bKuv84Z3idl1zyLUG8qvgbDMotnzLNVn8WRPbafY"
  });

  const [financials] = useState({
    netWorth: 124500,
    income: 8420,
    expenses: 3150.50
  });

  const [transactions] = useState([
    { id: 1, title: "Starbucks Coffee", date: "Hoy, 08:45 AM", amount: -5.50, icon: "local_cafe", isIncome: false },
    { id: 2, title: "Apple Store", date: "Ayer, 02:20 PM", amount: -1200.00, icon: "laptop_mac", isIncome: false },
    { id: 3, title: "Salario Mensual", date: "15 May, 09:00 AM", amount: 5000.00, icon: "payments", isIncome: true },
    { id: 4, title: "Zara Fashion", date: "14 May, 06:15 PM", amount: -89.90, icon: "shopping_bag", isIncome: false },
  ]);

  return (
    <div className="flex flex-col h-full">
      <DashboardHeader user={user} />
      <DashboardSummary netWorth={financials.netWorth} income={financials.income} expenses={financials.expenses} />
      <DashboardTransactions transactions={transactions} />
    </div>
  );
};

export default Dashboard;
