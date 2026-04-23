'use client';
import Button from '@/components/ui/Button';
import ProductCard from '@/components/ui/ProductCard';
import Section from '@/components/ui/Section';
import { products } from '@/lib/data';
import { motion } from 'framer-motion';

export default function Home() {
  const featured = products.slice(0, 4);
  return (
    <div className="flex flex-col">
      <section className="min-h-[80vh] flex items-center justify-center bg-blush/20 px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-2xl"
        >
          <h1 className="text-5xl md:text-6xl font-heading mb-6 leading-tight">Luxury That Feels Expensive. Isn't.</h1>
          <p className="text-lg text-secondary mb-8 font-body">A luxurious e-commerce experience designed to make every woman feel elegant and confident.</p>
          <Button variant="primary">Shop Now</Button>
        </motion.div>
      </section>
      
      <Section title="Featured Collection" className="bg-ivory">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {featured.map(p => (
            <ProductCard key={p.id} id={p.id} name={p.name} price={p.price} />
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <Button variant="secondary">View All</Button>
        </div>
      </Section>

      <Section className="bg-gradient-to-b from-lavender/30 to-ivory text-center py-24">
        <h2 className="text-3xl md:text-4xl font-heading mb-16">Why Veloura?</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 className="font-heading text-xl mb-4 text-gold">Designed for You</h3>
            <p className="text-secondary text-sm">Timeless designs that complement every you.</p>
          </div>
          <div>
            <h3 className="font-heading text-xl mb-4 text-gold">Premium Quality</h3>
            <p className="text-secondary text-sm">Finest materials for long-lasting shine.</p>
          </div>
          <div>
            <h3 className="font-heading text-xl mb-4 text-gold">Made with Care</h3>
            <p className="text-secondary text-sm">Thoughtfully crafted with love and precision.</p>
          </div>
          <div>
            <h3 className="font-heading text-xl mb-4 text-gold">Since with Trust</h3>
            <p className="text-secondary text-sm">Loved by thousands of happy customers.</p>
          </div>
        </div>
      </Section>
    </div>
  );
}
