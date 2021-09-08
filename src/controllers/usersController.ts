import { UserModel } from '../models';
import { UserResponse } from '../types';
import { Request, Response } from 'express';

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

export const usersController = { getById }

