import React from 'react';

export default function BottomNav({
  tab, setTab,
}: { tab: 'home' | 'profile'; setTab: (t: 'home' | 'profile') => void; }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-md">
        <div className="m-3 rounded-2xl bg-[#101312]/90 backdrop-blur border border-white/10 px-3 py-2 flex items-center justify-around">
          <Tab icon="🏠" label="Home" active={tab==='home'} onClick={()=>setTab('home')} />
          <Tab icon="👤" label="Profile" active={tab==='profile'} onClick={()=>setTab('profile')} />
        </div>
      </div>
    </nav>
  );
}

function Tab({ icon, label, active, onClick }:{
  icon: string; label: string; active?: boolean; onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl ${active ? 'text-white' : 'text-white/70'}`}
    >
      <span className="text-lg">{icon}</span>
      <span className="text-[11px]">{label}</span>
    </button>
  );
}
