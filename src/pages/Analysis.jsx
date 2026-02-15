import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Analysis = () => {
    const [cryptoData] = useState([
        { id: 1, name: 'Ethereum', symbol: 'ETH', price: 1789.20, change: 2.45, icon: 'diamond', color: 'text-purple-400' },
        { id: 2, name: 'Solana', symbol: 'SOL', price: 32.50, change: 8.12, icon: 'wb_sunny', color: 'text-cyan-400' },
        { id: 3, name: 'Polkadot', symbol: 'DOT', price: 4.20, change: -1.20, icon: 'blur_on', color: 'text-pink-500' },
        { id: 4, name: 'Cardano', symbol: 'ADA', price: 0.28, change: 0.55, icon: 'token', color: 'text-blue-500' },
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
                            <span className="material-icons-round">notifications</span>
                        </button>
                        <button className="p-2 rounded-full bg-primary/10 text-primary">
                            <span className="material-icons-round">more_horiz</span>
                        </button>
                    </div>
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight mb-6">Análisis Crypto</h1>

                <div className="w-full bg-surface-dark/40 rounded-2xl p-5 mb-6 border border-primary/10">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-primary font-bold text-lg">BTC/USD</span>
                                <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">+4.2%</span>
                            </div>
                            <h2 className="text-2xl font-bold text-white">$34,289.42</h2>
                        </div>
                        <div className="flex gap-1">
                            <button className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary font-semibold">1D</button>
                            <button className="text-xs px-2 py-1 rounded-md text-slate-500 hover:text-slate-300">1W</button>
                            <button className="text-xs px-2 py-1 rounded-md text-slate-500 hover:text-slate-300">1M</button>
                        </div>
                    </div>
                    {/* Mock Chart Visualization */}
                    <div className="h-40 w-full relative flex items-end justify-between gap-1 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-50 pointer-events-none z-0"></div>
                        <div className="w-1/12 bg-primary/30 h-[40%] rounded-t-sm"></div>
                        <div className="w-1/12 bg-primary/40 h-[55%] rounded-t-sm"></div>
                        <div className="w-1/12 bg-primary/30 h-[45%] rounded-t-sm"></div>
                        <div className="w-1/12 bg-primary/50 h-[60%] rounded-t-sm"></div>
                        <div className="w-1/12 bg-primary/40 h-[50%] rounded-t-sm"></div>
                        <div className="w-1/12 bg-primary/20 h-[35%] rounded-t-sm"></div>
                        <div className="w-1/12 bg-primary/60 h-[70%] rounded-t-sm"></div>
                        <div className="w-1/12 bg-primary/50 h-[65%] rounded-t-sm"></div>
                        <div className="w-1/12 bg-primary/80 h-[85%] rounded-t-sm"></div>
                        <div className="w-1/12 bg-primary h-[75%] rounded-t-sm relative shadow-[0_0_15px_rgba(242,208,13,0.5)]"></div>
                         <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" preserveAspectRatio="none">
                            <path d="M0,100 C20,90 40,60 60,70 C80,80 100,50 120,60 C140,70 160,90 180,50 C200,40 220,55 240,40 C260,25 280,35 300,45" fill="none" stroke="#f2d00d" strokeWidth="2" vectorEffect="non-scaling-stroke"></path>
                        </svg>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-surface-dark/40 rounded-xl p-4 border border-primary/5">
                        <div className="flex items-center gap-2 mb-2 text-slate-400">
                            <span className="material-icons-round text-sm">trending_up</span>
                            <span className="text-xs font-semibold uppercase tracking-wider">Volumen 24h</span>
                        </div>
                        <p className="text-lg font-bold text-white">$1.2B</p>
                    </div>
                    <div className="bg-surface-dark/40 rounded-xl p-4 border border-primary/5">
                        <div className="flex items-center gap-2 mb-2 text-slate-400">
                            <span className="material-icons-round text-sm">show_chart</span>
                            <span className="text-xs font-semibold uppercase tracking-wider">Capitalización</span>
                        </div>
                        <p className="text-lg font-bold text-white">$642B</p>
                    </div>
                </div>

                <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
                    <button className="px-5 py-2 rounded-full bg-primary text-background-dark font-bold text-xs flex items-center gap-1 shrink-0">
                        <span className="material-icons-round text-sm">star</span> Favoritos
                    </button>
                    <button className="px-5 py-2 rounded-full border border-primary/30 dark:border-primary/20 bg-surface-dark/40 text-primary/80 font-semibold text-xs shrink-0 hover:border-primary transition-all">
                        Top Ganadores
                    </button>
                     <button className="px-5 py-2 rounded-full border border-primary/30 dark:border-primary/20 bg-surface-dark/40 text-primary/80 font-semibold text-xs shrink-0 hover:border-primary transition-all">
                        DeFi
                    </button>
                     <button className="px-5 py-2 rounded-full border border-primary/30 dark:border-primary/20 bg-surface-dark/40 text-primary/80 font-semibold text-xs shrink-0 hover:border-primary transition-all">
                        Metaverse
                    </button>
                </div>
            </header>

            <section className="flex-1 px-6 pb-24">
                <div className="mb-4 flex justify-between items-end">
                    <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-primary/60">Mercado Hoy</h2>
                    <span className="text-xs text-primary cursor-pointer hover:underline">Ver todo</span>
                </div>
                <div className="space-y-1">
                    {cryptoData.map((coin) => (
                        <div key={coin.id} className="flex items-center justify-between p-4 -mx-2 rounded-xl active:bg-surface-dark/80 transition-colors cursor-pointer group hover:bg-surface-dark/40">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center relative">
                                    <span className={`material-symbols-outlined ${coin.color} text-xl`}>{coin.icon}</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm">{coin.name}</h3>
                                    <p className="text-xs text-slate-500">{coin.symbol}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="block font-bold text-sm text-slate-100">${coin.price.toLocaleString()}</span>
                                <span className={`text-xs ${coin.change >= 0 ? 'text-primary' : 'text-red-400'} font-medium`}>
                                    {coin.change > 0 ? '+' : ''}{coin.change}%
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Analysis;
