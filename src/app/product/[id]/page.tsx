
import Image from 'next/image'
import { Star, Calendar as CalendarIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'

// Force Rebuild Check
export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const supabase = await createClient()

    // 1. Fetch Product & Store Info
    const { data: product } = await supabase
        .from('products')
        .select(`
            *,
            categories (name),
            stores (
                id,
                name,
                image_url,
                description
            )
        `)
        .eq('id', id)
        .single()

    if (!product) {
        notFound()
    }

    // 2. Fetch Reviews (Optional/Empty for now)
    const { data: reviews } = await supabase
        .from('reviews')
        .select(`
            *,
            profiles (full_name)
        `)
        .eq('product_id', id)

    // Calculate Rating
    const reviewsCount = reviews?.length || 0
    const ratingSum = reviews?.reduce((acc, r) => acc + r.rating, 0) || 0
    const avgRating = reviewsCount > 0 ? (ratingSum / reviewsCount).toFixed(1) : 'N/A'


    return (
        <main className="min-h-screen py-12 px-4 md:px-8 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Column: Image */}
                <div className="space-y-4">
                    <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                        {/* Fallback image logic */}
                        <Image
                            src={product.images?.[0] || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1000'}
                            alt={product.name}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    {/* Only show thumbnails if multiple images exist */}
                    {product.images && product.images.length > 1 && (
                        <div className="grid grid-cols-4 gap-4">
                            {product.images.map((img: string, i: number) => (
                                <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 border border-gray-200 cursor-pointer hover:ring-2 ring-emerald-500">
                                    <Image
                                        src={img}
                                        alt={`Thumbnail ${i}`}
                                        fill
                                        className="object-cover opacity-70 hover:opacity-100 transition-opacity"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right Column: Details */}
                <div className="space-y-8">
                    <div>
                        <div className="flex items-center space-x-2 mb-2">
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold uppercase tracking-wide">
                                {product.categories?.name || 'Equipment'}
                            </span>
                            <div className="flex items-center text-yellow-500">
                                <Star className="h-4 w-4 fill-current" />
                                <span className="ml-1 text-sm font-medium text-gray-900">{avgRating}</span>
                                <span className="ml-1 text-sm text-gray-500">({reviewsCount} reviews)</span>
                            </div>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            {product.description}
                        </p>
                    </div>

                    <div className="flex items-end space-x-2">
                        <span className="text-4xl font-bold text-gray-900">Rp {product.price.toLocaleString('id-ID')}</span>
                        <span className="text-gray-500 mb-2">/ day</span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button size="lg" className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-lg h-14">
                            Rent Now
                        </Button>
                        <Button size="lg" variant="outline" className="flex-1 font-semibold text-lg h-14">
                            Contact Vendor
                        </Button>
                    </div>

                    {/* Specifications (Hardcoded for now as schema doesn't have specs field yet, setting empty or generic) */}
                    <div className="border-t border-gray-200 pt-8">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Stock Information</h3>
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-500">Available Stock</span>
                            <span className="font-medium text-gray-900">{product.stock} Units</span>
                        </div>
                    </div>

                    {/* Availability */}
                    <div className="border-t border-gray-200 pt-8">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                            <CalendarIcon className="h-5 w-5 mr-2 text-emerald-600" />
                            Availability
                        </h3>
                        <div className="p-4 bg-gray-100 rounded text-gray-500">Calendar temporarily unavailable</div>
                    </div>

                    {/* Vendor Info */}
                    <div className="border-t border-gray-200 pt-8 flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden relative">
                            {/* Vendor Avatar / Store Image */}
                            <Image src={product.stores?.image_url || 'https://github.com/shadcn.png'} alt={product.stores?.name} fill className="object-cover" />
                        </div>
                        <div>
                            <div className="font-bold text-gray-900">{product.stores?.name}</div>
                            <div className="text-sm text-gray-500">Verified Vendor</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <section className="mt-16 border-t border-gray-200 pt-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Customer Reviews ({reviewsCount})</h2>
                {reviewsCount === 0 ? (
                    <p className="text-gray-500">No reviews yet. Be the first to rent this item!</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {reviews?.map((review: any) => (
                            <div key={review.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">
                                            {review.profiles?.full_name?.charAt(0) || 'U'}
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-900">{review.profiles?.full_name || 'Anonymous user'}</div>
                                            <div className="text-xs text-gray-500">{new Date(review.created_at).toLocaleDateString()}</div>
                                        </div>
                                    </div>
                                    <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`} />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-gray-600">{review.comment}</p>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </main>
    )
}
