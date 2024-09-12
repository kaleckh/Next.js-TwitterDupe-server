import { S3Client } from '@aws-sdk/client-s3';

const client = new S3Client({
  forcePathStyle: true,
  region: 'project_region',
  endpoint: 'https://project_ref.supabase.co/storage/v1/s3',
  credentials: {
    accessKeyId: 'your_access_key_id',
    secretAccessKey: 'your_secret_access_key',
  }
})
