import React, { useEffect } from 'react';

declare global {
  interface Window {
    Telegram?: any;
  }
}

export default function App() {
  // Инициализация Telegram WebApp (безопасно, если не в ТМА)
  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    try {
      tg?.ready();
      tg?.expand();
    } catch (_) {}
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0d0c] text-white p-4">
      <h1 className="text-2xl font-bold">GetBucks</h1>
      <p className="opacity-80">If you can read this, the app compiled 🎉</p>
    </div>
  );
}
