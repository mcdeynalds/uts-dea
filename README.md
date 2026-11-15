# sela. — ruang jeda, rasa beda.

Proyek **uts-dea** oleh **Dea Afrilia**, UTS React Fundamental 2026. Aplikasi pemesanan coffee shop dengan React 19, Vite 5, JavaScript, CSS murni, dan lucide-react.

## Menjalankan di laptop

Gunakan Node.js 20.19+ atau 22+ dan pnpm. Buka terminal pada folder proyek:

```sh
pnpm install
pnpm dev
```

Buka alamat Local yang ditampilkan terminal, misalnya http://localhost:5173. Script dev tidak mengaktifkan akses Network. Hentikan server dengan Ctrl+C.

Untuk memeriksa hasil produksi:

```sh
pnpm lint
pnpm build
pnpm preview
```

`build` membuat folder dist. `preview` menampilkan hasil build di localhost dan tidak mengunggahnya ke internet.

Jika memulai proyek kosong dari awal (tidak perlu untuk ZIP yang sudah lengkap):

```sh
pnpm create vite@5 uts-dea --template react
cd uts-dea
pnpm add react@19 react-dom@19 lucide-react
pnpm add -D vite@5 @vitejs/plugin-react@4
```

## Identitas dan desain

Nama brand diubah dari KopiKu menjadi **sela.** sesuai permintaan terbaru pengguna. Nama folder dan package tetap `uts-dea`; identitas mahasiswa tetap Dea Afrilia. Konsep brand: ruang jeda, rasa beda.

Palet dari referensi pengguna:

| Nama warna | Hex | Peran |
|---|---|---|
| Blue Crate | #293379 | Tipografi utama, navigasi, tombol, footer |
| Tomato Red | #b81817 | Promo, harga, favorit, aksen judul |
| Citrus Yellow | #e5a300 | Kupon promo dan aksen hero |
| Lettuce Green | #a6af32 | Aksen dekoratif |
| Green Beans | #607829 | Latar hero produk dan informasi ketersediaan |
| Orange | #ee7302 | Aksen brand, ikon, dan fokus keyboard |

Latar krem dan putih hangat digunakan agar kartu, teks, dan foto mudah dibaca. Foto produk mengikuti referensi Fore Coffee, diunduh menjadi JPEG lokal di public/images. Ketentuan sumber foto awal Unsplash/Wikimedia disesuaikan dengan permintaan terbaru pengguna untuk menggunakan foto Fore. Tidak ada API menu atau gambar eksternal yang dipanggil saat runtime. Nama, foto, dan harga merupakan contoh katalog untuk simulasi tugas, bukan website resmi atau transaksi Fore Coffee. Foto asli tetap memperlihatkan merek Fore pada kemasan. Sumber foto tercatat di IMAGE_CREDITS.md.

## Menu dan file foto

Terdapat tepat **15 menu**, masing-masing memiliki 8 properti: id, name, category, price, stock, image, description, rating.

| Kategori | Produk | Harga | File di public/images |
|---|---|---|---|
| Kopi | Iced Bumi Latte | Rp 25.000 | bumi-latte.jpg |
| Kopi | Hot Americano | Rp 23.000 | hot-americano.jpg |
| Kopi | Iced Café Latte | Rp 29.000 | iced-cafe-latte.jpg |
| Kopi | Iced Buttercream Tiramisu Latte | Rp 34.000 | tiramisu-latte.jpg |
| Kopi | Iced Caramel Praline Macchiato | Rp 34.000 | caramel-praline.jpg |
| Kopi | Iced Dirty Matchapresso | Rp 31.000 | dirty-matchapresso.jpg |
| Non-Kopi | Matcha Ice Blended | Rp 34.000 | matcha-ice-blended.jpg |
| Non-Kopi | Strawberry Ice Blended | Rp 34.000 | strawberry-ice-blended.jpg |
| Non-Kopi | Chocolate Ice Blended | Rp 37.000 | chocolate-ice-blended.jpg |
| Makanan | Mushroom Truffle Sandwich | Rp 42.000 | mushroom-truffle-sandwich.jpg |
| Makanan | Chicken Teriyaki Sandwich | Rp 39.000 | chicken-teriyaki-sandwich.jpg |
| Makanan | Smoked Beef & Cheese Sandwich | Rp 39.000 | smoked-beef-sandwich.jpg |
| Snack | Butter Croissant | Rp 24.000 | butter-croissant.jpg |
| Snack | Roll Cake Cheese Pandan | Rp 27.000 | pandan-roll-cake.jpg |
| Snack | Almond Croissant | Rp 36.000 | almond-croissant.jpg |

Gambar hero memakai ulang dua foto produk lokal. Jika gambar gagal dimuat, onError mencoba foto Bumi Latte sebagai fallback. Favicon kopi pada tab browser diekspor dari ikon Coffee milik lucide-react. Font DM Sans dan Manrope dimuat melalui Google Fonts, dengan fallback sans-serif.

## Semua fitur

