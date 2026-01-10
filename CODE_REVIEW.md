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

## 1. Critical Bugs

### 1.1 QRDisplay Modal Bug - All modals open at once

**File:** `components/checkout/QRDisplay.tsx`

**Problem:** Each QR code creates its own modal inside the map loop, but they all share the same `isOpen` state. Clicking any provider button opens ALL modals at once, and clicking one shows the wrong QR code.

**Current Code:**

```tsx
{qrCodes.map((qr) => (
  <>
    <ProviderButton
      key={qr.bankName}
      title={qr.bankName}
      onClick={handleProviderBtnClick}
    />
    <BaseModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Image src={qr.imageUrl} ... />
    </BaseModal>
  </>
))}
```

**Fix:**

```tsx
const [selectedQR, setSelectedQR] = useState<BankQRCode | null>(null);

const handleProviderBtnClick = (qr: BankQRCode) => {
  setSelectedQR(qr);
};

const handleCloseModal = () => {
  setSelectedQR(null);
};

// In JSX - Move modal OUTSIDE the map:
return (
  <div className="flex flex-col w-full gap-8">
    <h2>Providers</h2>
    <div className="flex gap-4 w-full">
      {qrCodes.map((qr) => (
        <ProviderButton
          key={qr.id}
          title={qr.bankName}
          image={`/logos/${qr.bankName.split(" ").reverse().pop()?.toLowerCase()}_bank_logo.webp`}
          onClick={() => handleProviderBtnClick(qr)}
        />
      ))}
    </div>

    {/* Single modal outside the loop */}
    <BaseModal isOpen={!!selectedQR} setIsOpen={handleCloseModal}>
      {selectedQR && (
        <Image
          src={selectedQR.imageUrl}
          width={300}
          height={300}
          alt={`${selectedQR.bankName} QR code`}
        />
      )}
    </BaseModal>
  </div>
);
```

---

### 1.2 Missing React Key on Fragment

**File:** `components/checkout/QRDisplay.tsx`

**Problem:** React fragments `<>` inside `.map()` need a key prop, but you can't add keys to shorthand fragments.

**Current Code:**

```tsx
{qrCodes.map((qr) => (
  <>
    <ProviderButton key={qr.bankName} ... />
    ...
  </>
))}
```

**Fix:** Use explicit Fragment with key, or restructure (see fix above which eliminates this issue).

---

### 1.3 Unused `error` State in QRDisplay

**File:** `components/checkout/QRDisplay.tsx`

**Problem:** You have an `error` state that gets set but is never displayed to the user.

**Current Code:**

```tsx
const [error, setError] = useState<string | null>(null);
// ... error is set but never rendered
```

**Fix:** Add error UI or remove the unused state:

```tsx
if (error) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-4">
      <div className="text-red-500 mb-2 text-base">Error loading providers</div>
      <div className="text-sm text-[var(--Grey)]">{error}</div>
      <Button onClick={fetchQRCodes} variant="dark" className="mt-4">
        Retry
      </Button>
    </div>
  );
}
```

---

### 1.4 Duplicate CSS Class in QRDisplay

**File:** `components/checkout/QRDisplay.tsx` (line 66)

**Problem:** `h-64` is applied twice.

**Current Code:**

```tsx
<div className="flex flex-col h-64 text-center w-full justify-center h-full items-center px-4">
```

**Fix:**

```tsx
<div className="flex flex-col text-center w-full justify-center h-full items-center px-4">
```

---

### 1.5 Debug Code Left in Production

**File:** `app/(pos)/checkout/page.tsx`

**Problem:** Debug logging code sending data to localhost is left in the component.

**Current Code:**

```tsx
useEffect(() => {
  // #region agent log
  if (paymentWrapperRef.current && paymentContentRef.current) {
    // ... fetch to localhost:7242
  }
  // #endregion
}, []);
```

**Fix:** Remove the entire useEffect and the unused refs:

```tsx
// Remove these:
// const paymentWrapperRef = useRef<HTMLDivElement>(null);
// const paymentContentRef = useRef<HTMLDivElement>(null);
// The entire useEffect block

// Update ContentWrapper to remove ref:
<ContentWrapper className="flex-1 p-5 flex flex-col">
```

---

### 1.6 Cart Store - totalPrice is Incorrectly Defined

**File:** `store/cart-store.ts`

**Problem:** `totalPrice` is defined as a function inside the store state, but it's never exposed in the interface and isn't being used as a selector.

**Current Code:**

```tsx
interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  // ... totalPrice is not in interface
}

export const useCartStore = create<CartState>()(
  persist((set) => ({
    items: [],
    totalPrice: (
      state: CartState // This doesn't work as intended
    ) => state.items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    // ...
  }))
);
```

**Fix:** Either remove it or use a proper selector pattern:

```tsx
// Option 1: Remove from store and use a selector hook
export const useCartTotal = () =>
  useCartStore((state) =>
    state.items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  );

// Option 2: Add as a getter in the store
interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
}

// Create a separate selector
export const selectCartTotal = (state: CartState) =>
  state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

// Usage in components:
const total = useCartStore(selectCartTotal);
```

