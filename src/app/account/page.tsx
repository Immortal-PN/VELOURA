'use client';
import { useAuthStore, useOrderStore } from '@/lib/store';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

export default function Account() {
  const user = useAuthStore(s => s.user);
  const logout = useAuthStore(s => s.logout);
  const orders = useOrderStore(s => s.orders);
  const router = useRouter();

  if (!user) {
    return (
      <Section title='Account'>
        <div className='text-center'>
          <p className='mb-4'>Please login to view your account.</p>
          <Button onClick={() => router.push('/login')}>Login</Button>
        </div>
      </Section>
    );
  }

  return (
    <Section title='My Dashboard'>
      <div className='mb-8 flex justify-between items-center bg-ivory p-6 rounded-[16px]'>
        <div>
          <h2 className='font-heading text-2xl'>Welcome, {user.name}</h2>
          <p className='text-secondary'>{user.email}</p>
        </div>
        <Button variant='secondary' onClick={() => { logout(); router.push('/'); }}>Logout</Button>
      </div>

      <h3 className='font-heading text-xl mb-4'>Order History</h3>
      {orders.length === 0 ? (
        <p className='text-secondary'>No orders found.</p>
      ) : (
        <div className='flex flex-col gap-4'>
          {orders.map(o => (
            <div key={o.id} className='bg-white border border-pink-50 p-6 rounded-[16px] flex justify-between items-center shadow-sm'>
              <div>
                <p className='font-bold'>Order #{o.id}</p>
                <p className='text-secondary text-sm'>{o.date}</p>
              </div>
              <div>
                <p className='font-medium'>?{o.total}</p>
                <span className='inline-block px-3 py-1 bg-lavender/30 text-primary rounded-full text-xs'>{o.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}
