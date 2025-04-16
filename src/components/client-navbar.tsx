'use client';

import Link from "next/link";
import ClientUserSection from "./client-user-section";
import { Cloud, Droplet, Sprout, Tractor, BarChart } from "lucide-react";
import { useUserData } from '@/hooks/use-supabase';

export default function ClientNavbar() {
  const { user, isLoading } = useUserData();
  
  return (
    <nav className="w-full border-b border-gray-200 bg-white py-2">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" prefetch className="text-xl font-bold mr-8">
            Logo
          </Link>

          {user && (
            <div className="hidden md:flex space-x-6">
              <Link
                href="/dashboard"
                className="flex items-center text-gray-600 hover:text-green-600 transition-colors"
              >
                <BarChart className="w-4 h-4 mr-1" />
                Dashboard
              </Link>
              <Link
                href="/weather-forecasting"
                className="flex items-center text-gray-600 hover:text-green-600 transition-colors"
              >
                <Cloud className="w-4 h-4 mr-1" />
                Weather
              </Link>
              <Link
                href="/soil-monitoring"
                className="flex items-center text-gray-600 hover:text-green-600 transition-colors"
              >
                <Droplet className="w-4 h-4 mr-1" />
                Live News
              </Link>
              <Link
                href="/crop-health-analysis"
                className="flex items-center text-gray-600 hover:text-green-600 transition-colors"
              >
                <Sprout className="w-4 h-4 mr-1" />
                Crops
              </Link>
              <Link
                href="/inventory-management"
                className="flex items-center text-gray-600 hover:text-green-600 transition-colors"
              >
                <Tractor className="w-4 h-4 mr-1" />
                Inventory
              </Link>
              <Link
                href="/financial-analytics"
                className="flex items-center text-gray-600 hover:text-green-600 transition-colors"
              >
                <BarChart className="w-4 h-4 mr-1" />
                Finances
              </Link>
            </div>
          )}
        </div>
        <div className="flex gap-4 items-center">
          <ClientUserSection user={user} />
        </div>
      </div>
    </nav>
  );
} 