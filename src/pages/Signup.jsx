import React from 'react';
import { NavLink } from 'react-router-dom';

const Signup = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-white min-h-screen relative overflow-x-hidden flex flex-col items-center p-6">
            {/* Background Subtle Glow */}
            <div className="fixed inset-0 bottom-glow pointer-events-none"></div>

            <div className="relative flex flex-col flex-grow w-full max-w-[480px]">
                {/* Header / Logo Section */}
                <div className="flex flex-col items-center justify-center mb-12 mt-8">
                    <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full border border-primary/30 bg-primary/5">
                        <span className="material-symbols-outlined text-primary text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                            account_balance_wallet
                        </span>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-primary">GentleFinance</h1>
                    <p className="text-primary/60 text-sm mt-1">Gestión de patrimonio de élite</p>
                </div>

                {/* Title Section */}
                <div className="mb-8">
                    <h2 className="text-3xl font-semibold text-white">Crear Cuenta Premium</h2>
                    <p className="text-primary/50 text-sm mt-2">Únete a la plataforma financiera más exclusiva.</p>
                </div>

                {/* Form Section */}
                <div className="space-y-5">
                    {/* Full Name */}
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-medium uppercase tracking-widest text-primary/70 ml-1">Nombre Completo</label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary/40 text-xl">person</span>
                            <input className="w-full bg-primary/5 border border-primary/20 rounded-xl py-4 pl-12 pr-4 text-white placeholder-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" placeholder="John Doe" type="text" />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-medium uppercase tracking-widest text-primary/70 ml-1">Email</label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary/40 text-xl">mail</span>
                            <input className="w-full bg-primary/5 border border-primary/20 rounded-xl py-4 pl-12 pr-4 text-white placeholder-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" placeholder="vip@gentlefinance.com" type="email" />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-medium uppercase tracking-widest text-primary/70 ml-1">Contraseña</label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary/40 text-xl">lock</span>
                            <input className="w-full bg-primary/5 border border-primary/20 rounded-xl py-4 pl-12 pr-12 text-white placeholder-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" placeholder="••••••••••••" type="password" />
                            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/40 hover:text-primary transition-colors">
                                <span className="material-symbols-outlined text-xl">visibility</span>
                            </button>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <NavLink to="/" className="w-full block text-center gold-gradient text-background-dark font-bold py-4 rounded-xl mt-4 shadow-lg shadow-primary/20 active:scale-[0.98] transition-transform">
                        Crear Cuenta
                    </NavLink>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-4 my-10">
                    <div className="h-[1px] flex-1 bg-primary/20"></div>
                    <span className="text-xs font-medium text-primary/40 uppercase tracking-tighter">O continuar con</span>
                    <div className="h-[1px] flex-1 bg-primary/20"></div>
                </div>

                {/* Social Buttons */}
                <div className="grid grid-cols-2 gap-4">
                    <button className="flex items-center justify-center gap-2 border border-primary/20 rounded-xl py-3 px-4 hover:bg-primary/5 transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.908 3.152-1.928 4.176-1.228 1.228-3.14 2.56-6.832 2.56-5.416 0-9.632-4.392-9.632-9.808s4.216-9.808 9.632-9.808c3.112 0 5.424 1.204 7.072 2.768l2.32-2.32C18.664 1.256 15.7 0 12.48 0 6.64 0 1.92 4.72 1.92 10.56S6.64 21.12 12.48 21.12c3.216 0 5.64-1.064 7.504-3.024 1.936-1.936 2.552-4.664 2.552-6.864 0-.6-.048-1.136-.144-1.632H12.48z"></path>
                        </svg>
                        <span className="text-sm font-medium">Google</span>
                    </button>
                    <button className="flex items-center justify-center gap-2 border border-primary/20 rounded-xl py-3 px-4 hover:bg-primary/5 transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.05 20.28c-.96.95-2.06 1.72-3.3 1.72-1.14 0-1.52-.7-2.93-.7-1.42 0-1.87.68-2.93.7-1.21 0-2.34-.78-3.3-1.72-1.96-1.91-3.46-5.4-3.46-8.39 0-4.96 3.05-7.58 5.91-7.58 1.5 0 2.8.91 3.73.91.9 0 2.37-.91 4.11-.91 1.45 0 2.82.52 3.84 1.52-3.23 1.9-2.7 6.43.5 7.74-1.04 2.53-2.27 5.02-4.17 6.71zm-4.34-16.7c0-1.07.45-2.12 1.15-2.92.74-.84 1.83-1.44 2.85-1.44.13 0 .25.01.38.03-.08 2.33-2.07 4.54-4.38 4.33z"></path>
                        </svg>
                        <span className="text-sm font-medium">Apple</span>
                    </button>
                </div>

                {/* Footer Section */}
                <div className="mt-auto pt-10 text-center pb-8">
                    <p className="text-primary/40 text-sm">
                        ¿Ya tienes cuenta?
                        <NavLink to="/login" className="text-primary font-bold ml-1 hover:underline">Inicia sesión</NavLink>
                    </p>
                </div>
            </div>

             {/* Security Badge Section (Subtle) */}
             <div className="pb-8 text-center opacity-30 flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-xs">verified_user</span>
                <span className="text-[10px] uppercase tracking-widest">Encriptación de Grado Militar SSL</span>
            </div>
        </div>
    );
};

export default Signup;
