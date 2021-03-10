import express from "express";
import { getJoin, postJoin, getLogin, logout, postLogin } from "../controllers/userController";
import { home, search } from "../controllers/videoController";
import routes from "../routes";
import {onlyPublic} from "../middlewares";

const globalRouter = express.Router();
// globalRouter 변수는 Router 

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);


globalRouter.get(routes.home, home);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.logout, onlyPublic, logout);
globalRouter.get(routes.search, search);

export default globalRouter;