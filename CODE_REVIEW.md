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



## 4. Best Practices



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
