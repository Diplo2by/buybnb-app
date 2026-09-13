import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(244,63,94,0.08),transparent_28%)]" />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-lg rounded-3xl border border-gray-200 bg-white shadow-xl p-8 md:p-10 text-center">
          <div className="flex justify-center mb-6">
            <svg
              width="180"
              height="140"
              viewBox="0 0 180 140"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Ground line */}
              <line
                x1="10"
                y1="120"
                x2="170"
                y2="120"
                stroke="#fda4af"
                strokeWidth="2"
                strokeDasharray="4 4"
              />

              {/* Crane base */}
              <rect
                x="118"
                y="108"
                width="14"
                height="12"
                rx="1"
                fill="#e11d48"
              />
              {/* Crane mast */}
              <rect
                x="122"
                y="30"
                width="6"
                height="80"
                rx="1"
                fill="#f43f5e"
              />
              {/* Crane jib (horizontal arm) */}
              <rect x="60" y="28" width="80" height="6" rx="1" fill="#f43f5e" />
              {/* Counter jib */}
              <rect
                x="128"
                y="28"
                width="20"
                height="6"
                rx="1"
                fill="#fb7185"
              />
              {/* Counterweight */}
              <rect
                x="142"
                y="34"
                width="10"
                height="10"
                rx="1"
                fill="#be123c"
              />
              {/* Cab */}
              <rect
                x="118"
                y="32"
                width="12"
                height="10"
                rx="1"
                fill="#be123c"
              />
              {/* Cable */}
              <line
                x1="72"
                y1="34"
                x2="72"
                y2="70"
                stroke="#fb7185"
                strokeWidth="2"
              />
              {/* Hook block */}
              <rect
                x="66"
                y="70"
                width="12"
                height="10"
                rx="1"
                fill="#e11d48"
              />

              {/* Building being built (stacked blocks) */}
              <rect
                x="20"
                y="86"
                width="26"
                height="34"
                fill="#fecdd3"
                stroke="#fb7185"
                strokeWidth="2"
              />
              <rect
                x="20"
                y="70"
                width="26"
                height="14"
                fill="#fecdd3"
                stroke="#fb7185"
                strokeWidth="2"
              />
              <line
                x1="20"
                y1="94"
                x2="46"
                y2="94"
                stroke="#fb7185"
                strokeWidth="1.5"
              />
              <line
                x1="20"
                y1="106"
                x2="46"
                y2="106"
                stroke="#fb7185"
                strokeWidth="1.5"
              />
              <line
                x1="33"
                y1="70"
                x2="33"
                y2="120"
                stroke="#fb7185"
                strokeWidth="1.5"
              />

              {/* Traffic cone */}
              <polygon points="150,120 158,96 166,120" fill="#e11d48" />
              <rect
                x="148"
                y="118"
                width="20"
                height="4"
                rx="1"
                fill="#be123c"
              />
              <rect x="152" y="106" width="12" height="4" fill="#fecdd3" />
            </svg>
          </div>

          <p className="text-rose-500 text-5xl md:text-6xl font-black uppercase tracking-[0.25em] mb-4">
            404
          </p>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4">
            Page still under construction
          </h1>

          <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
            The page you are looking for is not listed yet.
          </p>

          <Link
            href="/"
            className="inline-flex items-center justify-center bg-rose-500 hover:bg-rose-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md shadow-rose-500/20 transition-colors"
          >
            Go back window shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
