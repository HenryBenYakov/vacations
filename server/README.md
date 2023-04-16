# Running server container

```bash
docker build -t my-app-be:latest .
```

# Running mysql container

```bash
docker run --name my-app-mysql -e MYSQL_ROOT_PASSWORD=12345 -e MYSQL_DATABASE=vacations -p 3307:3306 --network my-app-network -d mysql --default-authentication-plugin=mysql_native_password
```

# Running server with mysql

```bash
docker run --name my-app-be -e NODE_ENV=containerized -p 3001:3001 --network my-app-network -d my-app-be
```
