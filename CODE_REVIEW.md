# QuickBite Code Review & Improvements

This document contains a comprehensive review of the codebase with identified issues, bugs, performance improvements, and best practice recommendations.

---

## Table of Contents

1. [Critical Bugs](#1-critical-bugs)
2. [Performance Issues](#2-performance-issues)
3. [Server Actions Opportunities](#3-server-actions-opportunities)
4. [Best Practices](#4-best-practices)
5. [Code Quality & Refactoring](#5-code-quality--refactoring)
6. [Security Improvements](#6-security-improvements)

---


## 2. Performance Issues


<!-- ---

### 2.5 Giphy Fallback Image

**File:** `components/menu/CategoryPageContent.tsx`

**Problem:** Using an external Giphy URL as fallback loads a large GIF from an external source.

**Current Code:**

```tsx
image={
  item.image ||
  "https://media1.giphy.com/media/v1.Y2lkPTc5..."
}
```

**Fix:** Use a local placeholder image:

```tsx
image={item.image || "/images/placeholder-menu-item.webp"}
```

--- -->

## 3. Server Actions Opportunities



---

### 3.2 Menu Item Creation - Convert to Server Action

**Create:** Add to `app/actions/menu.ts`

```tsx
import { createMenuItemSchema } from "@/lib/validations";
import { uploadImage } from "@/lib/cloudinary";

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
```

---

### 3.3 QR Code Upload - Convert to Server Action

**Create:** `app/actions/payment.ts`

```tsx
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

export async function uploadBankQRCode(formData: FormData) {
  const session = await auth();

  if (!session?.user) {
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
      uploadStream.end(buffer);
    }
  );

  await prisma.bankQRCode.upsert({
    where: {
      userId_bankName: {
        userId: session.user.id,
        bankName,
      },
    },
    update: { imageUrl: result.secure_url },
    create: {
      userId: session.user.id,
      bankName,
      imageUrl: result.secure_url,
    },
  });

  revalidatePath("/settings");
  revalidatePath("/checkout");

  return { success: true, imageUrl: result.secure_url };
}
```

---

### 3.4 Settings Update - Convert to Server Action

**Create:** Add to `app/actions/settings.ts`

```tsx
"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { settingsUpdateSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";

export async function updateSettings(data: unknown) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const parsed = settingsUpdateSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error("Invalid settings data");
  }

  const settings = await prisma.settings.upsert({
    where: { userId: session.user.id },
    update: parsed.data,
    create: {
      userId: session.user.id,
      ...parsed.data,
    },
  });

  revalidatePath("/settings");

  return settings;
}
```

---

## 4. Best Practices

### 4.1 Use Proper TypeScript Types for Route Params

**File:** `app/(pos)/menu/[category]/page.tsx`

**Current:** Using `Promise<{ category: string }>` which is correct for Next.js 15.

**Recommendation:** This is already correct! Good job.

---

### 4.2 Move Password Validation to Shared Location

**Files:** `components/auth/SignupForm.tsx`, `app/api/auth/signup/route.ts`

**Problem:** Password validation only exists on the client side. Server doesn't validate password strength.

**Fix:** Add validation to the API route:

```tsx
// lib/validations.ts - Add password schema
export const passwordSchema = z
  .string()
  .min(8, "Must be at least 8 characters")
  .regex(/[A-Z]/, "Must contain at least one uppercase letter")
  .regex(/[a-z]/, "Must contain at least one lowercase letter")
  .regex(/[0-9]/, "Must contain at least one number")
  .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, "Must contain at least one special character");

export const signupSchema = z.object({
  businessName: z.string().min(1, "Business name is required").trim(),
  password: passwordSchema,
});

// Update signup route to use schema
import { signupSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = signupSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: validated.error.errors[0].message },
        { status: 400 }
      );
    }

    const { businessName, password } = validated.data;
    // ... rest of the code
  }
}
```

---

### 4.3 Use `useCallback` for Event Handlers Passed as Props

**File:** `components/checkout/QRDisplay.tsx`

**Current:**

```tsx
const handleProviderBtnClick = () => {
  setIsOpen(true);
};
```

**Fix:**

```tsx
const handleProviderBtnClick = useCallback((qr: BankQRCode) => {
  setSelectedQR(qr);
}, []);
```

---

### 4.4 Standardize Error Handling

Create a shared error handling utility:

```tsx
// lib/errors.ts
export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = "AppError";
  }
}

export function handleApiError(error: unknown) {
  console.error("API Error:", error);

  if (error instanceof AppError) {
    return NextResponse.json(
      { error: error.message, code: error.code },
      { status: error.statusCode }
    );
  }

  return NextResponse.json(
    { error: "An unexpected error occurred" },
    { status: 500 }
  );
}
```

---

## 5. Code Quality & Refactoring

### 5.1 Empty Div in QRDisplay

**File:** `components/checkout/QRDisplay.tsx` (line 102)

**Problem:** Empty div serves no purpose.

```tsx
<div className="flex flex-col items-center gap-4"></div>
```

**Fix:** Remove it.

---

### 5.2 Unnecessary `setTimeout` in SignupForm

**File:** `components/auth/SignupForm.tsx`

**Current:**

```tsx
setTimeout(() => {
  setGeneratedBusinessId(data.businessId);
}, 0);

// Success! Show the generated business ID
setGeneratedBusinessId(data.businessId); // Set again immediately after
```

**Fix:** Remove the setTimeout, keep only one call:

```tsx
setGeneratedBusinessId(data.businessId);
```

---

### 5.3 Console.log Left in Production Code

**Files to check:** Multiple files have `console.log` statements.

**Fix:** Remove or replace with proper logging:

- `components/menu/add-item/AddItemModal.tsx` - `console.log("Menu item added:", menuItem);`
- `components/auth/LoginForm.tsx` - `console.log("Error found:", result.error);`
- `app/api/menu-items/[id]/route.ts` - `console.log("Deleting item with id:", id);`

---

### 5.4 Inconsistent Named vs Default Exports

**Problem:** Some components use `export default`, others use named exports.

**Examples:**

- `Button.tsx` exports both default and named: `export default function Button` AND `export { Button, buttonVariants }`
- Most components only use default exports

**Recommendation:** Pick one pattern and stick with it. Named exports are generally preferred as they:

- Enable tree-shaking
- Make imports explicit
- Prevent naming conflicts

---

### 5.5 Move Type Definitions to Types Folder

**Problem:** Types are defined inline in many components.

**Example in `QRDisplay.tsx`:**

```tsx
interface BankQRCode {
  id: string;
  bankName: string;
  imageUrl: string;
}
```

**Fix:** Create `types/bank-qr.ts`:

```tsx
export interface BankQRCode {
  id: string;
  bankName: string;
  imageUrl: string;
}
```

---

## 6. Security Improvements

### 6.1 Rate Limiting for Auth Endpoints

**Problem:** No rate limiting on login/signup endpoints allows brute force attacks.

**Fix:** Add rate limiting middleware or use a service like Upstash:

```tsx
// lib/rate-limit.ts
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "1 m"), // 5 requests per minute
});

// In auth routes:
const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1";
const { success } = await ratelimit.limit(ip);

if (!success) {
  return NextResponse.json(
    { error: "Too many requests. Please try again later." },
    { status: 429 }
  );
}
```

---

### 6.2 Validate Image URLs from Cloudinary

**Problem:** Images from Cloudinary URLs are used without validation.

**Fix:** Add URL validation:

```tsx
function isValidCloudinaryUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.hostname === "res.cloudinary.com";
  } catch {
    return false;
  }
}
```

---

### 6.3 Add CSRF Protection for Mutations

**Recommendation:** Ensure all mutation endpoints verify the request origin. Next.js Server Actions handle this automatically, which is another reason to migrate to them.

---

## Summary Checklist

### High Priority (Fix Now)

- [ ] Fix QRDisplay modal bug (all open at once)
- [ ] Remove debug code from checkout page
- [ ] Fix cart store totalPrice implementation
- [ ] Add error UI for QRDisplay

### Medium Priority (This Sprint)

- [ ] Convert mutations to Server Actions
- [ ] Add password validation to signup API
- [ ] Persist settings to database
- [ ] Create shared data fetching hooks

### Low Priority (Backlog)

- [ ] Standardize export patterns
- [ ] Move inline types to types folder
- [ ] Remove console.log statements
- [ ] Add rate limiting

---

_Generated on: $(date)_
_Review Version: 1.0_
