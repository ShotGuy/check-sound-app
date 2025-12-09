'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
    LayoutDashboard,
    User,
    List,
    RotateCcw,
    CreditCard,
    Store,
    ShoppingBag,
    Settings,
    LogOut,
    Package,
    Star
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import SignOutButton from '@/components/SignOutButton'

interface SidebarProps {
    userRole: 'user' | 'vendor' | 'admin'
}

export default function Sidebar({ userRole }: SidebarProps) {
    const pathname = usePathname()

    // Menu Items Configuration
    const userItems = [
        { icon: User, label: 'Profile', href: '/dashboard/user' },
        { icon: List, label: 'Rentals', href: '/dashboard/user/rentals' },
        { icon: RotateCcw, label: 'Returns', href: '/dashboard/user/returns' },
        { icon: CreditCard, label: 'Payments', href: '/dashboard/user/payments' },
        { icon: Store, label: 'Become a Vendor', href: '/dashboard/user/become-vendor' },
    ]

    const vendorItems = [
        { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard/vendor' },
        { icon: List, label: 'Listings', href: '/dashboard/vendor/listings' },
        { icon: ShoppingBag, label: 'Orders', href: '/dashboard/vendor/orders' },
        { icon: Star, label: 'Reviews', href: '/dashboard/vendor/reviews' },
        { icon: Settings, label: 'Settings', href: '/dashboard/vendor/settings' },
    ]

    const items = userRole === 'vendor' ? vendorItems : userItems

    return (
        <aside className="w-64 bg-white border-r border-gray-100 h-screen sticky top-0 flex flex-col hidden md:flex">
            <div className="p-6">
                <h2 className="text-xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
                    <Store className="h-6 w-6 text-emerald-500" />
                    <span>My Account</span>
                </h2>
                <div className="mt-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {userRole === 'vendor' ? 'Vendor Portal' : 'User Portal'}
                </div>
            </div>

            <nav className="flex-1 px-4 space-y-1">
                {items.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link key={item.href} href={item.href}>
                            <div className={cn(
                                "flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-emerald-50 text-emerald-700"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            )}>
                                <item.icon className={cn("h-5 w-5", isActive ? "text-emerald-500" : "text-gray-400")} />
                                <span>{item.label}</span>
                            </div>
                        </Link>
                    )
                })}
            </nav>

            <div className="p-4 border-t border-gray-100">
                <SignOutButton variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                </SignOutButton>
            </div>
        </aside>
    )
}