- Sticky header dengan pencarian real-time, riwayat, notifikasi, dan badge keranjang.
- Tab Semua, Kopi, Non-Kopi, Makanan, Snack, dan Favorit dengan jumlah menu.
- Sortir rekomendasi, harga termurah/termahal, rating tertinggi, dan nama A–Z.
- Khusus Favorit: urutan terbaru dan terlama berdasarkan waktu disukai.
- Empat aksi kartu: info detail, favorit, ulasan/rating, dan tambah keranjang.
- Popup ulasan: rating 1–5, komentar minimal 5 dan maksimal 1.000 karakter. Ulasan baru langsung muncul paling atas tanpa menutup popup.
- Toast dan riwayat notifikasi untuk favorit, ulasan, perubahan keranjang, promo, checkout, dan reset.
- Notifikasi dibaca/belum dibaca dengan tombol tandai semua dibaca.
- Keranjang dari kanan dengan tambah, kurangi, hapus, dan pembatasan stok.
- Promo UTS25 (25%), HEMAT10 (10%), dan KOPI15 (15%). Satu promo per transaksi.
- Pajak 10% setelah potongan promo; nilai dibulatkan ke Rupiah terdekat.
- Checkout simulasi yang mengurangi stok, mengosongkan keranjang, menyimpan transaksi, dan menampilkan struk.
- Riwayat transaksi dengan rincian item, waktu, promo, pajak, dan total.
- Reset stok, keranjang, dan riwayat melalui konfirmasi custom. Favorit, ulasan, dan notifikasi tidak dihapus oleh reset.
- Popup mendukung Escape, pengelolaan fokus, dan navigasi keyboard. Animasi mengikuti prefers-reduced-motion.
- Tampilan responsif untuk komputer, tablet, dan ponsel.

Contoh promo: Bumi Latte Rp 25.000 dikurangi UTS25 Rp 6.250 = Rp 18.750, ditambah pajak Rp 1.875, total Rp 20.625.

## Penyimpanan dan batasan

File foto di public/images adalah aset proyek. **localStorage** adalah penyimpanan browser untuk favorit, ulasan, keranjang, stok, riwayat, dan notifikasi melalui custom hook useLocalStorage. Keduanya berbeda.

Katalog sela. menggunakan namespace `sela-v1-` agar stok, favorit, dan pesanan katalog KopiKu sebelumnya tidak terhubung ke produk baru yang berbeda. Data lama tidak dihapus dari browser; katalog baru dimulai dengan data terpisah.

Data tidak hilang ketika refresh, tetapi hanya berlaku pada browser dan origin yang sama. Data tidak tersinkron antarperangkat, localhost, dan hosting. Menghapus data situs akan menghapus penyimpanan ini. Pencarian, tab aktif, popup, dan promo yang sedang digunakan berada di state sementara.

Pembayaran adalah simulasi front-end. Tidak ada backend, akun pengguna, database bersama, gateway pembayaran, pengiriman pesanan, maupun stok bersama. Rating menggabungkan rating awal sebagai satu nilai dasar dengan rating ulasan pelanggan. ID ulasan, toast, dan notifikasi mendukung localhost, HTTPS, dan HTTP jaringan lokal tanpa mengharuskan crypto.randomUUID tersedia.

## Struktur utama

```text
uts-dea/
├── public/
│   ├── favicon.svg
│   └── images/                 15 foto JPEG lokal
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── MainContent.jsx
│   │   ├── Footer.jsx
│   │   ├── MenuCard.jsx
│   │   ├── Modal.jsx
│   │   ├── CartDrawer.jsx
│   │   ├── HistoryModal.jsx
│   │   ├── NotificationsModal.jsx
│   │   └── StarRating.jsx
│   ├── context/
│   │   ├── CartContext.jsx
│   │   ├── ToastContext.jsx
│   │   └── NotificationContext.jsx
│   ├── hooks/useLocalStorage.js
│   ├── data/menu.js
│   ├── utils/
│   │   ├── pricing.js
│   │   └── createId.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── eslint.config.js
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── IMAGE_CREDITS.md
└── README.md
```

## Pemeriksaan

Build produksi, ESLint, dan pengujian DOM alur pencarian, favorit, ulasan, stok maksimum, promo, checkout, struk, riwayat, reset, serta notifikasi dijalankan saat pembuatan. Kasus browser tanpa crypto.randomUUID turut diuji. Pemeriksaan visual langsung lintas ukuran browser belum tersedia di lingkungan pembuatan.

## Navigasi yang diperbarui

Header tetap sticky, dengan dua baris yang terpisah: brand dan akses Menu/Promo/Riwayat/Notifikasi/Keranjang di baris utama; pencarian berlabel di baris berikutnya. Pencarian tetap real-time, dan tombol Cari menu/Enter membawa pengguna ke hasil menu. Riwayat dan notifikasi memiliki label teks, badge, serta status popup untuk pembaca layar. Tombol keranjang menampilkan jumlah dan subtotal sebelum promo/pajak.

Pada ponsel, ringkasan keranjang muncul di bawah setelah ada barang, dengan jumlah dan subtotal agar bisa dibuka tanpa menggulir ke atas. Ruang bawah dan posisi toast menyesuaikan agar konten tidak tertutup. Hero, foto, daftar produk, palet, dan seluruh fungsi transaksi tetap sama. Penyimpanan sela-v1- dipertahankan sehingga data versi sela. sebelumnya tetap terbaca pada origin yang sama.

## Ukuran tampilan pada zoom browser 100%

Ukuran teks, kontrol, ruang, gambar, dan lebar maksimum konten menggunakan rem agar pembesaran antarmuka konsisten. Pada layar desktop mulai 1200px, skala bertambah secara responsif hingga mendekati tampilan zoom 125%, sementara browser tetap pada 100%. Pada viewport 1536px atau lebih lebar, ukuran dasar mencapai 20px dari 16px (125%). Pada tablet dan ponsel, ukuran dasar tetap mengikuti pengaturan browser. Breakpoint responsif dipertahankan. Tidak ada CSS zoom, transform scale pada seluruh halaman, atau pemaksaan zoom browser. Ukuran bisa berbeda sesuai lebar viewport dan pengaturan sistem.
