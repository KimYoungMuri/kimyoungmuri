import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// Fallback so public storage images work even if env is not set on Vercel (same project as QuantGuide image)
const FALLBACK_SUPABASE_URL = 'https://fhrgjouuzsjecqskxhoy.supabase.co'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? FALLBACK_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null
export { supabaseUrl }
/** Use to show a helpful error when client is null (e.g. missing anon key). */
export const supabaseConfigMissing =
  !supabaseAnonKey ? 'NEXT_PUBLIC_SUPABASE_ANON_KEY' : null
/** Base URL for public storage (env or fallback). Use for building image URLs. */
export const supabaseStorageUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || FALLBACK_SUPABASE_URL 