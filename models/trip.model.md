```bash
create table trips (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references users(id),
  vehicle_id uuid references vehicles(id),
  start_date text not null,
  end_date text,
  location text not null,
  distance_km int not null,
  passengers int,
  tripcost int,
  is_completed boolean default false,
  created_at timestamptz default now()


)
```