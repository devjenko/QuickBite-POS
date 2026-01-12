import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";
import { AppError, handleApiError } from "@/lib/errors";

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
  try {
    const session = await auth();

    if (!session?.user) {
      throw new AppError("Unauthorized", 401, "UNAUTHORIZED");
    }

    if (
      !process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      throw new AppError("Image upload service not configured", 500, "CONFIG_ERROR");
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const bankName = formData.get("bankName") as string | null;

    if (!file || !bankName) {
      throw new AppError("File and bank name are required", 400, "VALIDATION_ERROR");
    }

    if (!file.type.startsWith("image/")) {
      throw new AppError("File must be an image", 400, "VALIDATION_ERROR");
    }

    if (file.size > 10 * 1024 * 1024) {
      throw new AppError("File size must be less than 10MB", 400, "VALIDATION_ERROR");
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
    return handleApiError(error);
  }
}
