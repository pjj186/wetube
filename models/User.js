import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    avatarUrl: String, // fileUrl 과 같은 방식으로 동작
    facebookId: Number,
    githubId: Number,
});

// passportLocalMongoose는 configuration object(설정 객체)기 필요하다.
// usernameField: "username"이 될 field명을 명시해줍니다.
UserSchema.plugin(passportLocalMongoose, {usernameField: "email"});

const model = mongoose.model("User", UserSchema);

export default model;