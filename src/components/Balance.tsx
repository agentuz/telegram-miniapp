import React from 'react';

type Props = {
  stars: number;
  usd: number;
  coins: number;
  gems: number;
  tickets: number;
};

export default function Balance(props: Props) {
  const { stars, usd, coins, gems, tickets } = props;

  return (
    <div className="rounded-3xl bg-gradient-to-b from-[#1a221f] to-[#101312] border border-white/5 p-4">
      <div className="text-sm opacity-80">Your balance</div>
      <div className="flex items-end gap-2 mt-1">
        <div className="text-5xl font-extrabold">{stars}</div>
        <div className="text-3xl">⭐</div>
      </div>
      <div className="opacity-60 text-sm">~ ${usd.toFixed(2)}</div>

      <div className="grid grid-cols-3 gap-2 mt-4">
        <Stat icon="🟡" label="Coins" value={coins} />
        <Stat icon="💎" label="Gems" value={gems} />
        <Stat icon="🎟️" label="Tickets" value={tickets} />
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4">
        <button className="rounded-xl py-2 bg-[#0e1311] border border-white/10">Withdraw</button>
        <button className="rounded-xl py-2 bg-[#0e1311] border border-white/10">Top up</button>
      </div>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: string; label: string; value: number }) {
  return (
    <div className="rounded-xl bg-[#0e1311] border border-white/10 px-3 py-2">
      <div className="text-xs opacity-70">{label}</div>
      <div className="flex items-center gap-2">
        <span className="text-lg">{icon}</span>
        <span className="font-semibold">{value}</span>
      </div>
    </div>
  );
}
