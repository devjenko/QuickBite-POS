"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createMenuItemSchema } from "@/lib/validations";
import {uploadImage} from "@/lib/cloudinary";


// Create menu item action
export async function createMenuItem(formData: {
    name: string;
    description?: string;
    price: number;
    category: string;
    image?: string | null;
  }) {
    const session = await auth();
  
    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }
  
    const validated = createMenuItemSchema.safeParse(formData);
    if (!validated.success) {
      throw new Error(validated.error.message);
    }
  
    const { name, description, price, category, image } = validated.data;
  
    const normalizedCategory = category
      .trim()
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/\s+/g, "");
  
    let imageUrl = null;
    if (image) {
      imageUrl = await uploadImage(image);
    }
  
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
  
    revalidatePath("/menu");
    revalidatePath(`/menu/${normalizedCategory}`);
  
    return menuItem;
  }





// Delete menu item action
export async function deleteMenuItem(id:string){
    const session = await auth();

    if (!session?.user?.id) {
        throw new Error("Unauthorized");
    }

    // Verify item ownership
    const menuItem = await prisma.menuItem.findUnique({
        where: {id, userId: session.user.id},
        select: {userId: true},
    });

    if (!menuItem) {
        throw new Error("Item not found");
    }

    if (menuItem.userId !== session.user.id) {
        throw new Error("Unauthorized");
    }

    await prisma.menuItem.delete({where: {id}});

    revalidatePath("/menu");

    return { success: true };
}