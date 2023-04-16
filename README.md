# Vacations-Project

Full Stack Web App (React, Node.JS, MySQL, Docker)

## Import the Database:

1. Open MySQL Workbench.
2. Import vacations.sql to a new database named vacations.
3. Make sure the following MySQL connection settings are correct inside the config file located in the Backend:
   - Database Host: localhost
   - Database Name: vacations
   - Database User: root
   - Database Default Password: (327091)

## Download and Install:

1. Download my project and cd into it using the following commands:

```
git clone "https://github.com/HenryBenYakov/vacations.git"
cd "vacations"
```

2. Install required node modules for the Backend and the Frontend using the following commands:

```
cd client
npm install
cd ../server
npm install
```

## 1. Run Instructions on Localhost:

1. Make sure the MySQL server is up and running.
2. First, run the server:

```
cd server
npm start
```

3. Next, run the client:

```
cd ../client
npm start
```

## 2. Run Instructions on Docker:

1. Build the server container

```bash
docker build -t my-app-be:latest .
```

2. Running mysql container

```bash
docker run --name my-app-mysql -e MYSQL_ROOT_PASSWORD=12345 -e MYSQL_DATABASE=vacations -p 3307:3306 --network my-app-network -d mysql --default-authentication-plugin=mysql_native_password
```

3. Running server with mysql

```bash
docker run --name my-app-be -e NODE_ENV=containerized -p 3001:3001 --network my-app-network -d my-app-be
```

4. Build the client container

```bash
docker build -t my-app-fe:latest .
```

5. Running client container

```bash
docker run --name my-app-fe -p 3000:3000 -d my-app-fe
```

## 3. Run Instructions on Docker Compose

1. Running all the containers in one command

```bash
docker-compose up -d
```

## Users Information For Login:

- Admin:

  - Username: Admin
  - Password: admin

- User:
  - Username: BartS
  - Password: 123456

The project should open up on http://localhost:3000/ and load up!

## Screenshots:

#### Login page:

![login](https://user-images.githubusercontent.com/95698861/202768291-d32d584b-e845-4d1a-9fa5-25c34e744183.png)

#### Register page:

![register](https://user-images.githubusercontent.com/95698861/202768463-f22898cf-bfc1-46cf-a98d-40dcf38c78b8.png)

#### User home page:

![home](https://user-images.githubusercontent.com/95698861/202768500-27f778a0-3209-4b93-b11d-9b25b75ccfbb.png)

#### User filtered vacation on home page:

![following](https://user-images.githubusercontent.com/95698861/202768557-22749859-8c4c-457f-ab4c-c37cce54f065.png)

#### Admin home page:

![admin](https://user-images.githubusercontent.com/95698861/202768586-b2a9b8fc-f80b-4a93-9829-88b83a2dd43e.png)

#### Edit page:

![editing](https://user-images.githubusercontent.com/95698861/202768610-850ad8a5-6e70-41bc-9b8f-3fcf22dda627.png)

#### Add page:

![adding](https://user-images.githubusercontent.com/95698861/202768640-91c2226d-16af-4e95-8114-0fe131f8f84a.png)

#### Reports page:

![reports](https://user-images.githubusercontent.com/95698861/202768662-47b2279a-32a2-4e6e-a3d9-772fb4666f98.png)
