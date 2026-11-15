import { createId } from '../utils/createId';
import { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { useToast } from './ToastContext';
const NotificationContext = createContext(null);
export const useNotifications = () => useContext(NotificationContext);
export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useLocalStorage('notifications', []);
  const toast = useToast();
  const notify = (message, type = 'success') => {
    toast(message, type);
    setNotifications(prev => [{ id: createId(), message, type, read: false, date: new Date().toISOString() }, ...prev]);
  };
  const markRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  return <NotificationContext.Provider value={{ notifications, notify, markRead }}>{children}</NotificationContext.Provider>;
}
