import Image from 'next/image'
import Link from 'next/link'
import { Star } from 'lucide-react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'

interface ProductCardProps {
    id: string
    name: string
    price: number
    image: string
    rating: number
    category: string
}

export default function ProductCard({ id, name, price, image, rating, category }: ProductCardProps) {
    return (
        <Link href={`/product/${id}`}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow border-none shadow-sm">
                <div className="relative h-48 w-full bg-gray-100">
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-cover"
                    />
                </div>
                <CardContent className="p-4">
                    <div className="text-xs text-emerald-600 font-medium mb-1 uppercase tracking-wide">{category}</div>
                    <h3 className="font-semibold text-lg leading-tight mb-2 text-gray-900">{name}</h3>
                    <div className="flex items-center mb-2">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="text-sm font-medium text-gray-700">{rating.toFixed(1)}</span>
                    </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex items-center justify-between">
                    <div className="text-lg font-bold text-gray-900">
                        Rp {price.toLocaleString('id-ID')}
                        <span className="text-xs font-normal text-gray-500 ml-1">/ day</span>
                    </div>
                </CardFooter>
            </Card>
        </Link>
    )
}
