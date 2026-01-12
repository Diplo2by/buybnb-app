'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const { user, logout, isAuthenticated } = useAuth();
    const [showUserMenu, setShowUserMenu] = useState(false);

    const handleLogout = () => {
        logout();
        setShowUserMenu(false);
    };

    return (
        <>
            <nav className="fixed top-0 w-full bg-white border-b border-gray-200 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link href="/" className="flex items-center mt-4">
                            <Image
                                src="/buybnb.webp"
                                alt="BuyBnB"
                                width={120}
                                height={40}
                                priority
                            />
                        </Link>

                        <div className="hidden md:flex items-center space-x-8">
                            <Link
                                href="/search"
                                className="text-gray-700 hover:text-rose-500 font-medium"
                            >
                                Explore Properties
                            </Link>
                            <Link
                                href="/list-property"
                                className="text-gray-700 hover:text-rose-500 font-medium"
                            >
                                List Your Property
                            </Link>
                        </div>

                        <div className="flex items-center space-x-4">
                            {isAuthenticated() ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setShowUserMenu(!showUserMenu)}
                                        className="flex items-center space-x-2 text-gray-700 hover:text-rose-500 font-medium"
                                    >
                                        <div className="w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center text-white font-semibold">
                                            {user?.firstName?.[0].toUpperCase() + user?.lastName?.[0].toUpperCase() || user?.username?.[0] || 'U'}
                                        </div>
                                        <span className="hidden sm:inline">
                                            {user?.firstName || user?.username}
                                        </span>
                                        <svg
                                            className={`w-4 h-4 transition-transform ${showUserMenu ? 'rotate-180' : ''
                                                }`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </button>

                                    {showUserMenu && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                                            <Link
                                                href="/profile"
                                                className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                                                onClick={() => setShowUserMenu(false)}
                                            >
                                                My Profile
                                            </Link>
                                            <Link
                                                href="/my-properties"
                                                className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                                                onClick={() => setShowUserMenu(false)}
                                            >
                                                My Properties
                                            </Link>
                                            <Link
                                                href="/favorites"
                                                className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                                                onClick={() => setShowUserMenu(false)}
                                            >
                                                Favorites
                                            </Link>
                                            <hr className="my-1" />
                                            <button
                                                onClick={handleLogout}
                                                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-50"
                                            >
                                                Sign out
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        className="text-gray-700 hover:text-rose-500 font-medium"
                                    >
                                        Sign in
                                    </Link>
                                    <Link
                                        href="/signup"
                                        className="bg-rose-500 text-white px-4 py-2 rounded-lg hover:bg-rose-600 font-medium transition-colors"
                                    >
                                        Sign up
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {showUserMenu && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowUserMenu(false)}
                />
            )}
        </>
    );
}