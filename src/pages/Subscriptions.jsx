import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useData } from '../context/DataContext';

const Subscriptions = () => {
    const { subscriptions, addSubscription, removeSubscription } = useData();
    const [showModal, setShowModal] = useState(false);

    // Form State
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [cycle, setCycle] = useState('Mensual');
    const [date, setDate] = useState('');

    const handleAddSubscription = async (e) => {
        e.preventDefault();
        if (!name || !amount) return;

        await addSubscription({
            name,
            category: `Suscripción • ${cycle}`,
            amount: parseFloat(amount),
            date: date || 'Pendiente',
            color: 'bg-primary/10 text-primary', // Default style
            isIcon: true,
            icon: 'calendar_today'
        });

        // Reset
        setName('');
        setAmount('');
        setCycle('Mensual');
        setDate('');
        setShowModal(false);
    };

    const totalMonthly = subscriptions.reduce((sum, sub) => sum + parseFloat(sub.amount), 0);

    return (
        <div className="flex flex-col h-full min-h-screen relative">
            <header className="px-6 pt-8 pb-4">
                <div className="flex justify-between items-center mb-6">
                    <NavLink to="/" className="p-2 -ml-2 rounded-full active:bg-primary/10 transition-colors">
                        <span className="material-icons-round text-primary">arrow_back_ios_new</span>
                    </NavLink>
                    <div className="flex gap-4">
                         <button onClick={() => setShowModal(true)} className="p-2 rounded-full bg-primary/10 text-primary">
                            <span className="material-icons-round">add</span>
                        </button>
                    </div>
                </div>

                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-1">Suscripciones</h1>
                        <p className="text-slate-400 text-sm">Gestiona tus pagos recurrentes</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-primary/60 mb-1">Total</p>
                        <p className="text-xl font-bold text-primary">${totalMonthly.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                    </div>
                </div>

                 <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
                    <button className="px-5 py-2 rounded-full bg-primary text-background-dark font-bold text-xs flex items-center gap-1 shrink-0">
                        <span className="material-icons-round text-sm">grid_view</span> Activas
                    </button>
                </div>
            </header>

            <section className="flex-1 px-6 pb-24">
                {subscriptions.length === 0 ? (
                    <p className="text-center text-slate-500 mt-10">No hay suscripciones activas.</p>
                ) : (
                    <div className="space-y-3">
                         {subscriptions.map((sub) => (
                            <div key={sub.id} className="flex items-center justify-between p-4 -mx-2 rounded-xl bg-surface-dark border border-white/5 active:bg-surface-dark/80 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl ${sub.color || 'bg-primary/10 text-primary'} border border-white/10 flex items-center justify-center overflow-hidden relative`}>
                                         <span className="material-icons-round">{sub.icon || 'star'}</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-sm text-white">{sub.name}</h3>
                                        <p className="text-xs text-slate-400">{sub.category}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="block font-bold text-sm text-white">${sub.amount}</span>
                                    <span className="text-[10px] font-medium text-slate-500 mt-1">{sub.date}</span>
                                    <button onClick={() => removeSubscription(sub.id)} className="block text-[10px] text-red-500 mt-1 ml-auto">Borrar</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Add Subscription Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="w-full max-w-md bg-surface-dark rounded-2xl p-6 border border-primary/20">
                        <h2 className="text-xl font-bold text-white mb-4">Nueva Suscripción</h2>
                        <form onSubmit={handleAddSubscription} className="space-y-4">
                            <div>
                                <label className="block text-xs uppercase text-primary/70 mb-1">Nombre</label>
                                <input
                                    type="text"
                                    className="w-full bg-background-dark border border-primary/20 rounded-lg p-3 text-white focus:border-primary outline-none"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase text-primary/70 mb-1">Monto</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    className="w-full bg-background-dark border border-primary/20 rounded-lg p-3 text-white focus:border-primary outline-none"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase text-primary/70 mb-1">Ciclo</label>
                                <select
                                    className="w-full bg-background-dark border border-primary/20 rounded-lg p-3 text-white focus:border-primary outline-none"
                                    value={cycle}
                                    onChange={(e) => setCycle(e.target.value)}
                                >
                                    <option value="Mensual">Mensual</option>
                                    <option value="Anual">Anual</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs uppercase text-primary/70 mb-1">Fecha de pago (ej: 5 Nov)</label>
                                <input
                                    type="text"
                                    className="w-full bg-background-dark border border-primary/20 rounded-lg p-3 text-white focus:border-primary outline-none"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 py-3 rounded-xl border border-white/10 text-slate-300 font-bold"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-3 rounded-xl bg-primary text-background-dark font-bold"
                                >
                                    Guardar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Subscriptions;
