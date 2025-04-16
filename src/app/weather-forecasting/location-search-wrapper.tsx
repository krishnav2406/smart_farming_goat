'use client';

import { useRouter } from 'next/navigation';
import LocationSearch from '@/components/location-search';
import { useState } from 'react';

export default function LocationSearchWrapper({ defaultLocation = 'Chennai, India' }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLocationSelect = (location: string) => {
    // Show loading state
    setIsLoading(true);
    
    // Add a cache buster to force fresh data
    const cacheBuster = Date.now();
    const url = `/weather-forecasting?location=${encodeURIComponent(location)}&t=${cacheBuster}`;
    
    // Navigate to the new URL with the selected location
    router.push(url);
    
    // Force a full page refresh to ensure fresh data
    // This is more reliable than just using router.push which might use cached data
    setTimeout(() => {
      window.location.href = url;
    }, 100);
  };

  if (isLoading) {
    return (
      <div className="w-full md:w-64 flex items-center justify-center h-10 rounded bg-gray-100">
        <div className="animate-spin h-5 w-5 border-2 border-blue-500 rounded-full border-t-transparent"></div>
        <span className="ml-2 text-sm text-gray-600">Loading...</span>
      </div>
    );
  }

  return (
    <LocationSearch 
      onLocationSelect={handleLocationSelect} 
      defaultLocation={defaultLocation}
      className="w-full md:w-64"
    />
  );
} 