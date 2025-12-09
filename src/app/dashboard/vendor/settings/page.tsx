
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { createClient } from '@/utils/supabase/server'

export default async function VendorSettingsPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    // Fetch current store settings
    const { data: store } = await supabase
        .from('stores')
        .select('*')
        .eq('vendor_id', user!.id)
        .single()

    return (
        <div className="max-w-2xl space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Settings</h1>
                <p className="text-gray-500">Manage your store profile and preferences.</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6 space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="storeName">Store Name</Label>
                    <Input id="storeName" defaultValue={store?.name} placeholder="Enter your store name" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        defaultValue={store?.description}
                        placeholder="Tell us about your rental business..."
                        className="h-32"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" defaultValue={store?.address} placeholder="Store location" />
                </div>

                <div className="pt-4">
                    <Button className="bg-emerald-500 hover:bg-emerald-600">
                        Save Changes
                    </Button>
                </div>
            </div>
        </div>
    )
}
