# Authentication Module

The Authentication module handles user registration, login, logout, and password management.

## Endpoints

- [`POST /api/auth/register`](#register) - Register new company
- [`POST /api/auth/login`](#login) - User login
- [`DELETE /api/auth/logout`](#logout) - User logout
- [`GET /api/auth/me`](#get-current-user) - Get current user info
- [`POST /api/auth/forgot-password`](#forgot-password) - Request password reset OTP
- [`POST /api/auth/reset-password`](#reset-password) - Reset password with OTP

---

## Register

Create a new company account with an owner user.

**Endpoint**: `POST /api/auth/register`
**Authentication**: Not required
**Rate Limit**: None

### Request

```bash
curl -X POST http://localhost:3333/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "ownerName": "John Doe",
    "ownerEmail": "john@example.com",
    "password": "password123",
    "companyName": "Acme Corporation",
    "planId": 1
  }'
```

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| ownerName | string | Yes | Owner's full name (2-255 chars) |
| ownerEmail | string | Yes | Owner's email address |
| password | string | Yes | Account password (4-255 chars) |
| companyName | string | Yes | Company name (2-255 chars) |
| planId | integer | Yes | Subscription plan ID |

### Response (201 Created)

```json
{
  "message": "Registration successful",
  "data": {
    "company": {
      "id": 1,
      "name": "Acme Corporation",
      "planId": 1
    },
    "owner": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "owner",
      "isVerified": false
    }
  }
}
```

### Notes

- Sends verification email to owner
- Owner must verify email before logging in
- Creates both company and owner user

---

## Login

Authenticate a user and receive JWT token.

**Endpoint**: `POST /api/auth/login`
**Authentication**: Not required
**Rate Limit**: 5 requests per 5 minutes (per IP)

### Request

```bash
curl -X POST http://localhost:3333/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| email | string | Yes | User email address |
| password | string | Yes | Account password (min 4 chars) |

### Response (200 OK)

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

**Headers:**
```
Set-Cookie: token=eyJhbG...; HttpOnly; Secure; SameSite=Strict
Set-Cookie: role=owner; Path=/
```

### Notes

- Returns JWT token in HTTP-only cookie
- Owners/admins must verify email before login
- Employees can login without email verification

---

## Logout

Clear authentication and invalidate session.

**Endpoint**: `DELETE /api/auth/logout`
**Authentication**: Required
**Rate Limit**: None

### Request

```bash
curl -X DELETE http://localhost:3333/api/auth/logout \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Response (200 OK)

```json
{
  "message": "Logout successful"
}
```

### Notes

- Clears jwt_token cookie
- Clears role cookie
- Invalidates web session

---

## Get Current User

Retrieve authenticated user's profile information.

**Endpoint**: `GET /api/auth/me`
**Authentication**: Required
**Rate Limit**: None

### Request

```bash
curl -X GET http://localhost:3333/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Response (200 OK)

```json
{
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "owner",
    "companyId": 1,
    "company": {
      "id": 1,
      "name": "Acme Corporation",
      "planId": 1
    }
  }
}
```

---

## Forgot Password

Request a password reset OTP via email.

**Endpoint**: `POST /api/auth/forgot-password`
**Authentication**: Not required
**Rate Limit**: 5 requests per 10 minutes (per IP)

### Request

```bash
curl -X POST http://localhost:3333/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{ "email": "john@example.com" }'
```

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| email | string | Yes | User email address |

### Response (200 OK)

```json
{
  "message": "Password reset OTP sent to your email"
}
```

### Notes

- Sends 6-digit OTP to email
- OTP expires after 10 minutes
- OTP is currently logged to console (check server logs)

---

## Reset Password

Reset password using OTP received via email.

**Endpoint**: `POST /api/auth/reset-password`
**Authentication**: Not required
**Rate Limit**: 5 requests per 10 minutes (per IP)

### Request

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

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| email | string | Yes | User email address |
| otp | string | Yes | 6-digit OTP code |
| password | string | Yes | New password (4-255 chars) |
| password_confirmation | string | Yes | Password confirmation (must match) |

### Response (200 OK)

```json
{
  "message": "Password reset successful"
}
```

---

## See Also

- [Authentication Guide](../authentication.md) - Detailed auth concepts
- [Error Handling](../errors.md) - Common auth errors
- [Employee Module](./employees.md) - Manage employees after login
