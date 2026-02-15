import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Portfolio = () => {
    // Mock Data
    const [portfolioData] = useState({
        totalBalance: 142590.00,
        changePercentage: 12.5,
        dayGain: 1240.50,
        apy: 4.2
    });

    const [cryptoAssets] = useState([
        { id: 1, name: 'Bitcoin', symbol: 'BTC', amount: '1.25 BTC', price: 42500, value: 53125.00, change: 2.4, color: '#F7931A' },
        { id: 2, name: 'Ethereum', symbol: 'ETH', amount: '2.00 ETH', price: 2557, value: 5115.00, change: -0.8, color: '#627EEA' },
    ]);

    const [realEstateAssets] = useState([
        { id: 1, name: 'Loft Centro', subtitle: 'Participación: 15%', value: 45000.00, change: 5.2, icon: 'apartment' },
        { id: 2, name: 'Plaza Comercial', subtitle: 'REIT • Mensual', value: 39350.00, change: 1.1, icon: 'storefront' },
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
                            <span className="material-icons-round">settings</span>
                        </button>
                    </div>
                </div>

                <h1 className="text-3xl font-extrabold tracking-tight mb-2">Mi Porfolio</h1>
                <p className="text-slate-400 text-sm mb-6">Resumen general de activos</p>

                {/* Main Card */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-surface-dark to-neutral-dark p-6 border border-primary/10 shadow-lg shadow-black/20 mb-8">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl translate-x-10 -translate-y-10"></div>
                    <div className="relative z-10">
                        <p className="text-xs font-bold uppercase tracking-wider text-primary/80 mb-1">Balance Total</p>
                        <div className="flex items-baseline gap-2 mb-4">
                            <h2 className="text-4xl font-extrabold text-white">${portfolioData.totalBalance.toLocaleString()}</h2>
                            <span className="flex items-center text-green-400 text-sm font-bold bg-green-400/10 px-2 py-0.5 rounded-lg">
                                <span className="material-icons-round text-sm mr-0.5">trending_up</span> +{portfolioData.changePercentage}%
                            </span>
                        </div>
                        <div className="flex gap-3">
                            <div className="flex-1 bg-black/20 rounded-lg p-2 backdrop-blur-sm border border-white/5">
                                <p className="text-[10px] text-slate-400 mb-1">Ganancia 24h</p>
                                <p className="font-bold text-green-400 text-sm">+${portfolioData.dayGain.toLocaleString()}</p>
                            </div>
                            <div className="flex-1 bg-black/20 rounded-lg p-2 backdrop-blur-sm border border-white/5">
                                <p className="text-[10px] text-slate-400 mb-1">Rendimiento</p>
                                <p className="font-bold text-primary text-sm">{portfolioData.apy}% APY</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
                    <button className="px-5 py-2 rounded-full bg-primary text-background-dark font-bold text-xs flex items-center gap-1 shrink-0">
                        <span className="material-icons-round text-sm">pie_chart</span> General
                    </button>
                    <button className="px-5 py-2 rounded-full border border-primary/30 dark:border-primary/20 bg-surface-dark/40 text-primary/80 font-semibold text-xs shrink-0 hover:border-primary transition-all">
                        Criptomonedas
                    </button>
                    <button className="px-5 py-2 rounded-full border border-primary/30 dark:border-primary/20 bg-surface-dark/40 text-primary/80 font-semibold text-xs shrink-0 hover:border-primary transition-all">
                        Bienes Raíces
                    </button>
                    <button className="px-5 py-2 rounded-full border border-primary/30 dark:border-primary/20 bg-surface-dark/40 text-primary/80 font-semibold text-xs shrink-0 hover:border-primary transition-all">
                        Acciones
                    </button>
                </div>
            </header>

            <section className="flex-1 px-6 pb-24">
                {/* Criptoactivos Section */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-4 sticky top-12 py-2 bg-background-light dark:bg-background-dark z-10">
                        <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-primary/60">Criptoactivos</h2>
                        <span className="text-[11px] font-medium text-slate-500">$58,240.00</span>
                    </div>
                    <div className="space-y-1">
                        {cryptoAssets.map((asset) => (
                            <div key={asset.id} className="flex items-center justify-between p-4 -mx-2 rounded-xl active:bg-surface-dark/80 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-opacity-10 border border-opacity-20 flex items-center justify-center font-bold" style={{ backgroundColor: `${asset.color}1A`, borderColor: `${asset.color}33`, color: asset.color }}>
                                        <span className="material-symbols-outlined">{asset.id === 1 ? 'currency_bitcoin' : 'token'}</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-sm">{asset.name}</h3>
                                        <p className="text-xs text-slate-500">{asset.amount} • ${asset.price.toLocaleString()}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="font-bold text-sm text-slate-100">${asset.value.toLocaleString()}</span>
                                    <p className={`text-xs ${asset.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>{asset.change > 0 ? '+' : ''}{asset.change}%</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bienes Raíces Section */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-4 sticky top-12 py-2 bg-background-light dark:bg-background-dark z-10">
                        <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-primary/60">Bienes Raíces</h2>
                        <span className="text-[11px] font-medium text-slate-500">$84,350.00</span>
                    </div>
                    <div className="space-y-1">
                        {realEstateAssets.map((asset) => (
                            <div key={asset.id} className="flex items-center justify-between p-4 -mx-2 rounded-xl active:bg-surface-dark/80 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/10 flex items-center justify-center">
                                        <span className="material-icons-round text-primary">{asset.icon}</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-sm">{asset.name}</h3>
                                        <p className="text-xs text-slate-500">{asset.subtitle}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="font-bold text-sm text-slate-100">${asset.value.toLocaleString()}</span>
                                    <p className="text-xs text-green-400">+{asset.change}%</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Portfolio;
