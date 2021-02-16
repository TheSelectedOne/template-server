import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const VerifyToken = (req: Request, res: Response, next: NextFunction) => {
    if(!req.cookies["token"]) throw new Error("User not logged in")
    //jwt.verify second parameter should be a secret token stored in .env
    const verify = jwt.verify(req.cookies["token"], "string")
    if(verify) return (
        res.locals.token = verify,
        next()
    )
    return res.send({Error: "Something went wrong verifying user"}).status(501).end()
}