// strategy랑 필요한 것들을 넣어줄거임
// strategy : 로그인하는 방식
// serialization : 
import passport from "passport";
import User from "./models/User";


// passport 에게 strategy 를 하나 사용하라고 함
passport.use(User.createStrategy());


passport.serializeUser(User.serializeUser()); // "헤이 passport 쿠키에는 오직 user.id만 담아서 보내도록 해."
passport.deserializeUser(User.deserializeUser());

