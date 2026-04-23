'use client';
import { useState } from 'react';
import Section from '@/components/ui/Section';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useOrderStore, useProductStore } from '@/lib/store';

export default function Admin() {
  const [tab, setTab] = useState('orders');
  const { orders, updateOrderStatus } = useOrderStore();
  const { products, addProduct, deleteProduct } = useProductStore();
  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: '' });

  const handleAddProduct = () => {
    if(!newProduct.name) return;
    addProduct({ id: Date.now().toString(), ...newProduct, price: Number(newProduct.price) });
    setNewProduct({ name: '', price: '', category: '' });
  };

  return (
    <Section title='Admin Dashboard'>
      <div className='flex gap-4 mb-8 border-b border-pink-100 pb-4'>
        <button onClick={() => setTab('orders')} className={`font-heading text-lg ${tab === 'orders' ? 'text-gold' : 'text-secondary'}`}>Orders</button>
        <button onClick={() => setTab('products')} className={`font-heading text-lg ${tab === 'products' ? 'text-gold' : 'text-secondary'}`}>Products</button>
      </div>

      {tab === 'orders' && (
        <div>
          <h3 className='font-heading text-xl mb-4'>Recent Orders</h3>
          {orders.length === 0 ? <p className='text-secondary'>No orders yet.</p> : (
            <div className='flex flex-col gap-4'>
              {orders.map(o => (
                <div key={o.id} className='bg-white border border-pink-50 p-6 rounded-[16px] flex flex-col md:flex-row justify-between items-start md:items-center shadow-sm gap-4'>
                  <div>
                    <p className='font-bold'>Order #{o.id}</p>
                    <p className='text-secondary text-sm'>{o.date} | ₹{o.total}</p>
                    <p className='text-xs mt-2 text-blue-500 cursor-pointer'>View Payment Screenshot</p>
                  </div>
                  <div className='flex items-center gap-4'>
                    <select value={o.status} onChange={(e) => updateOrderStatus(o.id, e.target.value)} className='bg-ivory border border-pink-100 rounded-[8px] px-3 py-2 text-sm'>
                      <option value='Pending Verification'>Pending Verification</option>
                      <option value='Verified'>Verified</option>
                      <option value='Shipped'>Shipped</option>
                      <option value='Delivered'>Delivered</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === 'products' && (
        <div>
          <h3 className='font-heading text-xl mb-4'>Add Product</h3>
          <div className='flex flex-col md:flex-row gap-4 mb-8'>
            <Input placeholder='Name' value={newProduct.name} onChange={(e:any) => setNewProduct({...newProduct, name: e.target.value})} />
            <Input placeholder='Price' type='number' value={newProduct.price} onChange={(e:any) => setNewProduct({...newProduct, price: e.target.value})} />
            <Input placeholder='Category' value={newProduct.category} onChange={(e:any) => setNewProduct({...newProduct, category: e.target.value})} />
            <Button onClick={handleAddProduct}>Add</Button>
          </div>

          <h3 className='font-heading text-xl mb-4'>Manage Inventory</h3>
          <div className='flex flex-col gap-4'>
            {products.map(p => (
              <div key={p.id} className='bg-white border border-pink-50 p-4 rounded-[16px] flex justify-between items-center shadow-sm'>
                <div>
                  <p className='font-bold'>{p.name}</p>
                  <p className='text-secondary text-sm'>₹{p.price} | {p.category}</p>
                </div>
                <button onClick={() => deleteProduct(p.id)} className='text-red-400 hover:underline'>Delete</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </Section>
  );
}
