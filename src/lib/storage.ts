export const LS = {
  get: <T>(k: string): T | null => {
    try {
      const v = localStorage.getItem(k);
      return v ? (JSON.parse(v) as T) : null;
    } catch {
      return null;
    }
  },
  set: <T>(k: string, v: T): void => {
    try {
      localStorage.setItem(k, JSON.stringify(v));
    } catch {}
  },
  del: (k: string): void => {
    try {
      localStorage.removeItem(k);
    } catch {}
  },
};
