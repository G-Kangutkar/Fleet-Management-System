```bash 
create table vehicles (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  registration_number int unique,
  allowed_passengers int not null,
  isAvailable boolean default true,
  driver_id uuid ,
  rate_per_km int ,
  owner_id uuid references users(id),
  created_at timestamptz default now()
)
```