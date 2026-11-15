import { createContext, useContext, useReducer, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { useNotifications } from './NotificationContext';
import { menu } from '../data/menu';
import { calculatePricing } from '../utils/pricing';
const CartContext = createContext(null);
export const useCart = () => useContext(CartContext);
export const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET': return action.items;
    case 'ADD': return state.some(i => i.id === action.id) ? state.map(i => i.id === action.id ? { ...i, quantity: i.quantity + 1 } : i) : [...state, { id: action.id, quantity: 1 }];
    case 'DECREASE': return state.map(i => i.id === action.id ? { ...i, quantity: i.quantity - 1 } : i).filter(i => i.quantity > 0);
    case 'REMOVE': return state.filter(i => i.id !== action.id);
    default: return state;
  }
};
const initialStock = Object.fromEntries(menu.map(item => [item.id, item.stock]));
export function CartProvider({ children }) {
  const [savedCart, saveCart] = useLocalStorage('cart', []);
  const [cart, dispatch] = useReducer(cartReducer, savedCart);
  const [stocks, setStocks] = useLocalStorage('stocks', initialStock);
  const [history, setHistory] = useLocalStorage('history', []);
  const { notify } = useNotifications();
  useEffect(() => saveCart(cart), [cart, saveCart]);
  const items = cart.map(item => ({ ...menu.find(m => m.id === item.id), quantity: item.quantity }));
  const add = (id) => {
    const product = menu.find(m => m.id === id);
    const quantity = cart.find(i => i.id === id)?.quantity || 0;
    if (quantity >= stocks[id]) { notify(`Stok ${product.name} sudah mencapai batas.`, 'warning'); return; }
    dispatch({ type: 'ADD', id }); notify(`${product.name} ditambahkan ke keranjang.`);
  };
  const decrease = (id) => { dispatch({ type: 'DECREASE', id }); notify('Jumlah pesanan diperbarui.'); };
  const remove = (id) => { dispatch({ type: 'REMOVE', id }); notify('Menu dihapus dari keranjang.'); };
  const checkout = (code) => {
    if (!items.length) return null;
    if (items.some(i => i.quantity > stocks[i.id])) { notify('Stok berubah. Periksa jumlah pesanan.', 'warning'); return null; }
    const order = { id: `SL-${Date.now().toString().slice(-7)}`, date: new Date().toISOString(), items, code, ...calculatePricing(items, code) };
    setStocks(prev => { const next = { ...prev }; items.forEach(i => { next[i.id] -= i.quantity; }); return next; });
    setHistory(prev => [order, ...prev]); dispatch({ type: 'SET', items: [] }); notify('Pembayaran berhasil! Terima kasih sudah memesan.'); return order;
  };
  const reset = () => { setStocks(initialStock); setHistory([]); dispatch({ type: 'SET', items: [] }); notify('Stok, keranjang, dan riwayat transaksi berhasil direset.'); };
  return <CartContext.Provider value={{ items, stocks, history, add, decrease, remove, checkout, reset, count: cart.reduce((sum, i) => sum + i.quantity, 0) }}>{children}</CartContext.Provider>;
}
