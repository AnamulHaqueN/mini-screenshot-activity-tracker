# Email Verification Module

The Email module handles email verification for user accounts.

## Endpoints

- [`GET /api/verify-email`](#verify-email) - Verify user email address

---

## Verify Email

Verify a user's email address using a verification token.

**Endpoint**: `GET /api/verify-email`
**Authentication**: Not required
**Rate Limit**: None

### Request

```bash
curl -X GET "http://localhost:3333/api/verify-email?token=abc123def456"
```

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| token | string | Yes | Email verification token |

### Response (200 OK)

```json
{
  "message": "Email john@example.com verified successfully!"
}
```

### Response (400 Bad Request) - Invalid Token

```json
{
  "message": "Invalid or expired token"
}
```

---

## Verification Flow

### 1. User Registers

When a user registers (owner or admin), the system:
- Creates the user account with `isVerified: false`
- Generates a unique verification token
- Sends an email with verification link

### 2. Email Sent

The verification email contains a link like:

```
http://localhost:3333/api/verify-email?token=abc123def456789
```

### 3. User Clicks Link

User clicks the link in their email, which:
- Makes a GET request to the verification endpoint
- Updates `isVerified` to `true` in the database
- Allows the user to login

### 4. User Can Login

After verification, the user can successfully login.

---

## Who Needs Verification?

| Role | Verification Required | Can Login Without Verification |
|------|----------------------|-------------------------------|
| Owner | Yes | No |
| Admin | Yes | No |
| Employee | No (optional) | Yes |

### Owners and Admins

**Must verify email before login**:

```bash
# Attempt login without verification
curl -X POST http://localhost:3333/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "owner@example.com",
    "password": "password123"
  }'

# Response (401 Unauthorized)
{
  "message": "Please verify your email before logging in"
}
```

### Employees

**Can login immediately** (verification optional):

```bash
# Employee can login without verification
curl -X POST http://localhost:3333/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "employee@example.com",
    "password": "password123"
  }'

# Response (200 OK) - Login successful
{
  "message": "Login successful",
  "data": { ... }
}
```

---

## JavaScript Example

### Complete Verification Flow

```javascript
const BASE_URL = 'http://localhost:3333'

// 1. Register (triggers verification email)
const registerRes = await fetch(`${BASE_URL}/api/auth/register`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    ownerName: 'John Doe',
    ownerEmail: 'john@example.com',
    password: 'password123',
    companyName: 'Acme Corp',
    planId: 1
  })
})

console.log('Registration successful! Check your email.')

// 2. User receives email and clicks link
// Browser navigates to: /api/verify-email?token=abc123...

// 3. Handle verification in your frontend
const urlParams = new URLSearchParams(window.location.search)
const token = urlParams.get('token')

if (token) {
  const verifyRes = await fetch(
    `${BASE_URL}/api/verify-email?token=${token}`
  )

  const result = await verifyRes.json()

  if (verifyRes.ok) {
    alert('Email verified! You can now login.')
    window.location.href = '/login'
  } else {
    alert('Verification failed: ' + result.message)
  }
}

// 4. User can now login
const loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
  body: JSON.stringify({
    email: 'john@example.com',
    password: 'password123'
  })
})

console.log('Logged in successfully!')
```

---

## Verification Email

The verification email is sent during:

### Account Registration

When creating an owner account:

```bash
curl -X POST http://localhost:3333/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{ ... }'
```

### Employee Creation

When admin creates an employee:

```bash
curl -X POST http://localhost:3333/api/admin/employees \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{ ... }'
```

Note: Employees receive the email but verification is optional.

---

## Security Notes

### Token Generation

- Tokens are randomly generated and unique
- Stored in the `verificationToken` field of User model
- Token is cleared after successful verification

### Token Expiration

**Current implementation**: Tokens don't expire

**Recommended for production**:
- Add expiration timestamp
- Tokens expire after 24-48 hours
- Allow users to request new verification email

### Single Use

- Each token can only be used once
- After verification, token is cleared from database
- Attempting to reuse a token will fail

---

## Custom Verification Page

Instead of showing JSON response, redirect to a custom page:

```javascript
// In your backend route handler
router.get('/verify-email', async ({ request, response }) => {
  const { token } = request.qs()

  try {
    await verifyEmailToken(token)
    // Redirect to success page
    return response.redirect('/verification-success')
  } catch (error) {
    // Redirect to error page
    return response.redirect('/verification-failed')
  }
})
```

---

## Resend Verification Email

To implement resend functionality:

```javascript
// Endpoint to resend verification email
POST /api/auth/resend-verification

// Request
{
  "email": "john@example.com"
}

// Implementation
router.post('/auth/resend-verification', async ({ request }) => {
  const { email } = request.body()
  const user = await User.findBy('email', email)

  if (!user.isVerified) {
    await sendVerificationEmail(user)
    return { message: 'Verification email sent' }
  }

  return { message: 'Email already verified' }
})
```

---

## Common Errors

### 400 Bad Request - Invalid Token

```json
{
  "message": "Invalid or expired token"
}
```

**Causes**:
- Token doesn't exist in database
- Token already used
- Token is malformed

**Solution**:
- Request a new verification email
- Check token is copied correctly

---

## Testing Verification

### Development Mode

In development, verification emails may be:
- Logged to console
- Sent to a testing service (MailHog, Mailtrap)
- Displayed in terminal

Check your backend logs for the verification link.

### Production Mode

Ensure your SMTP settings are configured:
- Valid SMTP server
- Correct credentials
- From email address configured

---

## See Also

- [Authentication Module](./auth.md) - Registration and login
- [Error Handling](../errors.md) - Handle verification errors
- [Getting Started](../getting-started.md) - Complete workflow
