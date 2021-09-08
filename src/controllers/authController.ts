import argon2, { argon2id } from 'argon2';
import { Request, Response } from 'express';
import { COOKIE_NAME } from '../constants';
import { UserModel } from '../models';
import { LoginFormData, RegisterFormData, UserResponse } from '../types';

const auth = async (req: Request, res: Response) => {
    console.log(req.session);
    
    if (!(req.session as any).userId) return res.status(200).send(null);

    const user = await UserModel.findById((req.session as any).userId);

    return res.json(user)
}

const login = async (req: Request<{}, {}, LoginFormData>, res: Response) => {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ where: { email } })

    if (!user) return res.status(404).json({ error: 'No accounts by that email exists.'});

    const isMatched = await argon2.verify(user.password, password, {
        type: argon2id
    });

    if (!isMatched) return res.status(404).json({ error: 'Password is incorrect.'});

    (req.session as any).userId = user.id;
    req.session.save();
    console.log(req.session);

    res.cookie(COOKIE_NAME, user.id);

    let response: UserResponse = {
        id: user.id,
        email: user.email,
        username: user.username,
        avatarUrl: user.avatarUrl,
        activityStatus: 'offline'
    }

    return res.json(response);
}

const register = async (req: Request<{}, {}, RegisterFormData>, res: Response) => {
    const { email, username, password } = req.body;

    try {
        const hash = await argon2.hash(password, { type: argon2id });

        const user = await UserModel.create({
            email,
            username,
            password: hash
        });

        let response: UserResponse = {
            id: user.id,
            email: user.email,
            username: user.username,
            avatarUrl: user.avatarUrl,
            activityStatus: 'offline'
        }

        return res.json(response);
    } catch (error) {
        return res.status(409).json({
            message: `User ${username} could not be created because: ${error}`
        });
    }
}

export const authController = { login, register, auth };