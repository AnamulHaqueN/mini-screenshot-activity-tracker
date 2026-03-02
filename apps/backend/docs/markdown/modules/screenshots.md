# Screenshots Module

The Screenshots module handles uploading employee activity screenshots and retrieving them for review.

## Endpoints

- [`POST /api/employee/screenshots`](#upload-screenshot) - Upload a screenshot (Employee)
- [`GET /api/admin/screenshots/grouped`](#get-grouped-screenshots) - Get screenshots by time intervals (Owner/Admin)

---

## Upload Screenshot

Upload an activity screenshot.

**Endpoint**: `POST /api/employee/screenshots`
**Authentication**: Required (Any authenticated user)
**Rate Limit**: None

### Request

```bash
curl -X POST http://localhost:3333/api/employee/screenshots \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "screenshot=@/path/to/screenshot.png" \
  -F "capturedAt=2024-01-15T14:30:00Z"
```

### Form Data

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| screenshot | file | Yes | Image file (JPG/JPEG/PNG/WebP, max 5MB) |
| capturedAt | string | No | ISO 8601 timestamp (defaults to current time) |

### File Requirements

- **Max Size**: 5MB
- **Formats**: jpg, jpeg, png, webp
- **Field Name**: `screenshot` (multipart/form-data)

### Response (201 Created)

```json
{
  "message": "Screenshot uploaded successfully",
  "data": {
    "id": 142,
    "filePath": "https://cdn.example.com/screenshots/1/5/1705329000.png",
    "capturedAt": "2024-01-15T14:30:00.000Z"
  }
}
```

### Notes

- Files uploaded to Bunny CDN
- Timezone: Asia/Dhaka (if not specified)
- capturedAt is optional (uses current time if omitted)

## Get Grouped Screenshots

Retrieve screenshots grouped by hour and 10-minute intervals.

**Endpoint**: `GET /api/admin/screenshots/grouped`
**Authentication**: Required (Owner/Admin)
**Rate Limit**: None

### Request

```bash
curl -X GET "http://localhost:3333/api/admin/screenshots/grouped?employeeId=5&date=2024-01-15" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| employeeId | integer | Yes | Employee ID to get screenshots for |
| date | string | Yes | Date in YYYY-MM-DD format |

### Response (200 OK)

```json
{
  "employee": {
    "id": 5,
    "name": "Jane Smith"
  },
  "date": "2024-01-15",
  "statistics": {
    "hoursActive": 6,
    "totalScreenshots": 42
  },
  "groupedScreenshotsArray": [
    {
      "hour": 9,
      "minuteBucket": 0,
      "timeRange": "09:00 - 09:09",
      "count": 3,
      "screenshots": [
        {
          "id": 101,
          "fileUrl": "https://cdn.example.com/screenshots/1/5/1705309200.png",
          "capturedAt": "2024-01-15T09:03:00.000Z"
        },
        {
          "id": 102,
          "fileUrl": "https://cdn.example.com/screenshots/1/5/1705309380.png",
          "capturedAt": "2024-01-15T09:06:00.000Z"
        }
      ]
    },
    {
      "hour": 9,
      "minuteBucket": 10,
      "timeRange": "09:10 - 09:19",
      "count": 2,
      "screenshots": [
        {
          "id": 103,
          "fileUrl": "https://cdn.example.com/screenshots/1/5/1705309800.png",
          "capturedAt": "2024-01-15T09:13:00.000Z"
        }
      ]
    }
  ]
}
```

### Grouping Logic

Screenshots are grouped into:
- **Hour buckets**: 0-23 (24-hour format)
- **Minute buckets**: 0, 10, 20, 30, 40, 50 (10-minute intervals)

**Example**:
- Screenshot at 09:03 → Hour: 9, Bucket: 0 (09:00-09:09)
- Screenshot at 09:13 → Hour: 9, Bucket: 10 (09:10-09:19)
- Screenshot at 14:47 → Hour: 14, Bucket: 40 (14:40-14:49)

## Use Cases

### Employee App

Employees upload screenshots throughout the day:

```javascript
// Capture and upload screenshot every 10 minutes
setInterval(async () => {
  const screenshot = await captureScreen()
  const formData = new FormData()
  formData.append('screenshot', screenshot)
  formData.append('capturedAt', new Date().toISOString())

  await fetch('http://localhost:3333/api/employee/screenshots', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${employeeToken}` },
    credentials: 'include',
    body: formData
  })
}, 10 * 60 * 1000) // Every 10 minutes
```

### Admin Dashboard

Admins view employee activity:

```javascript
// Show today's screenshots for selected employee
const today = new Date().toISOString().split('T')[0]
const response = await fetch(
  `http://localhost:3333/api/admin/screenshots/grouped?employeeId=${selectedEmployeeId}&date=${today}`,
  {
    headers: { 'Authorization': `Bearer ${adminToken}` },
    credentials: 'include'
  }
)

const activity = await response.json()
displayActivityTimeline(activity.groupedScreenshotsArray)
```

---

## Common Errors

### 400 Bad Request - Invalid File

```json
{
  "errors": [
    {
      "field": "screenshot",
      "message": "The file must be one of: jpg, jpeg, png, webp",
      "rule": "extension"
    }
  ]
}
```

**Cause**: Unsupported file format or file too large.

**Solution**: Use JPG, PNG, or WebP under 5MB.

### 403 Forbidden - Admin Endpoint

```json
{
  "message": "Unauthorized access"
}
```

**Cause**: Employee trying to access admin-only endpoint.

**Solution**: Use owner or admin account to view screenshots.

### 500 Internal Server Error - Upload Failed

```json
{
  "message": "Internal server panic"
}
```

**Cause**: CDN upload failure or server error.

**Solution**: Retry the upload. If persistent, contact support.

---

## Statistics

The grouped screenshots endpoint provides useful statistics:

### Hours Active

Number of unique hours with at least one screenshot:
- Example: Screenshots at 9:00, 9:30, 10:15, 14:00 → 3 hours active

### Total Screenshots

Total number of screenshots uploaded for the day.

### Activity Visualization

Use the grouped data to create:
- Timeline views
- Activity heatmaps
- Productivity charts
- Screenshot galleries

---

## See Also

- [Employee Module](./employees.md) - Manage employees
- [Data Models](../models.md) - Screenshot schema details
- [Error Handling](../errors.md) - Handle upload errors
