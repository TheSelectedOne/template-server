"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const User_1 = require("./Entities/User");
const user_1 = require("./Resolvers/user");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = typeorm_1.createConnection({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "1234",
        database: "authserver",
        synchronize: true,
        logging: true,
        entities: [User_1.User],
    });
    (yield connection).runMigrations();
    const app = express_1.default();
    app.use(cors_1.default());
    app.use(express_1.default.json());
    app.use(cookie_parser_1.default());
    app.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        yield user_1.createUser(req.body, res);
    }));
    app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        yield user_1.loginUser(req.body, res);
    }));
    app.listen(5000, () => {
        console.log("Server is Running");
    });
});
main();
//# sourceMappingURL=index.js.map