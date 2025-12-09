import Link from 'next/link'
import { Button } from '@/components/ui/button'
import ProductCard from '@/components/ProductCard'
import { createClient } from '@/utils/supabase/server'

export default async function Home() {
  const supabase = await createClient()

  const { data: products, error } = await supabase
    .from('products')
    .select(`
      *,
      categories (
        name
      ),
      stores (
        name,
        image_url
      )
    `)

  console.log('Products:', products)
  console.log('Error:', error)

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center bg-black text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-50">
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
          {products?.map((product: any) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.images?.[0] || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1000'}
              rating={5.0} // Placeholder until we have reviews
              category={product.categories?.name || 'Equipment'}
            />
          ))}
          {(!products || products.length === 0) && (
            <div className="col-span-full text-center text-gray-500 py-12">
              No equipment found. Please run the seed script or add products manually.
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
