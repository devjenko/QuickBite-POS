import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { uploadImage } from "@/lib/cloudinary";
import { auth } from "@/auth";

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, description, price, category, image } = body;

    // normalize category to lowercase, remove spaces, and replace & with 'and'
    const normalizedCategory =
      typeof category === "string"
        ? category.trim().toLowerCase().replace(/&/g, "and").replace(/\s+/g, "")
        : category;

    // Validate fields
    if (!name || !price || !normalizedCategory) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Upload image to Cloudinary
    let imageUrl = null;
    if (image) {
      imageUrl = await uploadImage(image);
    }

    // Create menuItem in database
    const menuItem = await prisma.menuItem.create({
      data: {
        name,
        description,
        price,
        category: normalizedCategory,
        image: imageUrl,
        userId: session.user.id, // Associate with user
      },
    });
    return NextResponse.json(menuItem, { status: 201 });
  } catch (error) {
    console.error("Error creating menu item", error);
    return NextResponse.json(
      { error: "Failed to create menu item" },
      { status: 500 }
    );
  }
}
