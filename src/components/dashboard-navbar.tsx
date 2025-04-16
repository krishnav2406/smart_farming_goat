"use client";

import Link from "next/link";
import { createClient } from "../../supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import {
  UserCircle,
  Home,
  Cloud,
  Droplet,
  Leaf,
  Package,
  BarChart3,
  LayoutDashboard,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export default function DashboardNavbar() {
  const supabase = createClient();
  const router = useRouter();
  const pathname = usePathname();

  const navLinks = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      href: "/weather-forecasting",
      label: "Weather",
      icon: <Cloud className="h-5 w-5" />,
    },
    {
      href: "/soil-monitoring",
      label: "Live News",
      icon: <Droplet className="h-5 w-5" />,
    },
    {
      href: "/crop-health-analysis",
      label: "Crops",
      icon: <Leaf className="h-5 w-5" />,
    },
    {
      href: "/inventory-management",
      label: "Inventory",
      icon: <Package className="h-5 w-5" />,
    },
    {
      href: "/financial-analytics",
      label: "Finance",
      icon: <BarChart3 className="h-5 w-5" />,
    },
  ];

  return (
    <nav className="w-full border-b border-gray-200 bg-white py-4 sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            prefetch
            className="text-xl font-bold flex items-center gap-2"
          >
            <span className="text-primary">🌱</span> FarmSmart
          </Link>

          <div className="hidden md:flex items-center gap-1 ml-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors
                    ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                >
                  {link.icon}
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <Link href="/" className="mr-2">
            <Button variant="outline" size="icon">
              <Home className="h-5 w-5" />
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <UserCircle className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => {
                  supabase.auth.signOut()
                    .then(() => {
                      router.refresh();
                    })
                    .catch(error => {
                      console.error('Error signing out:', error);
                    });
                }}
              >
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
