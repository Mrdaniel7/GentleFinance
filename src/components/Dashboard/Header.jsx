import React from 'react';
import { useAuth } from '../../context/AuthContext';

const DashboardHeader = () => {
  const { user } = useAuth();

  return (
    <header className="pt-12 px-6 flex justify-between items-center w-full">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full border-2 border-primary overflow-hidden">
          <img
            src={user?.avatar || "https://lh3.googleusercontent.com/aida-public/AB6AXuCQJCAj9zcSmXOu7aaxQikJ7b0CXg9NK5_lxf98qm714vE7LxkU75Tj4mp1MTRWWohHpIdR_mDO1vVwJvE0tb44VT12UwvMbc7R7aqqbFx7Ak6nE3525C0DDnBIVbxQxNNsNX06f24BUBUNN4swZFeDrmIs0HJDCzy1qNgDe3ATlfabyYt-u0N6eeVxv2-qa36S23aEK8N8FBLpNjXiZk5br8aFLYBAL2_6dU5bKuv84Z3idl1zyLUG8qvgbDMotnzLNVn8WRPbafY"}
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-primary/60 font-bold">Bienvenido</p>
          <h2 className="text-sm font-semibold">{user?.name || "Usuario"}</h2>
        </div>
      </div>
      <button className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 border border-primary/20">
        <span className="material-icons-round text-primary text-xl">notifications</span>
      </button>
    </header>
  );
};

export default DashboardHeader;
