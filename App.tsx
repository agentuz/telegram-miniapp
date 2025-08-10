import React, { useEffect, useMemo, useState } from 'react';
import { supabase } from './lib/supabase';
import Balance from './components/Balance';
import TaskCard from './components/TaskCard';
import BottomNav from './components/BottomNav';

declare global { interface Window { Telegram:any } }

type TGUser = { id:number; username?:string; first_name?:string; };

export default function App(){
  const [user, setUser] = useState<TGUser | null>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const tg = useMemo(() => window.Telegram?.WebApp, []);

  useEffect(() => {
    tg?.ready(); tg?.expand();
    const u = tg?.initDataUnsafe?.user;
    if (u) setUser({ id: u.id, username: u.username, first_name: u.first_name });
  }, []);

  useEffect(() => {
    if (!user) return;
    supabase.from('users').upsert({ id: user.id, username: user.username || null, first_name: user.first_name || null }).then();
    loadTasks();
  }, [user?.id]);

  async function loadTasks(){
    const { data } = await supabase.from('tasks').select('*').eq('status','active').order('created_at');
    setTasks(data || []);
  }

  return (
    <div className="min-h-screen pb-24">
      <div className="px-4 py-5">
        <h1 className="text-2xl font-bold">Hey, {user?.first_name || 'there'}! 👋</h1>
        <p className="text-white/70">Complete tasks — earn Stars — redeem for real stuff.</p>
      </div>
      <Balance userId={user?.id} />
      <div className="px-4 space-y-3 mt-4">
        {tasks.map(t => <TaskCard key={t.id} task={t} tgUser={user!} onChanged={loadTasks} />)}
      </div>
      <BottomNav />
    </div>
  );
}
