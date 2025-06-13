import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const base64Data = body.image;

    if (!base64Data) {
      return NextResponse.json({ error: 'Missing image data' }, { status: 400 });
    }

    const result = await cloudinary.uploader.upload(base64Data, {
      folder: 'portfolio_projects',
    });

    return NextResponse.json({ url: result.secure_url });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
