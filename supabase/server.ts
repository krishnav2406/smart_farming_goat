import { createServerClient } from "@supabase/ssr";
import type { CookieOptions } from "@supabase/ssr";
import type { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

// Helper function to safely check if next/headers is available
// without requiring it during build time
const isAppRouterContext = () => {
  try {
    // Check for App Router by checking if we're on the server and window is not defined
    if (typeof window === 'undefined') {
      // Only attempt to use headers in a server context
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
};

// Function to dynamically import and use cookies from next/headers
const getNextCookies = async () => {
  try {
    // Dynamically import next/headers only when needed
    const { cookies } = await import('next/headers');
    return cookies();
  } catch (e) {
    console.error('Failed to load next/headers:', e);
    return null;
  }
};

export const createClient = async () => {
  // If we're in an App Router context (server component), use next/headers
  if (isAppRouterContext()) {
    try {
      const cookieStore = await getNextCookies();
      
      // If we successfully got cookies, use them
      if (cookieStore) {
        return createServerClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          {
            cookies: {
              getAll() {
                return cookieStore.getAll().map(({ name, value }) => ({
                  name,
                  value,
                }));
              },
              setAll(cookiesToSet) {
                cookiesToSet.forEach(({ name, value, options }) => {
                  cookieStore.set(name, value, options);
                });
              },
            },
          }
        );
      }
    } catch (e) {
      console.error('Error setting up Supabase client with next/headers:', e);
      // Fall through to the fallback client
    }
  } 
  
  // Fallback for Pages Router or if next/headers failed
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // Return empty cookies for getAll in non-App Router contexts
        getAll() {
          return [];
        },
        // No-op for setAll in non-App Router contexts
        setAll() {
          // Cannot set cookies in this context
        },
      },
    }
  );
};
