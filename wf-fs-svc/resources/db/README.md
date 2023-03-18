# DATABASE

1. Run the posgtres docker locally. 

```sh
docker run -d \
--name wf-fs-svc-db \
-p 5432:5432 \
-e POSTGRES_PASSWORD=wffssvc123 \
-e PGDATA=/var/lib/postgresql/data/pgdata \
-v /Volumes/hack/Projects/figma-plugin/wf-fs-svc/resources/db/mnt:/var/lib/postgresql/data \
postgres:alpine
```

2. create database.(if not exists)

```sh
docker exec -it <postgres-docker-id> sh
psql -U postgres

create database wffs;
\c wffs
```

3. create a migration file
```sh
migrate create -ext sql -dir migrations -seq create_files_table
```

3. database migration. 

```sh
migrate -database "postgres://postgres:wffssvc123@localhost:5432/wffs?sslmode=disable" -path migrations up
```