import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import session from "express-session";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";
import { localMiddleware } from "./middlewares";

import "./passport";

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

// 위에서 실행된 cookieParser 로부터 쿠키가 쭉 여기까지 내려와서
// passport는 초기화(initialize)되고, 그 다음엔 passport가 제 스스로 쿠키를 들여다봐서, 그 쿠키 정보에 해당하는 사용자를 찾아준다.
// 그리고, passport는 자기가 찾은 그 사용자를 요청(request)의 object, 즉 req.user로 만들어준다.
// 그러면 그 user object를 template에 추가시켜 줄 수 있다.
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session()); // 세션 저장

app.use(localMiddleware);


//routes
app.use(routes.home, globalRouter); // "/", globalRouter
app.use(routes.users, userRouter); // "/users", userRouter
app.use(routes.videos, videoRouter); // "/videos", videoRouter

export default app;