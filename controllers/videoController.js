import { format } from "morgan";
import routes from "../routes";

export const home = (req, res) => {

    res.render("home", {pageTitle : "Home", videos});
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

export const postUpload = (req, res) => {
    const {
        body: {
            file,
            title,
            description
        }
    } = req;
    // To Do: Upload and save video
    res.redirect(routes.videoDetail(324393));
};

export const videoDetail = (req, res) => res.render("videoDetail", {pageTitle : "VideoDetail"});

export const editVideo = (req, res) => res.render("editVideo", {pageTitle : "EditVideo"});

export const deleteVideo = (req, res) => res.render("deleteVideo", {pageTitle : "DeleteVideo"});