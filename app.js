import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";
import { localMiddleware } from "./middlewares";

const app = express();

// middlewares
app.use(helmet({contentSecurityPolicy: false}));
app.set('view engine', "pug");
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan("dev"));
app.use(localMiddleware);


//routes
app.use(routes.home, globalRouter); // "/", globalRouter
app.use(routes.users, userRouter); // "/users", userRouter
app.use(routes.videos, videoRouter); // "/videos", videoRouter

export default app;