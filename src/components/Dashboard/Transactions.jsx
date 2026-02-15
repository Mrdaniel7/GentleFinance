import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const DashboardTransactions = ({ transactions }) => {
  const { t } = useTranslation();

  // Show only last 4 transactions
  const recentTransactions = transactions.slice(0, 4);

  return (
    <section className="mt-10 px-6 flex-grow pb-24">
      <div className="flex justify-between items-end mb-6">
        <h3 className="text-lg font-bold">{t('dashboard.transactions')}</h3>
        <NavLink to="/history" className="text-xs font-semibold text-primary uppercase tracking-wider">{t('dashboard.see_all')}</NavLink>
      </div>

      {recentTransactions.length === 0 ? (
        <p className="text-sm text-slate-500 text-center py-4">No hay transacciones recientes.</p>
      ) : (
        <div className="space-y-4">
          {recentTransactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between p-3 rounded-xl bg-primary/5 border border-primary/5">
              <div className="flex items-center gap-4">
                <div className={`w-11 h-11 rounded-full ${tx.type === 'income' ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-primary/10 border-primary/20'} flex items-center justify-center border`}>
                  <span className={`material-icons-round ${tx.type === 'income' ? 'text-emerald-500' : 'text-primary'}`}>{tx.icon || 'payments'}</span>
                </div>
                <div>
                  <p className="text-sm font-bold">{tx.title}</p>
                  <p className="text-[11px] text-slate-500 font-medium">{new Date(tx.id).toLocaleDateString()}</p>
                </div>
              </div>
              <p className={`font-bold ${tx.type === 'income' ? 'text-emerald-400' : 'text-slate-200'}`}>
                {tx.type === 'income' ? '+' : '-'}${Math.abs(tx.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default DashboardTransactions;
