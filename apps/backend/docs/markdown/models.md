# Data Models

This document describes all data models used in the EzyStaff API, their fields, relationships, and constraints.

## Models Overview

EzyStaff has four primary data models:

1. **Plan** - Subscription plans
2. **Company** - Companies using the platform
3. **User** - All users (owners, admins, employees)
4. **Screenshot** - Activity screenshots uploaded by employees

## Relationship Diagram

```
Plan (1) ──────────────── (Many) Company
                              │
                              ├──── (Many) User
                              │        │
                              │        └──── (Many) Screenshot
                              │
                              └──── (Many) Screenshot
```

## Plan Model

Represents subscription plans available in the system.

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | integer | Auto | Primary key |
| name | string | Yes | Unique plan name (e.g., "Basic", "Pro") |
| description | string | No | Plan description |
| price | number | Yes | Plan price (decimal) |
| period | string | No | Billing period (e.g., "monthly", "yearly") |
| note | string | No | Additional notes |
| features | array | No | Array of feature strings (JSON) |
| highlight | boolean | No | Whether to highlight this plan |
| createdAt | datetime | Auto | Creation timestamp |
| updatedAt | datetime | Auto | Last update timestamp |

### Relationships

- **Has Many**: Companies

### Example

```json
{
  "id": 1,
  "name": "Professional",
  "description": "Best for growing teams",
  "price": 29.99,
  "period": "monthly",
  "note": "Most popular plan",
  "features": [
    "Unlimited employees",
    "Advanced analytics",
    "Priority support"
  ],
  "highlight": true,
  "createdAt": "2024-01-15T10:00:00.000Z",
  "updatedAt": "2024-01-15T10:00:00.000Z"
}
```

## Company Model

Represents a company account (multi-tenant unit).

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | integer | Auto | Primary key |
| name | string | Yes | Company name |
| planId | integer | Yes | Foreign key to Plan |
| createdAt | datetime | Auto | Creation timestamp |
| updatedAt | datetime | Auto | Last update timestamp |

### Relationships

- **Belongs To**: Plan
- **Has Many**: Users
- **Has Many**: Screenshots

### Constraints

- All data is scoped to company (multi-tenant isolation)
- Deleting a company cascades to users and screenshots

### Example

```json
{
  "id": 1,
  "name": "Acme Corporation",
  "planId": 1,
  "createdAt": "2024-01-15T10:00:00.000Z",
  "updatedAt": "2024-01-15T10:00:00.000Z"
}
```

## User Model

Represents all users in the system (owners, admins, and employees).

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | integer | Auto | Primary key |
| name | string | Yes | Full name |
| email | string | Yes | Email address |
| password | string | Yes | Hashed password (Scrypt) |
| companyId | integer | Yes | Foreign key to Company |
| role | enum | Yes | One of: 'owner', 'admin', 'employee' |
| verificationToken | string | No | Email verification token |
| isVerified | boolean | Auto | Email verification status (default: false) |
| createdAt | datetime | Auto | Creation timestamp |
| updatedAt | datetime | Auto | Last update timestamp |

### Relationships

- **Belongs To**: Company
- **Has Many**: Screenshots

### Constraints

- Email must be unique per company (not globally unique)
- Password is automatically hashed using Scrypt
- Password field is never returned in API responses

### Role Definitions

| Role | Description | Email Verification Required |
|------|-------------|----------------------------|
| owner | Company owner with full access | Yes |
| admin | Administrator with full access | Yes |
| employee | Regular employee, can upload screenshots | No |

### Indexes

- Email is indexed for fast lookups
- Composite unique index on (email, companyId)

### Example

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "companyId": 1,
  "role": "owner",
  "isVerified": true,
  "createdAt": "2024-01-15T10:00:00.000Z",
  "updatedAt": "2024-01-15T10:00:00.000Z"
}
```

**Note**: Password is never included in responses.

## Screenshot Model

Represents activity screenshots uploaded by employees.

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | integer | Auto | Primary key |
| filePath | text | Yes | Full URL or path to screenshot file |
| userId | integer | Yes | Foreign key to User (who uploaded) |
| companyId | integer | Yes | Foreign key to Company |
| capturedAt | datetime | Yes | When screenshot was captured |
| uploadedAt | datetime | Yes | When screenshot was uploaded |
| createdAt | datetime | Auto | Database creation timestamp |

### Relationships

- **Belongs To**: User
- **Belongs To**: Company

### Constraints

- All screenshots are scoped to company
- Deleting a user cascades to their screenshots
- Deleting a company cascades to all screenshots

### Indexes

- Composite index on (userId, capturedAt) for efficient querying

### File Storage

- Files are uploaded to Bunny CDN
- File path structure: `screenshots/{companyId}/{userId}/{timestamp}.{ext}`
- Supported formats: jpg, jpeg, png, webp
- Max file size: 5MB

### Grouping Logic

Screenshots are grouped by:
- **Hour buckets**: 0-23
- **Minute buckets**: 0, 10, 20, 30, 40, 50 (10-minute intervals)

Example: A screenshot captured at 14:37:23 is grouped into:
- Hour: 14
- Minute bucket: 30

### Example

```json
{
  "id": 1,
  "filePath": "https://cdn.example.com/screenshots/1/5/1705329000.png",
  "userId": 5,
  "companyId": 1,
  "capturedAt": "2024-01-15T14:30:00.000Z",
  "uploadedAt": "2024-01-15T14:31:23.000Z",
  "createdAt": "2024-01-15T14:31:23.000Z"
}
```

## PasswordResetOtp Model

Represents one-time passwords for password reset flow.

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | integer | Auto | Primary key |
| email | string | Yes | Email address |
| otp | string | Yes | 6-digit OTP code |
| expiresAt | datetime | Yes | OTP expiration time |
| createdAt | datetime | Auto | Creation timestamp |

### Constraints

- OTPs expire after 10 minutes
- One OTP per email at a time (newer OTPs replace old ones)

### Example

```json
{
  "id": 1,
  "email": "john@example.com",
  "otp": "123456",
  "expiresAt": "2024-01-15T14:40:00.000Z",
  "createdAt": "2024-01-15T14:30:00.000Z"
}
```

## Validation Rules

### User Creation

- **name**: 2-255 characters
- **email**: Valid email format
- **password**: 4-255 characters (minimum requirement, consider stronger in production)

### Company Creation

- **name**: 2-255 characters
- **planId**: Must reference an existing plan

### Screenshot Upload

- **file**: JPG, JPEG, PNG, or WebP
- **size**: Maximum 5MB
- **capturedAt**: ISO 8601 datetime format (optional)

## Multi-Tenant Isolation

All queries automatically filter by company:

```sql
-- Example: Get employees
SELECT * FROM users WHERE company_id = ? AND role = 'employee'

-- Example: Get screenshots
SELECT * FROM screenshots WHERE company_id = ? AND user_id = ?
```

This ensures complete data isolation between companies.

## Cascading Deletes

### Company Deletion
- Deletes all associated users
- Deletes all associated screenshots

### User Deletion
- Deletes all associated screenshots

## Timestamps

All models include automatic timestamps:

- **createdAt**: Set automatically on creation
- **updatedAt**: Set automatically on creation and updated on every modification

Timezone: All timestamps are stored in UTC.

## Next Steps

- Learn about [Authentication](./authentication.md)
- Explore [API Endpoints](./modules/)
- Review [Error Handling](./errors.md)
