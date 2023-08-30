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
-- user table holds details about the user accessing the system.
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  google_id VARCHAR(50),
  google_username VARCHAR(50),
  credits INTEGER DEFAULT 100,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- svg contains the svg text used for the generation.
CREATE TABLE svg (
  id SERIAL PRIMARY KEY,
  uid VARCHAR(11) UNIQUE NOT NULL,
  prompt VARCHAR(500) NOT NULL,
  generated BOOLEAN DEFAULT false,
  user_id INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT fk_user
      FOREIGN KEY(user_id) 
	  REFERENCES users(id)
);

-- svg_response contains the svg url generated for a particular response.
CREATE TABLE svg_response (
  id SERIAL PRIMARY KEY,
  gen_url VARCHAR(500) NOT NULL,
  svg_id INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT fk_svg
      FOREIGN KEY(svg_id) 
	  REFERENCES svg(id)
);

```