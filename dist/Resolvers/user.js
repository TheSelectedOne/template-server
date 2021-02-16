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
exports.loginUser = exports.createUser = exports.filterUsers = exports.getUserBy = exports.getAllUsers = void 0;
const User_1 = require("../Entities/User");
const nanoid_1 = require("nanoid");
const argon2_1 = __importDefault(require("argon2"));
const PasswordCheck_1 = require("../Util/PasswordCheck");
const GenerateToken_1 = require("../Util/GenerateToken");
const getAllUsers = (res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User_1.User.find();
    if (!users)
        return res.send({ Error: "No users found" }).status(404).end();
    return res.send(users).status(200).end();
});
exports.getAllUsers = getAllUsers;
const getUserBy = (findBy, arg, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.User.findOne({ where: {
            [findBy]: arg
        } });
    if (!user)
        return res.send({ Error: `No user found with this ${findBy}` }).status(404).end();
    return res.send(user).status(200).end();
});
exports.getUserBy = getUserBy;
const filterUsers = (findBy, arg, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User_1.User.find({ where: {
            [findBy]: arg
        } });
    if (!users)
        return res.send({ Error: `No users found with this ${findBy}` }).status(404).end();
    return res.send(users).status(200).end();
});
exports.filterUsers = filterUsers;
const createUser = (data, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = nanoid_1.nanoid();
    const check = PasswordCheck_1.PasswordCheck(data.password, data.confirmPassword);
    if (check !== true)
        return res.send({ Error: check }).status(401).end();
    const password = yield argon2_1.default.hash(data.password);
    const user = User_1.User.create({
        id: id,
        email: data.email,
        password: password,
        verified: false,
    });
    const token = GenerateToken_1.GenerateToken(user.id);
    res.cookie("token", token, {
        httpOnly: true,
    });
    yield user.save().catch(err => {
        return res.send({ Error: err }).status(500).end();
    });
    return res.send(user).status(200).end();
});
exports.createUser = createUser;
const loginUser = (data, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.User.findOne({
        where: {
            email: data.email,
        },
    });
    if (!user)
        return res.send({ Error: "No account with this email" }).status(400).end();
    const pw = yield argon2_1.default.verify(user.password, data.password);
    if (!pw)
        return res.send({ Error: "Wrong Password" }).status(403).end();
    const token = GenerateToken_1.GenerateToken(user.id);
    res.cookie("token", token, {
        httpOnly: true,
    });
    return res.send(user).status(200).end();
});
exports.loginUser = loginUser;
//# sourceMappingURL=user.js.map