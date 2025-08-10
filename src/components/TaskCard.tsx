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
  onCompleteClick,
}: {
  task: UITask;
  onStart: (id: string) => void;
  onCompleteClick: (id: string) => void;
}) {
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
        {task.status === 'in_review' && (
          <span className="text-xs px-2 py-1 rounded-full bg-yellow-500/10 text-yellow-300 border border-yellow-500/20">
            Checking…
          </span>
        )}
      </div>

      {/* кнопки по состоянию */}
      {task.status === 'active' && (
        <div className="flex gap-2 mt-4">
          <a href={task.ctaUrl} target="_blank" rel="noreferrer"
             className="flex-1 rounded-xl bg-[#0e1311] border border-white/10 py-2 text-center">
            Go to website
          </a>
          <button className="flex-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 transition py-2 font-medium"
                  onClick={() => onStart(task.id)}>
            Deliver
          </button>
        </div>
      )}

      {task.status === 'in_progress' && (
        <div className="flex gap-2 mt-4">
          <a href={task.ctaUrl} target="_blank" rel="noreferrer"
             className="flex-1 rounded-xl bg-[#0e1311] border border-white/10 py-2 text-center">
            Go to website
          </a>
          <button className="flex-1 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition py-2 font-medium"
                  onClick={() => onCompleteClick(task.id)}>
            Complete task
          </button>
        </div>
      )}

      {task.status === 'in_review' && (
        <p className="text-sm mt-3 opacity-80">Thanks! We’re verifying with the advertiser…</p>
      )}
    </div>
  );
}

function Badge({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10 ${className}`}>
      {children}
    </span>
  );
}
