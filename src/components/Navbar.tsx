
import Link from 'next/link'
import { Search, User, Menu, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createClient } from '@/utils/supabase/server'
import SignOutButton from '@/components/SignOutButton'

export default async function Navbar() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    let profile = null
    if (user) {
        const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
        profile = data
    }

    return (
        <nav className="bg-black text-white py-4 px-6 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold tracking-tighter">
                    Check Sound.
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-300">
                    <Link href="/" className="hover:text-white transition-colors">Home</Link>
                    <Link href="/equipment" className="hover:text-white transition-colors">Equipment</Link>
                    <Link href="/vendors" className="hover:text-white transition-colors">Vendors</Link>
                </div>

                {/* Search & Auth */}
                <div className="flex items-center space-x-4">
                    <div className="relative hidden md:block w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                        <Input
                            type="search"
                            placeholder="Search equipment..."
                            className="pl-9 bg-gray-900 border-gray-800 text-white placeholder:text-gray-500 focus-visible:ring-emerald-500"
                        />
                    </div>

                    {user ? (
                        <div className="flex items-center space-x-4">
                            <div className="flex flex-col items-end hidden sm:flex">
                                <span className="text-sm font-medium text-white">{profile?.full_name || user.email}</span>
                                <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold bg-emerald-400/10 px-1.5 py-0.5 rounded">
                                    {profile?.role || 'USER'}
                                </span>
                            </div>

                            <div className="flex items-center space-x-1">
                                <Link href="/dashboard">
                                    <Button variant="ghost" size="icon" className="rounded-full text-gray-300 hover:text-white hover:bg-white/10" title="Dashboard">
                                        <User className="h-5 w-5" />
                                    </Button>
                                </Link>

                                <SignOutButton variant="ghost" size="icon" className="rounded-full text-red-400 hover:text-red-300 hover:bg-red-900/20" title="Sign Out">
                                    <LogOut className="h-5 w-5" />
                                </SignOutButton>
                            </div>
                        </div>
                    ) : (
                        <Link href="/login">
                            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold">
                                Login
                            </Button>
                        </Link>
                    )}

                    <Button variant="ghost" size="icon" className="md:hidden text-white">
                        <Menu className="h-6 w-6" />
                    </Button>
                </div>
            </div>
        </nav>
    )
}
