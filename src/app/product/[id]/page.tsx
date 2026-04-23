'use client';
import { use } from 'react';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import { useProductStore, useCartStore, useWishlistStore } from '@/lib/store';

export default function Product({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const products = useProductStore(state => state.products);
  const product = products.find(p => p.id === resolvedParams.id);
  const addToCart = useCartStore(state => state.addToCart);
  const toggleWishlist = useWishlistStore(state => state.toggleWishlist);
  const isWishlisted = useWishlistStore(state => state.items.includes(resolvedParams.id));

  if (!product) return <Section><p>Product not found.</p></Section>;

  return (
    <Section>
      <div className='flex flex-col md:flex-row gap-16 mb-16'>
        <div className='w-full md:w-1/2 aspect-[4/5] bg-blush/20 rounded-[24px]'></div>
        <div className='w-full md:w-1/2 flex flex-col justify-center'>
          <h1 className='text-4xl font-heading mb-4'>{product.name}</h1>
          <p className='text-2xl text-secondary mb-4'>?{product.price}</p>
          <div className='flex items-center gap-2 mb-8'>
            <span className='text-gold'>?????</span>
            <span className='text-sm text-secondary'>(128 Reviews)</span>
          </div>
          <p className='text-secondary mb-8 leading-relaxed'>A delicate blend of elegance and charm. Crafted to make every moment special.</p>
          <ul className='mb-8 text-secondary space-y-2 text-sm'>
            <li>? Anti-tarnish</li>
            <li>? Premium finish</li>
            <li>? Skin friendly</li>
          </ul>
          <div className='flex gap-4'>
            <Button className='flex-1' onClick={() => {
              addToCart({ id: product.id, name: product.name, price: product.price, quantity: 1 });
              console.log('Analytics tracked: Added to Cart');
            }}>Add to Cart</Button>
            <Button variant='secondary' onClick={() => toggleWishlist(product.id)} className={isWishlisted ? 'bg-gold text-white' : ''}>? Wishlist</Button>
          </div>
        </div>
      </div>
      
      <div className='mt-16 border-t border-pink-100 pt-16'>
        <h3 className='font-heading text-2xl mb-8'>Customer Reviews</h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div className='p-6 bg-white border border-pink-50 rounded-2xl'>
            <div className='flex justify-between items-center mb-2'>
              <p className='font-bold'>Sarah M.</p>
              <span className='text-gold text-sm'>?????</span>
            </div>
            <p className='text-secondary text-sm'>Absolutely beautiful! The quality is amazing and it looks so elegant. I get compliments every time I wear it.</p>
          </div>
          <div className='p-6 bg-white border border-pink-50 rounded-2xl'>
            <div className='flex justify-between items-center mb-2'>
              <p className='font-bold'>Priya K.</p>
              <span className='text-gold text-sm'>?????</span>
            </div>
            <p className='text-secondary text-sm'>Bought this for my sister's birthday. The packaging was so premium and the product itself is gorgeous.</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
