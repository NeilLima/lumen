import { registerAs } from '@nestjs/config';

export const firebaseConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID || 'nexusapi-dcc2e',
  storageBucket:
    process.env.FIREBASE_STORAGE_BUCKET || 'nexusapi-dcc2e.appspot.com',
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

export default registerAs('firebase', () => firebaseConfig);
