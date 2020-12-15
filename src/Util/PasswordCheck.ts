export const PasswordCheck = (password: string, confirmPassword: string) => {
    if (password.length < 8) {
        throw new Error("Password has to be at least 8 characters");
    }
    if (password != confirmPassword) {
        throw new Error("Passwords don't match");
    }
    return true;
};
