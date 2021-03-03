import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => {
    res.render("join", {pageTitle : "Join"});
};
export const postJoin = async (req, res) => {
    const {
        body: {name, email, password, password2}
    } = req;
    // req.body.name
    // req.body.email
    // req.body.password
    // req.body.password2
    if(password !== password2){
        // password 와 password2가 서로 다른경우 400으로 상태코드를 전달
        res.status(400);
        res.render("join", {pageTitle : "Join"});
    } else {
        try {
        const user = await User({
          name, 
          email  
        }); // User를 만들어주고,
        await User.register(user, password); // User.register로 위에서 만든 유저와 비밀번호를 전달하면 유저가 생성
        } catch (error) {
            console.log(error);
        }
        res.redirect(routes.home);
    }
};

export const getLogin = (req, res) => 
    res.render("login", {pageTitle : "Login"});
export const postLogin = (req,res) => {
    res.redirect(routes.home);
}

export const logout = (req, res) => {
    // To Do: Process Log Out
    res.redirect(routes.home);
}

export const userDetail = (req, res) => res.render("userDetail", {pageTitle : "User Detail"});
export const editProfile = (req, res) => res.render("editProfile", {pageTitle : "Edit Profile"});
export const changePassword = (req, res) => res.render("changePassword", {pageTitle : "Change Password"});