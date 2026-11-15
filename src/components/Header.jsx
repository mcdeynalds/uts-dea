import { Coffee, Search, History, Bell, ShoppingBag, X, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNotifications } from '../context/NotificationContext';
import { rupiah } from '../utils/pricing';

export default function Header({ search, setSearch, onCart, onHistory, onNotifications, activePanel }) {
  const { count, items } = useCart();
  const { notifications } = useNotifications();
  const unread = notifications.filter(notification => !notification.read).length;
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const showResults = event => {
    event.preventDefault();
    document.getElementById('menu')?.scrollIntoView({ block: 'start' });
  };

  return (
    <>
      <header className="header">
        <div className="header-inner">
          <a className="brand" href="#" aria-label="sela. beranda">
            <span className="brand-icon"><Coffee size={27} /></span>
            <span>sela<span className="brand-accent">.</span><small>COFFEE & LITTLE JOYS</small></span>
          </a>
          <nav className="section-links" aria-label="Jelajahi halaman">
            <a href="#menu">Menu <ArrowUpRight size={13} /></a>
            <a href="#promo">Promo <span className="promo-link-dot" /></a>
          </nav>
          <nav className="header-actions" aria-label="Navigasi utama">
            <div className="activity-nav">
              <button className="nav-action" type="button" onClick={onHistory} aria-label="Riwayat transaksi" aria-haspopup="dialog" aria-expanded={activePanel === 'history'}>
                <History size={20} /><span>Riwayat</span>
              </button>
              <button className="nav-action badge-button" type="button" onClick={onNotifications} aria-label={`Notifikasi, ${unread} belum dibaca`} aria-haspopup="dialog" aria-expanded={activePanel === 'notifications'}>
                <span className="nav-icon"><Bell size={20} />{unread > 0 && <span className="badge">{unread > 99 ? '99+' : unread}</span>}</span>
                <span>Notifikasi</span>
              </button>
            </div>
            <button className="cart-button" type="button" onClick={onCart} aria-label={`Keranjang, ${count} item`} aria-haspopup="dialog" aria-expanded={activePanel === 'cart'}>
              <ShoppingBag size={20} />
              <span className="cart-button-copy"><span>Keranjang</span><small>{count ? `Subtotal ${rupiah(subtotal)}` : 'Pilih teman jedamu'}</small></span>
              <b>{count}</b>
            </button>
          </nav>
        </div>
        <div className="header-search-row">
          <label className="search-caption" htmlFor="menu-search">Mau pesan apa?<small>Temukan rasa favoritmu.</small></label>
          <form className="search-box" role="search" aria-label="Pencarian menu" onSubmit={showResults}>
            <Search size={19} />
            <input id="menu-search" type="search" aria-label="Cari menu" placeholder="Cari kopi, matcha, atau pastry…" value={search} onChange={event => setSearch(event.target.value)} />
            {search && <button type="button" className="search-clear" aria-label="Hapus pencarian" onClick={() => setSearch('')}><X size={17} /></button>}
            <button type="submit" className="search-submit" aria-label="Lihat hasil pencarian"><span>Cari menu</span><ArrowRight size={17} /></button>
          </form>
          <span className="search-reassurance"><span /> Diracik fresh untukmu</span>
        </div>
      </header>
      {count > 0 && (
        <button className="mobile-cart-shortcut" type="button" onClick={onCart} aria-label={`Lihat keranjang, ${count} item`} aria-haspopup="dialog" aria-expanded={activePanel === 'cart'}>
          <span className="mobile-cart-count"><ShoppingBag size={20} /><b>{count}</b></span>
          <span><strong>Lihat keranjang</strong><small>{count} item · Subtotal {rupiah(subtotal)}</small></span>
          <ArrowRight size={20} />
        </button>
      )}
    </>
  );
}
