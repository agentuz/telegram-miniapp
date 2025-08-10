import React, { useEffect, useState } from 'react';
import Balance from './components/Balance';
import TaskCard, { UITask } from './components/TaskCard';
import BottomNav from './components/BottomNav';
import CompleteTask from './components/CompleteTask';
import Profile from './components/Profile';
import { load, save } from './utils/storage';

declare global { interface Window { Telegram?: any } }

type Tab = 'home' | 'profile';
const STORE = 'getbucks_tasks_v1';

export default function App() {
  const [tab, setTab] = useState<Tab>('home');
  const [tasks, setTasks] = useState<UITask[]>(() =>
    load<UITask[]>(STORE, []));
  const [username, setUsername] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [completeFor, setCompleteFor] = useState<string | null>(null);

  useEffect(() => {
    // init Telegram (не упадёт в обычном браузере)
    const tg = window.Telegram?.WebApp;
    try { tg?.ready(); tg?.expand(); } catch {}
    const u = tg?.initDataUnsafe?.user;
    if (u) { setUsername(u.username ?? null); setUserId(u.id ?? null); }

    // первичная инициализация mock-списка, если пусто
    if (load<UITask[]>(STORE, []).length === 0) {
      const initial: UITask[] = [
        { id:'whizz', title:'GetWhizz',
          description:'Sign up, rent a bike, start delivering — earn cash. Reward after first delivery.',
          rewardStars:1500, rewardXP:50, ctaUrl:'https://getwhizz.com', status:'active' },
        { id:'tiktok', title:'TikTok',
          description:'Install the app, browse your feed for 10 minutes.',
          rewardStars:100, rewardXP:20, ctaUrl:'https://tiktok.com', status:'active' },
      ];
      setTasks(initial);
      save(STORE, initial);
    }
  }, []);

  useEffect(() => { save(STORE, tasks); }, [tasks]);

  const startTask = (id: string) => {
    // отмечаем как in_progress
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status:'in_progress' } : t));
  };

  const openComplete = (id: string) => setCompleteFor(id);

  const submitProof = (proof: { text?: string; screenshot?: string }) => {
    if (!completeFor) return;
    // Здесь позже: отправка в бот/бэк
    console.log('proof:', completeFor, proof);

    // переводим в "in_review"
    setTasks(prev => prev.map(t => t.id === completeFor ? ({ ...t, status:'in_review' }) : t));
    setCompleteFor(null);
  };

  // Home screen
  const Home = (
    <div className="pb-24">
      <div className="px-4 pt-5">
        <h1 className="text-2xl font-bold">GetBucks</h1>
        <p className="opacity-80 text-sm">
          {username ? `Welcome back, @${username}!` : 'Welcome — earn Stars by completing tasks.'}
        </p>
      </div>

      <div className="px-4 mt-4">
        <Balance stars={0} usd={0} coins={7} gems={0} tickets={2} />
      </div>

      <div className="px-4 mt-6 space-y-3">
        <h2 className="text-lg font-semibold mb-2">Offers</h2>
        {tasks.filter(t => t.status==='active' || t.status==='in_progress').map(t => (
          <TaskCard key={t.id} task={t} onStart={startTask} onCompleteClick={openComplete}/>
        ))}

        {tasks.some(t => t.status === 'in_review') && (
          <>
            <h3 className="text-base font-medium mt-6 mb-1 opacity-90">On review</h3>
            {tasks.filter(t => t.status==='in_review').map(t => (
              <div key={t.id} className="rounded-2xl bg-[#131715] border border-white/5 p-4">
                <div className="font-semibold">{t.title}</div>
                <p className="text-sm mt-2 opacity-80">
                  Thanks! We’re verifying with the advertiser. You’ll get your Stars soon.
                </p>
              </div>
            ))}
          </>
        )}
      </div>

      <CompleteTask
        open={!!completeFor}
        onClose={()=>setCompleteFor(null)}
        onSubmit={submitProof}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0b0d0c] text-white">
      {tab === 'home' ? Home : <Profile username={username} userId={userId} />}
      <BottomNav tab={tab} setTab={setTab} />
    </div>
  );
}
