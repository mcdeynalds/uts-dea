import { createId } from '../utils/createId';
import { createContext, useContext, useState, useRef, useEffect } from 'react';
import { CheckCircle2, CircleAlert, X } from 'lucide-react';
const ToastContext = createContext(null);
export const useToast = () => useContext(ToastContext);
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const toast = (message, type = 'success') => {
    const id = createId();
    setToasts(prev => [...prev.slice(-2), { id, message, type }]);
    timers.current.push(setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3800));
  };
  return <ToastContext.Provider value={toast}>{children}<div className="toast-stack" aria-live="polite">{toasts.map(t => <div className={`toast ${t.type}`} key={t.id}>{t.type === 'success' ? <CheckCircle2 size={20}/> : <CircleAlert size={20}/>}<span>{t.message}</span><button aria-label="Tutup notifikasi" onClick={() => setToasts(prev => prev.filter(x => x.id !== t.id))}><X size={16}/></button></div>)}</div></ToastContext.Provider>;
}
