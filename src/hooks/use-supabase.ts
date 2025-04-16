'use client';

import { useSupabase as useSupabaseContext } from '@/providers/supabase-provider';
import { User, Session, AuthChangeEvent } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';

export function useSupabase() {
  const supabase = useSupabaseContext();
  return supabase;
}

// Helper hook to get current user data with a Promise-based approach
export function useUser() {
  const supabase = useSupabase();
  
  const getUser = async (): Promise<User | null> => {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.error('Error fetching user:', error);
      return null;
    }
    return data.user;
  };
  
  return { getUser };
}

// Hook that provides the user data directly with loading state
export function useUserData() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const supabase = useSupabase();
  
  useEffect(() => {
    // Function to fetch user data
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase.auth.getUser();
        
        if (error) {
          throw error;
        }
        
        setUser(data.user);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
        console.error('Error fetching user data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    // Call the fetch function
    fetchUser();
    
    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session | null) => {
        setUser(session?.user || null);
      }
    );
    
    // Clean up subscription when component unmounts
    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);
  
  return { user, isLoading, error };
} 