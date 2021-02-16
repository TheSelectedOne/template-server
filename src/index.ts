import "reflect-metadata";
import { createConnection } from "typeorm";
import cors from "cors";
import express, { Request, Response } from "express";
import { User } from "./Entities/User";
import { createUser, loginUser } from "./Resolvers/user";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"

dotenv.config()

const main = async () => {
    const connection = createConnection({
        type: "postgres",
        host: <string>process.env.DB_HOST,
        port: <number | undefined>process.env.DB_PORT,
        username: <string>process.env.DB_USERNAME,
        password: <string>process.env.DB_PASSWORD,
        database: <string>process.env.DB_NAME,
        synchronize: true,
        logging: true,
        entities: [User],
    });
    (await connection).runMigrations();

    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use(cookieParser());

    app.post("/register", async (req: Request, res: Response) => {
        await createUser(req.body, res)  
    });
    app.post("/login", async (req: Request, res: Response) => {
        await loginUser(req.body, res)
    });
    app.listen(process.env.PORT || 5000, () => {
        console.log("Server is Running");
    });
};

main();