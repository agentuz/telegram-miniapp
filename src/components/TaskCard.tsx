import React from 'react';

export type UITask = {
  id: string;
  title: string;
  description: string;
  rewardStars: number;
  rewardXP: number;
  ctaUrl: string;
  status: 'active' | 'in_progress' | 'in_review' | 'completed';
};

export default function TaskCard({
  task,
  onStart,
}: {
  task: UITask;
  onStart: (id: string) => void;
}) {
  if (task.status !== 'active') return null;

  return (
    <div className="rounded-2xl bg-[#131715] border border-white/5 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-base font-semibold">{task.title}</div>
          <div className="text-sm opacity-80">{task.description}</div>

          <div className="flex items-center gap-3 mt-3">
            <Badge>+{task.rewardStars} ⭐</Badge>
            <Badge className="opacity-80">+{task.rewardXP} XP</Badge>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <a
          href={task.ctaUrl}
          target="_blank"
          rel="noreferrer"
          className="flex-1 rounded-xl bg-[#0e1311] border border-white/10 py-2 text-center"
        >
          Go to website
        </a>
        <button
          className="flex-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 transition py-2 text-center font-medium"
          onClick={() => onStart(task.id)}
        >
          Deliver
        </button>
      </div>
    </div>
  );
}

function Badge({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10 ${className}`}
    >
      {children}
    </span>
  );
}
