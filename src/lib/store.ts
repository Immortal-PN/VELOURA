import { create } from 'zustand';
import { products as defaultProducts } from './data';

type CartItem = { id: string; name: string; price: number; quantity: number };

interface CartStore {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  addToCart: (item) => set((state) => {
    const existing = state.items.find(i => i.id === item.id);
    if (existing) {
      return { items: state.items.map(i => i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i) };
    }
    return { items: [...state.items, item] };
  }),
  removeFromCart: (id) => set((state) => ({ items: state.items.filter(i => i.id !== id) })),
  updateQuantity: (id, qty) => set((state) => ({ items: state.items.map(i => i.id === id ? { ...i, quantity: qty } : i) })),
  clearCart: () => set({ items: [] })
}));

interface WishlistStore {
  items: string[];
  toggleWishlist: (id: string) => void;
}

export const useWishlistStore = create<WishlistStore>((set) => ({
  items: [],
  toggleWishlist: (id) => set((state) => ({
    items: state.items.includes(id) ? state.items.filter(i => i !== id) : [...state.items, id]
  }))
}));

interface AuthStore {
  user: any;
  login: (user: any) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null })
}));

interface OrderStore {
  orders: any[];
  createOrder: (order: any) => void;
  updateOrderStatus: (id: string, status: string) => void;
}

export const useOrderStore = create<OrderStore>((set) => ({
  orders: [],
  createOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
  updateOrderStatus: (id, status) => set((state) => ({ orders: state.orders.map(o => o.id === id ? { ...o, status } : o) }))
}));

interface ProductStore {
  products: any[];
  addProduct: (product: any) => void;
  deleteProduct: (id: string) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: defaultProducts,
  addProduct: (product) => set((state) => ({ products: [product, ...state.products] })),
  deleteProduct: (id) => set((state) => ({ products: state.products.filter(p => p.id !== id) }))
}));
