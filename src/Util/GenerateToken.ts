import jwt from "jsonwebtoken";

export const GenerateToken = (id: string) => {
    //jwt.sign second parameter should be a secret token/password stored in .env file
    const token = jwt.sign(id, "string");
    return token;
};
