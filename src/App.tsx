import React, { useEffect, useState } from 'react';
import Balance from './components/Balance';
import TaskCard, { UITask } from './components/TaskCard';
import BottomNav from './components/BottomNav';

declare global { interface Window { Telegram?: any } }

export default function App() {
  const [tasks, setTasks] = useState<UITask[]>([]);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    // Telegram WebApp init (не упадёт в обычном браузере)
    const tg = window.Telegram?.WebApp;
    try { tg?.ready(); tg?.expand(); } catch {}

    // достаём username, если открыто в ТМА
    const u = tg?.initDataUnsafe?.user;
    if (u?.username) setUsername(u.username);

    // MOCK задания (пока без бекэнда)
    setTasks([
      {
        id: 'whizz',
        title: 'GetWhizz',
        description: 'Sign up, rent a bike, start delivering — earn cash. Reward after first delivery.',
        rewardStars: 1500,
        rewardXP: 50,
        ctaUrl: 'https://getwhizz.com',
        status: 'active',
      },
      {
        id: 'tiktok',
        title: 'TikTok',
        description: 'Install the app, browse your feed for 10 minutes.',
        rewardStars: 100,
        rewardXP: 20,
        ctaUrl: 'https://tiktok.com',
        status: 'active',
      },
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0d0c] text-white pb-24">
      {/* Header */}
      <div className="px-4 pt-5">
        <h1 className="text-2xl font-bold">GetBucks</h1>
        <p className="opacity-80 text-sm">
          {username ? `Welcome back, @${username}!` : 'Welcome — earn Stars by completing tasks.'}
        </p>
      </div>

      {/* Balance */}
      <div className="px-4 mt-4">
        <Balance stars={0} usd={0} coins={7} gems={0} tickets={2} />
      </div>

      {/* Tasks list */}
      <div className="px-4 mt-6 space-y-3">
        <h2 className="text-lg font-semibold mb-2">Offers</h2>
        {tasks.map(t => (
          <TaskCard key={t.id} task={t} onStart={(id) => {
            // пока просто помечаем "in_review" и прячем из активных
            setTasks(prev =>
              prev.map(x => x.id === id ? { ...x, status: 'in_review' } : x)
            );
          }} />
        ))}

        {/* блок "On review" */}
        {tasks.some(t => t.status === 'in_review') && (
          <>
            <h3 className="text-base font-medium mt-6 mb-1 opacity-90">On review</h3>
            {tasks.filter(t => t.status === 'in_review').map(t => (
              <div key={t.id} className="rounded-2xl bg-[#131715] border border-white/5 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{t.title}</div>
                    <div className="text-xs opacity-70">{t.description}</div>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-yellow-500/10 text-yellow-300 border border-yellow-500/20">
                    Checking…
                  </span>
                </div>
                <p className="text-sm mt-3 opacity-80">
                  Thanks! We’re verifying with the advertiser. You’ll get your Stars soon.
                </p>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Bottom nav */}
      <BottomNav />
    </div>
  );
}
