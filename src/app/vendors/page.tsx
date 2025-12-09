
import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { Card, CardContent } from '@/components/ui/card'
import { MapPin } from 'lucide-react'

export default async function VendorsPage() {
    const supabase = await createClient()

    const { data: stores } = await supabase
        .from('stores')
        .select('*')

    return (
        <main className="min-h-screen py-12 px-6 max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Our Vendors</h1>
                <p className="text-gray-600">Trusted rental partners ready to serve your event needs.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stores?.map((store: any) => (
                    <Link key={store.id} href={`/vendors/${store.id}`} className="block group">
                        <Card className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300">
                            <div className="relative h-40 bg-gray-100">
                                <Image
                                    src={store.image_url || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1000'}
                                    alt={store.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <CardContent className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{store.name}</h3>
                                <p className="text-gray-600 line-clamp-2 text-sm mb-4">{store.description}</p>
                                {store.address && (
                                    <div className="flex items-start text-gray-500 text-sm">
                                        <MapPin className="h-4 w-4 mr-1.5 mt-0.5 flex-shrink-0" />
                                        <span>{store.address}</span>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </Link>
                ))}

                {(!stores || stores.length === 0) && (
                    <div className="col-span-full text-center text-gray-500 py-12">
                        No vendors found.
                    </div>
                )}
            </div>
        </main>
    )
}
