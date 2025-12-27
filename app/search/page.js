'use client'

import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { formatPrice } from '../util/Script'

const Globe = dynamic(() => import('react-globe.gl'), { ssr: false })

export default function SearchPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const globeEl = useRef()

    const city = searchParams.get('city')

    const [properties, setProperties] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedProperty, setSelectedProperty] = useState(null)

    useEffect(() => {
        if (!globeEl.current) return

        globeEl.current.controls().autoRotate = true
        globeEl.current.controls().autoRotateSpeed = 0.5

        globeEl.current.pointOfView(
            { lat: 20.5937, lng: 78.9629, altitude: 2 },
            1000
        )
    }, [])

    useEffect(() => {
        async function fetchProperties() {
            setLoading(true)
            setSelectedProperty(null)

            try {
                let url = "http://localhost:8080/api/properties";
                url = city ? url + `city=${city}` : url
                const res = await fetch(
                    url
                )

                if (!res.ok) throw new Error('Failed to fetch properties')

                const data = await res.json()

                const mapped = data.map(p => ({
                    id: p.id,
                    name: p.title,
                    city: p.city,
                    price: formatPrice(p.price),
                    lat: p.latitude,
                    lng: p.longitude,
                    beds: p.numBedrooms,
                    baths: p.numBathrooms,
                    sqft: p.squareFeet,
                    image: p.imageUrl
                }))

                setProperties(mapped)
            } catch (err) {
                console.error(err)
                setProperties([])
            } finally {
                setLoading(false)
            }
        }

        fetchProperties()
    }, [city])

    const handlePropertyClick = property => {
        setSelectedProperty(property)

        if (globeEl.current) {
            globeEl.current.pointOfView(
                { lat: property.lat, lng: property.lng, altitude: 1.5 },
                1000
            )
        }
    }

    return (
        <div className="min-h-screen bg-gray-900 relative">
            <nav className="absolute top-0 w-full bg-black/30 backdrop-blur-sm border-b border-white/10 z-50">
                <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold text-white">
                        BuyBnB
                    </Link>

                    <div className="flex space-x-4">
                        <Link href="/properties" className="text-white hover:text-rose-400">
                            List View
                        </Link>
                        <Link href="/" className="text-white hover:text-rose-400">
                            Home
                        </Link>
                    </div>
                </div>
            </nav>

            <div className="w-full h-screen">
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center text-white z-40">
                        Loading properties in {city}…
                    </div>
                )}

                {!loading && (
                    <Globe
                        ref={globeEl}
                        globeImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg"
                        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
                        bumpImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png"
                        pointsData={properties}
                        pointLat="lat"
                        pointLng="lng"
                        pointColor={() => '#ef4444'}
                        pointAltitude={0.1}
                        pointRadius={0.3}
                        pointLabel={d => `
              <div style="background:white;padding:12px;border-radius:8px">
                <div style="font-weight:600">${d.name}</div>
                <div style="color:#ef4444;font-weight:700">${d.price}</div>
                <div style="font-size:12px;color:#666">
                  ${d.beds} beds • ${d.baths} baths • ${d.sqft} sqft
                </div>
              </div>
            `}
                        onPointClick={handlePropertyClick}
                        atmosphereColor="rgba(239,68,68,0.3)"
                        atmosphereAltitude={0.15}
                    />
                )}
            </div>

            <div className="absolute top-20 left-4 w-80 max-h-[calc(100vh-6rem)] overflow-y-auto bg-white/95 rounded-2xl shadow-2xl p-4">
                <h2 className="text-xl font-bold mb-4">
                    Properties in {city} ({properties.length})
                </h2>

                {properties.map(p => (
                    <div
                        key={p.id}
                        onClick={() => handlePropertyClick(p)}
                        className={`p-4 rounded-lg cursor-pointer border-2 mb-3 ${selectedProperty?.id === p.id
                            ? 'border-rose-500'
                            : 'border-transparent'
                            }`}
                    >
                        <h3 className="font-semibold text-sm">{p.name}</h3>
                        <p className="text-rose-500 font-bold">{p.price}</p>
                        <div className="text-xs text-gray-600">
                            {p.beds} beds • {p.baths} baths • {p.sqft} sqft
                        </div>
                    </div>
                ))}
            </div>

            {selectedProperty && (
                <div className="absolute bottom-8 right-8 w-96 bg-white rounded-2xl shadow-2xl overflow-hidden">
                    <div className="relative h-48">
                        <img
                            src={selectedProperty.image}
                            alt={selectedProperty.name}
                            className="h-48 w-full object-cover"
                        />

                        <button
                            onClick={() => setSelectedProperty(null)}
                            className="absolute top-3 right-3 bg-white/90 hover:bg-white rounded-full p-2 shadow transition cursor-pointer"
                            aria-label="Close"
                        >
                            <svg
                                className="w-4 h-4 text-gray-800"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>


                    <div className="p-6">
                        <h3 className="text-2xl font-bold">
                            {selectedProperty.name}
                        </h3>
                        <p className="text-3xl font-bold text-rose-500 mb-4">
                            {selectedProperty.price}
                        </p>

                        <div className="flex justify-between text-gray-600 mb-6">
                            <span>{selectedProperty.beds} beds</span>
                            <span>{selectedProperty.baths} baths</span>
                            <span>{selectedProperty.sqft} sqft</span>
                        </div>

                        <button
                            onClick={() =>
                                router.push(`/property/${selectedProperty.id}`)
                            }
                            className="w-full bg-rose-500 text-white py-3 rounded-lg font-semibold"
                        >
                            View Details
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
