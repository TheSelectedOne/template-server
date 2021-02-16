import { User } from "../Entities/User";
import { nanoid } from "nanoid";
import { RegisterInterface } from "../Interfaces/RegisterInterface";
import argon from "argon2";
import { PasswordCheck } from "../Util/PasswordCheck";
import { LoginInterface } from "../Interfaces/LoginInterface";
import { Response } from "express";
import { GenerateToken } from "../Util/GenerateToken";

export const createUser = async (data: RegisterInterface, res: Response) => {
    const id = nanoid();
    const check = PasswordCheck(data.password, data.confirmPassword);
    if (check !== true) return res.send({Error: check}).status(401).end();
    const password = await argon.hash(data.password);
    const user = User.create({
        id: id,
        email: data.email,
        password: password,
        verified: false,
    })
    const token = GenerateToken(user.id);
    res.cookie("token", token, {
        httpOnly: true,
    });
    await user.save().catch(err => {
        return res.send({Error: err}).status(500).end()
    })
    return res.send(user).status(200).end();
};

export const loginUser = async (data: LoginInterface, res: Response) => {
    const user = await User.findOne({
        where: {
            email: data.email,
        },
    });
    if (!user) return res.send({Error: "No account with this email"}).status(400).end();
    const pw = await argon.verify(user.password, data.password);
    if (!pw) return res.send({Error: "Wrong Password"}).status(403).end();
    const token = GenerateToken(user.id);
    res.cookie("token", token, {
        httpOnly: true,
    });
    return res.send(user).status(200).end();
};
