import { createClient } from '@supabase/supabase-js';
import FormData from 'form-data';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase URL or Anon Key in environment variables.');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const config = {
  api: {
    bodyParser: false,
  },
};

import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  let requestData = await req.formData();
  const file = requestData.get('image'); 
  console.log(file,'this is the file')
  // const { data, error } = await supabase.storage.from('TwitterDupe').upload('profile-images/testing.jps', file)
  // console.log(data, 'data')
}



