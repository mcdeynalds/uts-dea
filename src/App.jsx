import { createId } from './utils/createId';
import { useState, useCallback } from 'react';
import { Star, Send, MessageCircle, Coffee, Plus } from 'lucide-react';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import Modal from './components/Modal';
import CartDrawer from './components/CartDrawer';
import HistoryModal from './components/HistoryModal';
import NotificationsModal from './components/NotificationsModal';
import StarRating from './components/StarRating';
import { useCart } from './context/CartContext';
import { useNotifications } from './context/NotificationContext';
import useLocalStorage from './hooks/useLocalStorage';
import { menu, handleImageError } from './data/menu';
import { rupiah, dateLabel } from './utils/pricing';
function MenuDetail({ item, mode, reviews, onReview, rating, stock, onClose, onAdd }) {
  const [stars, setStars] = useState(5);
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const submit = event => {
    event.preventDefault();
    if (text.trim().length < 5) { setError('Tulis minimal 5 karakter agar ulasanmu lebih bermakna.'); return; }
    onReview(item.id, { id: createId(), rating: stars, text: text.trim(), date: new Date().toISOString() });
    setText(''); setStars(5); setError('');
  };
  return <Modal title={mode === 'comment' ? 'Cerita rasa kamu' : 'Kenalan dengan favoritmu'} onClose={onClose} wide><div className="detail-intro"><img className="detail-image" src={item.image} alt={item.name} onError={handleImageError}/><div><span className="detail-category">{item.category}</span><h3>{item.name}</h3><div className="detail-rating"><Star size={16} fill="currentColor"/> {rating.toFixed(1)} <span>· {reviews.length} ulasan pelanggan</span></div><p>{item.description}</p><div className="detail-price"><strong>{rupiah(item.price)}</strong><span>Tersedia {stock} porsi</span></div><button className="primary-button full" disabled={!stock} onClick={() => onAdd(item.id)}><Plus size={17}/> {stock ? 'Tambah ke keranjang' : 'Stok habis'}</button></div></div><section className="reviews-section"><h3><MessageCircle size={18}/> Ulasan & cerita ({reviews.length})</h3><form className="review-form" onSubmit={submit}><label>Bagaimana rasanya?</label><StarRating value={stars} onChange={setStars}/><label className="sr-only" htmlFor="review-text">Tulis ulasan</label><textarea id="review-text" placeholder="Bagikan cerita tentang rasa favoritmu…" maxLength={1000} value={text} onChange={e => { setText(e.target.value); setError(''); }} aria-invalid={!!error} aria-describedby={error ? 'review-error' : undefined}/>{error && <p id="review-error" className="form-error" role="alert">{error}</p>}<div className="review-form-bottom"><small>Minimal 5 karakter · {text.length}/1000</small><button className="primary-button" type="submit">Kirim ulasan <Send size={15}/></button></div></form><div className="reviews-list">{reviews.length ? reviews.map(review => <article className="review-item" key={review.id}><span className="review-avatar"><Coffee size={19}/></span><div><div className="review-top"><b>Teman sela.</b><span><Star size={12} fill="currentColor"/> {review.rating}.0</span></div><small>{dateLabel(review.date)}</small><p>{review.text}</p></div></article>) : <p className="no-reviews">Belum ada ulasan. Jadi yang pertama berbagi cerita!</p>}</div></section></Modal>;
}
export default function App() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Semua');
  const [sort, setSort] = useState('recommended');
  const [favorites, setFavorites] = useLocalStorage('favorites', {});
  const [reviews, setReviews] = useLocalStorage('reviews', {});
  const [overlay, setOverlay] = useState(null);
  const { items, stocks, add } = useCart();
  const { notify } = useNotifications();
  const close = useCallback(() => setOverlay(null), []);
  const getRating = item => { const list = reviews[item.id] || []; return (item.rating + list.reduce((sum, r) => sum + r.rating, 0)) / (list.length + 1); };
  const toggleFavorite = id => {
    const isFavorite = !!favorites[id];
    setFavorites(prev => { const next = { ...prev }; if (next[id]) delete next[id]; else next[id] = Date.now(); return next; });
    notify(`${menu.find(item => item.id === id).name} ${isFavorite ? 'dihapus dari' : 'ditambahkan ke'} favorit.`);
  };
  const addReview = (id, review) => { setReviews(prev => ({ ...prev, [id]: [review, ...(prev[id] || [])] })); notify('Ulasanmu berhasil dikirim. Terima kasih sudah berbagi!'); };
  const filtered = menu.filter(item => item.name.toLocaleLowerCase('id').includes(search.trim().toLocaleLowerCase('id')) && (category === 'Semua' || (category === 'Favorit' ? favorites[item.id] : item.category === category)));
  const comparators = {
    'price-low': (a, b) => a.price - b.price, 'price-high': (a, b) => b.price - a.price,
    rating: (a, b) => getRating(b) - getRating(a), name: (a, b) => a.name.localeCompare(b.name, 'id'),
    'favorite-new': (a, b) => favorites[b.id] - favorites[a.id], 'favorite-old': (a, b) => favorites[a.id] - favorites[b.id],
  };
  const menus = [...filtered].sort(comparators[sort] || ((a, b) => a.id - b.id));
  const changeCategory = name => { setCategory(name); if (name !== 'Favorit' && sort.startsWith('favorite-')) setSort('recommended'); };
  return <><Header activePanel={overlay?.type} search={search} setSearch={setSearch} onCart={() => setOverlay({ type: 'cart' })} onHistory={() => setOverlay({ type: 'history' })} onNotifications={() => setOverlay({ type: 'notifications' })}/><MainContent menus={menus} allMenus={menu} category={category} setCategory={changeCategory} sort={sort} setSort={setSort} favorites={favorites} onFavorite={toggleFavorite} onDetail={item => setOverlay({ type: 'detail', item })} onComment={item => setOverlay({ type: 'comment', item })} search={search} clearSearch={() => { setSearch(''); changeCategory('Semua'); }} cart={items} stocks={stocks} onAdd={add} getRating={getRating} onPromo={() => { notify('Promo UTS25 siap dipakai. Tambahkan menu lalu checkout untuk hemat 25%.'); setOverlay({ type: 'cart', promo: 'UTS25' }); }}/><Footer/>{overlay?.type === 'cart' && <CartDrawer onClose={close} initialPromo={overlay.promo}/>}{overlay?.type === 'history' && <HistoryModal onClose={close}/>}{overlay?.type === 'notifications' && <NotificationsModal onClose={close}/>}{['detail', 'comment'].includes(overlay?.type) && <MenuDetail key={`${overlay.item.id}-${overlay.type}`} item={overlay.item} mode={overlay.type} reviews={reviews[overlay.item.id] || []} onReview={addReview} rating={getRating(overlay.item)} stock={stocks[overlay.item.id]} onClose={close} onAdd={add}/>}</>;
}
