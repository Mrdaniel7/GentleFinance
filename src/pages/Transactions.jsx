import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useData } from '../context/DataContext';

const Transactions = () => {
    const { transactions, removeTransaction, openTransactionModal } = useData();
    const [filter, setFilter] = useState('all'); // all, income, expense

    // Filter logic
    const filteredTransactions = transactions.filter(t => {
        if (filter === 'all') return true;
        return t.type === filter;
    });

    // Group by Date (Simplified for now, assuming ISO string)
    const groupedTransactions = filteredTransactions.reduce((groups, transaction) => {
        const dateObj = new Date(transaction.date || transaction.id);
        const dateStr = dateObj.toLocaleDateString();
        if (!groups[dateStr]) groups[dateStr] = [];
        groups[dateStr].push(transaction);
        return groups;
    }, {});

    return (
        <div className="flex flex-col h-full min-h-screen relative">
            <header className="px-6 pt-8 pb-4 sticky top-0 bg-background-light dark:bg-background-dark z-20">
                <div className="flex justify-between items-center mb-6">
                    <NavLink to="/" className="p-2 -ml-2 rounded-full active:bg-primary/10 transition-colors">
                        <span className="material-icons-round text-primary">arrow_back_ios_new</span>
                    </NavLink>
                    <div className="flex gap-4">
                        <button onClick={openTransactionModal} className="p-2 rounded-full bg-primary/10 text-primary">
                            <span className="material-icons-round">add</span>
                        </button>
                    </div>
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight mb-6">Transacciones</h1>

                {/* Filters */}
                <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-5 py-2 rounded-full font-bold text-xs flex items-center gap-1 shrink-0 transition-all ${filter === 'all' ? 'bg-primary text-background-dark' : 'border border-primary/30 bg-surface-dark/40 text-primary/80'}`}
                    >
                        Todos
                    </button>
                    <button
                        onClick={() => setFilter('income')}
                        className={`px-5 py-2 rounded-full font-bold text-xs flex items-center gap-1 shrink-0 transition-all ${filter === 'income' ? 'bg-primary text-background-dark' : 'border border-primary/30 bg-surface-dark/40 text-primary/80'}`}
                    >
                        Ingresos
                    </button>
                    <button
                        onClick={() => setFilter('expense')}
                        className={`px-5 py-2 rounded-full font-bold text-xs flex items-center gap-1 shrink-0 transition-all ${filter === 'expense' ? 'bg-primary text-background-dark' : 'border border-primary/30 bg-surface-dark/40 text-primary/80'}`}
                    >
                        Gastos
                    </button>
                </div>
            </header>

            <section className="flex-1 px-6 pb-24">
                {Object.keys(groupedTransactions).length === 0 && (
                    <p className="text-center text-slate-500 mt-10">No hay transacciones.</p>
                )}

                {Object.keys(groupedTransactions).map((date) => (
                    <div key={date} className="mb-8">
                        <div className="flex justify-between items-center mb-4 sticky top-12 py-2 bg-background-light dark:bg-background-dark z-10">
                            <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-primary/60">{date}</h2>
                        </div>
                        <div className="space-y-1">
                            {groupedTransactions[date].map((tx) => (
                                <div key={tx.id} className="group relative flex items-center justify-between p-4 -mx-2 rounded-xl active:bg-surface-dark/80 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/10 flex items-center justify-center">
                                            <span className="material-icons-round text-primary">{tx.icon}</span>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-sm">{tx.title}</h3>
                                            <p className="text-xs text-slate-500">{tx.category}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className={`font-bold text-sm ${tx.type === 'income' ? 'text-primary' : 'text-slate-100'}`}>
                                            {tx.type === 'income' ? '+' : '-'}${Math.abs(tx.amount).toLocaleString()}
                                        </span>
                                        <button
                                            onClick={() => removeTransaction(tx.id)}
                                            className="ml-2 text-red-500 text-xs hover:underline"
                                        >
                                            Borrar
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default Transactions;
