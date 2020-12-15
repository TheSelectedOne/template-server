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
exports.loginUser = exports.createUser = void 0;
const User_1 = require("../Entities/User");
const nanoid_1 = require("nanoid");
const argon2_1 = __importDefault(require("argon2"));
const PasswordCheck_1 = require("../Util/PasswordCheck");
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const id = nanoid_1.nanoid();
    const check = PasswordCheck_1.PasswordCheck(data.password, data.confirmPassword);
    if (!check)
        throw new Error("Password Error");
    const password = yield argon2_1.default.hash(data.password);
    const user = User_1.User.create({
        id: id,
        email: data.email,
        password: password,
        verified: false,
    });
    return user.save();
});
exports.createUser = createUser;
const loginUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.User.findOne({
        where: {
            email: data.email,
        },
    });
    if (!user)
        throw new Error("User does not exist");
    const pw = yield argon2_1.default.verify(user.password, data.password);
    if (!pw)
        throw new Error("Wrong Password");
    return user;
});
exports.loginUser = loginUser;
//# sourceMappingURL=user.js.map