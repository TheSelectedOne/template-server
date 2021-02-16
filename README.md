### Template

##### Template for starting a project with:

-   Nodejs
-   Express
-   Typeorm
-   Typescript
-   PostgreSQL
-   JWT
-   Basic Authentication
-   Authentication Cookies

#### How to get started with this?

1. Install all packages used in this project.
2. Download postgreSQL.
3. Create a database.
4. Add a .env file and insert database name, password, host, etc.
5. Generate a password or some random string that you can store in .env and use it as the secret for jsonwebtoken verification and signing (Used in GenerateToken.ts and VerifyToken.ts files). 
6. "NPM run watch" to rewrite some of the things in dist folder.
7. "NPM start" to start the server.

### UPDATE 16.02.2021

- Added get user by [something] function
- Added get users by [something] function
- Added get all users function
- Redid registering and login functions