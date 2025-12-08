import Link from 'next/link'
import { Search, User, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createClient } from '@/utils/supabase/server'

export default async function Navbar() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

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
                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-300 hidden sm:inline">{user.email}</span>
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <User className="h-5 w-5" />
                            </Button>
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
