'use client';
import { useState } from 'react';
import Section from '@/components/ui/Section';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useCartStore, useOrderStore } from '@/lib/store';
import Link from 'next/link';

export default function Checkout() {
  const [step, setStep] = useState(1);
  const [details, setDetails] = useState({ name: '', phone: '', address: '' });
  const [orderId, setOrderId] = useState('');
  
  const { items, clearCart } = useCartStore();
  const createOrder = useOrderStore(s => s.createOrder);
  const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleCreateOrder = () => {
    const id = 'VL' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(id);
    createOrder({ id, total, status: 'Pending Verification', date: new Date().toLocaleDateString(), items });
    clearCart();
    setStep(3);
  };

  if (items.length === 0 && step === 1) return <Section title='Checkout'><p className='text-center'>Cart is empty.</p></Section>;

  return (
    <Section title='Checkout'>
      {step === 1 && (
        <div className='max-w-xl mx-auto'>
          <h3 className='font-heading text-xl mb-4'>Shipping Details</h3>
          <Input placeholder='Full Name' value={details.name} onChange={(e:any) => setDetails({...details, name: e.target.value})} className='mb-4' />
          <Input placeholder='Phone Number' value={details.phone} onChange={(e:any) => setDetails({...details, phone: e.target.value})} className='mb-4' />
          <Input placeholder='Address' value={details.address} onChange={(e:any) => setDetails({...details, address: e.target.value})} className='mb-6' />
          <Button className='w-full' onClick={() => setStep(2)}>Continue to Payment</Button>
        </div>
      )}

      {step === 2 && (
        <div className='max-w-xl mx-auto text-center'>
          <h3 className='font-heading text-xl mb-4'>Scan & Pay</h3>
          <p className='text-secondary mb-8'>Total: ₹{total}</p>
          <div className='w-48 h-48 bg-gray-200 mx-auto mb-8 flex items-center justify-center text-gray-400'>[GPay QR]</div>
          <div className='border-2 border-dashed border-gray-300 rounded-[16px] p-8 mb-8'>
            <p className='text-secondary mb-4'>Upload Payment Screenshot</p>
            <input type='file' className='block mx-auto' />
          </div>
          <Button className='w-full' onClick={handleCreateOrder}>Confirm Order</Button>
        </div>
      )}

      {step === 3 && (
        <div className='max-w-xl mx-auto text-center bg-ivory p-8 rounded-[16px] border border-pink-100'>
          <div className='w-16 h-16 bg-gold text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-6'>✓</div>
          <h3 className='font-heading text-2xl mb-2'>Thank You!</h3>
          <p className='text-secondary mb-6'>Your order has been placed.</p>
          <p className='font-bold mb-8'>Order ID: {orderId}</p>
          <a href={`https://wa.me/1234567890?text=Hello,%20I%20have%20placed%20order%20${orderId}.`} target='_blank' rel='noreferrer'>
            <Button className='w-full mb-4 bg-green-500 hover:bg-green-600 border-none !text-white'>Share on WhatsApp</Button>
          </a>
          <Link href='/account'><Button variant='secondary' className='w-full'>View Order</Button></Link>
        </div>
      )}
    </Section>
  );
}
