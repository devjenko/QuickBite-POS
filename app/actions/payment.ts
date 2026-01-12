"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";

// Configure Cloudinary
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


  // Upload bank QR code action
  export async function uploadBankQRCode(formData: FormData){
    const session = await auth();

    if (!session?.user?.id) {
        throw new Error("Unauthorized");
    }

    const file = formData.get("file") as File | null;
    const bankName = formData.get("bankName") as string | null;

    if (!file || !bankName) {
        throw new Error("File and bank name are required");
    }

    if (!file.type.startsWith("image/")) {
        throw new Error("File must be an image");
    }

    if (file.size > 10 * 1024 * 1024) {
        throw new Error("File size must be less than 10MB");
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise<{ secure_url: string }>(
        (resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: "bank-qr-codes",
                    resource_type: "image",
                    allowed_formats: ["jpg", "jpeg", "png", "webp"],
                },
                (error, result) => {
                    if (error || !result?.secure_url) {
                        reject(new Error("Upload failed"));
                    } else {
                        resolve({ secure_url: result.secure_url });
                    }
                }
            );
            uploadStream.on("error", (error) => {
                reject(new Error(`Upload stream error: ${error.message || "Unknown error"}`));
            });
            uploadStream.end(buffer);
        }
    )

    await prisma.bankQRCode.upsert({
        where: {
            userId_bankName: {
                userId: session.user.id,
                bankName,
            },
        },
        create: {
            userId: session.user.id,
            bankName,
            imageUrl: result.secure_url,
        },
        update: {
            imageUrl: result.secure_url,
        },
    });

    revalidatePath("/settings");
    revalidatePath("/checkout");

    return { success: true, imageUrl: result.secure_url };
  }
