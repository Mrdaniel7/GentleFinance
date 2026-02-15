import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getFiles, saveFile } from '../services/storage';

const Settings = () => {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        const loadFiles = async () => {
             const allFiles = await getFiles();
             setFiles(allFiles || []);
        };
        loadFiles();
    }, []);

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const newFile = {
            id: Date.now(),
            name: file.name,
            type: file.type,
            size: file.size,
            lastModified: file.lastModified,
            // In a real app, you might store the blob or base64 here
            // content: file
        };

        await saveFile(newFile);
        setFiles(prev => [...prev, newFile]);
    };

    return (
        <div className="flex flex-col h-full min-h-screen">
             <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-6 py-4 flex items-center justify-between">
                <NavLink to="/" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary/10 transition-colors">
                    <span className="material-icons-round text-primary">arrow_back_ios_new</span>
                </NavLink>
                <h1 className="text-lg font-bold tracking-tight">Configuración</h1>
                <div className="w-10 h-10"></div> {/* Spacer for symmetry */}
            </header>

            <main className="flex-grow px-6 pb-24">
                 {/* Profile Summary Section */}
                <section className="flex flex-col items-center py-8">
                    <div className="relative">
                        <div className="w-32 h-32 rounded-full p-1 border-2 border-primary overflow-hidden shadow-[0_0_20px_rgba(242,208,13,0.2)]">
                            <img
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgE3XEPMRpEGu98BK90tXD6sxcHw5D1r8qRaJXm986SQP2OC2kPhg-p4_jxOALzRn-wqTlSEneJk26r7BL3RO_XX7bgFFhXpnGxLjgEkeBaukfjZq2QhLaHQjcEKuOsu0Q8d6Pao92p-NrPGdbsuzj5bkKL80eKnG-alnXQhwLLtHQRcMjlpL7xW_1yF3ewIO80hq8YWWNrQx2gJFBojngckOmm7VTR92_SWQ0ZHlwBtKmhElZNGH_z1MmWZHAXpzd7Zn6qP2c7Y8"
                                alt="Profile Avatar"
                                className="w-full h-full object-cover rounded-full"
                            />
                        </div>
                        <div className="absolute bottom-1 right-1 bg-primary text-background-dark w-8 h-8 rounded-full flex items-center justify-center border-4 border-background-dark">
                            <span className="material-icons-round text-sm">edit</span>
                        </div>
                    </div>
                    <div className="mt-4 text-center">
                        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">Adrián Valenzuela</h2>
                        <p className="text-primary/80 font-medium text-sm tracking-widest uppercase mt-1">Miembro Gold</p>
                    </div>
                </section>

                <div className="space-y-8">
                     {/* Category: Documentos (File Handling) */}
                     <section>
                        <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-4 ml-2">Documentos</h3>
                        <div className="bg-surface-dark/20 rounded-xl p-4 border border-primary/10">
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-primary/30 border-dashed rounded-lg cursor-pointer bg-surface-dark/40 hover:bg-primary/5 transition-colors">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <span className="material-icons-round text-primary text-3xl mb-2">cloud_upload</span>
                                    <p className="mb-2 text-sm text-gray-400"><span className="font-semibold">Click para subir</span></p>
                                    <p className="text-xs text-gray-500">PDF, PNG, JPG (MAX. 5MB)</p>
                                </div>
                                <input type="file" className="hidden" onChange={handleFileUpload} />
                            </label>

                            {files.length > 0 && (
                                <div className="mt-4 space-y-2">
                                    {files.map((file) => (
                                        <div key={file.id} className="flex items-center justify-between p-2 bg-background-dark rounded border border-primary/10">
                                            <div className="flex items-center gap-2 overflow-hidden">
                                                <span className="material-icons-round text-primary/70 text-sm">description</span>
                                                <span className="text-xs text-slate-300 truncate max-w-[150px]">{file.name}</span>
                                            </div>
                                            <span className="text-[10px] text-slate-500">{(file.size / 1024).toFixed(1)} KB</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>

                     {/* Category: Perfil */}
                    <section>
                        <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-4 ml-2">Perfil</h3>
                        <div className="space-y-0.5">
                            <button className="w-full flex items-center justify-between py-4 px-2 hover:bg-primary/5 transition-colors rounded">
                                <div className="flex items-center gap-4">
                                    <span className="material-icons-round text-primary/70">person_outline</span>
                                    <span className="font-medium">Información Personal</span>
                                </div>
                                <span className="material-icons-round text-primary text-xl">chevron_right</span>
                            </button>
                             <div className="h-px w-full bg-primary/10 mx-2"></div>
                            <button className="w-full flex items-center justify-between py-4 px-2 hover:bg-primary/5 transition-colors rounded">
                                <div className="flex items-center gap-4">
                                    <span className="material-icons-round text-primary/70">account_balance_wallet</span>
                                    <span className="font-medium">Cuentas Vinculadas</span>
                                </div>
                                <span className="material-icons-round text-primary text-xl">chevron_right</span>
                            </button>
                        </div>
                    </section>

                    {/* Category: Seguridad */}
                    <section>
                        <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-4 ml-2">Seguridad</h3>
                        <div className="space-y-0.5">
                             <div className="w-full flex items-center justify-between py-4 px-2">
                                <div className="flex items-center gap-4">
                                    <span className="material-icons-round text-primary/70">fingerprint</span>
                                    <span className="font-medium">Biometría (FaceID)</span>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" defaultChecked className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-300 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                </label>
                            </div>
                            <div className="h-px w-full bg-primary/10 mx-2"></div>
                            <button className="w-full flex items-center justify-between py-4 px-2 hover:bg-primary/5 transition-colors rounded">
                                <div className="flex items-center gap-4">
                                    <span className="material-icons-round text-primary/70">lock_open</span>
                                    <span className="font-medium">Cambiar Contraseña</span>
                                </div>
                                <span className="material-icons-round text-primary text-xl">chevron_right</span>
                            </button>
                        </div>
                    </section>

                     {/* Category: Notificaciones */}
                     <section>
                        <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-4 ml-2">Notificaciones</h3>
                        <div className="space-y-0.5">
                            <div className="w-full flex items-center justify-between py-4 px-2">
                                <div className="flex items-center gap-4">
                                    <span className="material-icons-round text-primary/70">notifications_none</span>
                                    <span className="font-medium">Alertas Push</span>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" defaultChecked className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-300 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                </label>
                            </div>
                            <div className="h-px w-full bg-primary/10 mx-2"></div>
                            <button className="w-full flex items-center justify-between py-4 px-2 hover:bg-primary/5 transition-colors rounded">
                                <div className="flex items-center gap-4">
                                    <span className="material-icons-round text-primary/70">mail_outline</span>
                                    <span className="font-medium">Reportes Mensuales</span>
                                </div>
                                <span className="material-icons-round text-primary text-xl">chevron_right</span>
                            </button>
                        </div>
                    </section>

                    {/* Category: Preferencias */}
                    <section>
                        <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-4 ml-2">Preferencias</h3>
                        <div className="space-y-0.5">
                            <button className="w-full flex items-center justify-between py-4 px-2 hover:bg-primary/5 transition-colors rounded">
                                <div className="flex items-center gap-4">
                                    <span className="material-icons-round text-primary/70">payments</span>
                                    <span className="font-medium">Moneda</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-primary font-semibold text-sm">USD ($)</span>
                                    <span className="material-icons-round text-primary text-xl">chevron_right</span>
                                </div>
                            </button>
                            <div className="h-px w-full bg-primary/10 mx-2"></div>
                            <button className="w-full flex items-center justify-between py-4 px-2 hover:bg-primary/5 transition-colors rounded">
                                <div className="flex items-center gap-4">
                                    <span className="material-icons-round text-primary/70">language</span>
                                    <span className="font-medium">Idioma</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-primary font-semibold text-sm">Español</span>
                                    <span className="material-icons-round text-primary text-xl">chevron_right</span>
                                </div>
                            </button>
                        </div>
                    </section>

                    {/* Logout Button */}
                    <section className="pt-6 pb-12">
                        <NavLink to="/login" className="w-full py-4 border border-primary text-primary font-bold rounded-full hover:bg-primary hover:text-background-dark transition-all duration-300 flex items-center justify-center gap-2 group">
                            <span className="material-icons-round group-hover:translate-x-1 transition-transform">logout</span>
                            Cerrar Sesión
                        </NavLink>
                        <div className="mt-8 text-center">
                            <p className="text-[10px] text-gray-500 dark:text-gray-600 uppercase tracking-[0.3em]">GentleFinance Premium v2.4.1</p>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default Settings;
