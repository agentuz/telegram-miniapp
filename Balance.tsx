import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Balance({ userId }:{userId?:number}){
  const [stars, setStars] = useState<number>(0);
  useEffect(() => {
    if (!userId) return;
    supabase.from('users').select('stars').eq('id', userId).single().then(({ data }) => {
      setStars(data?.stars ?? 0);
    });
  }, [userId]);

  return (
    <div className="mx-4 p-4 rounded-card bg-white/5 border border-white/10">
      <div className="text-sm text-white/70">Your balance</div>
      <div className="text-3xl font-semibold mt-1">⭐ {stars} Stars</div>
    </div>
  );
}
