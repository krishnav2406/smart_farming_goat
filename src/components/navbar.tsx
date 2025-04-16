import Link from "next/link";
import { createClient } from "../../supabase/server";
import ClientUserSection from "./client-user-section";
import { Cloud, Droplet, Sprout, Tractor, BarChart } from "lucide-react";
import ClientNavbar from "./client-navbar";

// Create a client-compatible version that doesn't use async/await
export default function Navbar() {
  // This component will be rendered on the server
  // and use the ClientNavbar for client-side interactions
  return <ClientNavbar />;
}
