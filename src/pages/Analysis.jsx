import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getCryptoMarketData, getStockQuote } from '../services/api';

const Analysis = () => {
    const { t } = useTranslation();
    const [cryptoData, setCryptoData] = useState([]);
    const [stockData, setStockData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            // 1. Fetch Crypto
            const cryptos = await getCryptoMarketData('usd', ['bitcoin', 'ethereum', 'solana', 'polkadot', 'cardano', 'ripple']);
            setCryptoData(cryptos);

            // 2. Fetch Stocks (Demo symbols)
            const symbols = ['AAPL', 'TSLA', 'AMZN'];
            const stocks = await Promise.all(symbols.map(async (sym) => {
                const data = await getStockQuote(sym);
                return { symbol: sym, ...data };
            }));
            setStockData(stocks.filter(s => s && s.c)); // Filter out failed fetches

            setLoading(false);
        };

        fetchData();
    }, []);

    // Helper to format large numbers
    const formatNumber = (num) => {
        if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
        if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
        return num.toLocaleString();
    };

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
                    </div>
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight mb-6">{t('analysis.title')}</h1>

                {/* Featured: Bitcoin (first in list) */}
                {cryptoData.length > 0 && (
                    <div className="w-full bg-surface-dark/40 rounded-2xl p-5 mb-6 border border-primary/10">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-primary font-bold text-lg">{cryptoData[0].symbol.toUpperCase()}/USD</span>
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${cryptoData[0].price_change_percentage_24h >= 0 ? 'bg-primary/20 text-primary' : 'bg-red-500/20 text-red-500'}`}>
                                        {cryptoData[0].price_change_percentage_24h.toFixed(2)}%
                                    </span>
                                </div>
                                <h2 className="text-2xl font-bold text-white">${cryptoData[0].current_price.toLocaleString()}</h2>
                            </div>
                        </div>
                        {/* Simple Chart Visualization (Static SVG for style) */}
                        <div className="h-40 w-full relative flex items-end justify-between gap-1 overflow-hidden">
                             <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-50 pointer-events-none z-0"></div>
                             {/* ... bars logic remains for aesthetics ... */}
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
                )}

                {/* Filters */}
                <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
                    <button className="px-5 py-2 rounded-full bg-primary text-background-dark font-bold text-xs flex items-center gap-1 shrink-0">
                        <span className="material-icons-round text-sm">currency_bitcoin</span> Cripto
                    </button>
                    <button className="px-5 py-2 rounded-full border border-primary/30 dark:border-primary/20 bg-surface-dark/40 text-primary/80 font-semibold text-xs shrink-0 hover:border-primary transition-all">
                        Acciones
                    </button>
                </div>
            </header>

            <section className="flex-1 px-6 pb-24">
                {/* CRYPTO LIST */}
                <div className="mb-6">
                    <div className="mb-4 flex justify-between items-end">
                        <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-primary/60">{t('analysis.market_today')} (Cripto)</h2>
                    </div>
                    {loading ? (
                        <p className="text-slate-500 text-sm">Cargando precios...</p>
                    ) : (
                        <div className="space-y-1">
                            {cryptoData.map((coin) => (
                                <div key={coin.id} className="flex items-center justify-between p-4 -mx-2 rounded-xl active:bg-surface-dark/80 transition-colors cursor-pointer group hover:bg-surface-dark/40">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center relative overflow-hidden">
                                            <img src={coin.image} alt={coin.name} className="w-6 h-6 object-contain" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-sm">{coin.name}</h3>
                                            <p className="text-xs text-slate-500 uppercase">{coin.symbol}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="block font-bold text-sm text-slate-100">${coin.current_price.toLocaleString()}</span>
                                        <span className={`text-xs ${coin.price_change_percentage_24h >= 0 ? 'text-primary' : 'text-red-400'} font-medium`}>
                                            {coin.price_change_percentage_24h > 0 ? '+' : ''}{coin.price_change_percentage_24h.toFixed(2)}%
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* STOCKS LIST */}
                {stockData.length > 0 && (
                    <div className="mb-6">
                        <div className="mb-4 flex justify-between items-end">
                            <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-primary/60">Bolsa (EE.UU.)</h2>
                        </div>
                        <div className="space-y-1">
                            {stockData.map((stock) => (
                                <div key={stock.symbol} className="flex items-center justify-between p-4 -mx-2 rounded-xl active:bg-surface-dark/80 transition-colors cursor-pointer group hover:bg-surface-dark/40">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-bold text-xs text-white">
                                            {stock.symbol[0]}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-sm">{stock.symbol}</h3>
                                            <p className="text-xs text-slate-500">Nasdaq</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="block font-bold text-sm text-slate-100">${stock.c.toLocaleString()}</span>
                                        <span className={`text-xs ${stock.dp >= 0 ? 'text-green-400' : 'text-red-400'} font-medium`}>
                                            {stock.dp > 0 ? '+' : ''}{stock.dp.toFixed(2)}%
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
};

export default Analysis;
