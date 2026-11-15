import { Star } from 'lucide-react';
export default function StarRating({ value, onChange }) {
  return <div className="star-input" role="group" aria-label="Pilih rating">{[1, 2, 3, 4, 5].map(star => <button type="button" key={star} aria-label={`${star} bintang`} aria-pressed={value === star} onClick={() => onChange(star)}><Star size={28} fill={star <= value ? 'currentColor' : 'none'}/></button>)}</div>;
}
