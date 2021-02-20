import express from "express"; // const express = require('express');
import { changePassword, editProfile, userDetail, } from "../controllers/userController";
import routes from "../routes";

const userRouter = express.Router();
// user/

// userRouter.get()에서 두번째 인자는 함수

userRouter.get(routes.editProfile, editProfile);
userRouter.get(routes.changePassword, changePassword);
userRouter.get(routes.userDetail(), userDetail);

// 여기서 userDetail()에 인자를 주게되면
// routes.js에서 `/users/${id}`; 를 반환하기 때문에
// users/users/id 이런식으로 접근해야하는 상황이 발생한다.
// 그렇기때문에 여기서는 userDetail()에 인자를 주지 않는것.
// 즉 여기서의 routes.userDetail() 은 users/:id 와 같은 상태

export default userRouter;