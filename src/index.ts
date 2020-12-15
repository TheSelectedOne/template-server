import "reflect-metadata";
import { createConnection } from "typeorm";
import cors from "cors";
import express, { Request, Response } from "express";
import { User } from "./Entities/User";
import { createUser, loginUser } from "./Resolvers/user";
import cookieParser from "cookie-parser";
import { GenerateToken } from "./Util/GenerateToken";

const main = async () => {
    const connection = createConnection({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "1234",
        database: "authserver",
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
        const user = await createUser(req.body)
            .then((user) => {
                console.log(user);
                const token = GenerateToken(user.id);
                res.cookie("token", token, {
                    httpOnly: true,
                });
                return user;
            })
            .catch((err) => {
                console.log(err);
                return;
            });
        return res.send(user);
    });
    app.post("/login", async (req: Request, res: Response) => {
        const user = await loginUser(req.body)
            .then((user) => {
                console.log(user);
                const token = GenerateToken(user.id);
                res.cookie("token", token, {
                    httpOnly: true,
                });
                return user;
            })
            .catch((err) => {
                console.log(err);
                res.status(403);
                return;
            });

        return res.send(user);
    });
    app.listen(5000, () => {
        console.log("Server is Running");
    });
};

main();
