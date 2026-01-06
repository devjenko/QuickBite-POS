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
  acceptCardPayments: z.boolean(),
  qrCodePayments: z.boolean(),
  cashPayments: z.boolean(),

  defaultTaxRate: z.coerce.number().min(0).max(100).optional(),

  userMode: z.enum(["owner", "staff"]),
  language: z.enum(["en", "kh"]),
  currency: z.enum(["USD", "KHR"]),
  darkMode: z.boolean(),

  dateFormat: z.string().optional(),
  timeFormat: z.string().optional(),
});

// Connect ABA PayWay inputs
export const abaPayWaySchema = z.object({
  merchant_id: z
    .string()
    .min(1, "Merchant ID is required")
    .regex(/^[a-zA-Z0-9_-]+$/, "Invalid Merchant ID format"),

  api_key: z
    .string()
    .min(10, "API Key must be at least 10 characters")
    .min(1, "API Key is required"),
});

export type AbaPayWayCredentials = z.infer<typeof abaPayWaySchema>;
