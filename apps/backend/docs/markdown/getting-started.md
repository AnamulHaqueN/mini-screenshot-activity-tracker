# Getting Started with EzyStaff API

This guide will help you make your first API call and understand the basic workflow.

## Prerequisites

- Node.js 18+ (for JavaScript examples)
- cURL or an HTTP client like Postman
- A valid email address for registration

## Base URL

```
http://localhost:3333  (Development)
https://api.ezystaff.com  (Production)
```

## Your First API Call

### Step 1: Create a Plan (Optional)

First, you may want to check available subscription plans:

```bash
curl -X GET http://localhost:3333/api/plans
```

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Basic",
      "price": 9.99,
      "period": "monthly",
      "features": ["Up to 10 employees", "Basic analytics"]
    }
  ]
}
```

### Step 2: Register a Company

Create a new company account with an owner user:

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

**Response (201 Created):**
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

**Important**: Check your email for the verification link. Owners must verify their email before logging in.

### Step 3: Verify Email

Click the link in your verification email, or visit:

```
http://localhost:3333/api/verify-email?token=YOUR_TOKEN_HERE
```

### Step 4: Login

Now you can log in to get your authentication token:

```bash
curl -X POST http://localhost:3333/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Response (200 OK):**
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

The JWT token is automatically set as an HTTP-only cookie (`jwt_token`).

### Step 5: Make Authenticated Requests

Use the JWT token to access protected endpoints:

```bash
# Get your user information
curl -X GET http://localhost:3333/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

**Response:**
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

## JavaScript Example

Here's a complete example using JavaScript fetch:

```javascript
// 1. Register
const registerResponse = await fetch('http://localhost:3333/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    ownerName: 'John Doe',
    ownerEmail: 'john@example.com',
    password: 'password123',
    companyName: 'Acme Corporation',
    planId: 1
  })
})

const registerData = await registerResponse.json()
console.log('Registered:', registerData)

// 2. Login (after email verification)
const loginResponse = await fetch('http://localhost:3333/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'john@example.com',
    password: 'password123'
  }),
  credentials: 'include' // Important: Include cookies
})

const loginData = await loginResponse.json()
console.log('Logged in:', loginData)

// 3. Get current user (cookie is automatically sent)
const meResponse = await fetch('http://localhost:3333/api/auth/me', {
  credentials: 'include'
})

const userData = await meResponse.json()
console.log('Current user:', userData)

// 4. Add an employee
const employeeResponse = await fetch('http://localhost:3333/api/admin/employees', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
  body: JSON.stringify({
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123'
  })
})

const employeeData = await employeeResponse.json()
console.log('Employee added:', employeeData)
```

## Python Example

Using the `requests` library:

```python
import requests

BASE_URL = "http://localhost:3333"

# Register
register_response = requests.post(f"{BASE_URL}/api/auth/register", json={
    "ownerName": "John Doe",
    "ownerEmail": "john@example.com",
    "password": "password123",
    "companyName": "Acme Corporation",
    "planId": 1
})

print("Registered:", register_response.json())

# Login (after email verification)
login_response = requests.post(f"{BASE_URL}/api/auth/login", json={
    "email": "john@example.com",
    "password": "password123"
})

# Extract JWT token from cookie
jwt_token = login_response.cookies.get('jwt_token')

# Make authenticated requests
headers = {"Authorization": f"Bearer {jwt_token}"}

me_response = requests.get(f"{BASE_URL}/api/auth/me", headers=headers)
print("Current user:", me_response.json())
```

## Common Errors

### Email Not Verified

```json
{
  "message": "Please verify your email before logging in"
}
```

**Solution**: Check your email and click the verification link.

### Invalid Credentials

```json
{
  "message": "Invalid email or password"
}
```

**Solution**: Double-check your email and password.

### Rate Limit Exceeded

```json
{
  "message": "Too many login attempts. Please try again later."
}
```

**Solution**: Wait a few minutes before trying again.

## Next Steps

- Read the [Authentication Guide](./authentication.md) for advanced auth patterns
- Explore the [API Reference](./modules/) for all available endpoints
- Check out the [Interactive Documentation](http://localhost:3333/api/docs)

## Need Help?

- Review the [Error Handling Guide](./errors.md)
- Check the [Data Models](./models.md) reference
- Contact support at support@ezystaff.com
