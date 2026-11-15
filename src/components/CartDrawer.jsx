import { useState } from 'react';
import { ShoppingBag, Plus, Minus, Trash2, Tag, ArrowRight, CheckCircle2, Coffee, ShieldCheck, X } from 'lucide-react';
import Modal from './Modal';
import { useCart } from '../context/CartContext';
import { useNotifications } from '../context/NotificationContext';
import { promos, calculatePricing, rupiah, dateLabel } from '../utils/pricing';
import { handleImageError } from '../data/menu';
export function Receipt({ order }) {
  return <div className="receipt"><div className="receipt-brand"><Coffee size={28}/><h3>sela.</h3><p>Terima kasih sudah menjadi bagian dari cerita kami.</p></div><div className="receipt-id"><strong>{order.id}</strong><span>{dateLabel(order.date)}</span></div>{order.items.map(item => <div className="receipt-item" key={item.id}><div><b>{item.name}</b><small>{item.quantity} × {rupiah(item.price)}</small></div><span>{rupiah(item.price * item.quantity)}</span></div>)}<PriceSummary pricing={order} code={order.code}/><p className="receipt-foot">Pesanan simulasi berhasil · Sampai jumpa di tegukan berikutnya!</p></div>;
}
function PriceSummary({ pricing, code }) {
  return <div className="price-summary"><div><span>Subtotal</span><span>{rupiah(pricing.subtotal)}</span></div>{pricing.discount > 0 && <div className="discount-row"><span>Diskon {code}</span><span>−{rupiah(pricing.discount)}</span></div>}<div><span>Pajak 10%</span><span>{rupiah(pricing.tax)}</span></div><div className="total-row"><strong>Total pembayaran</strong><strong>{rupiah(pricing.total)}</strong></div></div>;
}
export default function CartDrawer({ onClose, initialPromo = '' }) {
  const { items, stocks, add, decrease, remove, checkout } = useCart();
  const { notify } = useNotifications();
  const [input, setInput] = useState(initialPromo);
  const [code, setCode] = useState(initialPromo);
  const [receipt, setReceipt] = useState(null);
  const pricing = calculatePricing(items, code);
  const applyPromo = (event) => {
    event.preventDefault(); const normalized = input.trim().toUpperCase();
    if (!promos[normalized]) { notify('Kode promo belum sesuai. Coba UTS25, HEMAT10, atau KOPI15.', 'warning'); return; }
    setCode(normalized); setInput(normalized); notify(`Promo ${normalized} aktif. Kamu hemat ${promos[normalized] * 100}%!`);
  };
  return <Modal title={receipt ? 'Struk pembayaran' : 'Keranjang kamu'} onClose={onClose} drawer>{receipt ? <><div className="checkout-success"><CheckCircle2 size={42}/><h3>Yeay, pesanan berhasil!</h3><p>Kebahagiaanmu segera diracik.</p></div><Receipt order={receipt}/><button className="primary-button full" onClick={onClose}>Kembali ke menu <ArrowRight size={18}/></button></> : items.length ? <><p className="drawer-intro">Pilihan yang bagus. Siap menemani harimu!</p><div className="cart-items">{items.map(item => <div className="cart-item" key={item.id}><img src={item.image} alt={item.name} onError={handleImageError}/><div className="cart-item-main"><h3>{item.name}</h3><span>{rupiah(item.price)}</span><div className="quantity-control"><button aria-label={`Kurangi ${item.name}`} onClick={() => decrease(item.id)}><Minus size={14}/></button><b>{item.quantity}</b><button aria-label={`Tambah jumlah ${item.name}`} onClick={() => add(item.id)}><Plus size={14}/></button><small>Stok {stocks[item.id]}</small></div></div><button className="small-icon remove-item" aria-label={`Hapus ${item.name}`} onClick={() => remove(item.id)}><Trash2 size={17}/></button></div>)}</div><div className="promo-form-section"><label htmlFor="promo-code"><Tag size={16}/> Punya kode promo?</label><form className="promo-form" onSubmit={applyPromo}><input id="promo-code" placeholder="Masukkan kode promo" value={input} onChange={e => setInput(e.target.value)}/><button type="submit">Pakai</button></form>{code ? <div className="applied-promo"><CheckCircle2 size={14}/>{code} · Hemat {promos[code] * 100}%<button aria-label="Hapus promo" onClick={() => { setCode(''); setInput(''); notify('Kode promo dihapus.'); }}><X size={14}/></button></div> : <small>Coba UTS25, HEMAT10, atau KOPI15</small>}</div><PriceSummary pricing={pricing} code={code}/><button className="primary-button full checkout-button" onClick={() => { const order = checkout(code); if (order) setReceipt(order); }}>Bayar {rupiah(pricing.total)} <ArrowRight size={18}/></button><p className="secure-note"><ShieldCheck size={14}/> Simulasi pembayaran · Tanpa uang sungguhan</p></> : <div className="empty-state"><ShoppingBag size={48}/><h3>Keranjangmu masih kosong</h3><p>Secangkir kopi favorit bisa jadi awal yang baik.</p><button className="primary-button" onClick={onClose}>Yuk, pilih menu <ArrowRight size={17}/></button></div>}</Modal>;
}
