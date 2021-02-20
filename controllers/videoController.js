import {videos} from "../db";

export const home = (req, res) => {

    res.render("home", {pageTitle : "Home", videos});
};

export const search = (req, res) => {
    const {
        query: { term: searchingBy } 
    } = req;
    //const searchingBy = req.query.term; 과 같음

    res.render("search", {pageTitle : "Search", searchingBy});
    // { searchingBy } 는 { searchingBy : searchingBy } 와 같음.
};

export const upload = (req, res) => res.render("upload", {pageTitle : "Upload"});

export const videoDetail = (req, res) => res.render("videoDetail", {pageTitle : "VideoDetail"});

export const editVideo = (req, res) => res.render("editVideo", {pageTitle : "EditVideo"});

export const deleteVideo = (req, res) => res.render("deleteVideo", {pageTitle : "DeleteVideo"});