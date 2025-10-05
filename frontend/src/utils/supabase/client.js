import { createBrowserClient } from "@supabase/ssr";    
import { ENV } from "@/contans/env";

const supabaseUrl = ENV.SUPABASE_URL;
const supabaseKey = ENV.SUPABASE_ANON_KEY;

export const createClient = () => createBrowserClient(
    supabaseUrl, supabaseKey
)