import React from 'react';

export default function Profile({
  username, userId,
}: { username?: string | null; userId?: number | null; }) {
  return (
    <div className="px-4 pt-5 pb-24">
      <h1 className="text-2xl font-bold">Profile</h1>
      <div className="mt-4 rounded-2xl bg-[#131715] border border-white/5 p-4">
        <div className="text-sm opacity-70">Username</div>
        <div className="text-lg">{username ? `@${username}` : 'anonymous'}</div>
        <div className="mt-3 text-sm opacity-70">User ID</div>
        <div className="text-lg">{userId ?? '—'}</div>
      </div>
    </div>
  );
}
