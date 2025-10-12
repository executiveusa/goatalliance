import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl) {
  console.warn("VITE_SUPABASE_URL is not defined. API calls will fail until it is configured.")
}

if (!supabaseAnonKey) {
  console.warn("VITE_SUPABASE_ANON_KEY is not defined. Auth will fail until it is configured.")
}

export const supabase = createClient(supabaseUrl ?? "", supabaseAnonKey ?? "")
