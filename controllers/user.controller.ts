import {Request, Response} from "express";
import {DB} from "../core/DB";
import {UserModel} from "../models/user.model";
const passwordHash = require('password-hash');

const db = new DB();
const userModel = new UserModel(db);
const getUsers = async (req: Request, res: Response) => {
    const data = await userModel.getAllUsers();
    res.send(data);
}

const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await userModel.getSingleUser(parseInt(id));
    res.send(data);
}
const createUser = async (req: Request, res: Response) => {
    const data = req.body;
    data.password = passwordHash.generate(data.password);
    await userModel.createUser(data)
    res.send("Successfully created user");
}
const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userData = req.body;
    await userModel.updateUser(parseInt(id), userData);
    res.send("Successfully updated user");
}
const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    await userModel.deleteUser(parseInt(id));
    res.send("Successfully deleted user");
}

export {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}