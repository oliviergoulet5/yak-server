import { UserModel } from '../models';
import { UserResponse } from '../types';
import { Request, Response } from 'express';
import argon2, { argon2id } from 'argon2';

const getById = async (req: Request, res: Response) => {
    const id = req.params.id;

    if (!id) return res.status(422).json({ message: 'No user id was provided' });

    const user = await UserModel.findById(id).exec();

    if (!user) return res.status(404).json({ message: `No users by the id of ${id} was found`});

    let response: UserResponse = {
        id: user.id,
        email: user.email,
        username: user.username,
        avatarUrl: user.avatarUrl,
        activityStatus: 'offline'
    }

    return res.json(response);
}

interface CreateUser {
    email: string,
    username: string,
    password: string
}

const create = async (req: Request<{}, {}, CreateUser>, res: Response) => {
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

export const usersController = { getById, create }

