import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { getFiles, saveFile } from '../services/storage';

const Settings = () => {
    const { files, addFile, resetData } = useData();
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // API Key State (Persisted in localStorage for this frontend-only demo)
    const [finnhubKey, setFinnhubKey] = useState('');

    useEffect(() => {
        const savedKey = localStorage.getItem('finnhub_key');
        if (savedKey) setFinnhubKey(savedKey);
    }, []);

    const handleSaveKey = () => {
        localStorage.setItem('finnhub_key', finnhubKey);
        alert('API Key guardada correctamente. Recarga la página para aplicar cambios.');
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const newFile = {
            id: Date.now(),
            name: file.name,
            type: file.type,
            size: file.size,
            lastModified: file.lastModified,
        };

        await addFile(newFile);
    };

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const handleReset = async () => {
        if (window.confirm("¿Estás seguro de que quieres borrar TODOS los datos? Esta acción no se puede deshacer.")) {
            await resetData();
            alert("Datos borrados. La aplicación se ha reiniciado.");
        }
    };

    return (
        <div className="flex flex-col h-full min-h-screen">
             <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-6 py-4 flex items-center justify-between">
                <NavLink to="/" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary/10 transition-colors">
                    <span className="material-icons-round text-primary">arrow_back_ios_new</span>
                </NavLink>
                <h1 className="text-lg font-bold tracking-tight">Configuración</h1>
                <div className="w-10 h-10"></div>
            </header>

            <main className="flex-grow px-6 pb-24">
                 {/* Profile Summary */}
                <section className="flex flex-col items-center py-8">
                    <div className="relative">
                        <div className="w-32 h-32 rounded-full p-1 border-2 border-primary overflow-hidden shadow-[0_0_20px_rgba(242,208,13,0.2)]">
                            <img
                                src={user?.avatar || "https://lh3.googleusercontent.com/aida-public/AB6AXuBgE3XEPMRpEGu98BK90tXD6sxcHw5D1r8qRaJXm986SQP2OC2kPhg-p4_jxOALzRn-wqTlSEneJk26r7BL3RO_XX7bgFFhXpnGxLjgEkeBaukfjZq2QhLaHQjcEKuOsu0Q8d6Pao92p-NrPGdbsuzj5bkKL80eKnG-alnXQhwLLtHQRcMjlpL7xW_1yF3ewIO80hq8YWWNrQx2gJFBojngckOmm7VTR92_SWQ0ZHlwBtKmhElZNGH_z1MmWZHAXpzd7Zn6qP2c7Y8"}
                                alt="Profile Avatar"
                                className="w-full h-full object-cover rounded-full"
                            />
                        </div>
                    </div>
                    <div className="mt-4 text-center">
                        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">{user?.name || "Usuario"}</h2>
                    </div>
                </section>

                <div className="space-y-8">
                     {/* Category: API Configuration */}
                     <section>
                        <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-4 ml-2">Configuración API</h3>
                        <div className="bg-surface-dark/20 rounded-xl p-4 border border-primary/10">
                            <label className="block text-xs uppercase text-primary/70 mb-2">Finnhub API Key (Acciones)</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    className="flex-1 bg-background-dark border border-primary/20 rounded-lg p-2 text-white text-sm focus:border-primary outline-none"
                                    value={finnhubKey}
                                    onChange={(e) => setFinnhubKey(e.target.value)}
                                    placeholder="Ingresa tu clave..."
                                />
                                <button onClick={handleSaveKey} className="px-4 py-2 bg-primary/20 text-primary rounded-lg text-xs font-bold">
                                    Guardar
                                </button>
                            </div>
                            <p className="text-[10px] text-slate-500 mt-2">Necesaria para ver datos de acciones en tiempo real.</p>
                        </div>
                    </section>

                     {/* Category: Documentos */}
                     <section>
                        <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-4 ml-2">Documentos</h3>
                        <div className="bg-surface-dark/20 rounded-xl p-4 border border-primary/10">
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-primary/30 border-dashed rounded-lg cursor-pointer bg-surface-dark/40 hover:bg-primary/5 transition-colors">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <span className="material-icons-round text-primary text-3xl mb-2">cloud_upload</span>
                                    <p className="mb-2 text-sm text-gray-400"><span className="font-semibold">Click para subir</span></p>
                                </div>
                                <input type="file" className="hidden" onChange={handleFileUpload} />
                            </label>

                            {files.length > 0 && (
                                <div className="mt-4 space-y-2">
                                    {files.map((file) => (
                                        <div key={file.id} className="flex items-center justify-between p-2 bg-background-dark rounded border border-primary/10">
                                            <span className="text-xs text-slate-300 truncate max-w-[150px]">{file.name}</span>
                                            <span className="text-[10px] text-slate-500">{(file.size / 1024).toFixed(1)} KB</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Actions */}
                    <section className="pt-6 pb-12 space-y-4">
                        <button onClick={handleReset} className="w-full py-4 border border-red-500 text-red-500 font-bold rounded-full hover:bg-red-500/10 transition-all duration-300 flex items-center justify-center gap-2">
                            <span className="material-icons-round">delete_forever</span>
                            Borrar Todos los Datos
                        </button>

                        <button onClick={handleLogout} className="w-full py-4 border border-primary text-primary font-bold rounded-full hover:bg-primary hover:text-background-dark transition-all duration-300 flex items-center justify-center gap-2 group">
                            <span className="material-icons-round group-hover:translate-x-1 transition-transform">logout</span>
                            Cerrar Sesión
                        </button>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default Settings;
