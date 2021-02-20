import routes from "./routes";

export const localMiddleware = (req, res, next) => {
    res.locals.siteName = 'WeTube';
    res.locals.routes = routes; // routes.js 를 로컬로 선언함으로써 pug에서도 사용 가능
    res.locals.user = {
        isAuthenticated: true,
        id : 1
    };
    next();
};