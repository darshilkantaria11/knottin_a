// /app/dashboard/page.js
import Link from 'next/link';

export default function Dashboard() {
    return (
        <div className="min-h-screen bg-g3 p-8">
            {/* Page Header */}
            <div className="text-center mb-12">
                <h1 className="text-5xl font-extrabold text-g4 mb-2">Knottin Daycare</h1>
                <p className="text-xl text-black">Admin Dashboard</p>
            </div>

            {/* Option Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {/* Add Position to Career Page */}
                <Link href="/add-position">
                    <div className="group block bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 hover:scale-105 transform">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-g2 mb-4 group-hover:text-g4 transition-colors">
                                Add Position to Career Page
                            </h2>
                            <p className="text-gray-600">
                                Manage and add new job positions to your career page easily.
                            </p>
                        </div>
                        {/* Decorative icon */}
                        <div className="mt-6 flex justify-center">
                            <svg className="w-12 h-12 text-g2 group-hover:text-g4 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                            </svg>
                        </div>
                    </div>
                </Link>

                {/* Add Slots */}
                <Link href="/add-slots">
                    <div className="group block bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 hover:scale-105 transform">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-g2 mb-4 group-hover:text-g4 transition-colors">
                                Add Slots
                            </h2>
                            <p className="text-gray-600">
                                Manage and add available slots for parents to visit and explore campus.
                            </p>
                        </div>
                        {/* Decorative icon */}
                        <div className="mt-6 flex justify-center">
                            <svg className="w-12 h-12 text-g2 group-hover:text-g4 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                            </svg>
                        </div>
                    </div>
                </Link>
            </div>

            {/* Footer */}
            <div className="mt-16 text-center">
                <p className="text-sm text-gray-800">© 2024 Knottin Daycare. All rights reserved.</p>
            </div>
        </div>
    );
}
