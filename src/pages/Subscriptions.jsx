import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Subscriptions = () => {
    const [subscriptions] = useState([
        { id: 1, name: 'Netflix Premium', category: 'Entretenimiento • Mensual', amount: 15.99, date: 'En 2 días', color: 'bg-black', icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBxyvt5wcx8thpaURfTeLIUejndOYBpAAEKmIGcAhcP2krxId87UbQ-onNp5r0aqarB97u0ubjITwq0e1iYJAuQlvF5Kd_iSV-3EnzE0_OyDN4IUiWewHMcgr7POAtHpUnZHs-dmRNxkV5eEiY_cjFG-kFd95eYVJU_HnhavUHy_7pYF-PRC_6M5sN2ohFW7AQj2uOsuAdwASz7JVeTN-ipF0O87TAw5KHVYMh7TU-vyQggH7I2wu6rOR8DaAFL4ZHZoQBLyO9Ykg' },
        { id: 2, name: 'Spotify Duo', category: 'Música • Mensual', amount: 12.99, date: '28 Oct', color: 'bg-[#1DB954]/10 text-[#1DB954]', icon: 'music_note', isIcon: true },
        { id: 3, name: 'Adobe Creative Cloud', category: 'Software • Anual', amount: 59.99, date: '1 Nov', color: 'bg-white', icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFpgq8bZcbOsC4TEWSVczjCQsy1dQp_l_uDaBCg5V5CElZnsvbsSNVJWL5PHbmraThzjt6gPGx-0JLIYTVW644WGeHmdoH4h884HmpLO9Ty0h68lRvPtaugF7G8dnSwf71dMBGV8b0V0bZ1__fGOxgkIjqWlPjpzUQNKW3FmDZhsokGrvU2UIT3p2ImSPKArLyQPn0PWM46UaMNfn2TDET5Wmx3E1QD30kQ4UhjDyOy5F3JQVQ4by_GJj4I-vTWaYAAAEG5w6nM5g' },
    ]);

    const [otherServices] = useState([
        { id: 1, name: 'iCloud+ 2TB', category: 'Almacenamiento • Mensual', amount: 9.99, date: '5 Nov', color: 'bg-blue-500/10 text-blue-400', icon: 'cloud', isIcon: true },
        { id: 2, name: 'X Premium', category: 'Redes • Mensual', amount: 8.00, date: '12 Nov', color: 'bg-black text-white font-bold text-lg', icon: 'X', isText: true },
    ]);

    return (
        <div className="flex flex-col h-full min-h-screen">
            <header className="px-6 pt-8 pb-4">
                <div className="flex justify-between items-center mb-6">
                    <NavLink to="/" className="p-2 -ml-2 rounded-full active:bg-primary/10 transition-colors">
                        <span className="material-icons-round text-primary">arrow_back_ios_new</span>
                    </NavLink>
                    <div className="flex gap-4">
                         <button className="p-2 rounded-full bg-primary/10 text-primary">
                            <span className="material-icons-round">calendar_today</span>
                        </button>
                        <button className="p-2 rounded-full bg-primary/10 text-primary">
                            <span className="material-icons-round">more_horiz</span>
                        </button>
                    </div>
                </div>

                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-1">Suscripciones</h1>
                        <p className="text-slate-400 text-sm">Gestiona tus pagos recurrentes</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-primary/60 mb-1">Mensual Total</p>
                        <p className="text-xl font-bold text-primary">$138.99</p>
                    </div>
                </div>

                 <div className="relative group mb-8">
                    <span className="material-icons-round absolute left-4 top-1/2 -translate-y-1/2 text-primary/60 group-focus-within:text-primary transition-colors">search</span>
                    <input
                        type="text"
                        placeholder="Buscar suscripción..."
                        className="w-full bg-surface-dark/50 dark:bg-surface-dark border-primary/20 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl py-3.5 pl-12 pr-4 text-sm transition-all outline-none text-white placeholder-slate-500"
                    />
                </div>

                 <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
                    <button className="px-5 py-2 rounded-full bg-primary text-background-dark font-bold text-xs flex items-center gap-1 shrink-0">
                        <span className="material-icons-round text-sm">grid_view</span> Activas
                    </button>
                    <button className="px-5 py-2 rounded-full border border-primary/30 dark:border-primary/20 bg-surface-dark/40 text-primary/80 font-semibold text-xs shrink-0 hover:border-primary transition-all">
                        Pendientes
                    </button>
                    <button className="px-5 py-2 rounded-full border border-primary/30 dark:border-primary/20 bg-surface-dark/40 text-primary/80 font-semibold text-xs shrink-0 hover:border-primary transition-all">
                        Canceladas
                    </button>
                </div>
            </header>

            <section className="flex-1 px-6 pb-24">
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-4 sticky top-12 py-2 bg-background-light dark:bg-background-dark z-10">
                        <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-primary/60">Próximos Pagos</h2>
                    </div>
                    <div className="space-y-3">
                         {subscriptions.map((sub) => (
                            <div key={sub.id} className="flex items-center justify-between p-4 -mx-2 rounded-xl bg-surface-dark border border-white/5 active:bg-surface-dark/80 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl ${sub.color} border border-white/10 flex items-center justify-center overflow-hidden relative`}>
                                        {sub.isIcon ? (
                                             <span className="material-icons-round">{sub.icon}</span>
                                        ) : sub.isText ? (
                                            sub.icon
                                        ) : (
                                            <img src={sub.icon} alt={sub.name} className="w-full h-full object-cover opacity-80" />
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-sm text-white">{sub.name}</h3>
                                        <p className="text-xs text-slate-400">{sub.category}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="block font-bold text-sm text-white">${sub.amount}</span>
                                    <span className="text-[10px] font-medium text-slate-500 mt-1">{sub.date}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mb-8">
                    <div className="flex justify-between items-center mb-4 sticky top-12 py-2 bg-background-light dark:bg-background-dark z-10">
                        <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-primary/60">Otros Servicios</h2>
                    </div>
                    <div className="space-y-3">
                        {otherServices.map((sub) => (
                            <div key={sub.id} className="flex items-center justify-between p-4 -mx-2 rounded-xl bg-surface-dark border border-white/5 active:bg-surface-dark/80 transition-colors">
                                <div className="flex items-center gap-4">
                                     <div className={`w-12 h-12 rounded-xl ${sub.color} border border-white/10 flex items-center justify-center overflow-hidden relative`}>
                                        {sub.isIcon ? (
                                             <span className="material-icons-round">{sub.icon}</span>
                                        ) : sub.isText ? (
                                            sub.icon
                                        ) : (
                                            <img src={sub.icon} alt={sub.name} className="w-full h-full object-cover opacity-80" />
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-sm text-white">{sub.name}</h3>
                                        <p className="text-xs text-slate-400">{sub.category}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="block font-bold text-sm text-white">${sub.amount.toFixed(2)}</span>
                                    <span className="text-[10px] font-medium text-slate-500 mt-1">{sub.date}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Subscriptions;
