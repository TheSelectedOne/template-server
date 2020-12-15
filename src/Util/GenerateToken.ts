import jwt from "jsonwebtoken";

export const GenerateToken = (id: string) => {
    const token = jwt.sign(id, "string");
    return token;
};
