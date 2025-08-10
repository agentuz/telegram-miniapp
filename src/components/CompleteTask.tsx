import React, { useState } from 'react';
import Modal from './Modal';

export default function CompleteTask({
  open, onClose, onSubmit,
}: { open: boolean; onClose: () => void; onSubmit: (proof: { text?: string; screenshot?: string }) => void; }) {
  const [text, setText] = useState('');
  const [img64, setImg64] = useState<string>();

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => setImg64(String(r.result || ''));
    r.readAsDataURL(f);
  };

  return (
    <Modal open={open} onClose={onClose} title="Complete task">
      <div className="space-y-3">
        <input
          className="w-full rounded-xl bg-[#0e1311] border border-white/10 px-3 py-2"
          placeholder="Paste link or short note (optional)"
          value={text}
          onChange={(e)=>setText(e.target.value)}
        />
        <label className="block">
          <span className="text-sm opacity-80">Attach screenshot (optional)</span>
          <input type="file" accept="image/*" className="mt-1 block w-full" onChange={onPick}/>
        </label>

        <button
          className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 transition font-medium"
          onClick={()=>{ onSubmit({ text, screenshot: img64 }); onClose(); }}
        >
          Submit for review
        </button>
      </div>
    </Modal>
  );
}
