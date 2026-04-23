'use client';
import Link from 'next/link';
import { useCartStore, useWishlistStore } from '@/lib/store';

export default function Navbar() {
  const cartItems = useCartStore((state) => state.items);
  const wishlistItems = useWishlistStore((state) => state.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  return (
    <nav className='flex justify-between items-center px-8 py-4 sticky top-0 bg-ivory z-50 border-b border-pink-100'>
      <Link href='/' className='font-heading text-2xl font-bold'>VELOURA</Link>
      <div className='flex gap-8 items-center'>
        <Link href='/shop'>Shop</Link>
        <Link href='/help'>Help</Link>
        <Link href='/cart' className='relative'>Cart {cartCount > 0 && <span className='absolute -top-2 -right-4 bg-gold text-white text-xs rounded-full h-5 w-5 flex items-center justify-center'>{cartCount}</span>}</Link>
        <Link href='/account' className='relative'>Wishlist {wishlistCount > 0 && <span className='absolute -top-2 -right-4 bg-blush text-primary text-xs rounded-full h-5 w-5 flex items-center justify-center'>{wishlistCount}</span>}</Link>
      </div>
    </nav>
  );
}
