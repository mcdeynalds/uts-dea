export const promos = { UTS25: 0.25, HEMAT10: 0.1, KOPI15: 0.15 };
export const rupiah = (amount) => `Rp ${new Intl.NumberFormat('id-ID').format(amount)}`;
export const calculatePricing = (items, code = '') => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = Math.round(subtotal * (promos[code] || 0));
  const tax = Math.round((subtotal - discount) * 0.1);
  return { subtotal, discount, tax, total: subtotal - discount + tax };
};
export const dateLabel = (date) => new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(date));
