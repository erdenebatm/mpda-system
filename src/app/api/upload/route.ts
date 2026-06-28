export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({ cloud_name: process.env.CLOUDINARY_CLOUD_NAME, api_key: process.env.CLOUDINARY_API_KEY, api_secret: process.env.CLOUDINARY_API_SECRET });
export async function POST(req: NextRequest) {
  try {
    const file = (await req.formData()).get('file') as File;
    if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 });
    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
      cloudinary.uploader.upload_stream({ folder: 'mpda-dancers', transformation: [{ width: 400, height: 400, crop: 'fill' }] }, (e, r) => e ? reject(e) : resolve(r as any)).end(buffer);
    });
    return NextResponse.json({ url: result.secure_url });
  } catch { return NextResponse.json({ error: 'Upload failed' }, { status: 500 }); }
}
