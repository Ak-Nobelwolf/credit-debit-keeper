
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://cccscjcqkdzutjkbkpra.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjY3NjamNxa2R6dXRqa2JrcHJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk5OTAyNDcsImV4cCI6MjA1NTU2NjI0N30.WhYKXsRMkijqh9cUCqreFlC-KtkhdK13O5aBmm9Yz2g";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
