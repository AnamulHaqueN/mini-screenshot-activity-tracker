## Mini Screenshot Activity Tracker SaaS (Hubstaff-like)

`Database design:`

```sql
Table companies {
  id int [pk, increment]
  name varchar
  plan_id int
  created_at datetime
}

Table users {
  id int [pk, increment]
  name varchar
  email varchar [unique]
  isActive bool
  password varchar
  company_id int
  role enum('owner', 'employee')
  created_at datetime
}

Table plans {
  id int [pk, increment]
  name enum('basic', 'pro', 'enterprise')
  price_per_employee int
}

Table screenshots {
  id int [pk, increment]
  file_path varchar
  user_id int
  company_id int
  capture_time datetime
  date date
  hour int
  minuteBucket int
}

Ref: companies.plan_id > plans.id
Ref: users.company_id > companies.id
Ref: screenshots.user_id > users.id
Ref: screenshots.company_id > companies.id

```

**Add validator**

```ts
node ace make:validator validator_name
```

### Create Seeders

```ts
// for make seeders
node ace make:seeder CompanySeeder

// run seeders
node ace db:seed

```

### Check Indexing command for database

```ts
// show indexing from a table
show INDEX FROM screenshots;

// analyze database
explain analyze  select file_path from screenshots where user_id = 2 and (capture_time) between "2026-01-06" and "2026-01-07";


```

## 🚀 Build & Run Commands

### **Development (from apps/backend directory):**

```bash
cd apps/backend

# Start development environment
docker-compose -f docker-compose-dev.yml up

# Run migrations
docker-compose -f docker-compose-dev.yml exec backend sh -c "pnpm exec node ace migration:run"

# Enter in container
docker-compose -f docker-compose-dev.yml exec backend sh

# Stop
docker-compose -f docker-compose-dev.yml down
```
