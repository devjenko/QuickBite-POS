# QuickBite Code Review & Improvements

This document contains a comprehensive review of the codebase with identified issues, bugs, performance improvements, and best practice recommendations.

**Last Updated:** 2026-01-12  
**Audit Version:** 2.0

---

## Executive Summary

| Category | Count |
|----------|-------|
| 🔴 Critical | 1 |
| 🟠 High | 4 |
| 🟡 Medium | 8 |
| 🔵 Low | 6 |
| **Total Issues** | **19** |

---

## Table of Contents

1. [Critical Issues](#-critical-issues)
2. [High Priority Issues](#-high-priority-issues)
3. [Medium Priority Issues](#-medium-priority-issues)
4. [Low Priority Issues](#-low-priority-issues)
5. [Summary Checklist](#summary-checklist)

---

## 🔴 Critical Issues




## 🟠 High Priority Issues


<!-- ### 3. Forgot Password Page Uses External QR Code API

**Severity:** High  
**Category:** Security / Performance  
**File:** `app/(auth)/forgot-password/page.tsx`

**Current Code (Lines 18-24):**

```tsx
<Image
  alt="Support telegram QR code"
  src={
    "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://t.me/JENKOZA"
  }
  width={200}
  height={200}
/>
```

**Problem:**

- External dependency on `api.qrserver.com`
- QR code is generated on every page load
- If service is down, page breaks
- Leaks Telegram handle to external service

**Solution:**

Generate QR code locally and save as static image:

```tsx
<Image
  alt="Support telegram QR code"
  src="/images/support-qr.webp"
  width={200}
  height={200}
/>
```

---
 -->


## 🟡 Medium Priority Issues


### 7. CashCalculator State Updates During Render

**Severity:** Medium  
**Category:** Performance / Best Practices  
**File:** `components/checkout/CashCalculator.tsx`

**Current Code (Lines 43-48):**

```tsx
if (totalPriceUsd !== lastSyncedTotal) {
  setLastSyncedTotal(totalPriceUsd);
  if (!hasUserInput) {
    setDisplay(getDisplayForTotal(currency, totalPriceUsd));
  }
}
```

**Problem:** Calling setState during render can cause infinite loops and React warnings.

**Solution:**

Move to useEffect:

```tsx
useEffect(() => {
  if (totalPriceUsd !== lastSyncedTotal) {
    setLastSyncedTotal(totalPriceUsd);
    if (!hasUserInput) {
      setDisplay(getDisplayForTotal(currency, totalPriceUsd));
    }
  }
}, [totalPriceUsd, lastSyncedTotal, hasUserInput, currency]);
```

---

### 8. Empty DialogTrigger in Modals

**Severity:** Medium  
**Category:** Code Quality  
**Files:** `components/shared/BaseModal.tsx`, `components/menu/delete-item/DeleteItemModal.tsx`

**Current Code:**

```tsx
<DialogTrigger asChild></DialogTrigger>
```

**Problem:** Empty DialogTrigger serves no purpose and adds unnecessary DOM elements.

**Solution:**

Remove the empty DialogTrigger if the modal is controlled externally via `open` prop.

---

### 9. Console.log Statements in Production Code

**Severity:** Medium  
**Category:** Code Quality  
**Files:** Multiple (9 files found)

**Files with console statements:**

- `components/settings/SettingsContent.tsx`
- `components/settings/ConnectAccountCard.tsx`
- `components/menu/add-item/AddItemModal.tsx`
- `components/menu/delete-item/DeleteItemModal.tsx`
- `components/settings/SettingsModal.tsx`
- `components/auth/CopyTextBtn.tsx`
- `components/menu/add-item/AddImage.tsx`

**Solution:**

Replace with proper error handling or remove. Error handling utility already exists in `lib/errors.ts`.

---

### 10. Hard-coded Exchange Rate

**Severity:** Medium  
**Category:** Best Practices  
**File:** `components/checkout/CashCalculator.tsx`

**Current Code (Line 9):**

```tsx
const KHR_PER_USD = 4000;
```

**Problem:** Exchange rate is hard-coded and will become outdated.

**Solution:**

Move to environment variable or settings:

```typescript
const KHR_PER_USD = Number(process.env.NEXT_PUBLIC_KHR_PER_USD) || 4000;
```

---

### 11. Hard-coded Banks Array

**Severity:** Medium  
**Category:** Best Practices  
**File:** `components/settings/SettingsContent.tsx`

**Current Code (Lines 22-25):**

```tsx
const BANKS = [
  { name: "ABA Pay", img: "/logos/aba_bank_logo.webp" },
  { name: "Wing Money", img: "/logos/wing_bank_logo.webp" },
];
```

**Solution:**

Move to `consts/settings.ts`:

```typescript
export const SUPPORTED_BANKS = [
  { name: "ABA Pay", img: "/logos/aba_bank_logo.webp" },
  { name: "Wing Money", img: "/logos/wing_bank_logo.webp" },
];
```

---

### 12. Missing Error Boundary

**Severity:** Medium  
**Category:** Best Practices  
**File:** `app/layout.tsx`

**Problem:** No error boundary to catch runtime errors gracefully.

**Solution:**

Create `app/error.tsx`:

```tsx
"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
```

---

### 13. Cloudinary URL Validation Missing

**Severity:** Medium  
**Category:** Security  
**File:** `components/menu/MenuItemCard.tsx`

**Current Code (Lines 30-36):**

```tsx
const getOptimizedImage = (url: string) => {
  if (url.includes("cloudinary.com")) {
    return url.replace("/upload/", "/upload/q_100,f_auto,c_fit,w_1200/");
  }
  return url;
};
```

**Problem:** No validation that URL is actually a valid Cloudinary URL.

**Solution:**

```typescript
const isValidCloudinaryUrl = (url: string): boolean => {
  try {
    const parsed = new URL(url);
    return parsed.hostname === "res.cloudinary.com";
  } catch {
    return false;
  }
};

const getOptimizedImage = (url: string) => {
  if (isValidCloudinaryUrl(url)) {
    return url.replace("/upload/", "/upload/q_100,f_auto,c_fit,w_1200/");
  }
  return url;
};
```

---

## 🔵 Low Priority Issues

### 14. Greeting Function Inside Component

**Severity:** Low  
**Category:** Performance  
**File:** `components/auth/LoginForm.tsx`

**Current Code (Lines 24-30):**

```tsx
function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning!";
  if (hour < 18) return "Good afternoon!";
  return "Good evening!";
}
```

**Problem:** Function is recreated on every render.

**Solution:**

Move outside component or memoize:

```typescript
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning!";
  if (hour < 18) return "Good afternoon!";
  return "Good evening!";
};

// Use as static value since it only needs to be calculated once per mount
const greeting = useMemo(() => getGreeting(), []);
```

---

### 15. Duplicate Router Refresh Calls

**Severity:** Low  
**Category:** Performance  
**File:** `components/menu/add-item/AddItemModal.tsx`

**Current Code (Line 51):**

```tsx
router.refresh();
```

**Problem:** Server action already calls `revalidatePath`, so `router.refresh()` is redundant.

**Solution:**

Remove `router.refresh()` call.

---

### 16. Missing Loading State for Settings Page

**Severity:** Low  
**Category:** UX  
**File:** `app/(pos)/(dashboard)/settings/`

**Problem:** No loading.tsx for settings page.

**Solution:**

Create `app/(pos)/(dashboard)/settings/loading.tsx`

---

### 17. Input ID Mismatch

**Severity:** Low  
**Category:** Accessibility  
**File:** `components/menu/add-item/AddItemModal.tsx`

**Current Code (Lines 97-100):**

```tsx
<Label htmlFor="name">Name</Label>
<Input
  id="name-1"  // ← Doesn't match
```

**Problem:** Label `htmlFor` doesn't match input `id`.

**Solution:**

```tsx
<Label htmlFor="name">Name</Label>
<Input id="name" ... />
```

---

### 18. Missing aria-label on Icon Buttons

**Severity:** Low  
**Category:** Accessibility  
**File:** `components/sidebar/CartSidebar.tsx`

**Current Code (Line 18):**

```tsx
<Trash2Icon onClick={clearCart} />
```

**Problem:** Icon-only button has no accessible label.

**Solution:**

```tsx
<button onClick={clearCart} aria-label="Clear cart">
  <Trash2Icon />
</button>
```

---

### 19. Inconsistent Page Component Naming

**Severity:** Low  
**Category:** Code Quality  
**Files:** Multiple page files

**Problem:** Some pages use `page` (lowercase), others use `Page` or specific names.

**Examples:**

- `app/(auth)/forgot-password/page.tsx` → exports `page`
- `app/(pos)/checkout/page.tsx` → exports `CheckoutPage`

**Solution:**

Standardize to PascalCase for all page exports or use `default function Page()`.

---

## Summary Checklist

### 🔴 Critical (Fix Immediately)

- [ ] Replace Giphy fallback with local placeholder (Issue #1)

### 🟠 High Priority (Fix This Week)

- [ ] Fix cart item key to use `id` instead of `name` (Issue #2)
- [ ] Replace external QR code API with static image (Issue #3)
- [ ] Fix login schema password validation (Issue #4)
- [ ] Add `unoptimized` prop to QR modal image (Issue #5)

### 🟡 Medium Priority (This Sprint)

- [ ] Remove unused `ItemId` prop (Issue #6)
- [ ] Fix CashCalculator state updates during render (Issue #7)
- [ ] Remove empty DialogTrigger elements (Issue #8)
- [ ] Remove console.log statements (Issue #9)
- [ ] Move hard-coded exchange rate to env/settings (Issue #10)
- [ ] Move banks array to constants (Issue #11)
- [ ] Add error boundary (Issue #12)
- [ ] Add Cloudinary URL validation (Issue #13)

### 🔵 Low Priority (Backlog)

- [ ] Move greeting function outside component (Issue #14)
- [ ] Remove duplicate router.refresh() calls (Issue #15)
- [ ] Add loading state for settings page (Issue #16)
- [ ] Fix input ID mismatch (Issue #17)
- [ ] Add aria-label to icon buttons (Issue #18)
- [ ] Standardize page component naming (Issue #19)

---

## Previously Completed ✅

The following items from previous audits have been completed:

- ✅ Server Actions implemented for menu, payment, and settings
- ✅ Shared data fetching hook (`useBankQRCodes`) using SWR
- ✅ Rate limiting added to auth endpoints
- ✅ Standardized error handling (`lib/errors.ts`)
- ✅ Password validation on signup API
- ✅ Settings persistence to database
- ✅ Types moved to `types/` folder
- ✅ Standardized Button exports
- ✅ CSRF protection via Server Actions
- ✅ Removed redundant API routes

---

_Generated: 2026-01-12_  
_Audit Version: 2.0_
