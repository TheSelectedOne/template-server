export const PasswordCheck = (password: string, confirmPassword: string) => {
    if (password.length < 8) {
        return "Password has to be at least 8 characters";
    }
    if (password != confirmPassword) {
        return "Passwords don't match";
    }
    return true;
};
