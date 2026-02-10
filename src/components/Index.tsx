'use client';

import Link from 'next/link';
import { Layout } from "@/components/Layout";
import { HomeStatsBar } from "@/components/HomeStatsBar";
import { ClientLogoTicker } from "@/components/ClientLogoTicker";
import { SearchAutocomplete } from "@/components/SearchAutocomplete";

export default function Index() {
  return (
    <Layout>
      {/* Hero Section - Blue to Cyan gradient */}
      <section
        className="relative py-10 sm:py-16 md:py-20"
        style={{
          background:
            "linear-gradient(90deg, #1565c0 0%, #1669c4 15%, #176ec8 30%, #1873cc 45%, #1a7dcf 55%, #1c8ad0 65%, #20a5b8 75%, #25c0bc 88%, #2dd4bf 100%)",
        }}
      >
        <div className="container text-center space-y-4 sm:space-y-6">
          <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            The only fully comprehensive online resource for the music production industry. Find suppliers, venues,
            studios, business contacts and more.
          </p>

          {/* Search Panel - Pink to Purple gradient */}
          <div
            className="max-w-xl mx-auto p-6 rounded-2xl shadow-xl"
            style={{
              background: "linear-gradient(135deg, #ec4899 0%, #d946ef 35%, #a855f7 65%, #8b5cf6 100%)",
            }}
          >
            {/* Override search input styling */}
            <div className="[&_input]:bg-white [&_input]:text-gray-800 [&_input]:placeholder-gray-500">
              <SearchAutocomplete />
            </div>

            <div className="pt-4 text-center">
              <Link href="/sectors" className="text-white/90 hover:text-white text-sm font-medium transition-colors">
                Not sure? Browse all Sectors
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/*Stats Bar*/}
      <HomeStatsBar />
      {/*Featured Client Logo Ticker*/}
      <ClientLogoTicker />
    </Layout>
  );
}