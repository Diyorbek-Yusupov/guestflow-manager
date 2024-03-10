import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = import.meta.env.VITE_SUPABESE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABESE_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
