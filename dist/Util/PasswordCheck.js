"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordCheck = void 0;
const PasswordCheck = (password, confirmPassword) => {
    if (password.length < 8) {
        throw new Error("Password has to be at least 8 characters");
    }
    if (password != confirmPassword) {
        throw new Error("Passwords don't match");
    }
    return true;
};
exports.PasswordCheck = PasswordCheck;
//# sourceMappingURL=PasswordCheck.js.map