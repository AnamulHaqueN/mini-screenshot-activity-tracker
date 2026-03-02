# Employee Management Module

The Employee module allows company owners and admins to manage their employees.

**Required Role**: Owner or Admin

## Endpoints

- [`GET /api/admin/employees`](#list-employees) - List all employees
- [`POST /api/admin/employees`](#add-employee) - Create new employee
- [`GET /api/admin/employees/search`](#search-employees) - Search employees by name
- [`DELETE /api/admin/employees/:id`](#delete-employee) - Delete an employee

---

## List Employees

Get all employees in your company with pagination and screenshot statistics.

**Endpoint**: `GET /api/admin/employees`
**Authentication**: Required (Owner/Admin)
**Rate Limit**: None

### Request

```bash
curl -X GET "http://localhost:3333/api/admin/employees?page=1" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| page | integer | No | Page number (default: 1) |

### Response (200 OK)

```json
{
  "data": [
    {
      "id": 5,
      "name": "Jane Smith",
      "email": "jane@example.com",
      "role": "employee",
      "companyId": 1,
      "isVerified": false,
      "screenshot_count": 142,
      "last_screenshot_at": "2024-01-15T16:45:00.000Z",
      "createdAt": "2024-01-10T09:00:00.000Z"
    }
  ],
  "meta": {
    "total": 25,
    "perPage": 10,
    "currentPage": 1,
    "lastPage": 3
  }
}
```

### Notes

- Returns 10 employees per page
- Includes screenshot statistics
- Only shows employees from your company

---

## Add Employee

Create a new employee user in your company.

**Endpoint**: `POST /api/admin/employees`
**Authentication**: Required (Owner/Admin)
**Rate Limit**: None

### Request

```bash
curl -X POST http://localhost:3333/api/admin/employees \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "password": "password123"
  }'
```

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | Yes | Employee full name (2-255 chars) |
| email | string | Yes | Employee email address |
| password | string | Yes | Account password (4-255 chars) |

### Response (201 Created)

```json
{
  "message": "Employee added successfully",
  "data": {
    "id": 6,
    "name": "Jane Smith",
    "email": "jane@example.com",
    "role": "employee",
    "companyId": 1,
    "isVerified": false
  }
}
```

### Notes

- Automatically assigns employee role
- Email must be unique within company
- Sends verification email (optional for employees)
- Employee can login without email verification

---

## Search Employees

Search for employees by name in your company.

**Endpoint**: `GET /api/admin/employees/search`
**Authentication**: Required (Owner/Admin)
**Rate Limit**: None

### Request

```bash
curl -X GET "http://localhost:3333/api/admin/employees/search?name=jane" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| name | string | Yes | Search query (case-insensitive) |

### Response (200 OK)

```json
{
  "data": [
    {
      "id": 5,
      "name": "Jane Smith",
      "email": "jane@example.com",
      "role": "employee",
      "screenshot_count": 142,
      "last_screenshot_at": "2024-01-15T16:45:00.000Z"
    },
    {
      "id": 8,
      "name": "Jane Doe",
      "email": "jane.doe@example.com",
      "role": "employee",
      "screenshot_count": 89,
      "last_screenshot_at": "2024-01-15T15:20:00.000Z"
    }
  ]
}
```

### Notes

- Search is case-insensitive
- Searches by name using LIKE matching
- Returns employees with screenshot statistics

---

## Delete Employee

Remove an employee from your company.

**Endpoint**: `DELETE /api/admin/employees/:id`
**Authentication**: Required (Owner/Admin)
**Rate Limit**: None

### Request

```bash
curl -X DELETE http://localhost:3333/api/admin/employees/5 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### URL Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| id | integer | Employee ID to delete |

### Response (200 OK)

```json
{
  "message": "Employee deleted successfully"
}
```

### Notes

- Can only delete employees in your company
- Deletes employee's screenshots (cascade delete)
- Cannot delete yourself
- Cannot delete owners or admins

---

## JavaScript Example

Complete employee management workflow:

```javascript
const BASE_URL = 'http://localhost:3333'
const AUTH_HEADERS = {
  'Authorization': `Bearer ${jwtToken}`,
  'Content-Type': 'application/json'
}

// 1. List all employees
const listRes = await fetch(`${BASE_URL}/api/admin/employees?page=1`, {
  headers: { 'Authorization': `Bearer ${jwtToken}` },
  credentials: 'include'
})
const employees = await listRes.json()
console.log('Employees:', employees)

// 2. Add new employee
const addRes = await fetch(`${BASE_URL}/api/admin/employees`, {
  method: 'POST',
  headers: AUTH_HEADERS,
  credentials: 'include',
  body: JSON.stringify({
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123'
  })
})
const newEmployee = await addRes.json()
console.log('Added:', newEmployee)

// 3. Search employees
const searchRes = await fetch(
  `${BASE_URL}/api/admin/employees/search?name=jane`,
  {
    headers: { 'Authorization': `Bearer ${jwtToken}` },
    credentials: 'include'
  }
)
const searchResults = await searchRes.json()
console.log('Search results:', searchResults)

// 4. Delete employee
const deleteRes = await fetch(
  `${BASE_URL}/api/admin/employees/${newEmployee.data.id}`,
  {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${jwtToken}` },
    credentials: 'include'
  }
)
console.log('Deleted:', await deleteRes.json())
```

## Common Errors

### 403 Forbidden - Insufficient Permissions

```json
{
  "message": "Unauthorized access"
}
```

**Cause**: User is not an owner or admin.

**Solution**: Login with an owner or admin account.

### 422 Unprocessable Entity - Duplicate Email

```json
{
  "message": "Email already exists"
}
```

**Cause**: Email already in use in your company.

**Solution**: Use a different email address.

### 404 Not Found - Employee Not Found

```json
{
  "message": "Employee not found"
}
```

**Cause**: Employee doesn't exist or belongs to different company.

**Solution**: Verify the employee ID is correct.

## See Also

- [Authentication](../authentication.md) - Learn about roles
- [Screenshots Module](./screenshots.md) - View employee screenshots
- [Error Handling](../errors.md) - Handle common errors
