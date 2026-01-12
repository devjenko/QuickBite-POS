import { z } from "zod";

// Create menu item inputs
export const createMenuItemSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    description: z.string().optional().nullable(),
    price: z.number().positive({ message: "Price must be greater than 0" }),
    category: z.string().min(1, { message: "Category is required" }),
    image: z.string().nullish(),
  })
  .strict();

// Delete menu item inputs
export const deleteMenuItemSchema = z
  .object({
    id: z.string().min(1, { message: "ID is required" }),
  })
  .strict();

// Settings inputs
export const settingsUpdateSchema = z.object({
  acceptCardPayments: z.boolean().optional(),
  qrCodePayments: z.boolean().optional(),
  cashPayments: z.boolean().optional(),

  defaultTaxRate: z.coerce.number().min(0).max(100).optional(),

  userMode: z.enum(["owner", "staff"]).optional(),
  language: z.enum(["en", "kh"]).optional(),
  currency: z.enum(["usd", "khr", "eur", "gbp", "jpy", "cad"]).optional(),
  darkMode: z.boolean().optional(),

  dateFormat: z.string().optional(),
  timeFormat: z.string().optional(),
});

// Auth validation schemas
export const passwordSchema = z
  .string()
  .min(8, "Must be at least 8 characters")
  .regex(/[A-Z]/, "Must contain at least one uppercase letter")
  .regex(/[a-z]/, "Must contain at least one lowercase letter")
  .regex(/[0-9]/, "Must contain at least one number")
  .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, "Must contain at least one special character");

export const signupSchema = z.object({
  businessName: z.string().min(1, { message: "Business name is required" }),
  password: passwordSchema,
}).strict();

export const loginSchema = z.object({
  businessId: z.string().min(1, { message: "Business ID is required" }),
  password: passwordSchema,
}).strict();
