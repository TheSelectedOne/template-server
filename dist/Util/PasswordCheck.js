"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordCheck = void 0;
const PasswordCheck = (password, confirmPassword) => {
    if (password.length < 8) {
        return "Password has to be at least 8 characters";
    }
    if (password != confirmPassword) {
        return "Passwords don't match";
    }
    return true;
};
exports.PasswordCheck = PasswordCheck;
//# sourceMappingURL=PasswordCheck.js.map