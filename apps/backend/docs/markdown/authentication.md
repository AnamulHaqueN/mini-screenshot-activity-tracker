# Authentication Guide

EzyStaff API supports two authentication methods: JWT Bearer tokens and HTTP-only cookies. This guide explains both approaches and when to use each.

## Authentication Methods

### 1. JWT Bearer Token (Recommended for API Clients)

Best for:
- Mobile apps
- Desktop applications
- Server-to-server communication
- API integrations

### 2. Cookie-based Authentication (Recommended for Web Apps)

Best for:
- Web applications
- Browser-based clients
- Same-origin requests

## How to Obtain a Token

### Step 1: Login

Make a POST request to `/api/auth/login`:

```bash
curl -X POST http://localhost:3333/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Response:**
```json
{
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "owner",
      "companyId": 1
    }
  }
}
```

### Step 2: Extract Token

The JWT token is set in two places:

1. **HTTP-only Cookie**: `jwt_token` (automatically sent with subsequent requests)
2. **Response Headers**: Check `Set-Cookie` header

## Using JWT Bearer Token

For non-browser clients, extract the token from the cookie and send it in the Authorization header:

```bash
curl -X GET http://localhost:3333/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

**JavaScript Example:**
```javascript
// Login and extract token
const response = await fetch('http://localhost:3333/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'john@example.com', password: 'password123' })
})

// Get token from Set-Cookie header or cookies
const cookies = response.headers.get('set-cookie')
const jwtToken = extractTokenFromCookies(cookies) // You need to implement this

// Use token in subsequent requests
const meResponse = await fetch('http://localhost:3333/api/auth/me', {
  headers: { 'Authorization': `Bearer ${jwtToken}` }
})
```

## Using Cookie Authentication

For browser-based applications, simply include credentials:

```javascript
// Login
await fetch('http://localhost:3333/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'john@example.com', password: 'password123' }),
  credentials: 'include' // Important!
})

// Make authenticated requests (cookie sent automatically)
const response = await fetch('http://localhost:3333/api/auth/me', {
  credentials: 'include' // Important!
})
```

## Role-Based Access Control

EzyStaff has three user roles with different permissions:

### Owner Role

- Full access to all company resources
- Can add/remove employees
- Can view all employee screenshots
- Can manage company settings
- **Requires email verification** before login

**Automatically assigned**: When registering a company

### Admin Role

Same permissions as Owner. Currently treated identically in the system.

**Requires email verification** before login

### Employee Role

- Can upload screenshots
- Cannot manage other employees
- Cannot view other employees' data
- **No email verification required** (can login immediately)

**Automatically assigned**: When an admin/owner creates a new employee

## Email Verification

### For Owners and Admins

Email verification is **required** before first login:

1. Register an account
2. Check your email for verification link
3. Click the verification link
4. Login with your credentials

**Verification endpoint:**
```
GET /api/verify-email?token=YOUR_VERIFICATION_TOKEN
```

### For Employees

Email verification is **optional**. Employees can log in immediately after being created by an admin.

## Token Expiration

- JWT tokens do not expire in the current implementation
- For production, implement token refresh or expiration
- Users can logout to invalidate their session

## Logging Out

To logout and clear authentication:

```bash
curl -X DELETE http://localhost:3333/api/auth/logout \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

Or with cookies:

```javascript
await fetch('http://localhost:3333/api/auth/logout', {
  method: 'DELETE',
  credentials: 'include'
})
```

This will:
- Clear the `jwt_token` cookie
- Clear the `role` cookie
- Invalidate the web session

## Password Reset Flow

### Step 1: Request OTP

```bash
curl -X POST http://localhost:3333/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{ "email": "john@example.com" }'
```

**Rate Limit**: 5 requests per 10 minutes

### Step 2: Check Email

You'll receive a 6-digit OTP code via email. The OTP expires after 10 minutes.

### Step 3: Reset Password

```bash
curl -X POST http://localhost:3333/api/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "otp": "123456",
    "password": "newpassword123",
    "password_confirmation": "newpassword123"
  }'
```

**Rate Limit**: 5 requests per 10 minutes

## Security Best Practices

### For API Clients

1. **Store tokens securely**: Use secure storage (keychain, encrypted storage)
2. **Never log tokens**: Avoid printing tokens in logs
3. **Use HTTPS**: Always use HTTPS in production
4. **Implement token refresh**: Plan for token expiration

### For Web Apps

1. **Use cookie auth**: Leverage HTTP-only cookies
2. **Enable credentials**: Always set `credentials: 'include'`
3. **CORS configuration**: Ensure proper CORS headers
4. **CSRF protection**: Implement CSRF tokens if needed

## Rate Limiting

To prevent abuse, these authentication endpoints have rate limits:

| Endpoint | Limit | Window |
|----------|-------|--------|
| `/api/auth/login` | 5 requests | 5 minutes |
| `/api/auth/forgot-password` | 5 requests | 10 minutes |
| `/api/auth/reset-password` | 5 requests | 10 minutes |

Rate limits are per IP address.

## Common Authentication Errors

### 401 Unauthorized

**Causes:**
- Missing or invalid JWT token
- Expired token
- User not logged in

**Solution**: Login again and obtain a new token

### 403 Forbidden

**Causes:**
- Insufficient permissions for the requested resource
- Wrong user role (e.g., employee trying to access admin endpoint)

**Solution**: Ensure you're using the correct account with proper permissions

### 429 Too Many Requests

**Causes:**
- Exceeded rate limit on login or password reset

**Solution**: Wait a few minutes before trying again

## Multi-tenant Data Isolation

All authenticated requests are scoped to your company:

- Employees can only see their own company's data
- Admins can only manage employees in their company
- Screenshots are filtered by company automatically

The `companyId` is automatically determined from your JWT token.

## Next Steps

- Explore [Employee Management](./modules/employees.md) endpoints
- Learn about [Screenshot Upload](./modules/screenshots.md)
- Review [Error Handling](./errors.md) guide
