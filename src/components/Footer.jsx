import { Coffee, Heart, ArrowUpRight } from 'lucide-react';
export default function Footer() {
  return (
    <footer>
      <div className="footer-main page-width">
        <div><a href="#" className="brand footer-brand"><Coffee size={30} /><span>sela<span className="brand-accent">.</span></span></a><p>Ruang jeda, rasa beda.<br />Coffee, bites, and your kind of happy.</p></div>
        <div className="footer-message"><span>YOUR DAILY PAUSE, REIMAGINED.</span><h3>Sedikit jeda.<br />Banyak cerita.</h3></div>
        <a className="footer-link" href="#menu">Ketemu di tegukan berikutnya <ArrowUpRight size={19} /></a>
      </div>
      <div className="footer-bottom page-width"><span>© 2026 sela. · Dibuat dengan <Heart size={12} /> oleh <b>Dea Afrilia</b></span><span>UTS React Fundamental 2026</span></div>
    </footer>
  );
}
