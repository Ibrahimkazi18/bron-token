import {createClient} from '@supabase/supabase-js'

const SUPABASE_DATABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_DATABASE_URL
const SUPABASE_API_KEY = process.env.NEXT_PUBLIC_SUPABASE_API_KEY

export const supabase = createClient(SUPABASE_DATABASE_URL!, SUPABASE_API_KEY!)