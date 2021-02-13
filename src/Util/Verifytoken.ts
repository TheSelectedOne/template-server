import jwt from 'jsonwebtoken'

export const VerifyToken = (token: string) => {

    const verify = jwt.verify(token, "string")
    if(verify) return verify
    throw new Error("Something went wrong verifying user")
}