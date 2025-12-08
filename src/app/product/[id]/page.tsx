import Image from 'next/image'
import { Star, Calendar as CalendarIcon, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
// import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

// Dummy Data for Product Detail
const PRODUCT = {
    id: '1',
    name: 'JBL SRX835P Three-Way Bass Reflex',
    price: 1500000,
    description: 'The SRX835P is a three-way full range speaker featuring a 15” woofer, made for use as a main PA, monitor, or rear or side fill. Featuring JBL Legendary Sound, 2000 Watt amplification, and HiQnet network integration.',
    image: 'https://images.unsplash.com/photo-1545167622-3a6ac156bb0f?q=80&w=2070&auto=format&fit=crop',
    rating: 4.8,
    reviews_count: 124,
    specs: [
        { label: 'Power Rating', value: '2000W Peak, 1500W Continuous' },
        { label: 'Frequency Range', value: '33 Hz - 21 kHz' },
        { label: 'Max SPL', value: '137 dB' },
        { label: 'Coverage Pattern', value: '60° x 40°' },
        { label: 'Weight', value: '38.6 kg' },
    ],
    vendor: {
        name: 'Sound Pro Jakarta',
        avatar: 'https://github.com/shadcn.png',
    },
    reviews: [
        {
            id: 1,
            user: 'Alex Santoso',
            rating: 5,
            comment: 'Suara jernih banget, bass nendang. Recommended!',
            date: '2 days ago'
        },
        {
            id: 2,
            user: 'Budi Hartono',
            rating: 4,
            comment: 'Barang bagus, tapi pengiriman agak telat dikit.',
            date: '1 week ago'
        }
    ]
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    console.log("Viewing product:", id)

    return (
        <main className="min-h-screen py-12 px-4 md:px-8 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Column: Image */}
                <div className="space-y-4">
                    <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                        <Image
                            src={PRODUCT.image}
                            alt={PRODUCT.name}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {/* Thumbnails (Placeholder) */}
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 border border-gray-200 cursor-pointer hover:ring-2 ring-emerald-500">
                                <Image
                                    src={PRODUCT.image}
                                    alt={`Thumbnail ${i}`}
                                    fill
                                    className="object-cover opacity-70 hover:opacity-100 transition-opacity"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column: Details */}
                <div className="space-y-8">
                    <div>
                        <div className="flex items-center space-x-2 mb-2">
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold uppercase tracking-wide">
                                Sound System
                            </span>
                            <div className="flex items-center text-yellow-500">
                                <Star className="h-4 w-4 fill-current" />
                                <span className="ml-1 text-sm font-medium text-gray-900">{PRODUCT.rating}</span>
                                <span className="ml-1 text-sm text-gray-500">({PRODUCT.reviews_count} reviews)</span>
                            </div>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{PRODUCT.name}</h1>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            {PRODUCT.description}
                        </p>
                    </div>

                    <div className="flex items-end space-x-2">
                        <span className="text-4xl font-bold text-gray-900">Rp {PRODUCT.price.toLocaleString('id-ID')}</span>
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

                    {/* Specifications */}
                    <div className="border-t border-gray-200 pt-8">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Technical Specifications</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8">
                            {PRODUCT.specs.map((spec, idx) => (
                                <div key={idx} className="flex justify-between border-b border-gray-100 pb-2">
                                    <span className="text-gray-500">{spec.label}</span>
                                    <span className="font-medium text-gray-900">{spec.value}</span>
                                </div>
                            ))}
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
                            <Image src={PRODUCT.vendor.avatar} alt={PRODUCT.vendor.name} fill className="object-cover" />
                        </div>
                        <div>
                            <div className="font-bold text-gray-900">{PRODUCT.vendor.name}</div>
                            <div className="text-sm text-gray-500">Verified Vendor</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <section className="mt-16 border-t border-gray-200 pt-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Customer Reviews</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {PRODUCT.reviews.map((review) => (
                        <div key={review.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">
                                        {review.user.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900">{review.user}</div>
                                        <div className="text-xs text-gray-500">{review.date}</div>
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
            </section>
        </main>
    )
}
