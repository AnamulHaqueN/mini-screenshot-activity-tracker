# EzyStaff API Documentation

Welcome to the EzyStaff API documentation! EzyStaff is a comprehensive employee activity tracking and management system that helps companies monitor employee productivity through screenshot tracking.

## Overview

EzyStaff provides a multi-tenant SaaS platform where:
- **Companies** can manage subscription plans
- **Admins/Owners** can add and manage employees
- **Employees** can upload activity screenshots
- **Admins** can view employee activity organized by time intervals

## Key Features

- 🏢 **Multi-tenant Architecture**: Complete data isolation per company
- 🔐 **Role-based Access Control**: Owner, Admin, and Employee roles
- 🔑 **JWT & Cookie Authentication**: Flexible auth for web and API clients
- 📸 **Screenshot Tracking**: Time-grouped activity monitoring
- ⚡ **Rate Limiting**: Protection on sensitive endpoints
- ✉️ **Email Verification**: Security for owner/admin accounts

## Quick Links

- **[Getting Started](./getting-started.md)** - Setup and first API call
- **[Authentication Guide](./authentication.md)** - JWT and cookie auth
- **[Data Models](./models.md)** - Database schemas and relationships
- **[Error Handling](./errors.md)** - Error formats and status codes

## API Reference

### Modules

1. **[Authentication](./modules/auth.md)** - Register, login, password reset
2. **[Employees](./modules/employees.md)** - Employee CRUD operations
3. **[Screenshots](./modules/screenshots.md)** - Upload and retrieve screenshots
4. **[Plans](./modules/plans.md)** - Subscription plan management
5. **[Email](./modules/email.md)** - Email verification

## Interactive Documentation

For interactive API exploration and testing, visit:

- **Development**: [http://localhost:3333/api/docs](http://localhost:3333/api/docs)
- **OpenAPI Spec**: [http://localhost:3333/api/docs/spec](http://localhost:3333/api/docs/spec)

## Base URLs

- **Development**: `http://localhost:3333`
- **Production**: `https://api.ezystaff.com`

## Authentication

Most endpoints require authentication using either:
- **JWT Bearer Token** (recommended for API clients)
- **HTTP-only Cookie** (automatic for web apps)

See the [Authentication Guide](./authentication.md) for detailed instructions.

## Rate Limiting

The following endpoints have rate limits:
- Login: 5 requests per 5 minutes
- Forgot Password: 5 requests per 10 minutes
- Reset Password: 5 requests per 10 minutes

## Support

For API support or questions:
- Email: support@ezystaff.com
- Documentation Issues: Create an issue in the repository

## Version

Current API Version: **1.0.0**
