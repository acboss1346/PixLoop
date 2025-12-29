import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://edyraawhrsgmsciiiegs.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkeXJhYXdocnNnbXNjaWlpZWdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1NTE0NjcsImV4cCI6MjA2MjEyNzQ2N30.Cpwc7PVYFHlW-ZXEPmiW8_XEUXk_lw87wX-AyFCKB_w";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
