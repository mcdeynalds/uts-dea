import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ToastProvider } from './context/ToastContext';
import { NotificationProvider } from './context/NotificationContext';
import { CartProvider } from './context/CartContext';
import './index.css';
createRoot(document.getElementById('root')).render(<StrictMode><ToastProvider><NotificationProvider><CartProvider><App/></CartProvider></NotificationProvider></ToastProvider></StrictMode>);
