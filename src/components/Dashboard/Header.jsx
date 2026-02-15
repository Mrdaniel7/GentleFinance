import React from 'react';

const DashboardHeader = ({ user }) => {
  return (
    <header className="pt-12 px-6 flex justify-between items-center w-full">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full border-2 border-primary overflow-hidden">
          <img
            src={user.avatar}
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-primary/60 font-bold">Bienvenido</p>
          <h2 className="text-sm font-semibold">{user.name}</h2>
        </div>
      </div>
      <button className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 border border-primary/20">
        <span className="material-icons-round text-primary text-xl">notifications</span>
      </button>
    </header>
  );
};

export default DashboardHeader;
