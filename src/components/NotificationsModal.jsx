import { Bell, CheckCheck, CheckCircle2, CircleAlert } from 'lucide-react';
import Modal from './Modal';
import { useNotifications } from '../context/NotificationContext';
import { dateLabel } from '../utils/pricing';
export default function NotificationsModal({ onClose }) {
  const { notifications, markRead } = useNotifications();
  const unread = notifications.filter(n => !n.read).length;
  return <Modal title="Notifikasi" onClose={onClose}><div className="notification-toolbar"><span>{unread} belum dibaca</span><button disabled={!unread} onClick={markRead}><CheckCheck size={16}/> Tandai semua dibaca</button></div>{notifications.length ? <div className="notification-list">{notifications.map(n => <div key={n.id} className={`notification-item ${!n.read ? 'unread' : ''}`}><span className={`notification-icon ${n.type}`}>{n.type === 'warning' ? <CircleAlert size={19}/> : <CheckCircle2 size={19}/>}</span><div><p>{n.message}</p><small>{dateLabel(n.date)} · {n.read ? 'Sudah dibaca' : 'Belum dibaca'}</small></div>{!n.read && <span className="unread-dot"/>}</div>)}</div> : <div className="empty-state"><Bell size={43}/><h3>Masih tenang di sini</h3><p>Aktivitas dan kabar pesananmu akan tersimpan di sini.</p></div>}</Modal>;
}
