
import { createClient } from '@/utils/supabase/server'
import { Card, CardContent } from '@/components/ui/card'
import { Star } from 'lucide-react'
import Image from 'next/image'

export default async function VendorReviewsPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    // 1. Get Store ID
    const { data: store } = await supabase
        .from('stores')
        .select('id')
        .eq('vendor_id', user!.id)
        .single()

    // 2. Fetch Reviews linked to this Store's Products
    // We need to join reviews -> products and filter by store_id
    // However, Supabase simple join syntax is limited. 
    // Standard approach: Get all product IDs first, then get reviews.

    // Get product IDs
    const { data: products } = await supabase
        .from('products')
        .select('id, name, images')
        .eq('store_id', store?.id)

    const productIds = products?.map(p => p.id) || []

    // Get reviews for these products
    let reviews: any[] = []
    if (productIds.length > 0) {
        const { data } = await supabase
            .from('reviews')
            .select(`
                *,
                profiles (full_name)
            `)
            .in('product_id', productIds)
            .order('created_at', { ascending: false })

        reviews = data || []
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Reviews & Ratings</h1>
                <p className="text-gray-500">See what customers are saying about your equipment.</p>
            </div>

            <div className="space-y-4">
                {reviews.length === 0 ? (
                    <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-12 text-center">
                        <div className="mx-auto h-12 w-12 text-gray-400 mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                            <Star className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No reviews yet</h3>
                        <p className="mt-2 text-gray-500 max-w-sm mx-auto">
                            Reviews will appear here once customers start rating your rented equipment.
                        </p>
                    </div>
                ) : (
                    reviews.map((review) => {
                        const product = products?.find(p => p.id === review.product_id)
                        return (
                            <Card key={review.id} className="border-gray-100 shadow-sm">
                                <CardContent className="p-6">
                                    <div className="flex justify-between items-start">
                                        <div className="flex space-x-4">
                                            <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold flex-shrink-0">
                                                {review.profiles?.full_name?.charAt(0) || 'U'}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900">{review.profiles?.full_name || 'Anonymous User'}</h4>
                                                <div className="text-sm text-gray-500 mb-2">{new Date(review.created_at).toLocaleDateString()}</div>
                                                <div className="flex items-center text-yellow-400 mb-2">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`} />
                                                    ))}
                                                </div>
                                                <p className="text-gray-700">{review.comment}</p>
                                            </div>
                                        </div>
                                        {product && (
                                            <div className="flex items-center space-x-3 bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
                                                <div className="relative h-10 w-10 rounded overflow-hidden">
                                                    <Image src={product.images?.[0]} alt={product.name} fill className="object-cover" />
                                                </div>
                                                <div className="text-xs font-medium text-gray-700 max-w-[100px] truncate">
                                                    {product.name}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })
                )}
            </div>
        </div>
    )
}
