import {Router} from "express";
import {createUser, deleteUser, getUser, getUsers, updateUser} from "../controllers/user.controller";

export const userRouter = Router();
userRouter.get("/user", getUsers);
userRouter.get("/user/:id", getUser);
userRouter.post("/user", createUser);
userRouter.put("/user/:id", updateUser);
userRouter.delete("/user/:id", deleteUser);