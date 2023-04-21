import express = require("express");
import {Application, json} from "express";
import {userRouter} from "./routers/user.router";
const cors = require("cors");

const app: Application = express();

app.use(json());
app.use(cors())
app.use(userRouter);

app.listen(8081, () => {
    console.log("Connected to PORT 8081");
});