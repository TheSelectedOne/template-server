"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const VerifyToken = (req, res, next) => {
    if (!req.cookies["token"])
        throw new Error("User not logged in");
    const verify = jsonwebtoken_1.default.verify(req.cookies["token"], "string");
    if (verify)
        return (res.locals.token = verify,
            next());
    throw new Error("Something went wrong verifying user");
};
exports.VerifyToken = VerifyToken;
//# sourceMappingURL=Verifytoken.js.map