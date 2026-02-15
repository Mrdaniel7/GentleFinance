import React from 'react';
import { NavLink } from 'react-router-dom';

const Login = () => {
    return (
        <div className="font-display bg-background-light dark:bg-background-dark min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="fixed top-0 right-0 -z-10 opacity-20">
                <div className="w-[500px] h-[500px] bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-[120px]"></div>
            </div>
            <div className="fixed bottom-0 left-0 -z-10 opacity-10">
                <div className="w-[400px] h-[400px] bg-gradient-to-tr from-primary/30 to-transparent rounded-full blur-[100px]"></div>
            </div>

            <div className="w-full max-w-sm flex flex-col items-center flex-grow justify-center">
                {/* Logo */}
                <div className="mb-16 flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 border border-primary/20">
                        <span className="material-icons text-primary text-4xl">payments</span>
                    </div>
                    <h1 className="text-2xl font-bold tracking-widest text-primary uppercase">GentleFinance</h1>
                    <p className="text-xs tracking-[0.3em] text-primary/60 mt-2 uppercase">Exclusividad Digital</p>
                </div>

                {/* Form */}
                <div className="w-full space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-[10px] uppercase tracking-widest text-primary/80 ml-1">Correo Electrónico</label>
                        <div className="relative">
                            <input
                                id="email"
                                type="email"
                                placeholder="usuario@gentle.com"
                                className="w-full bg-transparent border border-primary/30 rounded-lg py-4 px-4 text-white placeholder:text-primary/30 focus:border-primary focus:ring-1 focus:ring-primary/50 outline-none transition-all duration-300"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="password" className="text-[10px] uppercase tracking-widest text-primary/80 ml-1">Contraseña</label>
                        <div className="relative">
                            <input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                className="w-full bg-transparent border border-primary/30 rounded-lg py-4 px-4 text-white placeholder:text-primary/30 focus:border-primary focus:ring-1 focus:ring-primary/50 outline-none transition-all duration-300"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <a href="#" className="text-xs text-primary/60 hover:text-primary transition-colors duration-200">¿Olvidó su contraseña?</a>
                    </div>

                    <NavLink to="/" className="block w-full text-center gold-gradient text-background-dark font-bold py-4 rounded-lg shadow-lg shadow-primary/10 hover:brightness-110 active:scale-[0.98] transition-all duration-200 uppercase tracking-widest text-sm">
                        Iniciar Sesión
                    </NavLink>
                </div>

                {/* Biometrics */}
                <div className="mt-12 flex flex-col items-center space-y-4">
                    <button className="flex flex-col items-center group">
                        <div className="w-14 h-14 rounded-full border border-primary/40 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/5 transition-all duration-300">
                            <span className="material-icons text-primary text-3xl">fingerprint</span>
                        </div>
                        <span className="text-[10px] uppercase tracking-widest text-primary/60 mt-3 group-hover:text-primary transition-colors">Entrar con Biometría</span>
                    </button>
                </div>
            </div>

             {/* Footer */}
             <div className="w-full max-w-sm mt-auto pb-10 text-center">
                <p className="text-sm text-primary/40">
                    ¿No tiene una cuenta?
                    <NavLink to="/signup" className="text-primary font-medium hover:underline underline-offset-4 ml-1">Regístrese ahora</NavLink>
                </p>
            </div>
        </div>
    );
};

export default Login;
