import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { getCryptoMarketData, getStockQuote, getRealEstateData } from '../services/api';

const Portfolio = () => {
    const { assets, addAsset, removeAsset, financials } = useData();
    const [showModal, setShowModal] = useState(false);
    const [loadingPrices, setLoadingPrices] = useState(false);
    const [liveAssets, setLiveAssets] = useState([]);

    // Form State
    const [name, setName] = useState('');
    const [amount, setAmount] = useState(''); // Changed from value to amount (quantity)
    const [type, setType] = useState('crypto');
    const [subtitle, setSubtitle] = useState(''); // Used for Symbol (e.g., BTC)

    // Fetch current prices for assets in portfolio to show real value
    useEffect(() => {
        const updatePrices = async () => {
            setLoadingPrices(true);
            const updatedAssets = await Promise.all(assets.map(async (asset) => {
                let currentPrice = 0;
                let change = 0;

                // Try to find live data based on asset type
                if (asset.type === 'crypto' && asset.subtitle) {
                    try {
                        // Assuming subtitle holds symbol or ID. Simple heuristic mapping for demo
                        const idMap = { 'btc': 'bitcoin', 'eth': 'ethereum', 'sol': 'solana', 'dot': 'polkadot' };
                        const searchId = idMap[asset.subtitle.toLowerCase()] || asset.name.toLowerCase();
                        const data = await getCryptoMarketData('usd', [searchId]);
                        if (data && data.length > 0) {
                            currentPrice = data[0].current_price;
                            change = data[0].price_change_percentage_24h;
                        }
                    } catch (e) { console.error(e); }
                } else if (asset.type === 'stock' && asset.subtitle) {
                    try {
                        const data = await getStockQuote(asset.subtitle); // subtitle = symbol
                        if (data && data.c) {
                            currentPrice = data.c;
                            change = data.dp;
                        }
                    } catch (e) { console.error(e); }
                }

                // If live data found, use it to calculate value. Else use stored value.
                const finalValue = currentPrice > 0 ? (parseFloat(asset.amount || 0) * currentPrice) : asset.value;
                const finalChange = change || asset.change || 0;

                return {
                    ...asset,
                    liveValue: finalValue,
                    liveChange: finalChange,
                    currentPrice // Store unit price for display
                };
            }));
            setLiveAssets(updatedAssets);
            setLoadingPrices(false);
        };

        if (assets.length > 0) {
            updatePrices();
        } else {
            setLiveAssets([]);
        }
    }, [assets]);

    const handleAddAsset = async (e) => {
        e.preventDefault();
        if (!name || !amount) return;

        // If user enters "BTC", we try to infer it's a crypto quantity
        // For Real Estate, amount usually means total value, so we treat it differently or just store as value

        await addAsset({
            name,
            amount: parseFloat(amount), // Store quantity
            value: parseFloat(amount), // Initial value estimate (will be overwritten by live calc if possible)
            type,
            subtitle: subtitle || (type === 'crypto' ? 'BTC' : ''),
            change: 0
        });

        // Reset
        setName('');
        setAmount('');
        setType('crypto');
        setSubtitle('');
        setShowModal(false);
    };

    const cryptoAssets = liveAssets.filter(a => a.type === 'crypto');
    const realEstateAssets = liveAssets.filter(a => a.type === 'real_estate');
    const stockAssets = liveAssets.filter(a => a.type === 'stock');

    // Calculate total from live values
    const totalBalance = liveAssets.reduce((sum, a) => sum + (a.liveValue || 0), 0);

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

                <h1 className="text-3xl font-extrabold tracking-tight mb-2">Mi Porfolio</h1>

                {/* Main Card */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-surface-dark to-neutral-dark p-6 border border-primary/10 shadow-lg shadow-black/20 mb-8">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl translate-x-10 -translate-y-10"></div>
                    <div className="relative z-10">
                        <p className="text-xs font-bold uppercase tracking-wider text-primary/80 mb-1">Balance Total</p>
                        <div className="flex items-baseline gap-2 mb-4">
                            <h2 className="text-4xl font-extrabold text-white">
                                ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </h2>
                        </div>
                        {loadingPrices && <p className="text-xs text-primary/50 animate-pulse">Actualizando precios...</p>}
                    </div>
                </div>
            </header>

            <section className="flex-1 px-6 pb-24">
                {/* Criptoactivos Section */}
                {cryptoAssets.length > 0 && (
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-4 sticky top-12 py-2 bg-background-light dark:bg-background-dark z-10">
                            <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-primary/60">Criptoactivos</h2>
                        </div>
                        <div className="space-y-1">
                            {cryptoAssets.map((asset) => (
                                <div key={asset.id} className="flex items-center justify-between p-4 -mx-2 rounded-xl active:bg-surface-dark/80 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center font-bold text-blue-500">
                                            <span className="material-symbols-outlined">token</span>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-sm">{asset.name}</h3>
                                            <p className="text-xs text-slate-500">{asset.amount} {asset.subtitle}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="font-bold text-sm text-slate-100">${asset.liveValue.toLocaleString()}</span>
                                        <p className={`text-xs ${asset.liveChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                            {asset.liveChange > 0 ? '+' : ''}{parseFloat(asset.liveChange).toFixed(2)}%
                                        </p>
                                        <button onClick={() => removeAsset(asset.id)} className="text-[10px] text-red-500 mt-1">Borrar</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Stocks Section */}
                {stockAssets.length > 0 && (
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-4 sticky top-12 py-2 bg-background-light dark:bg-background-dark z-10">
                            <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-primary/60">Acciones</h2>
                        </div>
                        <div className="space-y-1">
                            {stockAssets.map((asset) => (
                                <div key={asset.id} className="flex items-center justify-between p-4 -mx-2 rounded-xl active:bg-surface-dark/80 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center font-bold text-purple-500">
                                            <span className="material-symbols-outlined">show_chart</span>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-sm">{asset.name}</h3>
                                            <p className="text-xs text-slate-500">{asset.amount} {asset.subtitle}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="font-bold text-sm text-slate-100">${asset.liveValue.toLocaleString()}</span>
                                        <p className={`text-xs ${asset.liveChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                            {asset.liveChange > 0 ? '+' : ''}{parseFloat(asset.liveChange).toFixed(2)}%
                                        </p>
                                        <button onClick={() => removeAsset(asset.id)} className="text-[10px] text-red-500 mt-1">Borrar</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Bienes Raíces Section */}
                {realEstateAssets.length > 0 && (
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-4 sticky top-12 py-2 bg-background-light dark:bg-background-dark z-10">
                            <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-primary/60">Bienes Raíces</h2>
                        </div>
                        <div className="space-y-1">
                            {realEstateAssets.map((asset) => (
                                <div key={asset.id} className="flex items-center justify-between p-4 -mx-2 rounded-xl active:bg-surface-dark/80 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/10 flex items-center justify-center">
                                            <span className="material-icons-round text-primary">apartment</span>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-sm">{asset.name}</h3>
                                            <p className="text-xs text-slate-500">{asset.subtitle}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="font-bold text-sm text-slate-100">${asset.value.toLocaleString()}</span>
                                        <button onClick={() => removeAsset(asset.id)} className="text-[10px] text-red-500 mt-1">Borrar</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {assets.length === 0 && <p className="text-center text-slate-500">No hay activos registrados.</p>}
            </section>

             {/* Add Asset Modal */}
             {showModal && (
                <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="w-full max-w-md bg-surface-dark rounded-2xl p-6 border border-primary/20 animate-slide-up">
                        <h2 className="text-xl font-bold text-white mb-4">Nuevo Activo</h2>
                        <form onSubmit={handleAddAsset} className="space-y-4">
                            <div>
                                <label className="block text-xs uppercase text-primary/70 mb-1">Tipo</label>
                                <select
                                    className="w-full bg-background-dark border border-primary/20 rounded-lg p-3 text-white focus:border-primary outline-none"
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                >
                                    <option value="crypto">Criptomoneda</option>
                                    <option value="stock">Acción (Stock)</option>
                                    <option value="real_estate">Bienes Raíces</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs uppercase text-primary/70 mb-1">Nombre</label>
                                <input
                                    type="text"
                                    className="w-full bg-background-dark border border-primary/20 rounded-lg p-3 text-white focus:border-primary outline-none"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Ej: Bitcoin"
                                    required
                                />
                            </div>
                            {/* Conditional Input based on type */}
                            {type === 'crypto' || type === 'stock' ? (
                                <>
                                    <div>
                                        <label className="block text-xs uppercase text-primary/70 mb-1">Símbolo (API ID)</label>
                                        <input
                                            type="text"
                                            className="w-full bg-background-dark border border-primary/20 rounded-lg p-3 text-white focus:border-primary outline-none"
                                            value={subtitle}
                                            onChange={(e) => setSubtitle(e.target.value)}
                                            placeholder={type === 'crypto' ? "Ej: btc, eth, sol" : "Ej: AAPL, TSLA"}
                                        />
                                        <p className="text-[10px] text-slate-500 mt-1">Usado para actualizar precio automáticamente</p>
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase text-primary/70 mb-1">Cantidad</label>
                                        <input
                                            type="number"
                                            step="0.000001"
                                            className="w-full bg-background-dark border border-primary/20 rounded-lg p-3 text-white focus:border-primary outline-none"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            placeholder="Ej: 0.5"
                                            required
                                        />
                                    </div>
                                </>
                            ) : (
                                // Real Estate (Manual Value)
                                <div>
                                    <label className="block text-xs uppercase text-primary/70 mb-1">Valor Estimado ($)</label>
                                    <input
                                        type="number"
                                        className="w-full bg-background-dark border border-primary/20 rounded-lg p-3 text-white focus:border-primary outline-none"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        required
                                    />
                                    <input
                                        type="text"
                                        className="w-full bg-background-dark border border-primary/20 rounded-lg p-3 text-white focus:border-primary outline-none mt-2"
                                        value={subtitle}
                                        onChange={(e) => setSubtitle(e.target.value)}
                                        placeholder="Descripción (ej: Apartamento Centro)"
                                    />
                                </div>
                            )}

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

export default Portfolio;
