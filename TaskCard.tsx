import React, { useState } from 'react';
import Modal from './Modal';

export default function TaskCard({ task, tgUser, onChanged }:{ task:any; tgUser:{id:number, username?:string}; onChanged:()=>void; }){
  const [open, setOpen] = useState(false);

  async function startTask(){
    setOpen(true);
    await fetch('/api/start-task', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task_id: task.id, task_name: task.name, user_id: tgUser.id, username: tgUser.username })
    });
  }

  async function submitComplete(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get('email')||'');
    const phone = String(fd.get('phone')||'');

    const res = await fetch('/api/complete-task', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        task_id: task.id, task_name: task.name, user_id: tgUser.id, username: tgUser.username,
        email, phone
      })
    });
    if (res.ok){
      alert("Got it! We’re checking with the partner…");
      setOpen(false);
      onChanged();
    } else {
      alert("Submission failed, try again.");
    }
  }

  return (
    <div className="p-4 mx-4 rounded-card bg-white/5 border border-white/10">
      <div className="font-semibold">{task.name}</div>
      <div className="text-white/70 text-sm mt-1">{task.description}</div>
      <div className="mt-2 text-sm">⭐ {task.reward_stars} &nbsp; • &nbsp; XP {task.reward_xp}</div>
      <button onClick={startTask} className="mt-3 px-4 py-2 rounded-xl bg-usdblue text-white font-semibold">Deliver</button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <h3 className="text-lg font-semibold">{task.name}</h3>
        <p className="text-white/70 text-sm mb-3">Finish the task and submit your info.</p>
        <div className="flex gap-2 mb-3">
          <a href={task.website || '#'} target="_blank" className="flex-1 text-center px-3 py-2 rounded-xl bg-usdblue">
            Go to website
          </a>
        </div>
        <form onSubmit={submitComplete} className="grid gap-2">
          <input name="email" type="email" required placeholder="Email" className="px-3 py-2 rounded-lg bg-black/40 border border-white/10" />
          <input name="phone" type="tel" required placeholder="Phone" className="px-3 py-2 rounded-lg bg-black/40 border border-white/10" />
          <button className="mt-1 px-4 py-2 rounded-xl bg-usdgreen font-semibold">Complete task ✔️</button>
        </form>
      </Modal>
    </div>
  );
}
