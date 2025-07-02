// src/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://laazkqdywaupaiqiupii.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxhYXprcWR5d2F1cGFpcWl1cGlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0OTA1NzQsImV4cCI6MjA2NzA2NjU3NH0.2-DhqAJfdFxLVh8eO72Os3toFc7pZMrFo8d9coYZL3Y';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
