'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function registerVendor(prevState: any, formData: FormData) {
    const supabase = await createClient()

    // 1. Get current user
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        return { error: 'You must be logged in' }
    }

    // 2. Extract Data
    const name = formData.get('store-name') as string
    const description = formData.get('description') as string
    const address = formData.get('address') as string

    const countryCode = formData.get('country-code') as string
    const localPhone = formData.get('local-phone') as string
    const phone = `${countryCode}${localPhone}`

    if (!name || !address) {
        return { error: 'Store name and address are required' }
    }

    // 3. Insert Store
    const { error: storeError } = await supabase.from('stores').insert({
        name,
        description,
        address: address,
        phone,
        vendor_id: user.id
    })

    // Correction: If the schema logic relies on a trigger on auth.users to create a store, this would be duplicate. 
    // But usually "Become a Vendor" is manual.
    // Wait, if I get a column error on "phone" or "address", I'll fix it.

    if (storeError) {
        console.error('Store creation failed:', storeError)
        return { error: 'Failed to create store: ' + storeError.message }
    }

    // 4. Update Profile Role
    const { error: profileError } = await supabase
        .from('profiles')
        .update({ role: 'vendor' })
        .eq('id', user.id)

    if (profileError) {
        console.error('Profile update failed:', profileError)
        return { error: 'Failed to update user role' }
    }

    // 5. Revalidate and Redirect
    revalidatePath('/', 'layout')
    redirect('/dashboard/vendor')
}
