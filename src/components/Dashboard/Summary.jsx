import React from 'react';
import { useTranslation } from 'react-i18next';

const DashboardSummary = ({ netWorth, income, expenses }) => {
  const { t } = useTranslation();

  return (
    <>
      <section className="mt-10 px-6 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-primary/70 mb-2 font-medium">{t('dashboard.net_worth')}</p>
        <div className="relative inline-block">
          <h1 className="text-5xl font-extrabold text-primary tracking-tight">
            ${netWorth.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h1>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-primary/20 blur-md"></div>
        </div>
        <div className="mt-4 flex items-center justify-center gap-2 text-emerald-400 text-sm">
          <span className="material-icons-round text-sm">trending_up</span>
          <span>+0.0% {t('dashboard.this_month')}</span>
        </div>
      </section>

      <section className="mt-10 px-6 grid grid-cols-2 gap-4">
        <div className="bg-card-dark rounded-xl p-4 border border-primary/10 flex flex-col gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
            <span className="material-icons-round text-emerald-500 text-lg">south_west</span>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-400">{t('dashboard.income')}</p>
            <p className="text-lg font-bold text-slate-100">${income.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
          </div>
        </div>
        <div className="bg-card-dark rounded-xl p-4 border border-primary/10 flex flex-col gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <span className="material-icons-round text-primary text-lg">north_east</span>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-400">{t('dashboard.expenses')}</p>
            <p className="text-lg font-bold text-slate-100">${expenses.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default DashboardSummary;
