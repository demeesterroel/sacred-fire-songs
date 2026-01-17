import { createClient } from '@supabase/supabase-js';

// 1. Grab our secrets from the environment
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// 2. Initialize the client
// This is our main 'portal' to fetch and search data
export const supabase = createClient(supabaseUrl, supabaseAnonKey);