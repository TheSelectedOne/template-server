import { User } from "../Entities/User";
import { nanoid } from "nanoid";
import { RegisterInterface } from "../Interfaces/RegisterInterface";
import argon from "argon2";
import { PasswordCheck } from "../Util/PasswordCheck";
import { LoginInterface } from "src/Interfaces/LoginInterface";

export const createUser = async (data: RegisterInterface) => {
    const id = nanoid();
    const check = PasswordCheck(data.password, data.confirmPassword);
    if (!check) throw new Error("Password Error");
    const password = await argon.hash(data.password);
    const user = User.create({
        id: id,
        email: data.email,
        password: password,
        verified: false,
    });

    return user.save();
};

export const loginUser = async (data: LoginInterface) => {
    const user = await User.findOne({
        where: {
            email: data.email,
        },
    });
    if (!user) throw new Error("User does not exist");
    const pw = await argon.verify(user.password, data.password);
    if (!pw) throw new Error("Wrong Password");
    return user;
};
