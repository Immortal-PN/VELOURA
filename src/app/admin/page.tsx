'use client';
import { useState } from 'react';
import Section from '@/components/ui/Section';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useOrderStore, useProductStore } from '@/lib/store';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('orders');
  const { orders, updateOrderStatus } = useOrderStore();
  const { products, addProduct, deleteProduct } = useProductStore();
  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: '' });

  const handleAddProduct = () => {
    if(!newProduct.name) return;
    addProduct({ id: Date.now().toString(), ...newProduct, price: Number(newProduct.price) });
    setNewProduct({ name: '', price: '', category: '' });
  };

  return (
    <Section className="py-12">
      <div className="flex flex-col md:flex-row gap-8 min-h-[60vh]">
        {/* Sidebar */}
        <div className="w-full md:w-1/4">
          <div className="bg-ivory p-6 rounded-2xl border border-blush/30 sticky top-24">
            <h3 className="font-heading text-xl mb-6 text-primary border-b border-blush/30 pb-4">Admin Panel</h3>
            <div className="flex flex-col gap-2">
              <button onClick={() => setActiveTab('dashboard')} className={`text-left px-4 py-3 rounded-xl transition-colors ${activeTab === 'dashboard' ? 'bg-gold text-white' : 'hover:bg-blush/20 text-secondary'}`}>Overview</button>
              <button onClick={() => setActiveTab('orders')} className={`text-left px-4 py-3 rounded-xl transition-colors ${activeTab === 'orders' ? 'bg-gold text-white' : 'hover:bg-blush/20 text-secondary'}`}>Manage Orders</button>
              <button onClick={() => setActiveTab('products')} className={`text-left px-4 py-3 rounded-xl transition-colors ${activeTab === 'products' ? 'bg-gold text-white' : 'hover:bg-blush/20 text-secondary'}`}>Inventory</button>
              <button onClick={() => setActiveTab('customers')} className={`text-left px-4 py-3 rounded-xl transition-colors ${activeTab === 'customers' ? 'bg-gold text-white' : 'hover:bg-blush/20 text-secondary'}`}>Customers</button>
              <button onClick={() => setActiveTab('settings')} className={`text-left px-4 py-3 rounded-xl transition-colors ${activeTab === 'settings' ? 'bg-gold text-white' : 'hover:bg-blush/20 text-secondary'}`}>Settings</button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="w-full md:w-3/4">
          {activeTab === 'dashboard' && (
            <div>
              <h2 className='font-heading text-3xl mb-6 text-primary'>Admin Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl border border-blush/30 shadow-sm">
                  <h4 className="text-secondary mb-2">Total Revenue</h4>
                  <p className="text-3xl font-heading text-primary">₹1,24,500</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-blush/30 shadow-sm">
                  <h4 className="text-secondary mb-2">Pending Orders</h4>
                  <p className="text-3xl font-heading text-primary">{orders.filter(o => o.status === 'Pending Verification').length}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-blush/30 shadow-sm">
                  <h4 className="text-secondary mb-2">Total Products</h4>
                  <p className="text-3xl font-heading text-primary">{products.length}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div>
              <h3 className='font-heading text-2xl mb-6'>Manage Orders</h3>
              {orders.length === 0 ? <p className='text-secondary'>No orders yet.</p> : (
                <div className='flex flex-col gap-4'>
                  {orders.map(o => (
                    <div key={o.id} className='bg-white border border-pink-50 p-6 rounded-[16px] flex flex-col md:flex-row justify-between items-start md:items-center shadow-sm gap-4 hover:shadow-md transition-shadow'>
                      <div>
                        <p className='font-bold text-lg text-primary'>Order #{o.id}</p>
                        <p className='text-secondary text-sm'>{o.date} | ₹{o.total}</p>
                        <p className='text-xs mt-2 text-gold font-medium cursor-pointer hover:underline'>View Payment Screenshot</p>
                      </div>
                      <div className='flex items-center gap-4'>
                        <select value={o.status} onChange={(e) => updateOrderStatus(o.id, e.target.value)} className='bg-ivory border border-pink-100 rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:border-gold'>
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

          {activeTab === 'products' && (
            <div>
              <h3 className='font-heading text-2xl mb-6'>Add New Product</h3>
              <div className='flex flex-col md:flex-row gap-4 mb-12 bg-white p-6 rounded-2xl border border-blush/30 shadow-sm'>
                <Input placeholder='Product Name' value={newProduct.name} onChange={(e:any) => setNewProduct({...newProduct, name: e.target.value})} className="flex-1" />
                <Input placeholder='Price (₹)' type='number' value={newProduct.price} onChange={(e:any) => setNewProduct({...newProduct, price: e.target.value})} className="w-32" />
                <Input placeholder='Category' value={newProduct.category} onChange={(e:any) => setNewProduct({...newProduct, category: e.target.value})} className="w-48" />
                <Button onClick={handleAddProduct}>Add Product</Button>
              </div>

              <h3 className='font-heading text-2xl mb-6'>Inventory</h3>
              <div className='flex flex-col gap-4'>
                {products.map(p => (
                  <div key={p.id} className='bg-white border border-pink-50 p-6 rounded-[16px] flex justify-between items-center shadow-sm hover:shadow-md transition-shadow'>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-blush/20 rounded-lg"></div>
                      <div>
                        <p className='font-bold text-lg text-primary'>{p.name}</p>
                        <p className='text-secondary text-sm'>₹{p.price} | {p.category}</p>
                      </div>
                    </div>
                    <button onClick={() => deleteProduct(p.id)} className='text-red-400 hover:text-red-600 transition-colors bg-red-50 px-4 py-2 rounded-lg'>Delete</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'customers' && (
            <div>
              <h3 className='font-heading text-2xl mb-6'>Customers</h3>
              <p className='text-secondary'>Customer list will appear here.</p>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h3 className='font-heading text-2xl mb-6'>Store Settings</h3>
              <p className='text-secondary'>Store configuration options.</p>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
