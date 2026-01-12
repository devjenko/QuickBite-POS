import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { uploadImage } from "@/lib/cloudinary";
import { auth } from "@/auth";
import { createMenuItemSchema } from "@/lib/validations";
import { AppError, handleApiError } from "@/lib/errors";

export async function POST(request: NextRequest) {
  try {
    // Verify auth
    const session = await auth();

    if (!session?.user?.id) {
      throw new AppError("Unauthorized", 401, "UNAUTHORIZED");
    }

    const body = await request.json();
    
    // validate body with zod
    const validatedBody = createMenuItemSchema.safeParse(body);

    if (!validatedBody.success) {
      throw new AppError(validatedBody.error.issues[0].message, 400, "VALIDATION_ERROR");
    }

    const { name, description, price, category, image } = validatedBody.data;

    // normalize category to lowercase, remove spaces, and replace & with 'and'
    const normalizedCategory =
      typeof category === "string"
        ? category.trim().toLowerCase().replace(/&/g, "and").replace(/\s+/g, "")
        : category;

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
        userId: session.user.id,
      },
    });
    return NextResponse.json(menuItem, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await context.params).id;
    const session = await auth();
    
    if (!session?.user?.id) {
      throw new AppError("Unauthorized", 401, "UNAUTHORIZED");
    }

    // verify item belongs to user
    const menuItem = await prisma.menuItem.findUnique({where: {id}, select: {userId: true}});
    if (!menuItem) {
      throw new AppError("Item not found", 404, "NOT_FOUND");
    }
    if (menuItem.userId !== session.user.id) {
      throw new AppError("Unauthorized", 401, "UNAUTHORIZED");
    }

    await prisma.menuItem.delete({ where: { id } });

    return NextResponse.json(
      { message: "Item deleted successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    // Handle Prisma not found error
    if ((error as { code?: string }).code === "P2025") {
      return handleApiError(new AppError("Item not found", 404, "NOT_FOUND"));
    }
    return handleApiError(error);
  }
}
