import { auth } from '../firebase';

export async function openStream(path, onData, onError) {
  const user = auth.currentUser;
  const token = user ? await user.getIdToken() : null;
  const base = import.meta.env.VITE_FIREBASE_DB_URL;
  const url = new URL(`${base}${path}.json`);
  if (token) url.searchParams.set('auth', token);

  const es = new EventSource(url.toString());
  es.onmessage = (e) => {
    try {
      const parsed = JSON.parse(e.data);
      onData(parsed);
    } catch {}
  };
  es.onerror = (err) => {
    es.close();
    onError?.(err);
  };
  return () => es.close();
}
