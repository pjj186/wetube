import express from "express"; // const express = require('express');
import { changePassword, editProfile, userDetail, users } from "../controllers/userController";
import routes from "../routes";

const userRouter = express.Router();

// userRouter.get()에서 두번째 인자는 함수

userRouter.get("/", users);  
userRouter.get(routes.editProfile, editProfile);
userRouter.get(routes.changePassword, changePassword);
userRouter.get(routes.userDetail, userDetail);

export default userRouter;