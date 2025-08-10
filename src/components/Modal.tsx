import React from 'react';

export default function Modal({
  open, onClose, children, title,
}: { open: boolean; onClose: () => void; title?: string; children: React.ReactNode; }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="absolute inset-x-0 bottom-0 rounded-t-3xl bg-[#101312] border-t border-white/10 p-4">
        <div className="mx-auto max-w-md">
          {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
          {children}
          <button className="w-full mt-3 py-2 rounded-xl bg-white/10" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
