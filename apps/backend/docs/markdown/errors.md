# Error Handling

This guide explains error response formats, HTTP status codes, and how to handle common errors in the EzyStaff API.

## Error Response Format

All errors follow a consistent JSON format:

### Standard Error

```json
{
  "message": "Error description here"
}
```

### Validation Error

```json
{
  "errors": [
    {
      "field": "email",
      "message": "Please enter a valid email address",
      "rule": "email"
    },
    {
      "field": "password",
      "message": "The password field must be at least 4 characters",
      "rule": "minLength"
    }
  ]
}
```

## HTTP Status Codes

The API uses standard HTTP status codes to indicate success or failure:

### Success Codes

| Code | Description | When Used |
|------|-------------|-----------|
| 200 | OK | Request succeeded |
| 201 | Created | Resource created successfully |

### Client Error Codes

| Code | Description | Common Causes |
|------|-------------|---------------|
| 400 | Bad Request | Validation error, malformed request |
| 401 | Unauthorized | Missing or invalid authentication token |
| 403 | Forbidden | Insufficient permissions for resource |
| 404 | Not Found | Resource doesn't exist |
| 422 | Unprocessable Entity | Semantic validation error (e.g., duplicate email) |
| 429 | Too Many Requests | Rate limit exceeded |

### Server Error Codes

| Code | Description | When Used |
|------|-------------|-----------|
| 500 | Internal Server Error | Unexpected server error |

## Common Errors

### 400 Bad Request - Validation Error

**Cause**: Request data doesn't meet validation requirements.

**Example Request:**
```bash
curl -X POST http://localhost:3333/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "ownerName": "J",
    "ownerEmail": "invalid-email",
    "password": "123",
    "companyName": "A",
    "planId": "not-a-number"
  }'
```

**Response:**
```json
{
  "errors": [
    {
      "field": "ownerName",
      "message": "The ownerName field must be at least 2 characters",
      "rule": "minLength"
    },
    {
      "field": "ownerEmail",
      "message": "Please enter a valid email address",
      "rule": "email"
    },
    {
      "field": "password",
      "message": "The password field must be at least 4 characters",
      "rule": "minLength"
    },
    {
      "field": "companyName",
      "message": "The companyName field must be at least 2 characters",
      "rule": "minLength"
    }
  ]
}
```

**Solution**: Fix the validation errors and retry the request.

### 401 Unauthorized - Missing Authentication

**Cause**: No authentication token provided or token is invalid.

**Example Request:**
```bash
curl -X GET http://localhost:3333/api/auth/me
# No Authorization header
```

**Response:**
```json
{
  "message": "Unauthorized access"
}
```

**Solution**: Include a valid JWT token in the Authorization header:
```bash
curl -X GET http://localhost:3333/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 401 Unauthorized - Invalid Credentials

**Cause**: Incorrect email or password during login.

**Example Request:**
```bash
curl -X POST http://localhost:3333/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "wrongpassword"
  }'
```

**Response:**
```json
{
  "message": "Invalid email or password"
}
```

**Solution**: Verify email and password are correct.

### 401 Unauthorized - Email Not Verified

**Cause**: Owner or admin trying to login without verifying email.

**Response:**
```json
{
  "message": "Please verify your email before logging in"
}
```

**Solution**: Check your email and click the verification link.

### 403 Forbidden - Insufficient Permissions

**Cause**: User role doesn't have permission for the requested action.

**Example**: Employee trying to access admin endpoint.

**Request:**
```bash
# Logged in as employee
curl -X GET http://localhost:3333/api/admin/employees \
  -H "Authorization: Bearer EMPLOYEE_TOKEN"
```

**Response:**
```json
{
  "message": "Unauthorized access"
}
```

**Solution**: Use an account with the correct role (owner or admin for this endpoint).

### 404 Not Found - Resource Not Found

**Cause**: Requested resource doesn't exist or belongs to a different company.

**Example:**
```bash
curl -X DELETE http://localhost:3333/api/admin/employees/999 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Response:**
```json
{
  "message": "Employee not found"
}
```

**Solution**: Verify the resource ID is correct and belongs to your company.

### 422 Unprocessable Entity - Duplicate Email

**Cause**: Trying to create a user with an email that already exists in the company.

**Request:**
```bash
curl -X POST http://localhost:3333/api/admin/employees \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "existing@example.com",
    "password": "password123"
  }'
```

**Response:**
```json
{
  "message": "Email already exists"
}
```

**Solution**: Use a different email address.

### 429 Too Many Requests - Rate Limit Exceeded

**Cause**: Too many requests to a rate-limited endpoint.

**Example**: Trying to login more than 5 times in 5 minutes.

**Response:**
```json
{
  "message": "Too many login attempts. Please try again later."
}
```

