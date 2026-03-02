# Plans Module

The Plans module manages subscription plans for companies.

## Endpoints

- [`GET /api/plans`](#list-plans) - Get all subscription plans
- [`POST /api/plans`](#create-plan) - Create a new plan

---

## List Plans

Retrieve all available subscription plans.

**Endpoint**: `GET /api/plans`
**Authentication**: Not required
**Rate Limit**: None

### Request

```bash
curl -X GET http://localhost:3333/api/plans
```

### Response (200 OK)

```json
{
  "data": [
    {
      "id": 1,
      "name": "Basic",
      "description": "Perfect for small teams",
      "price": 9.99,
      "period": "monthly",
      "note": "Most affordable option",
      "features": [
        "Up to 10 employees",
        "Basic analytics",
        "Email support"
      ],
      "highlight": false,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    },
    {
      "id": 2,
      "name": "Professional",
      "description": "Best for growing teams",
      "price": 29.99,
      "period": "monthly",
      "note": "Most popular plan",
      "features": [
        "Unlimited employees",
        "Advanced analytics",
        "Priority support",
        "Custom reports"
      ],
      "highlight": true,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    },
    {
      "id": 3,
      "name": "Enterprise",
      "description": "For large organizations",
      "price": 99.99,
      "period": "monthly",
      "features": [
        "Everything in Professional",
        "Dedicated support",
        "Custom integrations",
        "SLA guarantee"
      ],
      "highlight": false,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### Notes

- Returns all plans (no pagination)
- No authentication required
- Useful for displaying pricing page

### JavaScript Example

```javascript
// Fetch all plans
const response = await fetch('http://localhost:3333/api/plans')
const { data: plans } = await response.json()

// Display plans
plans.forEach(plan => {
  console.log(`${plan.name}: $${plan.price}/${plan.period}`)
  if (plan.highlight) {
    console.log('  ⭐ Most Popular')
  }
  console.log(`  Features:`)
  plan.features?.forEach(feature => {
    console.log(`    - ${feature}`)
  })
})
```

---

## Create Plan

Create a new subscription plan.

**Endpoint**: `POST /api/plans`
**Authentication**: Not currently required (may change)
**Rate Limit**: None

### Request

```bash
curl -X POST http://localhost:3333/api/plans \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Startup",
    "description": "Perfect for startups",
    "price": 19.99,
    "period": "monthly",
    "note": "Limited time offer",
    "features": [
      "Up to 25 employees",
      "Standard analytics",
      "Email support"
    ],
    "highlight": false
  }'
```

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | Yes | Plan name (unique) |
| description | string | No | Plan description |
| price | number | Yes | Plan price (decimal) |
| period | string | No | Billing period (e.g., "monthly", "yearly") |
| note | string | No | Additional notes |
| features | array | No | Array of feature strings |
| highlight | boolean | No | Whether to highlight this plan |

### Response (201 Created)

```json
{
  "message": "Plan created successfully",
  "data": {
    "id": 4,
    "name": "Startup",
    "description": "Perfect for startups",
    "price": 19.99,
    "period": "monthly",
    "note": "Limited time offer",
    "features": [
      "Up to 25 employees",
      "Standard analytics",
      "Email support"
    ],
    "highlight": false,
    "createdAt": "2024-01-15T10:00:00.000Z",
    "updatedAt": "2024-01-15T10:00:00.000Z"
  }
}
```

### Notes

- Currently no authentication required
- Plan name must be unique
- Price accepts decimal values

### JavaScript Example

```javascript
// Create a new plan
const response = await fetch('http://localhost:3333/api/plans', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Startup',
    description: 'Perfect for startups',
    price: 19.99,
    period: 'monthly',
    features: [
      'Up to 25 employees',
      'Standard analytics',
      'Email support'
    ],
    highlight: false
  })
})

const { data: plan } = await response.json()
console.log('Created plan:', plan)
```

---

## Plan Selection

When registering a company, you must provide a valid `planId`:

```bash
curl -X POST http://localhost:3333/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "ownerName": "John Doe",
    "ownerEmail": "john@example.com",
    "password": "password123",
    "companyName": "Acme Corp",
    "planId": 2
  }'
```

---

## Common Use Cases

### Display Pricing Page

```javascript
// Fetch and display all plans
const response = await fetch('http://localhost:3333/api/plans')
const { data: plans } = await response.json()

// Sort by price
plans.sort((a, b) => a.price - b.price)

// Render pricing cards
plans.forEach(plan => {
  renderPricingCard({
    title: plan.name,
    price: `$${plan.price}/${plan.period}`,
    description: plan.description,
    features: plan.features,
    isPopular: plan.highlight,
    onSelect: () => selectPlan(plan.id)
  })
})
```

### Plan Comparison

```javascript
// Compare plans side by side
const allPlans = await fetchPlans()
const comparisonTable = createComparisonTable(allPlans)

// Highlight differences
comparisonTable.forEach((row, index) => {
  if (allPlans.find(p => p.highlight)) {
    row.classList.add('popular')
  }
})
```

---

## Common Errors

### 400 Bad Request - Validation Error

```json
{
  "errors": [
    {
      "field": "price",
      "message": "The price field must be a number",
      "rule": "number"
    }
  ]
}
```

**Cause**: Invalid data type or missing required field.

**Solution**: Ensure all required fields are provided with correct types.

---

## Notes

**Security**: The POST endpoint currently doesn't require authentication. This may change in future versions to restrict plan creation to admins only.

**Features Array**: Features are stored as JSON array. Can contain any string values.

**Highlight**: Use `highlight: true` to mark a plan as "Most Popular" or "Recommended".

---

## See Also

- [Authentication Module](./auth.md) - Register with a plan
- [Data Models](../models.md) - Plan schema details
- [Error Handling](../errors.md) - Handle validation errors
