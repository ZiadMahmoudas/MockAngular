# Angular Products Dashboard - Mock API

Simple Angular app demonstrating authentication, routing, CRUD operations, and a shopping cart using **mock services only** (no real backend).

---

## Features

✅ **Mock Authentication**
- Login with any email/password
- Token stored in localStorage
- Auto-redirect after login

✅ **Products Management**
- View products list (Name, Price, Stock, Status)
- Add new products
- Delete products
- Stock-based status (In Stock / Out of Stock)

✅ **Protected Routes**
- `/products` protected by AuthGuard
- Auto-redirect to login if not authenticated

---

## Tech Stack

- Angular 21
- TypeScript
- Standalone Components
- RxJS
- Mock Services (in-memory data)


## Test Credentials

**Any email and password will work!**

Examples:
- Email: `admin@test.com` | Password: `123456`
- Email: `user@test.com` | Password: `password`
- Email: `test@example.com` | Password: `anything`

---

## Project Structure

```
src/app/
├── core/
│   ├── guards/
│   │   └── auth.guard.ts          # Route protection
│   ├── services/
│   │   ├── auth.service.ts        # Mock authentication
│   │   ├── token.service.ts       # Token management
│   │   ├── product.service.ts     # Mock products CRUD
│   │   └── cart.service.ts        # Cart management
│   └── pages/
│       ├── auth/
│       │   └── login/
│       │       └── login.component.ts
│       └── products/
│           └── products.component.ts
├── app.routes.ts                   # Application routes
├── app.config.ts                   # App configuration
└── app.component.ts                # Root component
```

---

## How It Works

### 1. Mock Authentication
- **AuthService** accepts any credentials
- Generates a fake JWT-like token
- Stores token + user info in localStorage
- No HTTP calls made

### 2. Mock Products API
- **ProductService** uses BehaviorSubject
- Initial products stored in memory
- CRUD operations update the observable
- Data resets on page refresh (expected behavior)

### 3. Cart System
- **CartService** manages cart state
- Persists cart in localStorage
- Survives page refresh
- Calculates totals automatically

### 4. Route Guards
- **authGuard**: Protects `/products`
- **notReturnLoginGuard**: Prevents logged-in users from accessing `/login`

---

## Business Rules

- If `stock === 0` → Status shows "Out of Stock"
- If `stock > 0` → Status shows "In Stock"
- Cart "Add" button disabled for out-of-stock products

---

## Key Implementation Details

### Mock Authentication Flow
```typescript
// Any credentials work
login({ email: 'test@test.com', password: '123' })
  → Generate fake token
  → Save to localStorage
  → Redirect to /products
```

### Mock Products Storage
```typescript
// Products stored in BehaviorSubject
private productsSubject = new BehaviorSubject<Product[]>(initialProducts);

// Operations modify the subject
addProduct() → Update subject → UI updates automatically
```

### Cart Persistence
```typescript
// Cart saved to localStorage on every change
addToCart() → Update BehaviorSubject → Save to localStorage
```

---

## Notes

- ✅ No real backend required
- ✅ Data resets on page refresh (normal for mock services as possible to put in local Storage) 
- ✅ Cart persists across refreshes
- ✅ Token persists across refreshes
- ❌ No form validation errors shown inline (kept simple)

---

## Optional Enhancements (Not Implemented)

- Edit product functionality
- Search/filter products
- Toast notifications
- Loading spinners
- Form validation messages


## Evaluation Checklist

- ✅ Components & Services properly separated
- ✅ No business logic in components
- ✅ Guards working correctly
- ✅ Observables used with RxJS
- ✅ Clean, readable code
- ✅ Mock API (no hardcoded data in components)
- ✅ Proper routing structure
