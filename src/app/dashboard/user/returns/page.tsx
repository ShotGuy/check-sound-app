
import { createClient } from '@/utils/supabase/server'
import { Card, CardContent } from '@/components/ui/card'

export default async function UserReturnsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Returns</h1>
                <p className="text-muted-foreground">Track the status of your equipment returns.</p>
            </div>

            <Card className="text-center py-12">
                <CardContent>
                    <p className="text-gray-500">No active return requests found.</p>
                </CardContent>
            </Card>
        </div>
    )
}
