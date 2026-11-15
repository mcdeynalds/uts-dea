import { Coffee, CupSoda, UtensilsCrossed, Cookie, Heart, LayoutGrid, SlidersHorizontal, SearchX, ArrowUpRight, Leaf, Sparkles, ArrowRight, TicketPercent } from 'lucide-react';
import MenuCard from './MenuCard';
import { handleImageError } from '../data/menu';
import { rupiah } from '../utils/pricing';

const categories = [
  { name: 'Semua', icon: LayoutGrid },
  { name: 'Kopi', icon: Coffee },
  { name: 'Non-Kopi', icon: CupSoda },
  { name: 'Makanan', icon: UtensilsCrossed },
  { name: 'Snack', icon: Cookie },
  { name: 'Favorit', icon: Heart },
];

export default function MainContent({ menus, allMenus, category, setCategory, sort, setSort, favorites, onFavorite, onDetail, onComment, search, clearSearch, cart, stocks, onAdd, getRating, onPromo }) {
  const dailyPick = allMenus.find(item => item.id === 1);
  const matchaPick = allMenus.find(item => item.id === 7);
  const categoryCount = name => name === 'Semua'
    ? allMenus.length
    : name === 'Favorit'
      ? Object.keys(favorites).length
      : allMenus.filter(item => item.category === name).length;

  return (
    <main>
      <section className="hero page-width">
        <div className="hero-copy">
          <div className="eyebrow"><span /> COFFEE. BITES. LITTLE JOYS.</div>
          <h1>Ambil jeda.<br />Temukan <em>rasa.</em></h1>
          <p>Kopi serius, mood santai. Dari tegukan pertama<br className="desktop-break" /> sampai gigitan terakhir, ada rasa buat setiap cerita.</p>
          <a className="primary-button" href="#menu">Cari teman jedamu <ArrowUpRight size={20} /></a>
          <div className="hero-benefits">
            <span><Coffee size={16} /> Kopi pilihan</span>
            <span><Leaf size={16} /> Fresh setiap hari</span>
            <span><Heart size={15} /> Dibuat sepenuh hati</span>
          </div>
          <div className="hero-bottom-note"><span className="color-dot red" /><span className="color-dot yellow" /><span className="color-dot green" /> GOOD TASTE. NO RUSH.</div>
        </div>
        <div className="hero-visual">
          <div className="hero-visual-top"><span>THE DAILY PICK</span><span>VOL. 01 / SELA.</span></div>
          <button className="hero-product" onClick={() => onDetail(dailyPick)} aria-label={`Lihat detail ${dailyPick.name}`}>
            <img src={dailyPick.image} alt={dailyPick.name} onError={handleImageError} fetchPriority="high" />
            <span className="hero-product-caption"><span><small>YOUR NEW DAILY RITUAL</small><strong>{dailyPick.name}</strong></span><ArrowUpRight size={24} /></span>
          </button>
          <div className="hero-round"><Sparkles size={22} /><span>A LITTLE SIP,<br />A BETTER DAY.</span></div>
          <button className="hero-mini-product" onClick={() => onDetail(matchaPick)} aria-label={`Lihat detail ${matchaPick.name}`}>
            <img src={matchaPick.image} alt={matchaPick.name} onError={handleImageError} />
            <span><small>MATCHA MOOD?</small><b>{rupiah(matchaPick.price)}</b></span>
          </button>
          <span className="hero-photo-label">SLOW DOWN. SIP HAPPY.</span>
        </div>
      </section>

      <section className="promo-banner page-width" id="promo">
        <div className="promo-icon"><TicketPercent size={27} /></div>
        <div><strong>Jeda enak, dompet tetap happy.</strong><p>Diskon 25% buat menu favoritmu. Yuk, pakai promonya!</p></div>
        <button onClick={onPromo}>Pakai kode <b>UTS25</b><ArrowRight size={18} /></button>
        <span className="promo-decoration" aria-hidden="true">25%</span>
      </section>

      <section className="menu-section page-width" id="menu">
        <div className="section-heading">
          <div><span className="eyebrow">PICK YOUR LITTLE JOY</span><h2>Jeda kamu, <em>pilihan kamu.</em></h2><p>Dari kopi creamy sampai pastry renyah. Mau mulai dari mana?</p></div>
          <span className="fresh-label"><Sparkles size={17} /> Fresh picks. Good mood.</span>
        </div>
        <div className="menu-toolbar">
          <div className="category-tabs" role="tablist" aria-label="Kategori menu">
            {categories.map(({ name, icon: Icon }) => (
              <button key={name} role="tab" aria-selected={category === name} className={category === name ? 'active' : ''} onClick={() => setCategory(name)}>
                <Icon size={16} />{name}<span>{categoryCount(name)}</span>
              </button>
            ))}
          </div>
          <label className="sort-control"><SlidersHorizontal size={16} />
            <select aria-label="Urutkan menu" value={sort} onChange={event => setSort(event.target.value)}>
              <option value="recommended">Rekomendasi</option>
              <option value="price-low">Harga termurah</option>
              <option value="price-high">Harga termahal</option>
              <option value="rating">Rating tertinggi</option>
              <option value="name">Nama A–Z</option>
              {category === 'Favorit' && <><option value="favorite-new">Favorit terbaru</option><option value="favorite-old">Favorit terlama</option></>}
            </select>
          </label>
        </div>
        <div className="results-line"><span>Menampilkan <b>{menus.length} menu</b>{search && <> untuk “{search}”</>}</span><span>Diracik untuk jeda yang lebih baik.</span></div>
        {menus.length ? (
          <div className="menu-grid">
            {menus.map(item => <MenuCard key={item.id} item={item} favorite={favorites[item.id]} onFavorite={onFavorite} onDetail={onDetail} onComment={onComment} onAdd={onAdd} remaining={stocks[item.id]} quantity={cart.find(line => line.id === item.id)?.quantity || 0} rating={getRating(item)} />)}
          </div>
        ) : (
          <div className="empty-state"><SearchX size={42} /><h3>{category === 'Favorit' ? 'Favoritmu menunggu untuk ditemukan' : 'Menu belum ditemukan'}</h3><p>{category === 'Favorit' ? 'Ketuk ikon hati pada menu yang kamu suka.' : 'Coba kata kunci lain atau lihat semua menu.'}</p><button className="primary-button" onClick={clearSearch}>Jelajahi semua menu <ArrowRight size={16} /></button></div>
        )}
        <div className="menu-end"><span /><Coffee size={19} /><p>Life happens. Take a sela.</p><span /></div>
      </section>
    </main>
  );
}
