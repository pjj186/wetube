// 내 Video들의 형태를 정의할 것임
import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
    fileUrl: {
        type: String,
        required: 'File URL is required' // 에러메시지
    },
    title: {
        type:String,
        required: "Title is required"
    },
    description: String,
    views: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    // comments 는 Array
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
});

// mongoose.model 메소드의 첫번쨰 인자는 해당 collection의 단수적 표현을 나타내는 문자열이다. 실제 collection의 이름은 ‘Video’로 자동 변환되어 사용된다.
// 두번째 인자는 스키마이다.
const model = mongoose.model("Video", VideoSchema);
export default model;