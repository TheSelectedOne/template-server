"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const VerifyToken = (token) => {
    const verify = jsonwebtoken_1.default.verify(token, "string");
    if (verify)
        return verify;
    throw new Error("Something went wrong verifying user");
};
exports.VerifyToken = VerifyToken;
//# sourceMappingURL=Verifytoken.js.map