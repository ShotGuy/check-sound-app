
import { createClient } from '@/utils/supabase/server'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default async function UserRentalsPage() {
    const supabase = await createClient()

    // In a real scenario, we would fetch bookings/rentals from Supabase here
    // const { data: rentals } = await supabase.from('bookings').select('*')...
    const rentals: any[] = [] // Placeholder

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">My Rentals</h1>
                <p className="text-muted-foreground">Manage your current and past equipment rentals.</p>
            </div>

            {rentals.length > 0 ? (
                <div className="grid gap-4">
                    {/* Rental items will go here */}
                </div>
            ) : (
                <Card className="text-center py-12">
                    <CardContent>
                        <p className="text-gray-500 mb-4">You haven't rented any equipment yet.</p>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
