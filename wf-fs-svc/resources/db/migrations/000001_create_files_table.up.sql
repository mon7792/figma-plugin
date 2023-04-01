create table files (
  id serial primary key,
  fid text not null,
  name text not null,
  file_path text not null,
  predicted text,
  processed boolean not null default false,
  created_at timestamp not null default now(),
  updated_at timestamp not null default now()
);