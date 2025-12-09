import { createClient } from '@/utils/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Package, RefreshCw, CreditCard, ShoppingBag } from 'lucide-react'

export default async function UserDashboard() {
    const supabase = await createClient()

    // Fetch current user
    const { data: { user } } = await supabase.auth.getUser()

    // Basic stats (Placeholder logic - would query real bookings table later)
    const stats = [
        { title: "Active Rentals", value: "0", icon: Package, color: "text-blue-600 bg-blue-100" },
        { title: "Pending Returns", value: "0", icon: RefreshCw, color: "text-orange-600 bg-orange-100" },
        { title: "Total Spent", value: "Rp 0", icon: CreditCard, color: "text-green-600 bg-green-100" },
        { title: "Total Orders", value: "0", icon: ShoppingBag, color: "text-purple-600 bg-purple-100" },
    ]

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">Welcome back, {user?.email}!</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                    <Card key={index}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {stat.title}
                            </CardTitle>
                            <div className={`p-2 rounded-full ${stat.color}`}>
                                <stat.icon className="h-4 w-4" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-sm text-gray-500 text-center py-8">
                            No recent activity found.
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Upcoming Returns</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-sm text-gray-500 text-center py-8">
                            No upcoming returns.
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
