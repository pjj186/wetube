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

export const videoDetail = (req, res) => res.render("videoDetail", {pageTitle : "VideoDetail"});

export const editVideo = (req, res) => res.render("editVideo", {pageTitle : "EditVideo"});

export const deleteVideo = (req, res) => res.render("deleteVideo", {pageTitle : "DeleteVideo"});