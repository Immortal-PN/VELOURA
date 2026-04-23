'use client';
import { useState } from 'react';
import { useAuthStore } from '@/lib/store';
import Section from '@/components/ui/Section';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const login = useAuthStore(s => s.login);
  const router = useRouter();

  const handleLogin = () => {
    login({ email, name: 'Veloura User' });
    router.push('/account');
  };

  return (
    <Section title='Login'>
      <div className='max-w-md mx-auto'>
        <Input placeholder='Email' value={email} onChange={(e: any) => setEmail(e.target.value)} className='mb-4' />
        <Input placeholder='Password' type='password' className='mb-6' />
        <Button className='w-full' onClick={handleLogin}>Login</Button>
      </div>
    </Section>
  );
}
