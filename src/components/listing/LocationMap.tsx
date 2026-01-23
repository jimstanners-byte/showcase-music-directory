'use client';
import { useEffect, useRef, useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { Listing } from '@/types/database';

interface LocationMapProps {
  listing: Listing;
}

export function LocationMap({ listing }: LocationMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const hasCoordinates = listing.latitude && listing.longitude;

  useEffect(() => {
    async function fetchApiKey() {
      try {
        const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
        if (!key) {
          console.error('Google Maps API key not found');
          return;
        }
        setApiKey(key);
      } catch (err) {
        console.error('Failed to fetch maps API key:', err);
      }
    }
    
    if (hasCoordinates) {
      fetchApiKey();
    }
  }, [hasCoordinates]);

  useEffect(() => {
    if (!hasCoordinates || !mapRef.current || !apiKey) return;

    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.head.appendChild(script);
    } else {
      initMap();
    }

    function initMap() {
      if (!mapRef.current || !listing.latitude || !listing.longitude) return;

      const position = { lat: listing.latitude, lng: listing.longitude };

      mapInstanceRef.current = new google.maps.Map(mapRef.current, {
        center: position,
        zoom: 15,
        mapTypeControl: true,
        mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.DEFAULT,
          position: google.maps.ControlPosition.TOP_LEFT,
        },
        streetViewControl: true,
        fullscreenControl: true,
      });

      new google.maps.Marker({
        position: position,
        map: mapInstanceRef.current,
      });
    }
  }, [hasCoordinates, listing.latitude, listing.longitude, apiKey]);

  if (!hasCoordinates) {
    const addressParts = [
      listing.address,
      listing.town_city,
      listing.country
    ].filter(Boolean);

    if (addressParts.length === 0) return null;

    return (
      <div className="flex items-start gap-2 text-muted-foreground">
        <MapPin className="h-4 w-4 mt-1 shrink-0" />
        <span>{addressParts.join(', ')}</span>
      </div>
    );
  }

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${listing.latitude},${listing.longitude}`;

  return (
    <div>
      <div className="flex justify-end mb-2">
        <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline">
          <Navigation className="h-4 w-4" />
          Get Directions
        </a>
      </div>
      <div className="rounded-lg overflow-hidden border bg-card">
        <div ref={mapRef} className="w-full h-[300px]" />
      </div>
    </div>
  );
}