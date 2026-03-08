import { createClient } from '@supabase/supabase-js';

// Load environment variables for Supabase (Vite format)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('⚠️ Supabase URL or Anon Key is missing. Ensure you have a .env file with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY variables configured.');
}

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
