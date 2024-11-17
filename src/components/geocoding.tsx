"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useDebounce } from "./debouncer";

// Geocoding component
interface GeocodingProps {
  address: string;
  onGeolocationFetch?: (latitude: number, longitude: number) => void;
}

export default function Geocoding({ address, onGeolocationFetch }: GeocodingProps) {
  const [geolocation, setGeolocation] = useState({ latitude: null, longitude: null });

  const debouncedFetchGeolocation = useDebounce(async () => {
    if (!address) return;

    try {
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY; // Use environment variable in production
      const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: { address, key: apiKey },
      });

      if (response.data.status === 'OK') {
        const location = response.data.results[0].geometry.location;
        setGeolocation({ latitude: location.lat, longitude: location.lng });
        if (onGeolocationFetch) {
          onGeolocationFetch(location.lat, location.lng); // Pass data back to parent
        }
      } else {
        console.error('Geocoding API error:', response.data.status);
      }
    } catch (error) {
      console.error('Error fetching geolocation:', error);
    }
  }, 1000);

  useEffect(() => {
    debouncedFetchGeolocation();
  }, [address, onGeolocationFetch]);
console.log(geolocation);
  return null; // No visible UI needed; purely functional
}
