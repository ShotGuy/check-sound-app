
export default function VendorOrdersPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Orders</h1>
                <p className="text-gray-500">Manage your incoming equipment rentals.</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-12 text-center">
                <div className="mx-auto h-12 w-12 text-gray-400 mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-xl">🛍️</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900">No orders yet</h3>
                <p className="mt-2 text-gray-500 max-w-sm mx-auto">
                    When users rent your equipment, their orders will appear here for you to approve and manage.
                </p>
            </div>
        </div>
    )
}
