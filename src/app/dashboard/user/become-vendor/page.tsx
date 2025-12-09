'use client'

import { useActionState } from 'react'
import { registerVendor } from './actions'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

const initialState = {
    error: '',
}

export default function BecomeVendorPage() {
    // @ts-ignore
    const [state, formAction, isPending] = useActionState(registerVendor, initialState)

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Become a Vendor</h1>
                <p className="text-muted-foreground">Start your business and reach more customers.</p>
            </div>

            <Card>
                <form action={formAction}>
                    <CardHeader>
                        <CardTitle>Store Information</CardTitle>
                        <CardDescription>
                            Tell us about your rental business.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="store-name">Store Name</Label>
                            <Input id="store-name" name="store-name" placeholder="Rio's Sound Systems" required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description (Optional)</Label>
                            <Textarea id="description" name="description" placeholder="We provide high-end sound equipment for..." />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="address">Address</Label>
                            <Textarea id="address" name="address" placeholder="Jln. Sudirman No..." required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <div className="flex space-x-2">
                                <select
                                    name="country-code"
                                    className="flex h-10 w-[100px] items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    defaultValue="+62"
                                >
                                    <option value="+62">🇮🇩 +62</option>
                                    <option value="+1">🇺🇸 +1</option>
                                    <option value="+60">🇲🇾 +60</option>
                                    <option value="+65">🇸🇬 +65</option>
                                    <option value="+81">🇯🇵 +81</option>
                                    <option value="+61">🇦🇺 +61</option>
                                </select>
                                <Input
                                    id="phone"
                                    name="local-phone"
                                    placeholder="81234567890"
                                    className="flex-1"
                                />
                            </div>
                        </div>

                        {state?.error && (
                            <p className="text-sm text-red-500">{state.error}</p>
                        )}
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={isPending}>
                            {isPending ? 'Registering...' : 'Register Store'}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}
