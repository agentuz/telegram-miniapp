import React from 'react';

export default function BottomNav(){
  return (
    <div className="fixed bottom-0 inset-x-0 bg-[#0f0f0f] border-t border-white/10 h-16 flex items-center justify-around">
      <div className="text-white">🏠 Home</div>
      <div className="text-white/70">👤 Profile</div>
    </div>
  );
}
