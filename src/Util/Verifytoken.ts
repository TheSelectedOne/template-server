import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const VerifyToken = (req: Request, res: Response, next: NextFunction) => {
    if(!req.cookies["token"]) throw new Error("User not logged in")
    const verify = jwt.verify(req.cookies["token"], "string")
    if(verify) return (
        res.locals.token = verify,
        next()
    )
    throw new Error("Something went wrong verifying user")
}