import { createClient } from '@supabase/supabase-js';
import FormData from 'form-data';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase URL or Anon Key in environment variables.');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const requestData = await req.formData();
    const file = requestData.get('image'); 

    console.log(file, 'this is the image')

    if (!file || !(file instanceof Blob)) {
      console.error('File is not found or not of type Blob');
      return NextResponse.json({ error: 'File not found or invalid type' }, { status: 400 });
    }


    // const arrayBuffer = await file.arrayBuffer();
    // const buffer = Buffer.from(arrayBuffer);

    // console.log(buffer, 'this is the buffer')


    const { data, error } = await supabase.storage
      .from('profile-images')
      .upload(file.name, file, {
        upsert: true,
        contentType: file.type
      });

    
    if (error) {
      console.error('Upload error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    
    console.log(data, 'data');
    return NextResponse.json({ message: 'Upload successful', data }, { status: 200 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}


