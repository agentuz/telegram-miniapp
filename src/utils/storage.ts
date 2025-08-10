export const save = <T>(k: string, v: T) => {
  try { localStorage.setItem(k, JSON.stringify(v)); } catch {}
};
export const load = <T>(k: string, fallback: T): T => {
  try { const v = localStorage.getItem(k); return v ? JSON.parse(v) as T : fallback; } catch { return fallback; }
};
