import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Layout = ({ children }) => {
  const { t } = useTranslation();
  const location = useLocation();

  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  if (isAuthPage) {
    return <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display flex flex-col max-w-md mx-auto relative overflow-hidden pb-24 shadow-2xl">
        <main className="flex-grow overflow-y-auto hide-scrollbar">
            {children}
        </main>

        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto glass-effect border-t border-primary/10 h-20 px-6 flex justify-between items-center z-30">
            <NavLink to="/" className={({ isActive }) => `flex flex-col items-center gap-1 flex-1 transition-colors ${isActive ? 'text-primary' : 'text-slate-400 hover:text-primary/70'}`}>
                <span className="material-icons-round">home</span>
                <span className="text-[10px] font-bold uppercase tracking-tight">{t('nav.home')}</span>
            </NavLink>
            <NavLink to="/history" className={({ isActive }) => `flex flex-col items-center gap-1 flex-1 transition-colors ${isActive ? 'text-primary' : 'text-slate-400 hover:text-primary/70'}`}>
                <span className="material-icons-round">receipt_long</span>
                <span className="text-[10px] font-bold uppercase tracking-tight">{t('nav.history')}</span>
            </NavLink>

            <div className="flex justify-center items-end flex-1 h-full pb-4 relative z-40 pointer-events-none">
                <button className="w-14 h-14 rounded-full bg-primary text-background-dark shadow-lg shadow-primary/30 flex items-center justify-center active:scale-95 transition-transform -translate-y-6 pointer-events-auto">
                    <span className="material-icons-round text-3xl">add</span>
                </button>
            </div>

            <NavLink to="/analysis" className={({ isActive }) => `flex flex-col items-center gap-1 flex-1 transition-colors ${isActive ? 'text-primary' : 'text-slate-400 hover:text-primary/70'}`}>
                <span className="material-icons-round">insights</span>
                <span className="text-[10px] font-bold uppercase tracking-tight">{t('nav.invest')}</span>
            </NavLink>
            <NavLink to="/settings" className={({ isActive }) => `flex flex-col items-center gap-1 flex-1 transition-colors ${isActive ? 'text-primary' : 'text-slate-400 hover:text-primary/70'}`}>
                <span className="material-icons-round">account_circle</span>
                <span className="text-[10px] font-bold uppercase tracking-tight">{t('nav.profile')}</span>
            </NavLink>
        </nav>
        <div className="fixed bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full z-40 pointer-events-none"></div>
    </div>
  );
};

export default Layout;
