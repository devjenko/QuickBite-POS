import { z } from "zod";

export const createMenuItemSchema = z.object({
    name: z.string().min(1, {message: "Name is required"}),
    description: z.string().optional().nullable(),
    price: z.number().positive({message: "Price must be greater than 0"}),
    category: z.string().min(1, {message: "Category is required"}),
    image: z.string().nullish(), 
}).strict();

export const deleteMenuItemSchema = z.object({
    id: z.string().min(1, {message: "ID is required"}),
}).strict();