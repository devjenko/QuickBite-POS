import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { uploadImage } from "@/lib/cloudinary";
import { auth } from "@/auth";
import { createMenuItemSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  try {
    // Verify auth
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    
    // validate body with zod
    const validatedBody = createMenuItemSchema.safeParse(body);

    if (!validatedBody.success) {
      return NextResponse.json(
        { error: validatedBody.error.message },
        { status: 400 }
      );
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
    console.error("Error creating menu item", error);
    return NextResponse.json(
      { error: "Failed to create menu item" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const id = (await context.params).id;

  console.log("Deleting item with id:", id);

  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // verify item belongs to user
    const menuItem = await prisma.menuItem.findUnique({where: {id}, select: {userId: true}});
    if (!menuItem) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }
    if (menuItem.userId !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.menuItem.delete({ where: { id } });

    return NextResponse.json(
      { message: "Item deleted successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Delete error:", error);

    if ((error as { code?: string }).code === "P2025") {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Failed to delete the item" },
      { status: 500 }
    );
  }
}