**Solution**: Wait a few minutes before retrying.

**Rate Limits:**
- Login: 5 requests per 5 minutes
- Forgot Password: 5 requests per 10 minutes
- Reset Password: 5 requests per 10 minutes

### 500 Internal Server Error

**Cause**: Unexpected server error.

**Example Response:**
```json
{
  "message": "Internal server panic"
}
```

**Solution**:
1. Retry the request
2. If error persists, contact support
3. Check API status page

## Validation Rules Reference

### User Fields

| Field | Rules |
|-------|-------|
| name | 2-255 characters |
| email | Valid email format |
| password | 4-255 characters |

### Company Fields

| Field | Rules |
|-------|-------|
| companyName | 2-255 characters |
| planId | Positive integer, must exist |

### Screenshot Upload

| Field | Rules |
|-------|-------|
| screenshot | Max 5MB, jpg/jpeg/png/webp only |
| capturedAt | ISO 8601 datetime (optional) |

### Password Reset

| Field | Rules |
|-------|-------|
| otp | Exactly 6 characters |
| password | 4-255 characters |
| password_confirmation | Must match password |

## Error Handling Best Practices

### 1. Always Check Status Codes

```javascript
const response = await fetch(url, options)

if (!response.ok) {
  const error = await response.json()
  console.error('API Error:', error)
  // Handle error appropriately
}
```

### 2. Handle Validation Errors

```javascript
const response = await fetch(url, options)

if (response.status === 400) {
  const { errors } = await response.json()
  errors.forEach(error => {
    console.log(`${error.field}: ${error.message}`)
  })
}
```

### 3. Retry on Rate Limits

```javascript
const response = await fetch(url, options)

if (response.status === 429) {
  // Wait and retry
  await new Promise(resolve => setTimeout(resolve, 60000)) // Wait 1 minute
  return fetch(url, options) // Retry
}
```

### 4. Handle Auth Errors

```javascript
const response = await fetch(url, options)

if (response.status === 401) {
  // Token invalid or expired - redirect to login
  window.location.href = '/login'
}
```

### 5. Log Unexpected Errors

```javascript
const response = await fetch(url, options)

if (response.status >= 500) {
  // Server error - log and notify user
  console.error('Server error:', await response.json())
  alert('Something went wrong. Please try again later.')
}
```

## Complete Error Handling Example

```javascript
async function apiRequest(url, options = {}) {
  try {
    const response = await fetch(url, options)

    // Handle different status codes
    switch (response.status) {
      case 200:
      case 201:
        return await response.json()

      case 400: {
        const { errors } = await response.json()
        throw new ValidationError(errors)
      }

      case 401: {
        const { message } = await response.json()
        // Redirect to login
        window.location.href = '/login'
        throw new Error(message)
      }

      case 403: {
        const { message } = await response.json()
        throw new PermissionError(message)
      }

      case 404: {
        const { message } = await response.json()
        throw new NotFoundError(message)
      }

      case 422: {
        const { message } = await response.json()
        throw new Error(message)
      }

      case 429: {
        const { message } = await response.json()
        throw new RateLimitError(message)
      }

      case 500: {
        const { message } = await response.json()
        throw new ServerError(message)
      }

      default:
        throw new Error(`Unexpected status code: ${response.status}`)
    }
  } catch (error) {
    if (error instanceof TypeError) {
      // Network error
      throw new Error('Network error. Please check your connection.')
    }
    throw error
  }
}

// Usage
try {
  const data = await apiRequest('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'john@example.com', password: 'password123' })
  })
  console.log('Login successful:', data)
} catch (error) {
  if (error instanceof ValidationError) {
    // Show validation errors to user
    error.errors.forEach(err => {
      showFieldError(err.field, err.message)
    })
  } else {
    // Show generic error message
    alert(error.message)
  }
}
```

## Debugging Tips

### 1. Check Request Format

Ensure your request body matches the expected format:
- Use `Content-Type: application/json` for JSON requests
- Use `multipart/form-data` for file uploads
- Include all required fields

### 2. Verify Authentication

Check that your JWT token is:
- Valid (not expired)
- Included in the Authorization header
- Prefixed with "Bearer "

### 3. Validate Input Data

Before sending a request, validate your data against the rules:
- Email format
- String length requirements
- Required fields present

### 4. Check API Documentation

Refer to the [Interactive Documentation](http://localhost:3333/api/docs) to verify:
- Correct endpoint URL
- Required parameters
- Expected request/response format

## Need Help?

If you continue to experience errors:

1. Check the [Getting Started Guide](./getting-started.md)
2. Review the [Authentication Guide](./authentication.md)
3. Explore examples in the [API Reference](./modules/)
4. Contact support at support@ezystaff.com
