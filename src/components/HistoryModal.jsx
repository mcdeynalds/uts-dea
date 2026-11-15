import { useState } from 'react';
import { History, ChevronDown, RotateCcw, TriangleAlert } from 'lucide-react';
import Modal from './Modal';
import { Receipt } from './CartDrawer';
import { useCart } from '../context/CartContext';
import { rupiah, dateLabel } from '../utils/pricing';
export default function HistoryModal({ onClose }) {
  const { history, reset } = useCart();
  const [expanded, setExpanded] = useState(null);
  const [confirming, setConfirming] = useState(false);
  return <Modal title="Riwayat transaksi" onClose={onClose}>{confirming ? <div className="reset-confirm"><TriangleAlert size={40}/><h3>Mulai cerita baru?</h3><p>Stok akan kembali ke jumlah awal. Riwayat transaksi dan isi keranjang akan dihapus. Favorit, ulasan, dan notifikasi tetap tersimpan.</p><div className="confirm-actions"><button className="secondary-button" onClick={() => setConfirming(false)}>Batal</button><button className="danger-button" onClick={() => { reset(); setExpanded(null); setConfirming(false); }}>Ya, reset data</button></div></div> : <>{history.length ? <div className="history-list">{history.map(order => <div className="history-order" key={order.id}><button className="history-summary" onClick={() => setExpanded(prev => prev === order.id ? null : order.id)} aria-expanded={expanded === order.id}><span><strong>{order.id}</strong><small>{dateLabel(order.date)} · {order.items.reduce((sum, i) => sum + i.quantity, 0)} item</small></span><span><b>{rupiah(order.total)}</b><small className="paid">Lunas <ChevronDown size={13}/></small></span></button>{expanded === order.id && <Receipt order={order}/>}</div>)}</div> : <div className="empty-state"><History size={43}/><h3>Belum ada cerita pesanan</h3><p>Pesanan yang sudah dibayar akan muncul di sini.</p></div>}<button className="reset-button" onClick={() => setConfirming(true)}><RotateCcw size={16}/> Reset Stok & Riwayat</button></>}</Modal>;
}
