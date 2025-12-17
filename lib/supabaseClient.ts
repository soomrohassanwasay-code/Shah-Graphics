import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eqdmznzhocpzarzdqutf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxZG16bnpob2NwemFyemRxdXRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5MDE1NjgsImV4cCI6MjA4MTQ3NzU2OH0.BCUeJcTcyP0-Y2mX8wio6zbqej03JEszyRN-drVf13o';

export const supabase = createClient(supabaseUrl, supabaseKey);