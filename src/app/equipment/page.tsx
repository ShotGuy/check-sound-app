
import ProductCard from '@/components/ProductCard'
import { createClient } from '@/utils/supabase/server'

export default async function EquipmentPage() {
    const supabase = await createClient()

    const { data: products } = await supabase
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

    return (
        <main className="min-h-screen py-12 px-6 max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Equipment</h1>
                <p className="text-gray-600">Browse our collection of professional sound and lighting gear.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products?.map((product: any) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        image={product.images?.[0] || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1000'}
                        rating={5.0}
                        category={product.categories?.name || 'Equipment'}
                    />
                ))}

                {(!products || products.length === 0) && (
                    <div className="col-span-full text-center text-gray-500 py-12">
                        No equipment found.
                    </div>
                )}
            </div>
        </main>
    )
}
