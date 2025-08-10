import type { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export default async function handler(req:VercelRequest, res:VercelResponse){
  try {
    const { user_id, username, task_id, task_name, email, phone } = req.body || {};
    if (!user_id || !task_id) return res.status(400).json({ ok:false, error:'missing fields' });

    await supabase.from('submissions').insert({ user_id, username, task_id, email, phone, status:'submitted' });
    await supabase.from('tasks').update({ status:'under_review' }).eq('id', task_id);

    const text = `✅ Task submission received:\n\n— Task: ${task_name}\n— User: @${username || user_id}\n— Email: ${email}\n— Phone: ${phone}`;
    await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,{
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ chat_id: process.env.TELEGRAM_ADMIN_CHAT_ID, text })
    });

    res.status(200).json({ ok:true });
  } catch (e:any){
    res.status(500).json({ ok:false, error:e.message });
  }
}
