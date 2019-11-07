## Hapi.js boilerplate
REST API Boilerplate using  Hapi.js v17.

## Description
This boilerplate app serves as a starting point for developers who were looking for a platform for their REST API.

The boilerplate contains basic user management using JWT authentication with login, logout, password reset and profile view.

Forgot password and e-mail change implementation use 'nodemailer' (sends an email with a action link with a unique token).

All the environment variables are managed using 'dotenv'.

## Technology

- **Hapi** - Server side framework
- **Docker** - Docker container support
- **Sequelize** - Database ORM
- **PostgreSQL** - SQL Database
- **Lab** - Unit test framework
- **Joi** - Schema validation
- **JWT** - Authentication mechanism for APIs
- **Dotenv** - Environment variable emulator
- **Good** - Logger mechanism

## Application Structure
```
├── src
│ ├── core                            // all important files for the system bootstrap
│ │ └── config                    // general server config
│ │ └── lib                         // helpers and custom libs
│ │ └── plugins                // hapi ecosystems and custom plugins
│ └── bootstrap.js            // load dependencies and execute server
│ └── database.js            // manage database connection 
│ └── server.js               // hapi server config
│ ├── models               // all sequelize models are defined here
│ ├── modules            // all entities divided by context
│ │   └── entity
│ │       └──test          // entity tests
│ │      │ └──entity.test.js
│ │      └──entity.handler.js // business logic (controller)
│ │      └──entity.routes.js  // entity routes
│ │      └──entity.schema.js // entity validations
│ ├── test               
│ │  └──_util                  // helpers and data mocks
│ │  └──index.spec.js     // set up test env
├── index.js                   // call bootstrap file and start server
├── logs                      // contains app log file
├── scripts                  // shell scripts
├── .gitignore             // standard git ignore file
├── Dockerfile           // Standard doceker file
├── docker-compose.yml     // Standard docker compose file 
├── .env.example               // dotenv exmaple configuration file for env variable 

```

## Code

We're using [JavaScript Standard Style](https://standardjs.com) as a code convention guideline.

## .env config
To set up environment variables, please copy '.env.example' file to '.env' file at the root location and define the following properties:

```
NODE_ENV=development                          // Node environment 
PORT=8000                                             // Server Port
SERVER_HOST=0.0.0.0                             // Hapi Server host
JWT_SECRET=ADD_STRONG_STRING_HERE
ALLOWED_DOMAINS=http://localhost:8080    // (Cors) Add all domain origins allowed separated by comma
DATABASE_URL=postgresql://DB_USER:DB_PASS@DB_HOST/DB_NAME    // PostgreSQL database url while using docker

```

## Running the server in Docker Container
Docker and docker compose must be installed on the system.

  1.  Enter on project dir
  2. Build containers using 
  ```shell 
     $ docker-compose build
   ```
  3. Run conteiners:
    ```shell 
     $ docker-compose up -d // use '-d' for run containers in the background
   ```
  4. To stop conteiners use:  
   ```shell 
     $ docker-compose down
   ```

## Testing
   This boilerplate supports unit test cases using 'lab' and 'code' packages, also we use sqlite as test database.

To run all the test cases:
```sh
$ npm test
```

## License
   MIT