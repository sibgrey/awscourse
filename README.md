Application sample for AWS deployment

## How to run
### PostgreSQL
Using Docker:
```
docker compose -f ./src/main/docker/postgresql.yml up
```
PostgreSQL will be available on `localhost:5432`.

### Application
Using Maven Wrapper:
```
mvnw spring-boot:run
```

## How to build
```
mvn clean package
```
