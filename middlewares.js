import multer from "multer";
import routes from "./routes";

// dest 는 파일이 저장될 위치
// videos 폴더가 생성된 후 거기에 파일이 생성됨.
const multerVideo = multer({dest: "videos/"});

export const localMiddleware = (req, res, next) => {
    res.locals.siteName = 'WeTube';
    res.locals.routes = routes; // routes.js 를 로컬로 선언함으로써 pug에서도 사용 가능
    res.locals.user = {
        isAuthenticated: true,
        id : 1
    };
    next();
};


export const uploadVideo = multerVideo.single("videoFile"); // single은 오직 하나의 파일만 Upload할 수 있는걸 의미한다.