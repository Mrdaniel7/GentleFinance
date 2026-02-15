import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useData } from '../context/DataContext';

const Portfolio = () => {
    const { assets, addAsset, removeAsset, financials } = useData();
    const [showModal, setShowModal] = useState(false);

    // Form State
    const [name, setName] = useState('');
    const [value, setValue] = useState('');
    const [type, setType] = useState('crypto'); // crypto, real_estate, stock
    const [subtitle, setSubtitle] = useState('');

    const handleAddAsset = async (e) => {
        e.preventDefault();
        if (!name || !value) return;

        await addAsset({
            name,
            value: parseFloat(value),
            type,
            subtitle,
            change: (Math.random() * 10 - 5).toFixed(1) // Mock daily change for realism
        });

        // Reset
        setName('');
        setValue('');
        setType('crypto');
        setSubtitle('');
        setShowModal(false);
    };

    const cryptoAssets = assets.filter(a => a.type === 'crypto');
    const realEstateAssets = assets.filter(a => a.type === 'real_estate');

    // Simple calc for mock visualization
    const totalBalance = financials.netWorth; // Using networth as proxy for total balance view

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
                            <h2 className="text-4xl font-extrabold text-white">${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h2>
                        </div>
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
                                            <p className="text-xs text-slate-500">{asset.subtitle}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="font-bold text-sm text-slate-100">${asset.value.toLocaleString()}</span>
                                        <p className="text-xs text-green-400">+{asset.change}%</p>
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
                    <div className="w-full max-w-md bg-surface-dark rounded-2xl p-6 border border-primary/20">
                        <h2 className="text-xl font-bold text-white mb-4">Nuevo Activo</h2>
                        <form onSubmit={handleAddAsset} className="space-y-4">
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
                                <label className="block text-xs uppercase text-primary/70 mb-1">Valor ($)</label>
                                <input
                                    type="number"
                                    className="w-full bg-background-dark border border-primary/20 rounded-lg p-3 text-white focus:border-primary outline-none"
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase text-primary/70 mb-1">Tipo</label>
                                <select
                                    className="w-full bg-background-dark border border-primary/20 rounded-lg p-3 text-white focus:border-primary outline-none"
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                >
                                    <option value="crypto">Criptomoneda</option>
                                    <option value="real_estate">Bienes Raíces</option>
                                    <option value="stock">Acciones</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs uppercase text-primary/70 mb-1">Detalle (ej: 0.5 BTC)</label>
                                <input
                                    type="text"
                                    className="w-full bg-background-dark border border-primary/20 rounded-lg p-3 text-white focus:border-primary outline-none"
                                    value={subtitle}
                                    onChange={(e) => setSubtitle(e.target.value)}
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

export default Portfolio;
