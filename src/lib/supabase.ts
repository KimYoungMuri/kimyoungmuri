import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ypottlfvonabokhszolz.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlwb3R0bGZ2b25hYm9raHN6b2x6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2MTE5NDMsImV4cCI6MjA2MTE4Nzk0M30.OqxtY5DhRWYdErE_hdNmYkzvM3TYBav8n5sAVJGWxWM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
export { supabaseUrl } 