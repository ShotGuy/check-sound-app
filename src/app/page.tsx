import Link from 'next/link'
import { Button } from '@/components/ui/button'
import ProductCard from '@/components/ProductCard'

// Dummy Data
const PRODUCTS = [
  {
    id: '1',
    name: 'JBL SRX835P Three-Way Bass Reflex',
    price: 1500000,
    image: 'https://images.unsplash.com/photo-1545167622-3a6ac156bb0f?q=80&w=2070&auto=format&fit=crop',
    rating: 4.8,
    category: 'Sound System'
  },
  {
    id: '2',
    name: 'Yamaha CL5 Digital Mixing Console',
    price: 3500000,
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop',
    rating: 5.0,
    category: 'Mixers'
  },
  {
    id: '3',
    name: 'Moving Head Beam 230W',
    price: 750000,
    image: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=2070&auto=format&fit=crop',
    rating: 4.5,
    category: 'Lighting'
  },
  {
    id: '4',
    name: 'Shure SM58 Microphone Kit (4 pcs)',
    price: 500000,
    image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=2070&auto=format&fit=crop',
    rating: 4.9,
    category: 'Sound System'
  },
]

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center bg-black text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-50">
          {/* Placeholder for Hero Image */}
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">Check Sound.</h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Everything you need to light up your next event.
          </p>
          <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-8 py-6 text-lg rounded-full">
            Explore Equipment
          </Button>
        </div>
      </section>

      {/* Featured Equipment */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Featured Equipment</h2>
          <Link href="/equipment" className="text-emerald-600 font-medium hover:underline">
            View all
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>
    </main>
  )
}
