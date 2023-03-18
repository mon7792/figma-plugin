create table files (
  id serial primary key,
  name text not null,
  status text,
  processed boolean not null default false,
  created_at timestamp not null default now(),
  updated_at timestamp not null default now()
);