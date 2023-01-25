/* eslint-disable no-undef */

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SOME_KEY1;
const supabaseAnonKey = import.meta.env.VITE_SOME_KEY2;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
