## WF DB 


## docker
docker run --name wf-postgres-db -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres:alpine

## create database
create a database named `wf`.

1. docker exec -it bash
2. psql -U postgres
3. CREATE DATABASE wf;
4. \l
5. \c wf

## SQL

```sql

CREATE TABLE todo (
  id SERIAL PRIMARY KEY,
  task VARCHAR(255) NOT NULL,
  description TEXT,
  done BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  done_at TIMESTAMP
);


CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(100),
  github_id VARCHAR(50),
  github_username VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

```