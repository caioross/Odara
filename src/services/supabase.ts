import { createClient } from '@supabase/supabase-js';

// Load environment variables for Supabase (Vite format)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
    console.warn('⚠️ Supabase URL or Anon Key is missing. Ensure you have a .env file with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY variables configured.');
}

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
