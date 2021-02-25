import { format } from "morgan";
import Video from "../models/Video"; // 이건 Database의 element가 아니라 단지 Model임. element를 받는 통로일뿐 element 그 자체는 아니다.
import routes from "../routes";

export const home = async(req, res) => {
    try {
        const videos = await Video.find({}); // Database에 있는 모든 Video를 가져옴
        res.render("home", {pageTitle : "Home", videos});
    } catch(error) {
        console.log(error);
        res.render("home", {pageTitle : "Home", videos: [] });
    }
};

export const search = (req, res) => {
    const {
        // term의 이름을 searchingBy 로 바꾼다고 이해!
        query: { term: searchingBy } 
    } = req;
    //const searchingBy = req.query.term; 과 같음
    console.log(searchingBy);
    console.log(req.query.term);
    res.render("search", {pageTitle : "Search", searchingBy, videos});
    // { searchingBy } 는 { searchingBy : searchingBy } 와 같음.
};

export const getUpload = (req, res) => 
    res.render("upload", {pageTitle : "Upload"});

export const postUpload = async(req, res) => {
    const {
        body: { title, description},
        file : { path } // path = req.file.path
     } = req;
     const newVideo = await Video.create({ // DB에 만든다고 생각
        fileUrl: path,
        title,
        description
     });
    console.log(newVideo);
    // newVideo.id 는 MongoDB가 랜덤으로 만들어서 할당한다.
    res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async(req, res) => {
    const {
        params: {id}
    } = req; // id = rep.params.id (/:id 의 id 부분임)
    try{
    // Video 는 model, mongoose 메서드를 사용
    const video = await Video.findById(id); // id를 이용하여 DB에 저장된 객체를 찾는다.
    // views의 videoDetail로 pageTitle 과 video를 전달 
    res.render("videoDetail", {pageTitle: "Video Detail" , video });
    } catch (error) { 
        console.log(error);
        res.redirect(routes.home);
    }
}

export const getEditVideo = async (req, res) =>  {// 템플릿을 렌더링
    const {
        params: {id}
    } = req; // id = req.params.id
    try {
        const video = await Video.findById(id);
        res.render("editVideo", {pageTitle: `Edit ${video.title}`, video});

    } catch(error) { // 만약 해당하는 비디오를 못찾는다면
        res.redirect(routes.home);
    }
}
export const postEditVideo = async(req, res) => { // 비디오를 업데이트
    const {
        params: { id },
        body: {title, description}
        // title = req.body.title
        // description = req.body.description
    } = req; // id = req.params.id
    try {
        await Video.findOneAndUpdate({ _id: id }, {title, description})
        // 해당 id 를 가지고 있는 Model의 title과 description을 업데이트
        res.redirect(routes.videoDetail(id));
    } catch(error) {
        res.redirect(routes.home);
    }
}

export const deleteVideo = (req, res) => res.render("deleteVideo", {pageTitle : "DeleteVideo"});