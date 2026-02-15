import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Transactions = () => {
    // Mock Data
    const [transactions] = useState([
        { id: 1, title: 'Apple Store', date: 'Hoy, 24 de Octubre', time: '14:32', category: 'Tecnología', amount: -89.00, icon: 'shopping_bag', isIncome: false, day: 'Hoy, 24 de Octubre' },
        { id: 2, title: 'Nómina GentleCorp', date: 'Hoy, 24 de Octubre', time: '09:00', category: 'Salario', amount: 4250.00, icon: 'payments', isIncome: true, day: 'Hoy, 24 de Octubre' },
        { id: 3, title: 'The Golden Grill', date: 'Hoy, 24 de Octubre', time: '21:15', category: 'Cena', amount: -31.50, icon: 'restaurant', isIncome: false, day: 'Hoy, 24 de Octubre' },
        { id: 4, title: 'Uber', date: 'Ayer, 23 de Octubre', time: '18:45', category: 'Transporte', amount: -15.20, icon: 'directions_car', isIncome: false, day: 'Ayer, 23 de Octubre' },
        { id: 5, title: 'Rendimientos Crypto', date: 'Ayer, 23 de Octubre', time: '02:00', category: 'Inversión', amount: 124.80, icon: 'savings', isIncome: true, day: 'Ayer, 23 de Octubre' },
        { id: 6, title: 'Ritz-Carlton NY', date: '22 de Octubre', time: '11:30', category: 'Viaje', amount: -240.00, icon: 'hotel', isIncome: false, day: '22 de Octubre' },
    ]);

    // Group transactions by day
    const groupedTransactions = transactions.reduce((groups, transaction) => {
        const day = transaction.day;
        if (!groups[day]) {
            groups[day] = [];
        }
        groups[day].push(transaction);
        return groups;
    }, {});

    const dayTotals = Object.keys(groupedTransactions).reduce((totals, day) => {
        totals[day] = groupedTransactions[day].reduce((sum, t) => sum + t.amount, 0);
        return totals;
    }, {});


    return (
        <div className="flex flex-col h-full min-h-screen">
            <header className="px-6 pt-8 pb-4 sticky top-0 bg-background-light dark:bg-background-dark z-20">
                <div className="flex justify-between items-center mb-6">
                    <NavLink to="/" className="p-2 -ml-2 rounded-full active:bg-primary/10 transition-colors">
                        <span className="material-icons-round text-primary">arrow_back_ios_new</span>
                    </NavLink>
                    <div className="flex gap-4">
                        <button className="p-2 rounded-full bg-primary/10 text-primary">
                            <span className="material-icons-round">file_download</span>
                        </button>
                        <button className="p-2 rounded-full bg-primary/10 text-primary">
                            <span className="material-icons-round">more_horiz</span>
                        </button>
                    </div>
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight mb-6">Transacciones</h1>

                {/* Search Bar */}
                <div className="relative group mb-6">
                    <span className="material-icons-round absolute left-4 top-1/2 -translate-y-1/2 text-primary/60 group-focus-within:text-primary transition-colors">search</span>
                    <input
                        type="text"
                        placeholder="Buscar movimientos..."
                        className="w-full bg-surface-dark/50 dark:bg-surface-dark border-primary/20 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl py-3.5 pl-12 pr-4 text-sm transition-all outline-none text-white placeholder-slate-500"
                    />
                </div>

                {/* Filters */}
                <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
                    <button className="px-5 py-2 rounded-full bg-primary text-background-dark font-bold text-xs flex items-center gap-1 shrink-0">
                        <span className="material-icons-round text-sm">tune</span> Todos
                    </button>
                    <button className="px-5 py-2 rounded-full border border-primary/30 dark:border-primary/20 bg-surface-dark/40 text-primary/80 font-semibold text-xs shrink-0 hover:border-primary transition-all">
                        Ingresos
                    </button>
                    <button className="px-5 py-2 rounded-full border border-primary/30 dark:border-primary/20 bg-surface-dark/40 text-primary/80 font-semibold text-xs shrink-0 hover:border-primary transition-all">
                        Gastos
                    </button>
                    <button className="px-5 py-2 rounded-full border border-primary/30 dark:border-primary/20 bg-surface-dark/40 text-primary/80 font-semibold text-xs shrink-0 hover:border-primary transition-all">
                        Octubre
                    </button>
                </div>
            </header>

            <section className="flex-1 px-6 pb-24">
                {Object.keys(groupedTransactions).map((day) => (
                    <div key={day} className="mb-8">
                        <div className="flex justify-between items-center mb-4 sticky top-12 py-2 bg-background-light dark:bg-background-dark z-10">
                            <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-primary/60">{day}</h2>
                            <span className={`text-[11px] font-medium ${dayTotals[day] >= 0 ? 'text-primary' : 'text-slate-500'}`}>
                                {dayTotals[day] > 0 ? '+' : ''}${dayTotals[day].toLocaleString()}
                            </span>
                        </div>
                        <div className="space-y-1">
                            {groupedTransactions[day].map((tx) => (
                                <div key={tx.id} className="flex items-center justify-between p-4 -mx-2 rounded-xl active:bg-surface-dark/80 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/10 flex items-center justify-center">
                                            <span className="material-icons-round text-primary">{tx.icon}</span>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-sm">{tx.title}</h3>
                                            <p className="text-xs text-slate-500">{tx.category} • {tx.time}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className={`font-bold text-sm ${tx.isIncome ? 'text-primary' : 'text-slate-100'}`}>
                                            {tx.isIncome ? '+' : '-'}${Math.abs(tx.amount).toLocaleString()}
                                        </span>
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
