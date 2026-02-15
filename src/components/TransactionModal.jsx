import React, { useState } from 'react';
import { useData } from '../context/DataContext';

const TransactionModal = () => {
    const { isTransactionModalOpen, closeTransactionModal, addTransaction } = useData();

    // Form State
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('expense');
    const [category, setCategory] = useState('');

    if (!isTransactionModalOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !amount) return;

        await addTransaction({
            title,
            amount: parseFloat(amount),
            type,
            category,
            date: new Date().toISOString(),
            icon: type === 'income' ? 'payments' : 'shopping_bag'
        });

        // Reset and close
        setTitle('');
        setAmount('');
        setType('expense');
        setCategory('');
        closeTransactionModal();
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="w-full max-w-md bg-surface-dark rounded-2xl p-6 border border-primary/20 animate-slide-up">
                <h2 className="text-xl font-bold text-white mb-4">Nueva Transacción</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs uppercase text-primary/70 mb-1">Título</label>
                        <input
                            type="text"
                            className="w-full bg-background-dark border border-primary/20 rounded-lg p-3 text-white focus:border-primary outline-none"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            autoFocus
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
                        <label className="block text-xs uppercase text-primary/70 mb-1">Tipo</label>
                        <select
                            className="w-full bg-background-dark border border-primary/20 rounded-lg p-3 text-white focus:border-primary outline-none"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <option value="expense">Gasto</option>
                            <option value="income">Ingreso</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs uppercase text-primary/70 mb-1">Categoría</label>
                        <input
                            type="text"
                            className="w-full bg-background-dark border border-primary/20 rounded-lg p-3 text-white focus:border-primary outline-none"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={closeTransactionModal}
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
    );
};

export default TransactionModal;
