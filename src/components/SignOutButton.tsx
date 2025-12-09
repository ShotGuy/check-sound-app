'use client'

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface SignOutButtonProps extends React.ComponentProps<typeof Button> {
    children: React.ReactNode
}

export default function SignOutButton({ children, onClick, ...props }: SignOutButtonProps) {
    const router = useRouter()

    const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault() // Prevent form submission if inside a form, though we won't put it in one

        if (window.confirm("Are you sure you want to sign out?")) {
            try {
                const response = await fetch('/auth/signout', {
                    method: 'POST',
                    redirect: 'follow'
                })

                if (response.ok || response.redirected || response.status === 302) {
                    // Force full page refresh to clear client caches/states
                    window.location.href = '/login'
                }
            } catch (error) {
                console.error("Logout failed", error)
            }
        }
    }

    return (
        <Button onClick={handleLogout} {...props}>
            {children}
        </Button>
    )
}
