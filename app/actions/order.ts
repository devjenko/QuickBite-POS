"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function createOrder(formData: FormData){
    const session = await auth();

    if(!session?.user?.id){
        throw new Error("Unauthorized");
    }

    const customerId = formData.get("customerId") as string | null;
    const items = formData.get("items") as string;
    const subtotal = formData.get("subtotal") as string;
    const tax = formData.get("tax") as string;
    const total = formData.get("total") as string;
    const currency = formData.get("currency") as string;
    const paymentStatus = formData.get("paymentStatus") as string;
    const paidAt = formData.get("paidAt") as string;


    const parsedItems = JSON.parse(items);

    const order = await prisma.order.create({
        data: {
            merchant: { connect: { id: session.user.id } },
            customer: customerId ? { connect: { id: customerId } } : undefined,
            subtotal: parseFloat(subtotal),
            tax: parseFloat(tax),
            total: parseFloat(total),
            currency,
            paymentStatus,
            paidAt: paidAt ? new Date(paidAt) : undefined,
            items: {
                create: parsedItems.map((item: { menuItemId: string; name: string; price: number; quantity: number }) => ({
                    menuItem: { connect: { id: item.menuItemId } },
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                })),
            },
        },
    });

    return order;
}