---

## 2. Performance Issues

### 2.1 Using `<img>` Instead of Next.js `<Image>`

**File:** `components/menu/MenuItemCard.tsx`

**Problem:** Using native `<img>` tag loses Next.js image optimization benefits (lazy loading, format optimization, responsive images).

**Current Code:**

```tsx
<img
  src={getOptimizedImage(image)}
  alt={name || "Menu item"}
  className="w-full h-full object-cover"
  loading="lazy"
/>
```

**Fix:** Use Next.js Image with proper configuration:

```tsx
import Image from "next/image";

<Image
  src={getOptimizedImage(image)}
  alt={name || "Menu item"}
  fill
  className="object-cover"
  sizes="(max-width: 768px) 100vw, 250px"
  unoptimized={image.includes("cloudinary.com")} // Cloudinary handles optimization
/>;
```

For Cloudinary images, add the domain to `next.config.ts`:

```ts
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'res.cloudinary.com',
    },
  ],
},
```

---

### 2.2 Counter Component Selector Optimization

**File:** `components/shared/Counter.tsx`

**Problem:** Multiple `useCartStore` calls create multiple subscriptions.

**Current Code:**

```tsx
const quantity = useCartStore(
  (state) => state.items.find((i) => i.id === id)?.quantity ?? 0
);
const increaseQuantity = useCartStore((state) => state.increaseQuantity);
const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
```

**Fix:** Combine into a single selector or use shallow comparison:

```tsx
import { useShallow } from "zustand/react/shallow";

const { quantity, increaseQuantity, decreaseQuantity } = useCartStore(
  useShallow((state) => ({
    quantity: state.items.find((i) => i.id === id)?.quantity ?? 0,
    increaseQuantity: state.increaseQuantity,
    decreaseQuantity: state.decreaseQuantity,
  }))
);
```

---

### 2.3 Settings Not Persisted to Database

**File:** `components/settings/SettingsContent.tsx`

**Problem:** Settings are stored in local state but never saved to the database. Users lose settings on page refresh or different devices.

**Fix:** Add API call to save settings:

```tsx
import { useCallback, useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce"; // npm install use-debounce

// Add debounced save
const saveSettings = useDebouncedCallback(
  async (newSettings: SettingsState) => {
    try {
      await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSettings),
      });
    } catch (error) {
      console.error("Failed to save settings:", error);
      toast.error("Failed to save settings");
    }
  },
  500
);

const updateSetting = <K extends keyof SettingsState>(
  key: K,
  value: SettingsState[K]
) => {
  setSettings((prev) => {
    const newSettings = { ...prev, [key]: value };
    saveSettings(newSettings);
    return newSettings;
  });
};

// Load settings on mount
useEffect(() => {
  const loadSettings = async () => {
    try {
      const response = await fetch("/api/settings");
      if (response.ok) {
        const data = await response.json();
        setSettings((prev) => ({ ...prev, ...data }));
      }
    } catch (error) {
      console.error("Failed to load settings:", error);
    }
  };
  loadSettings();
}, []);
```

---

### 2.4 Redundant API Calls for Bank QR Codes

**Files:** `components/checkout/QRDisplay.tsx`, `components/settings/SettingsContent.tsx`

**Problem:** Both components fetch from `/api/bank-qr` independently. If both are mounted, you get duplicate API calls.

**Fix:** Create a shared data fetching hook or use React Query/SWR:

```tsx
// lib/hooks/useBankQRCodes.ts
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useBankQRCodes() {
  const { data, error, isLoading, mutate } = useSWR("/api/bank-qr", fetcher, {
    revalidateOnFocus: false,
  });

  return {
    qrCodes: data?.qrCodes ?? [],
    isLoading,
    error,
    refresh: mutate,
  };
}
```

---

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

---

## 3. Server Actions Opportunities

### 3.1 Menu Item Deletion - Convert to Server Action

**Current:** Uses API route at `/api/menu-items/[id]` with DELETE method.

**Why Server Action:** This is a mutation that doesn't need to be a REST endpoint. It's only called from within the app.

**Create:** `app/actions/menu.ts`

```tsx
"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteMenuItem(id: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  // Verify ownership
  const menuItem = await prisma.menuItem.findUnique({
    where: { id },
    select: { userId: true },
  });

  if (!menuItem) {
    throw new Error("Item not found");
  }

  if (menuItem.userId !== session.user.id) {
    throw new Error("Unauthorized");
  }

  await prisma.menuItem.delete({ where: { id } });

  revalidatePath("/menu");

  return { success: true };
}
```

**Update Component:** `components/menu/delete-item/DeleteItemModal.tsx`

```tsx
import { deleteMenuItem } from "@/app/actions/menu";

const handleDelete = async () => {
  setIsDeleting(true);

  try {
    await deleteMenuItem(ItemId!);
    setIsOpen(false);
    toast.success("Menu item deleted");
  } catch (error) {
    console.error("Error deleting item:", error);
    toast.error("Failed to delete menu item. Please try again.");
  } finally {
    setIsDeleting(false);
  }
};
```

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
