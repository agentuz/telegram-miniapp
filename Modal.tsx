import React from 'react';

export default function Modal({ open, onClose, children }:{
  open:boolean; onClose:()=>void; children:React.ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-start justify-center pt-24">
      <div className="w-[92%] max-w-md bg-[#111] text-white rounded-card p-4">
        <button onClick={onClose} className="float-right text-white/60">✕</button>
        <div className="clear-both">{children}</div>
      </div>
    </div>
  );
}
