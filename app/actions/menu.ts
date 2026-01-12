"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

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