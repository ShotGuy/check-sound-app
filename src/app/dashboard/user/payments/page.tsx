
import { createClient } from '@/utils/supabase/server'
import { Card, CardContent } from '@/components/ui/card'

export default async function UserPaymentsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Payments & Billing</h1>
                <p className="text-muted-foreground">View your payment history and invoices.</p>
            </div>

            <Card className="text-center py-12">
                <CardContent>
                    <p className="text-gray-500">No payment history available.</p>
                </CardContent>
            </Card>
        </div>
    )
}
