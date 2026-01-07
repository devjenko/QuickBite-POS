import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";

if (
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
}

export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (
    !process.env.CLOUDINARY_CLOUD_NAME ||
    !process.env.CLOUDINARY_API_KEY ||
    !process.env.CLOUDINARY_API_SECRET
  ) {
    console.error("Cloudinary configuration missing");
    return NextResponse.json(
      { error: "Image upload service not configured" },
      { status: 500 }
    );
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const bankName = formData.get("bankName") as string | null;

    if (!file || !bankName) {
      return NextResponse.json(
        { error: "File and bank name are required" },
        { status: 400 }
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "File must be an image" },
        { status: 400 }
      );
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File size must be less than 10MB" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "bank-qr-codes",
          resource_type: "image",
          allowed_formats: ["jpg", "jpeg", "png", "webp"],
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            reject(new Error(`Upload failed: ${error.message || "Unknown error"}`));
          } else if (!result || !result.secure_url) {
            console.error("Cloudinary upload returned no URL:", result);
            reject(new Error("Upload failed: No URL returned from image service"));
          } else {
            resolve({
              secure_url: result.secure_url,
              public_id: result.public_id,
            });
          }
        }
      );

      uploadStream.on("error", (error) => {
        console.error("Upload stream error:", error);
        reject(new Error(`Upload stream error: ${error.message || "Unknown error"}`));
      });

      uploadStream.end(buffer);
    });

    const existingQR = await prisma.bankQRCode.findUnique({
      where: {
        userId_bankName: {
          userId: session.user.id,
          bankName,
        },
      },
    });

    if (existingQR) {
      await prisma.bankQRCode.update({
        where: { id: existingQR.id },
        data: { imageUrl: result.secure_url },
      });
    } else {
      await prisma.bankQRCode.create({
        data: {
          userId: session.user.id,
          bankName,
          imageUrl: result.secure_url,
        },
      });
    }

    return NextResponse.json({
      success: true,
      imageUrl: result.secure_url,
    });
  } catch (error) {
    console.error("Upload error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to upload QR code";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
